import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// In-memory rate limiting map: IP -> timestamp array
// Limits to a maximum of 5 submissions per 10 minutes per IP
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up expired rate-limit records every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (validTimestamps.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, validTimestamps);
    }
  }
}, 15 * 60 * 1000);

/**
 * Escapes HTML characters to prevent XSS / HTML injection in email templates
 */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Validates RFC-compliant email address structure
 */
function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  // Standard RFC 5322 compatible regex
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // 1. IP & Rate Limiting Check
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const recentRequests = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

    if (recentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          error: "Too many messages sent. Please wait a few minutes before trying again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse JSON Payload
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const { name, email, subject, message, website } = body;

    // 3. Bot Protection: Honeypot check
    // If the hidden 'website' field is populated, a bot filled it out.
    // Silently return success to mislead the bot without sending any email.
    if (website && typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json(
        { success: true, message: "Message received successfully." },
        { status: 200 }
      );
    }

    // 4. Strict Server-side Input Validation
    if (typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your name (at least 2 characters)." },
        { status: 400 }
      );
    }
    if (name.trim().length > 100) {
      return NextResponse.json(
        { error: "Name is too long (maximum 100 characters)." },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || !isValidEmail(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const cleanSubject =
      typeof subject === "string" && subject.trim().length > 0
        ? subject.trim().slice(0, 200)
        : `New Portfolio Message from ${name.trim()}`;

    if (typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please enter a message (at least 10 characters)." },
        { status: 400 }
      );
    }
    if (message.trim().length > 5000) {
      return NextResponse.json(
        { error: "Message is too long (maximum 5000 characters)." },
        { status: 400 }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    // 5. Record rate-limit timestamp for verified human request
    recentRequests.push(now);
    rateLimitMap.set(ip, recentRequests);

    // 6. Check Environment Variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;
    const contactFromEmail =
      process.env.CONTACT_FROM_EMAIL ||
      "Portfolio Contact <onboarding@resend.dev>";

    const isPlaceholderKey =
      !resendApiKey ||
      resendApiKey.startsWith("re_your_api_key") ||
      resendApiKey === "re_your_api_key";

    const isPlaceholderEmail =
      !contactEmail ||
      contactEmail === "yourname@gmail.com" ||
      !isValidEmail(contactEmail);

    if (isPlaceholderKey || isPlaceholderEmail) {
      // Return a safe error without revealing internal configurations
      return NextResponse.json(
        {
          error:
            "The contact form service is currently undergoing configuration. Please email me directly.",
        },
        { status: 503 }
      );
    }

    // 7. Format Safe HTML & Plain-Text Content
    const escapedName = escapeHtml(cleanName);
    const escapedEmail = escapeHtml(cleanEmail);
    const escapedSubject = escapeHtml(cleanSubject);
    const escapedMessage = escapeHtml(cleanMessage).replace(/\n/g, "<br/>");
    const submittedAt = new Date().toUTCString();

    const plainTextContent = `
New message from your developer portfolio contact form:
------------------------------------------------------
Sender:  ${cleanName}
Email:   ${cleanEmail}
Subject: ${cleanSubject}
Date:    ${submittedAt}

Message:
${cleanMessage}
------------------------------------------------------
Reply directly to this email to respond to ${cleanName} (${cleanEmail}).
    `.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Portfolio Contact Message</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0f172a; color: #ffffff; padding: 24px; border-bottom: 3px solid #14b8a6; }
    .header h2 { margin: 0; font-size: 18px; font-weight: 600; letter-spacing: -0.01em; }
    .header p { margin: 4px 0 0; font-size: 13px; color: #94a3b8; font-family: monospace; }
    .body-content { padding: 28px 24px; }
    .meta-box { background: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 24px; border: 1px solid #e2e8f0; }
    .meta-row { display: flex; font-size: 13px; margin-bottom: 8px; }
    .meta-label { font-weight: 600; color: #64748b; width: 80px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.05em; }
    .meta-value { color: #0f172a; font-weight: 500; }
    .meta-value a { color: #0d9488; text-decoration: none; }
    .message-title { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
    .message-box { background: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #14b8a6; padding: 18px; border-radius: 6px; font-size: 14px; color: #334155; line-height: 1.7; white-space: pre-wrap; word-break: break-word; }
    .footer { padding: 18px 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Portfolio Contact Message</h2>
      <p>Source: eyob-portfolio &bull; ${submittedAt}</p>
    </div>
    <div class="body-content">
      <div class="meta-box">
        <div class="meta-row">
          <span class="meta-label">From:</span>
          <span class="meta-value">${escapedName}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Email:</span>
          <span class="meta-value"><a href="mailto:${escapedEmail}">${escapedEmail}</a></span>
        </div>
        <div class="meta-row" style="margin-bottom: 0;">
          <span class="meta-label">Subject:</span>
          <span class="meta-value">${escapedSubject}</span>
        </div>
      </div>

      <div class="message-title">Message Body</div>
      <div class="message-box">${escapedMessage}</div>
    </div>
    <div class="footer">
      Hit <strong>Reply</strong> in your email client to respond directly to <strong>${escapedName}</strong> (${escapedEmail}).
    </div>
  </div>
</body>
</html>
    `.trim();

    // 8. Send Email via Resend
    const resend = new Resend(resendApiKey);

    const { error: sendError } = await resend.emails.send({
      from: contactFromEmail,
      to: [contactEmail],
      replyTo: cleanEmail,
      subject: `[Portfolio Contact] ${cleanSubject}`,
      text: plainTextContent,
      html: htmlContent,
    });

    if (sendError) {
      // Log sanitized warning without leaking credentials or message text
      console.error("[Contact API] Resend email delivery failed:", sendError.message);

      return NextResponse.json(
        {
          error:
            "Unable to deliver your message at this moment. Please email me directly or try again later.",
        },
        { status: 500 }
      );
    }

    // 9. Successful Submission Response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been sent successfully. I will get back to you shortly.",
      },
      { status: 200 }
    );
  } catch (error) {
    // Unhandled error catch
    console.error("[Contact API] Internal route error:", error instanceof Error ? error.message : "Unknown");
    return NextResponse.json(
      {
        error: "An unexpected error occurred while processing your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
