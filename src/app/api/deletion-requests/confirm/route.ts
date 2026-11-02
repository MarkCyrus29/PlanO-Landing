import { type NextRequest } from "next/server";
import { confirmDeletionRequest, getRecordByToken } from "@/lib/deletion-store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body.token !== "string" || !body.token.trim()) {
      return Response.json(
        { error: "Confirmation token is required." },
        { status: 400 }
      );
    }

    const token = body.token.trim();
    const result = await confirmDeletionRequest(token);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          error: "This link has expired or was already used. Please submit the form again.",
        },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      code: result.code,
      message: "Your access has ended. Deletion will be complete within 30 days. We'll email you when it's done.",
    });
  } catch (err) {
    console.error("Confirmation error:", err);
    return Response.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return Response.json({ valid: false, error: "Token is missing." }, { status: 400 });
  }

  const record = await getRecordByToken(token);
  if (!record) {
    return Response.json({
      valid: false,
      error: "This link has expired or was already used. Please submit the form again.",
    });
  }

  const now = Date.now();
  if (now > record.expiresAt || record.used) {
    return Response.json({
      valid: false,
      error: "This link has expired or was already used. Please submit the form again.",
    });
  }

  return Response.json({ valid: true });
}
