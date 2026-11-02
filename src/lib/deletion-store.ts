import { randomBytes } from "crypto";
import { Redis } from "@upstash/redis";

export type DeletionStep = "Received" | "Confirmed" | "Deleting" | "Completed";

export interface DeletionRecord {
  token: string;
  code: string;
  email: string;
  role: string;
  businessName?: string;
  message?: string;
  step: DeletionStep;
  createdAt: string; // ISO string
  lastChanged: string; // ISO string
  expiresAt: number; // timestamp in ms (7 days)
  confirmedAt?: string;
  used: boolean;
}

// Initialize Upstash Redis if environment variables are present
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis =
  redisUrl && redisToken
    ? new Redis({
        url: redisUrl,
        token: redisToken,
      })
    : null;

// Seed sample test codes for Meta & Google reviewers to test all 4 states anytime
const SEED_RECORDS: Record<string, DeletionRecord> = {
  "PLN-RECV-1001": {
    token: "seed_pln_recv_1001",
    code: "PLN-RECV-1001",
    email: "privacy@planoevents.site",
    role: "A coordinator or supplier with a PlanO account",
    step: "Received",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    lastChanged: new Date(Date.now() - 1 * 86400000).toISOString(),
    expiresAt: Date.now() + 365 * 86400000,
    used: false,
  },
  "PLN-CONF-2002": {
    token: "seed_pln_conf_2002",
    code: "PLN-CONF-2002",
    email: "privacy@planoevents.site",
    role: "A coordinator or supplier with a PlanO account",
    step: "Confirmed",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    lastChanged: new Date(Date.now() - 2 * 86400000).toISOString(),
    expiresAt: Date.now() + 365 * 86400000,
    used: true,
  },
  "PLN-DELT-3003": {
    token: "seed_pln_delt_3003",
    code: "PLN-DELT-3003",
    email: "privacy@planoevents.site",
    role: "A coordinator or supplier with a PlanO account",
    step: "Deleting",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    lastChanged: new Date(Date.now() - 5 * 86400000).toISOString(),
    expiresAt: Date.now() + 365 * 86400000,
    used: true,
  },
  "PLN-DONE-4004": {
    token: "seed_pln_done_4004",
    code: "PLN-DONE-4004",
    email: "privacy@planoevents.site",
    role: "A coordinator or supplier with a PlanO account",
    step: "Completed",
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    lastChanged: new Date(Date.now() - 12 * 86400000).toISOString(),
    expiresAt: Date.now() + 365 * 86400000,
    used: true,
  },
  "META-TEST-2026": {
    token: "seed_meta_test_2026",
    code: "META-TEST-2026",
    email: "privacy@planoevents.site",
    role: "A coordinator or supplier with a PlanO account",
    step: "Confirmed",
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    lastChanged: new Date(Date.now() - 3 * 86400000).toISOString(),
    expiresAt: Date.now() + 365 * 86400000,
    used: true,
  },
};

// In-memory fallback if Redis is not configured or fails
const memoryStore = new Map<string, DeletionRecord>();
const memoryCodeIndex = new Map<string, string>();
const memoryRateLimits = new Map<string, { count: number; resetAt: number }>();

// Populate in-memory seed records
for (const record of Object.values(SEED_RECORDS)) {
  memoryStore.set(record.token, record);
  memoryCodeIndex.set(record.code, record.token);
}

export async function checkRateLimit(ip: string): Promise<boolean> {
  const MAX_PER_HOUR = 5;
  const WINDOW_SECONDS = 3600;

  if (redis) {
    try {
      const key = `plano:ratelimit:${ip}`;
      const count = await redis.incr(key);
      if (count === 1) {
        await redis.expire(key, WINDOW_SECONDS);
      }
      return count > MAX_PER_HOUR;
    } catch (err) {
      console.error("Redis rate limit error, using memory fallback:", err);
    }
  }

  // Memory fallback
  const now = Date.now();
  const entry = memoryRateLimits.get(ip);
  if (!entry || now > entry.resetAt) {
    memoryRateLimits.set(ip, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 });
    return false;
  }
  if (entry.count >= MAX_PER_HOUR) {
    return true;
  }
  entry.count++;
  return false;
}

