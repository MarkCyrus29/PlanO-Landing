import { Resend } from "resend";
import { type NextRequest } from "next/server";

/* ── Environment validation ── */
const resendApiKey = process.env.RESEND_API_KEY;
const senderEmail = process.env.RESEND_SENDER || "PlanO <waitlist@planoevents.site>";
const deletionReceiverEmail = "datadeletion@planoevents.site";
const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

/* ── Simple in-memory rate limiter ── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 5; // max 5 requests per IP per hour

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
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 254;
}

/* ── Turnstile verification ── */
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  if (!turnstileSecret) {
    return true;
  }

  try {
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
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false;
  }
}

/* ── POST handler ── */
export async function POST(request: NextRequest) {
  try {
    /* 1. Environment guard */
    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY environment variable");
      return Response.json(
        { error: "Server configuration error. Please contact privacy@planoevents.site directly." },
        { status: 500 }
      );
    }

    /* 2. Parse body */
    const body = await request.json().catch(() => null);
    if (!body || typeof body.email !== "string") {
      return Response.json(
        { error: "Account email address is required" },
        { status: 400 }
      );
    }

    const email = body.email.trim().toLowerCase();
    const notes = typeof body.notes === "string" ? body.notes.trim() : "";
    const turnstileToken = body.turnstileToken as string | undefined;

    /* 3. Validate email */
    if (!isValidEmail(email)) {
      return Response.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    /* 4. Rate limit check */
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many requests. Please try again in an hour or email privacy@planoevents.site." },
        { status: 429 }
      );
    }

    /* 5. Turnstile verification */
    if (turnstileSecret && turnstileToken) {
      const isHuman = await verifyTurnstile(turnstileToken, ip);
      if (!isHuman) {
        return Response.json(
          { error: "Bot verification failed. Please try again." },
          { status: 403 }
        );
      }
    }

    const resend = new Resend(resendApiKey);
    const submittedTime = new Date().toLocaleString("en-PH", {
      timeZone: "Asia/Manila",
      dateStyle: "full",
      timeStyle: "medium",
    });

    /* 6. Send alert to datadeletion@planoevents.site */
    const { error: sendError } = await resend.emails.send({
      from: senderEmail,
      to: deletionReceiverEmail,
      replyTo: email,
      subject: `🚨 Data Deletion Request: ${email}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #f7f5f0; color: #1a1915;">
          <div style="background: #ffffff; border: 1px solid #e5e3dc; border-radius: 12px; padding: 32px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
            <div style="border-bottom: 2px solid #ef9f27; padding-bottom: 16px; margin-bottom: 24px;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #9b9a94; font-weight: 600;">PlanO Data Privacy Compliance</span>
              <h1 style="font-size: 20px; font-weight: 600; color: #1a1915; margin: 6px 0 0 0;">New Data Deletion Request</h1>
            </div>

            <p style="font-size: 14px; line-height: 1.6; color: #6b6a65; margin: 0 0 20px 0;">
              A user has submitted a formal data deletion request under the Philippine Data Privacy Act of 2012 (RA 10173) and Meta Platform Terms.
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
              <tr style="border-bottom: 1px solid #f0eee8;">
                <td style="padding: 10px 0; color: #9b9a94; width: 140px; font-weight: 500;">Account Email:</td>
                <td style="padding: 10px 0; color: #1a1915; font-weight: 600;"><a href="mailto:${email}" style="color: #1d9e75; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #f0eee8;">
                <td style="padding: 10px 0; color: #9b9a94; font-weight: 500;">Additional Notes:</td>
                <td style="padding: 10px 0; color: #1a1915; white-space: pre-wrap;">${notes ? notes.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "<em>No additional details provided</em>"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0eee8;">
                <td style="padding: 10px 0; color: #9b9a94; font-weight: 500;">Submitted At:</td>
                <td style="padding: 10px 0; color: #1a1915;">${submittedTime} (PHT)</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #9b9a94; font-weight: 500;">Requester IP:</td>
                <td style="padding: 10px 0; color: #1a1915; font-family: monospace;">${ip}</td>
              </tr>
            </table>

            <div style="background: #faeeda; border-left: 4px solid #ef9f27; padding: 14px 16px; border-radius: 4px; font-size: 13px; color: #1a1915; line-height: 1.5;">
              <strong>Security Protocol Reminder:</strong> Data must not be purged until the user confirms account ownership via email reply. Once confirmed, permanent erasure must be completed within 30 days pursuant to RA 10173 and Meta platform requirements. (Retain tax/invoicing records as mandated by BIR regulations).
            </div>
          </div>
        </div>
      `,
    });

    if (sendError) {
      console.error("Resend error sending to datadeletion@planoevents.site:", sendError);
      return Response.json(
        { error: "Failed to dispatch request. Please email privacy@planoevents.site directly." },
        { status: 500 }
      );
    }

    /* 7. Send confirmation/verification email to the requester */
    try {
      await resend.emails.send({
        from: senderEmail,
        to: email,
        replyTo: deletionReceiverEmail,
        subject: "Action Required: Confirm your PlanO Data Deletion Request",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 20px; background: #f7f5f0; color: #1a1915;">
            <div style="text-align: center; margin-bottom: 24px;">
              <span style="display: inline-block; background: #1d9e75; color: #ffffff; font-size: 20px; font-weight: 700; padding: 10px 18px; border-radius: 10px;">
                PlanO
              </span>
            </div>

            <div style="background: #ffffff; border: 1px solid #e5e3dc; border-radius: 14px; padding: 32px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
              <h1 style="font-size: 20px; font-weight: 700; color: #1a1915; margin: 0 0 12px 0;">
                Data Deletion Request Confirmation
              </h1>

              <p style="font-size: 14px; line-height: 1.6; color: #6b6a65; margin: 0 0 18px 0;">
                We received a request to delete the PlanO account and associated data for <strong>${email}</strong>, including any personal information and data connected to Meta accounts (Facebook / Instagram).
              </p>

              <div style="background: #e1f5ee; border-left: 4px solid #1d9e75; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
                <p style="font-size: 13px; font-weight: 600; color: #0f6e56; margin: 0 0 6px 0;">
                  🔒 Security Notice: Confirmation Required
                </p>
                <p style="font-size: 13px; line-height: 1.5; color: #1a1915; margin: 0;">
                  To ensure you are the actual owner of this account and to protect your account against unauthorized deletion, <strong>please simply reply to this email stating &ldquo;I confirm data deletion for my PlanO account&rdquo;</strong>.
                </p>
              </div>

              <p style="font-size: 13px; line-height: 1.6; color: #6b6a65; margin: 0 0 16px 0;">
                • We will not wipe your data until you reply to confirm ownership.<br>
                • Once confirmed, your account and customer data will be permanently deleted within 30 days.<br>
                • <em>Note:</em> Any previously issued official BIR tax invoices must be retained for the statutory period required by Philippine tax law (§10 of our Privacy Policy).
              </p>

              <p style="font-size: 12px; color: #9b9a94; margin: 24px 0 0 0; border-top: 1px solid #f0eee8; pt: 16px;">
                If you did not request this deletion, you may safely ignore this email — no action will be taken without your reply. For questions, contact <a href="mailto:dpo@planoevents.site" style="color: #1d9e75;">dpo@planoevents.site</a>.
              </p>
            </div>
            
            <p style="text-align: center; font-size: 11px; color: #9b9a94; margin-top: 20px;">
              © ${new Date().getFullYear()} PlanO Events · Lipa City, Philippines
            </p>
          </div>
        `,
      });
    } catch (confError) {
      console.warn("Could not dispatch confirmation receipt to user:", confError);
    }

    return Response.json({
      success: true,
      message: "Data deletion request submitted. Please check your email to confirm ownership.",
    });
  } catch (error) {
    console.error("Data deletion API exception:", error);
    return Response.json(
      { error: "An unexpected error occurred. Please try again or email privacy@planoevents.site." },
      { status: 500 }
    );
  }
}
