import { Resend } from "resend";
import { type NextRequest } from "next/server";
import { checkRateLimit, createDeletionRequest } from "@/lib/deletion-store";

const resendApiKey = process.env.RESEND_API_KEY;
const senderEmail = process.env.RESEND_SENDER || "PlanO <waitlist@planoevents.site>";
const deletionReceiverEmail = "datadeletion@planoevents.site";
const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 254;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!turnstileSecret) return true;
  try {
    const formData = new URLSearchParams();
    formData.append("secret", turnstileSecret);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("Turnstile error:", err);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (await checkRateLimit(ip)) {
      return Response.json(
        { error: "Too many requests. Please try again later or email privacy@planoevents.site." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body.email !== "string") {
      return Response.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();
    const role = typeof body.role === "string" ? body.role : "Joined the waitlist only";
    const businessName = typeof body.businessName === "string" ? body.businessName.trim() : undefined;
    const message = typeof body.message === "string" ? body.message.trim() : (typeof body.notes === "string" ? body.notes.trim() : undefined);
    const turnstileToken = body.turnstileToken as string | undefined;

    if (!isValidEmail(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (turnstileSecret && turnstileToken) {
      const isHuman = await verifyTurnstile(turnstileToken, ip);
      if (!isHuman) {
        return Response.json(
          { error: "Bot verification failed. Please try again." },
          { status: 403 }
        );
      }
    }

    // Create deletion request record with 7-day token & unique confirmation code
    const { token, code, record } = await createDeletionRequest({
      email,
      role,
      businessName,
      message,
    });

    const origin = request.nextUrl.origin || "https://planoevents.site";
    const confirmUrl = `${origin}/data-deletion/confirm?token=${token}`;

    // Send emails if Resend configured
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      // 1. Notify compliance team
      await resend.emails.send({
        from: senderEmail,
        to: deletionReceiverEmail,
        replyTo: email,
        subject: `🚨 Data Deletion Request (${code}): ${email}`,
        html: `
          <div style="font-family: sans-serif; padding: 24px; background: #f7f5f0; color: #1a1915;">
            <div style="background: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #e5e3dc;">
              <h2 style="margin: 0 0 16px 0; color: #1d9e75;">Data Deletion Request: ${code}</h2>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>I am:</strong> ${role}</p>
              ${businessName ? `<p><strong>Business Name:</strong> ${businessName}</p>` : ""}
              ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
              <p><strong>Confirmation Token:</strong> ${token}</p>
              <p><strong>Submitted:</strong> ${new Date(record.createdAt).toLocaleString("en-PH", { timeZone: "Asia/Manila" })} PHT</p>
              <p><strong>Client IP:</strong> ${ip}</p>
            </div>
          </div>
        `,
      }).catch((e) => console.error("Admin notification error:", e));

      // 2. Send confirmation link to user
      await resend.emails.send({
        from: senderEmail,
        to: email,
        subject: "Confirm your PlanO data deletion request",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 20px; background: #f7f5f0; color: #1a1915;">
            <div style="text-align: center; margin-bottom: 24px;">
              <span style="display: inline-block; background: #1d9e75; color: #ffffff; font-size: 20px; font-weight: 700; padding: 10px 18px; border-radius: 10px;">
                PlanO
              </span>
            </div>
            <div style="background: #ffffff; border: 1px solid #e5e3dc; border-radius: 14px; padding: 32px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
              <h1 style="font-size: 20px; font-weight: 700; color: #1a1915; margin: 0 0 12px 0;">
                Confirm your data deletion request
              </h1>
              <p style="font-size: 14px; line-height: 1.6; color: #6b6a65; margin: 0 0 18px 0;">
                We received a request to delete data for <strong>${email}</strong>.
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #6b6a65; margin: 0 0 24px 0;">
                To complete this request, please click the button below. This link is valid for 7 days. Nothing will be deleted until you press the confirmation button.
              </p>
              <div style="text-align: center; margin: 28px 0;">
                <a href="${confirmUrl}" style="background: #1d9e75; color: #ffffff; padding: 12px 24px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; display: inline-block;">
                  Review & Confirm Deletion
                </a>
              </div>
              <p style="font-size: 12px; color: #9b9a94; line-height: 1.5; margin: 24px 0 0 0; border-top: 1px solid #f0eee8; padding-top: 16px;">
                If you did not request this deletion, you can safely ignore this email. No data will be deleted without your confirmation.
              </p>
            </div>
            <p style="text-align: center; font-size: 11px; color: #9b9a94; margin-top: 20px;">
              © ${new Date().getFullYear()} PlanO Events · Lipa City, Batangas, Philippines
            </p>
          </div>
        `,
      }).catch((e) => console.error("User confirmation email error:", e));
    }

    // Step 2 requirement: Always show the same message, whether or not the email exists
    return Response.json({
      success: true,
      message: "If we have a record for this email, we've sent a confirmation link. It works for 7 days.",
      // In development mode, provide confirmation link for direct testing
      ...(process.env.NODE_ENV !== "production" ? { devConfirmUrl: confirmUrl, code } : {}),
    });
  } catch (err) {
    console.error("Deletion request error:", err);
    return Response.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
