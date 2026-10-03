import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

interface EnquiryRequestBody {
  company?: string;
  contactPerson?: string;
  businessEmail?: string;
  phone?: string;
  country?: string;
  requiredLocation?: string;
  category?: string;
  workersRequired?: string;
  projectRequirement?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeInput(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.trim();
}

function getMailTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === "production",
      },
    });
  }

  return null;
}

export async function POST(request: Request) {
  try {
    let body: EnquiryRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const company = sanitizeInput(body.company);
    const contactPerson = sanitizeInput(body.contactPerson);
    const businessEmail = sanitizeInput(body.businessEmail);
    const phone = sanitizeInput(body.phone);
    const country = sanitizeInput(body.country);
    const requiredLocation = sanitizeInput(body.requiredLocation);
    const category = sanitizeInput(body.category);
    const workersRequired = sanitizeInput(body.workersRequired);
    const projectRequirement = sanitizeInput(body.projectRequirement);

    const validationErrors: Record<string, string> = {};

    if (!company || company.length < 2) {
      validationErrors.company = "Company name is required (min 2 characters).";
    }
    if (!contactPerson || contactPerson.length < 2) {
      validationErrors.contactPerson = "Contact person name is required (min 2 characters).";
    }
    if (!businessEmail || !EMAIL_REGEX.test(businessEmail)) {
      validationErrors.businessEmail = "A valid business email address is required.";
    }
    if (!phone || phone.length < 7) {
      validationErrors.phone = "A valid phone / WhatsApp contact number is required.";
    }
    if (!country || country.length < 2) {
      validationErrors.country = "Deployment country is required.";
    }
    if (!requiredLocation || requiredLocation.length < 2) {
      validationErrors.requiredLocation = "Required project location or site is required.";
    }
    if (!category) {
      validationErrors.category = "Manpower category is required.";
    }
    if (!workersRequired) {
      validationErrors.workersRequired = "Workers required / headcount is required.";
    }
    if (!projectRequirement || projectRequirement.length < 5) {
      validationErrors.projectRequirement = "Project / requirement details are required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please verify all required fields.",
          errors: validationErrors,
        },
        { status: 422 }
      );
    }

    const now = new Date();
    const formattedDate =
      now.toLocaleString("en-GB", {
        timeZone: "Asia/Dubai",
        dateStyle: "full",
        timeStyle: "medium",
      }) + " (GST)";

    const textContent = [
      "NEW MANPOWER ENQUIRY",
      "────────────────────",
      `Company: ${company}`,
      `Contact Person: ${contactPerson}`,
      `Business Email: ${businessEmail}`,
      `Phone / WhatsApp: ${phone}`,
      `Country: ${country}`,
      `Required Location: ${requiredLocation}`,
      `Manpower Category: ${category}`,
      `Workers Required: ${workersRequired}`,
      `Project / Requirement:\n${projectRequirement}`,
      `Submitted At: ${formattedDate}`,
    ].join("\n");

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Manpower Enquiry</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; line-height: 1.5; }
    .container { max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); }
    .header { background: #070a10; color: #ffffff; padding: 24px; border-bottom: 2px solid #2563eb; }
    .header h1 { margin: 0 0 4px 0; font-size: 18px; letter-spacing: 0.12em; text-transform: uppercase; color: #60a5fa; font-weight: 700; }
    .header p { margin: 0; font-size: 13px; color: #94a3b8; }
    .content { padding: 28px 24px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th { text-align: left; padding: 10px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; background: #f8fafc; border-bottom: 1px solid #e2e8f0; width: 35%; }
    td { padding: 10px 12px; font-size: 13px; color: #1e293b; border-bottom: 1px solid #f1f5f9; font-weight: 500; }
    .requirement-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-top: 12px; font-size: 13px; color: #334155; white-space: pre-wrap; font-family: inherit; }
    .footer { background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Manpower Enquiry</h1>
      <p>${company} &mdash; ${country}</p>
    </div>
    <div class="content">
      <table>
        <tr>
          <th>Company</th>
          <td><strong>${company}</strong></td>
        </tr>
        <tr>
          <th>Contact Person</th>
          <td>${contactPerson}</td>
        </tr>
        <tr>
          <th>Business Email</th>
          <td><a href="mailto:${businessEmail}" style="color: #2563eb; text-decoration: none;">${businessEmail}</a></td>
        </tr>
        <tr>
          <th>Phone / WhatsApp</th>
          <td><a href="tel:${phone.replace(/\s+/g, "")}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
        </tr>
        <tr>
          <th>Country</th>
          <td>${country}</td>
        </tr>
        <tr>
          <th>Required Location</th>
          <td>${requiredLocation}</td>
        </tr>
        <tr>
          <th>Manpower Category</th>
          <td>${category}</td>
        </tr>
        <tr>
          <th>Workers Required</th>
          <td><strong>${workersRequired}</strong></td>
        </tr>
        <tr>
          <th>Submitted At</th>
          <td>${formattedDate}</td>
        </tr>
      </table>

      <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #475569; letter-spacing: 0.08em; margin-top: 16px;">
        Project / Requirement Details:
      </div>
      <div class="requirement-box">${projectRequirement}</div>
    </div>
    <div class="footer">
      Transmitted via Shahjahane Executive Requirement Console &bull; ${site.name} &bull; ${site.url}
    </div>
  </div>
</body>
</html>
    `;

    const subject = `New Manpower Enquiry — ${company} — ${country}`;
    const recipientEmail = process.env.ENQUIRY_RECIPIENT_EMAIL || site.email;
    const fromAddress =
      process.env.SMTP_FROM || `"Shahjahane Enquiries" <${recipientEmail}>`;

    const transporter = getMailTransporter();

    if (transporter) {
      await transporter.sendMail({
        from: fromAddress,
        to: recipientEmail,
        replyTo: `${contactPerson} <${businessEmail}>`,
        subject,
        text: textContent,
        html: htmlContent,
      });

      console.log(
        `[ENQUIRY_DISPATCH_SUCCESS] Manpower enquiry from ${company} (${contactPerson}) sent to ${recipientEmail}`
      );
    } else {
      console.log("──────────────────────────────────────────────────");
      console.log("[ENQUIRY_DISPATCH] SMTP not configured. Outputting formatted enquiry:");
      console.log(`To: ${recipientEmail}`);
      console.log(`Subject: ${subject}`);
      console.log(`Reply-To: ${contactPerson} <${businessEmail}>`);
      console.log(textContent);
      console.log("──────────────────────────────────────────────────");
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully.",
      reference: {
        company,
        contactPerson,
        submittedAt: formattedDate,
      },
    });
  } catch (error) {
    console.error("[ENQUIRY_DISPATCH_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while transmitting your brief. Please try again or contact us directly.",
      },
      { status: 500 }
    );
  }
}
