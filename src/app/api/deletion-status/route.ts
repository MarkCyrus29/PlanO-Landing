import { type NextRequest } from "next/server";
import { getRecordByCode } from "@/lib/deletion-store";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");

    if (!code || !code.trim()) {
      return Response.json(
        { error: "Confirmation code is required." },
        { status: 400 }
      );
    }

    const record = await getRecordByCode(code.trim());

    if (!record) {
      return Response.json(
        { error: "We couldn't find that code." },
        { status: 404 }
      );
    }

    // Format lastChanged date nicely (e.g. October 4, 2026)
    const dateObj = new Date(record.lastChanged);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // CRITICAL: Return ONLY step and last-changed date. NO names, emails, or other personal details!
    return Response.json({
      step: record.step,
      lastChanged: formattedDate,
      code: record.code,
    });
  } catch (err) {
    console.error("Deletion status API error:", err);
    return Response.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
