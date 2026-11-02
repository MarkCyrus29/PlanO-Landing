import { type NextRequest } from "next/server";
import { POST as deletionRequestsPost } from "@/app/api/deletion-requests/route";
import { createDeletionRequest } from "@/lib/deletion-store";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";

  // Check if this is a Meta signed_request callback (form-urlencoded or multipart)
  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    try {
      const formData = await request.formData();
      const signedRequest = formData.get("signed_request");

      if (typeof signedRequest === "string") {
        let userId = "meta-user";
        try {
          const parts = signedRequest.split(".");
          if (parts.length === 2) {
            const payload = Buffer.from(parts[1], "base64url").toString("utf-8");
            const parsed = JSON.parse(payload);
            if (parsed.user_id) userId = String(parsed.user_id);
          }
        } catch {
          // Proceed with default identifier if payload decoding fails
        }

        const { code } = await createDeletionRequest({
          email: `${userId}@meta-user.deletion`,
          role: "Meta connected account user",
          message: `Automatic Meta User Data Deletion Callback for user ID: ${userId}`,
        });

        const origin = request.nextUrl.origin || "https://planoevents.site";
        return Response.json({
          url: `${origin}/data-deletion/status?code=${code}`,
          confirmation_code: code,
        });
      }
    } catch (err) {
      console.error("Meta signed_request form error:", err);
    }
  }

  // Also check if JSON payload has signed_request
  if (contentType.includes("application/json")) {
    try {
      const clone = request.clone();
      const body = await clone.json().catch(() => null);
      if (body && typeof body.signed_request === "string") {
        let userId = "meta-user";
        try {
          const parts = body.signed_request.split(".");
          if (parts.length === 2) {
            const payload = Buffer.from(parts[1], "base64url").toString("utf-8");
            const parsed = JSON.parse(payload);
            if (parsed.user_id) userId = String(parsed.user_id);
          }
        } catch {
          // Proceed with default identifier
        }

        const { code } = await createDeletionRequest({
          email: `${userId}@meta-user.deletion`,
          role: "Meta connected account user",
          message: `Automatic Meta User Data Deletion Callback for user ID: ${userId}`,
        });

        const origin = request.nextUrl.origin || "https://planoevents.site";
        return Response.json({
          url: `${origin}/data-deletion/status?code=${code}`,
          confirmation_code: code,
        });
      }
    } catch (err) {
      console.error("Meta signed_request JSON error:", err);
    }
  }

  // Otherwise, handle as standard user submission
  return deletionRequestsPost(request);
}