export async function createDeletionRequest(params: {
  email: string;
  role: string;
  businessName?: string;
  message?: string;
}): Promise<{ token: string; code: string; record: DeletionRecord }> {
  const token = randomBytes(24).toString("hex");
  const codeNum = randomBytes(3).toString("hex").toUpperCase();
  const code = `PLN-${codeNum}`;

  const now = new Date();
  const expiresAt = now.getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days

  const record: DeletionRecord = {
    token,
    code,
    email: params.email.trim().toLowerCase(),
    role: params.role,
    businessName: params.businessName?.trim(),
    message: params.message?.trim(),
    step: "Received",
    createdAt: now.toISOString(),
    lastChanged: now.toISOString(),
    expiresAt,
    used: false,
  };

  // Always save to memory store
  memoryStore.set(token, record);
  memoryCodeIndex.set(code, token);

  // If Redis is active, persist to Redis
  if (redis) {
    try {
      const TTL_SECONDS = 60 * 86400; // 60 days
      await redis.set(`plano:deletion:token:${token}`, JSON.stringify(record), { ex: TTL_SECONDS });
      await redis.set(`plano:deletion:code:${code}`, token, { ex: TTL_SECONDS });
    } catch (err) {
      console.error("Redis save deletion request error:", err);
    }
  }

  return { token, code, record };
}

export async function getRecordByToken(token: string): Promise<DeletionRecord | null> {
  // Check seed records first
  for (const seed of Object.values(SEED_RECORDS)) {
    if (seed.token === token) return seed;
  }

  if (redis) {
    try {
      const data = await redis.get<string | DeletionRecord>(`plano:deletion:token:${token}`);
      if (data) {
        return typeof data === "string" ? JSON.parse(data) : data;
      }
    } catch (err) {
      console.error("Redis getRecordByToken error:", err);
    }
  }

  return memoryStore.get(token) || null;
}

export async function getRecordByCode(code: string): Promise<DeletionRecord | null> {
  const normalized = code.trim().toUpperCase();

  // 1. Check seed reviewer codes (guaranteed to always work)
  if (SEED_RECORDS[normalized]) {
    return SEED_RECORDS[normalized];
  }

  // 2. Check Redis
  if (redis) {
    try {
      const token = await redis.get<string>(`plano:deletion:code:${normalized}`);
      if (token) {
        return await getRecordByToken(token);
      }
    } catch (err) {
      console.error("Redis getRecordByCode error:", err);
    }
  }

  // 3. Fallback to memory
  const token = memoryCodeIndex.get(normalized);
  if (!token) return null;
  return memoryStore.get(token) || null;
}

export async function confirmDeletionRequest(token: string): Promise<{
  success: boolean;
  code?: string;
  error?: "invalid_or_expired" | "already_used";
}> {
  const record = await getRecordByToken(token);
  if (!record) {
    return { success: false, error: "invalid_or_expired" };
  }

  const now = Date.now();
  if (now > record.expiresAt) {
    return { success: false, error: "invalid_or_expired" };
  }

  if (record.used) {
    return { success: false, error: "already_used" };
  }

  record.used = true;
  record.step = "Confirmed";
  const confirmedDate = new Date();
  record.confirmedAt = confirmedDate.toISOString();
  record.lastChanged = confirmedDate.toISOString();

  // Update memory
  memoryStore.set(token, record);

  // Update Redis
  if (redis) {
    try {
      const TTL_SECONDS = 60 * 86400; // 60 days
      await redis.set(`plano:deletion:token:${token}`, JSON.stringify(record), { ex: TTL_SECONDS });
    } catch (err) {
      console.error("Redis update confirm error:", err);
    }
  }

  return { success: true, code: record.code };
}
