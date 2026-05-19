import { Resend } from "resend";
import { type NextRequest } from "next/server";

/* ── Environment validation ── */
const resendApiKey = process.env.RESEND_API_KEY;
const senderEmail = process.env.RESEND_SENDER;
const receiverEmail = process.env.RESEND_RECEIVER;
const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

/* ── Simple in-memory rate limiter ── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max 5 submissions per IP per hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

/* ── Email validation ── */
function isValidEmail(email: string): boolean {
  // RFC 5322 simplified — good enough for waitlist
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 254;
}

/* ── Turnstile verification ── */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!turnstileSecret) {
    // If no secret is configured, skip verification (dev mode)
    console.warn("TURNSTILE_SECRET_KEY not set — skipping bot verification");
    return true;
  }

  const formData = new URLSearchParams();
  formData.append("secret", turnstileSecret);
  formData.append("response", token);
  formData.append("remoteip", ip);

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    }
  );

  const data = await res.json();
  return data.success === true;
}

/* ── POST handler ── */
export async function POST(request: NextRequest) {
  try {
    /* 1. Environment guard */
    if (!resendApiKey || !senderEmail || !receiverEmail) {
      console.error("Missing email environment variables");
      return Response.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    /* 2. Parse body */
    const body = await request.json().catch(() => null);
    if (!body || typeof body.email !== "string") {
      return Response.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();
    const turnstileToken = body.turnstileToken as string | undefined;

    /* 3. Validate email */
    if (!isValidEmail(email)) {
      return Response.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    /* 4. Rate limit */
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    /* 5. Turnstile verification */
    if (turnstileSecret) {
      if (!turnstileToken) {
        return Response.json(
          { error: "Bot verification is required" },
          { status: 400 }
        );
      }

      const isHuman = await verifyTurnstile(turnstileToken, ip);
      if (!isHuman) {
        return Response.json(
          { error: "Bot verification failed. Please try again." },
          { status: 403 }
        );
      }
    }

    /* 6. Send notification email via Resend */
    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: senderEmail,
      to: receiverEmail,
      subject: `🎉 New PlanO Waitlist Signup: ${email}`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #f7f5f0; border-radius: 12px;">
          <h2 style="color: #1d9e75; margin: 0 0 8px 0; font-size: 20px;">New Waitlist Signup!</h2>
          <p style="color: #6b6a65; margin: 0 0 24px 0; font-size: 14px;">Someone just joined the PlanO waitlist.</p>
          <div style="background: #ffffff; border: 1px solid #e5e3dc; border-radius: 8px; padding: 20px;">
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #9b9a94; text-transform: uppercase; letter-spacing: 0.05em;">Email Address</p>
            <p style="margin: 0; font-size: 16px; color: #1a1915; font-weight: 600;">${email}</p>
          </div>
          <p style="color: #9b9a94; font-size: 12px; margin: 20px 0 0 0;">
            Submitted at ${new Date().toLocaleString("en-PH", { timeZone: "Asia/Manila" })} (PHT)
            ${ip !== "unknown" ? ` · IP: ${ip}` : ""}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Failed to process your signup. Please try again." },
        { status: 500 }
      );
    }

    /* 7. Send thank-you confirmation email to the user */
    try {
      await resend.emails.send({
        from: senderEmail,
        to: email,
        subject: "Welcome to PlanO — You're on the Waitlist! 🎉",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head><meta charset="UTF-8" /></head>
          <body style="margin: 0; padding: 0; background-color: #f7f5f0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <div style="max-width: 560px; margin: 0 auto; padding: 40px 24px;">

              <!-- Header -->
              <div style="text-align: center; margin-bottom: 32px;">
                <div style="display: inline-block; background: #1d9e75; color: #ffffff; font-size: 24px; font-weight: 700; padding: 12px 20px; border-radius: 12px; letter-spacing: -0.02em;">
                  PlanO
                </div>
              </div>

              <!-- Main Card -->
              <div style="background: #ffffff; border: 1px solid #e5e3dc; border-radius: 16px; padding: 40px 32px; text-align: center;">

                <!-- Emoji accent -->
                <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>

                <h1 style="color: #1a1915; font-size: 24px; font-weight: 700; margin: 0 0 8px 0; line-height: 1.3;">
                  You're on the waitlist!
                </h1>

                <p style="color: #6b6a65; font-size: 15px; line-height: 1.6; margin: 0 0 28px 0;">
                  Thank you for signing up for PlanO. We're thrilled to have you on board.
                  We'll send you an email as soon as your spot is ready.
                </p>

                <!-- Divider -->
                <div style="width: 48px; height: 3px; background: #1d9e75; border-radius: 2px; margin: 0 auto 28px auto;"></div>

                <!-- What to expect -->
                <div style="text-align: left; background: #f7f5f0; border-radius: 12px; padding: 24px;">
                  <p style="color: #1a1915; font-size: 14px; font-weight: 600; margin: 0 0 16px 0;">
                    What happens next?
                  </p>

                  <div style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                    <span style="color: #1d9e75; font-weight: 700; font-size: 14px; margin-right: 12px; flex-shrink: 0;">01</span>
                    <p style="color: #6b6a65; font-size: 13px; margin: 0; line-height: 1.5;">
                      We're rolling out access in waves — you'll get an invite as soon as a spot opens up.
                    </p>
                  </div>

                  <div style="margin-bottom: 12px; display: flex; align-items: flex-start;">
                    <span style="color: #1d9e75; font-weight: 700; font-size: 14px; margin-right: 12px; flex-shrink: 0;">02</span>
                    <p style="color: #6b6a65; font-size: 13px; margin: 0; line-height: 1.5;">
                      PlanO is <strong style="color: #1a1915;">free during beta</strong> — no credit card required.
                    </p>
                  </div>

                  <div style="display: flex; align-items: flex-start;">
                    <span style="color: #1d9e75; font-weight: 700; font-size: 14px; margin-right: 12px; flex-shrink: 0;">03</span>
                    <p style="color: #6b6a65; font-size: 13px; margin: 0; line-height: 1.5;">
                      In the meantime, keep an eye on your inbox for updates and early previews.
                    </p>
                  </div>
                </div>
              </div>

              <!-- Footer -->
              <div style="text-align: center; margin-top: 32px;">
                <p style="color: #9b9a94; font-size: 12px; margin: 0 0 4px 0;">
                  You received this email because you signed up at plano.app
                </p>
                <p style="color: #9b9a94; font-size: 12px; margin: 0;">
                  © ${new Date().getFullYear()} PlanO. All rights reserved.
                </p>
              </div>

            </div>
          </body>
          </html>
        `,
      });
    } catch (confirmationError) {
      // Log but don't fail — the signup itself already succeeded
      console.error("Failed to send confirmation email:", confirmationError);
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Waitlist API error:", err);
    return Response.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
