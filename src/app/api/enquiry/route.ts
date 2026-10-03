import { NextResponse } from "next/server";
import { Resend } from "resend";
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
  selectedRoles?: string[] | string;
  projectNotes?: string;
  projectRequirement?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitizeInput(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.trim();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
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

    let selectedRolesList: string[] = [];
    if (Array.isArray(body.selectedRoles)) {
      selectedRolesList = body.selectedRoles
        .map((r) => sanitizeInput(r))
        .filter(Boolean);
    } else if (typeof body.selectedRoles === "string" && body.selectedRoles.trim()) {
      selectedRolesList = body.selectedRoles
        .split(",")
        .map((r) => sanitizeInput(r))
        .filter(Boolean);
    }

    const rawProjectNotes = sanitizeInput(body.projectNotes);
    const rawProjectRequirement = sanitizeInput(body.projectRequirement);
    const projectDetails = rawProjectNotes || rawProjectRequirement;

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
      validationErrors.phone = "A valid phone / WhatsApp contact number is required (min 7 digits).";
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
    if (!projectDetails && selectedRolesList.length === 0) {
      validationErrors.projectRequirement = "Please specify project details or select required roles.";
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

    const rolesFormatted =
      selectedRolesList.length > 0
        ? selectedRolesList.join(", ")
        : "General deployment crew";

    const now = new Date();
    const formattedDateGst =
      now.toLocaleString("en-GB", {
        timeZone: "Asia/Dubai",
        dateStyle: "full",
        timeStyle: "medium",
      }) + " (GST / Dubai)";

    const textContent = [
      "============================================================",
      "NEW MANPOWER ENQUIRY",
      "============================================================",
      `Company Name:                  ${company}`,
      `Contact Person:                ${contactPerson}`,
      `Business Email:                ${businessEmail}`,
      `Phone / WhatsApp:              ${phone}`,
      `Country:                       ${country}`,
      `Required Location:             ${requiredLocation}`,
      `Manpower Category:             ${category}`,
      `Required Headcount:            ${workersRequired}`,
      `Selected Trade Roles:          ${rolesFormatted}`,
      `Submission Date & Time:        ${formattedDateGst}`,
      "------------------------------------------------------------",
      "PROJECT / REQUIREMENT DETAILS:",
      projectDetails || "No additional project notes specified.",
      "============================================================",
      `Transmitted via Shahjahane Executive Procurement Console`,
      `Website: ${site.url}`,
      `Direct Desk Email: ${site.email}`,
    ].join("\n");

    const rolesHtml =
      selectedRolesList.length > 0
        ? selectedRolesList
            .map(
              (r) =>
                `<span style="display:inline-block; background-color:#f1f5f9; border:1px solid #cbd5e1; color:#334155; padding:3px 9px; border-radius:6px; font-size:12px; margin:2px 4px 2px 0; font-weight:500;">${escapeHtml(
                  r
                )}</span>`
            )
            .join(" ")
        : `<span style="color:#64748b; font-style:italic;">General deployment crew</span>`;

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Manpower Enquiry &mdash; ${escapeHtml(company)}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
      margin: 0;
      padding: 32px 16px;
      line-height: 1.5;
    }
    .wrapper {
      max-width: 640px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
    .header {
      background: #070a10;
      color: #ffffff;
      padding: 28px 24px;
      border-bottom: 3px solid #2563eb;
    }
    .brand-eyebrow {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #60a5fa;
      margin-bottom: 4px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 10px 0;
    }
    .header-badge {
      display: inline-block;
      background-color: rgba(37, 99, 235, 0.2);
      border: 1px solid rgba(96, 165, 250, 0.35);
      color: #93c5fd;
      padding: 3px 10px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .content {
      padding: 28px 24px;
    }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #64748b;
      margin: 0 0 14px 0;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
    }
    table.data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    table.data-table tr {
      border-bottom: 1px solid #f1f5f9;
    }
    table.data-table th {
      text-align: left;
      padding: 10px 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #64748b;
      width: 36%;
      background-color: #f8fafc;
      vertical-align: top;
    }
    table.data-table td {
      padding: 10px 12px;
      font-size: 13px;
      color: #0f172a;
      vertical-align: top;
    }
    .company-highlight {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
    }
    .badge-category {
      display: inline-block;
      background-color: #eff6ff;
      color: #1d4ed8;
      border: 1px solid #bfdbfe;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 12px;
    }
    .badge-headcount {
      display: inline-block;
      background-color: #f0fdf4;
      color: #15803d;
      border: 1px solid #bbf7d0;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 700;
      font-size: 12px;
    }
    .link-action {
      color: #2563eb;
      text-decoration: none;
      font-weight: 600;
    }
    .requirement-box {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 3px solid #2563eb;
      border-radius: 6px;
      padding: 14px 16px;
      margin-bottom: 24px;
      font-size: 13px;
      color: #334155;
      line-height: 1.6;
      white-space: pre-wrap;
    }
    .cta-bar {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
    }
    .cta-btn {
      display: inline-block;
      background-color: #2563eb;
      color: #ffffff !important;
      text-decoration: none;
      font-size: 12px;
      font-weight: 600;
      padding: 9px 18px;
      border-radius: 6px;
      margin: 4px 6px;
    }
    .footer {
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
      padding: 20px 24px;
      text-align: center;
      font-size: 11px;
      color: #64748b;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="brand-eyebrow">Shahjahane Technical Services</div>
      <div class="brand-title">New Manpower Procurement Enquiry</div>
      <div class="header-badge">Direct Procurement Console &bull; ${escapeHtml(country)}</div>
    </div>
    <div class="content">
      <div class="section-title">Enquiry Details</div>
      <table class="data-table">
        <tr>
          <th>Company Name</th>
          <td><span class="company-highlight">${escapeHtml(company)}</span></td>
        </tr>
        <tr>
          <th>Contact Person</th>
          <td><strong>${escapeHtml(contactPerson)}</strong></td>
        </tr>
        <tr>
          <th>Business Email</th>
          <td><a href="mailto:${escapeHtml(businessEmail)}" class="link-action">${escapeHtml(businessEmail)}</a></td>
        </tr>
        <tr>
          <th>Phone / WhatsApp</th>
          <td>
            <a href="tel:${escapeHtml(phone.replace(/\s+/g, ""))}" class="link-action">${escapeHtml(phone)}</a>
            &nbsp;&bull;&nbsp;
            <a href="https://wa.me/${escapeHtml(phone.replace(/[^0-9]/g, ""))}" class="link-action" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </td>
        </tr>
        <tr>
          <th>Country</th>
          <td>${escapeHtml(country)}</td>
        </tr>
        <tr>
          <th>Required Location</th>
          <td>${escapeHtml(requiredLocation)}</td>
        </tr>
        <tr>
          <th>Manpower Category</th>
          <td><span class="badge-category">${escapeHtml(category)}</span></td>
        </tr>
        <tr>
          <th>Required Headcount</th>
          <td><span class="badge-headcount">${escapeHtml(workersRequired)} personnel</span></td>
        </tr>
        <tr>
          <th>Selected Trade Roles</th>
          <td>${rolesHtml}</td>
        </tr>
        <tr>
          <th>Submission Date &amp; Time</th>
          <td><span style="font-family: monospace; font-size: 12px; color: #475569;">${escapeHtml(formattedDateGst)}</span></td>
        </tr>
      </table>

      <div class="section-title">Project / Requirement Details</div>
      <div class="requirement-box">${escapeHtml(projectDetails || "No additional project specifications provided.")}</div>

      <div class="cta-bar">
        <a href="mailto:${escapeHtml(businessEmail)}?subject=Re:%20Manpower%20Enquiry%20%E2%80%94%20${encodeURIComponent(company)}" class="cta-btn">
          Reply to ${escapeHtml(contactPerson)}
        </a>
      </div>
    </div>
    <div class="footer">
      <strong>Shahjahane Technical Services LLC</strong><br>
      Dubai Office: ${site.addressUaeLines.join(" ")}<br>
      UAE Trade License: ${site.tradeLicense} &bull; <a href="${site.url}" style="color: #64748b;">${site.website}</a><br>
      Transmitted securely via Next.js Server Integration to ${escapeHtml(process.env.ENQUIRY_EMAIL || process.env.ENQUIRY_RECIPIENT_EMAIL || "contact@shahjahane.com")}.
    </div>
  </div>
</body>
</html>`;

    const subject = `New Manpower Enquiry — ${company}`;
    const recipientEmail =
      process.env.ENQUIRY_EMAIL ||
      process.env.ENQUIRY_RECIPIENT_EMAIL ||
      "contact@shahjahane.com";
    const fromAddress =
      process.env.FROM_EMAIL ||
      process.env.RESEND_FROM_EMAIL ||
      "Shahjahane Website <website@shahjahane.com>";
    const replyToEmail = businessEmail;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      let sendResult = await resend.emails.send({
        from: fromAddress,
        to: [recipientEmail],
        replyTo: replyToEmail,
        subject,
        text: textContent,
        html: htmlContent,
      });

      if (sendResult.error && process.env.NODE_ENV !== "production") {
        const firstErrorMsg = sendResult.error.message || "";
        console.warn(`[RESEND_INITIAL_NOTICE] ${firstErrorMsg}`);

        let fallbackFrom = fromAddress;
        if (firstErrorMsg.includes("domain") || firstErrorMsg.includes("not verified")) {
          fallbackFrom = "Shahjahane Website <onboarding@resend.dev>";
        }

        let retryResult = await resend.emails.send({
          from: fallbackFrom,
          to: [recipientEmail],
          replyTo: replyToEmail,
          subject,
          text: textContent,
          html: htmlContent,
        });

        if (retryResult.error) {
          const secondErrorMsg = retryResult.error.message || "";
          const trialMatch = secondErrorMsg.match(/\(([^)]+@[^)]+)\)/);
          if (trialMatch && trialMatch[1]) {
            const devEmail = trialMatch[1];
            console.warn(
              `[RESEND_DEV_NOTICE] Delivering dev test to verified account '${devEmail}' (Target: '${recipientEmail}'). Verify domain at https://resend.com/domains to deliver to '${recipientEmail}'.`
            );
            retryResult = await resend.emails.send({
              from: "Shahjahane Website <onboarding@resend.dev>",
              to: [devEmail],
              replyTo: replyToEmail,
              subject: `${subject} [Dev Test -> ${recipientEmail}]`,
              text: textContent,
              html: htmlContent,
            });
          }
        }

        if (!retryResult.error) {
          sendResult = retryResult;
        }
      }

      if (sendResult.error) {
        console.error("[RESEND_EMAIL_ERROR]", sendResult.error);
        return NextResponse.json(
          {
            success: false,
            error: sendResult.error.message || "Failed to dispatch enquiry email via Resend.",
          },
          { status: 500 }
        );
      }

      console.log(`[RESEND_EMAIL_SUCCESS] Enquiry from ${company} sent successfully. ID: ${sendResult.data?.id}`);
    } else {
      console.log("──────────────────────────────────────────────────");
      console.log("[RESEND_NOTICE] RESEND_API_KEY not configured in environment.");
      console.log(`To: ${recipientEmail}`);
      console.log(`From: ${fromAddress}`);
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
        submittedAt: formattedDateGst,
      },
    });
  } catch (error) {
    console.error("[ENQUIRY_API_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while transmitting your requirement. Please try again or write directly to " + (process.env.ENQUIRY_EMAIL || process.env.ENQUIRY_RECIPIENT_EMAIL || site.email),
      },
      { status: 500 }
    );
  }
}
