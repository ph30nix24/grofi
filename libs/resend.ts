import { Resend } from "resend";

// Resend client initialization & dynamic getters
export function getResendClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

// Default sender & recipient configurations
// Note: If domain is not verified on Resend, onboarding@resend.dev must be used as sender.
// Once grofi.in is verified on resend.com/domains, set RESEND_FROM_EMAIL="Grofi <notifications@grofi.in>"
export function getDefaultFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL || "Grofi <onboarding@resend.dev>";
}

export function getNotificationEmail(): string {
  return process.env.NOTIFICATION_EMAIL || "support@grofi.in";
}

export interface SendFormNotificationOptions {
  formTitle: string;
  formType: string;
  subject?: string;
  replyTo?: string;
  submittedAt?: Date | string;
  fields: Record<string, string | number | boolean | null | undefined>;
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    contentType?: string;
  }>;
}

// Convert camelCase or snake_case key to human-readable label
function formatFieldLabel(key: string): string {
  const customLabels: Record<string, string> = {
    cibilScore: "CIBIL / Credit Score",
    loanAmount: "Requested Loan Amount",
    monthlyIncome: "Monthly In-Hand Income",
    annualTurnover: "Annual Business Turnover",
    vintage: "Business Vintage",
    constitution: "Business Constitution",
    entityType: "Entity Constitution",
    hasWomanApplicant: "Woman Applicant Discount",
    tenureYears: "Loan Tenure",
    service: "Requested Service",
    number: "Mobile Number",
    phone: "Mobile Number",
    fullName: "Full Name",
    name: "Full Name",
    email: "Email Address",
    newsletterEmail: "Newsletter Email",
    businessName: "Business / Enterprise Name",
    noticePeriod: "Notice Period",
    currentlyWorking: "Currently Employed",
    currentSalary: "Current Salary / CTC",
    resumeLink: "Resume URL",
    portfolio: "Portfolio URL",
    linkedin: "LinkedIn Profile",
    coverNote: "Cover Note",
    pitch: "Candidate Pitch",
    page: "Source Page URL",
  };

  if (customLabels[key]) {
    return customLabels[key];
  }

  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

// Format submission timestamp in Indian Standard Time (IST)
function formatTimestamp(dateInput?: Date | string): string {
  const d = dateInput ? new Date(dateInput) : new Date();
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(d);
  } catch {
    return d.toLocaleString("en-IN");
  }
}

/**
 * Sends a clean, branded email notification to NOTIFICATION_EMAIL
 */
export async function sendFormNotification(options: SendFormNotificationOptions) {
  const {
    formTitle,
    formType,
    subject,
    replyTo,
    submittedAt,
    fields,
    attachments,
  } = options;

  const client = getResendClient();
  if (!client) {
    console.warn(
      "[Resend] RESEND_API_KEY is not defined in environment variables. Email notification skipped."
    );
    return {
      success: false,
      error: "RESEND_API_KEY is not configured",
    };
  }

  const fromEmail = getDefaultFromEmail();
  const toEmail = getNotificationEmail();

  const timestampStr = formatTimestamp(submittedAt);

  // Filter out internal fields or null/undefined
  const filteredEntries = Object.entries(fields).filter(
    ([key, value]) =>
      !["formType", "formTitle", "sourceUrl"].includes(key) &&
      value !== undefined &&
      value !== null &&
      value !== ""
  );

  // Extract contact info for quick-action links
  const customerName =
    (fields.fullName as string) ||
    (fields.name as string) ||
    (fields.businessName as string) ||
    "New Lead";

  const customerPhone =
    (fields.phone as string) || (fields.number as string) || null;
  const cleanPhone = customerPhone
    ? customerPhone.toString().replace(/\D/g, "")
    : null;

  const customerEmail =
    (fields.email as string) ||
    (fields.newsletterEmail as string) ||
    (replyTo as string) ||
    null;

  // Build default subject if not provided
  const emailSubject =
    subject ||
    `[Grofi Lead] ${formType} - ${customerName}${
      cleanPhone ? ` (${cleanPhone})` : customerEmail ? ` (${customerEmail})` : ""
    }`;

  // Generate HTML table rows
  const tableRowsHtml = filteredEntries
    .map(([key, val], idx) => {
      const label = formatFieldLabel(key);
      const strVal = String(val);
      const isAltRow = idx % 2 === 1;

      let valueDisplayHtml = strVal;

      // Make URLs clickable
      if (/^https?:\/\//i.test(strVal)) {
        valueDisplayHtml = `<a href="${strVal}" target="_blank" style="color: #02474D; text-decoration: underline; font-weight: 600;">${strVal}</a>`;
      } else if (key.toLowerCase().includes("phone") || key.toLowerCase() === "number") {
        const clean = strVal.replace(/\D/g, "");
        valueDisplayHtml = `<a href="tel:+91${clean}" style="color: #02474D; font-weight: 700; text-decoration: none;">+91 ${clean}</a>`;
      } else if (key.toLowerCase().includes("email")) {
        valueDisplayHtml = `<a href="mailto:${strVal}" style="color: #02474D; font-weight: 700; text-decoration: none;">${strVal}</a>`;
      }

      return `
        <tr style="background-color: ${isAltRow ? "#FBF9F4" : "#FFFFFF"};">
          <td style="padding: 12px 16px; font-weight: 600; color: #4A5568; font-size: 13px; width: 38%; border-bottom: 1px solid #EDF2F7; vertical-align: top;">
            ${label}
          </td>
          <td style="padding: 12px 16px; color: #1A202C; font-size: 14px; font-weight: 500; border-bottom: 1px solid #EDF2F7; word-break: break-word;">
            ${valueDisplayHtml}
          </td>
        </tr>
      `;
    })
    .join("");

  // Action Buttons Bar (Call, WhatsApp, Email)
  const actionButtons: string[] = [];
  if (cleanPhone && cleanPhone.length === 10) {
    actionButtons.push(`
      <a href="tel:+91${cleanPhone}" style="display: inline-block; background-color: #02474D; color: #FFFFFF; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; text-decoration: none; margin-right: 8px; margin-bottom: 8px;">
        📞 Call +91 ${cleanPhone}
      </a>
    `);
    actionButtons.push(`
      <a href="https://wa.me/91${cleanPhone}" target="_blank" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; text-decoration: none; margin-right: 8px; margin-bottom: 8px;">
        💬 WhatsApp Chat
      </a>
    `);
  }
  if (customerEmail && !customerEmail.includes("grofi.in")) {
    actionButtons.push(`
      <a href="mailto:${customerEmail}" style="display: inline-block; background-color: #B69226; color: #FFFFFF; font-weight: 700; font-size: 13px; padding: 10px 18px; border-radius: 8px; text-decoration: none; margin-right: 8px; margin-bottom: 8px;">
        ✉️ Reply via Email
      </a>
    `);
  }

  const quickActionsSection =
    actionButtons.length > 0
      ? `
        <div style="background-color: #EBF4ED; border: 1px solid #D2E4D6; border-radius: 12px; padding: 16px; margin: 20px 0 24px 0;">
          <div style="font-size: 11px; font-weight: 800; color: #02474D; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">
            Quick Contact Actions
          </div>
          <div>
            ${actionButtons.join("")}
          </div>
        </div>
      `
      : "";

  // Complete HTML document
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${formTitle}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F4F6F8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #2D3748; -webkit-font-smoothing: antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F4F6F8; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 620px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #E2E8F0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #02474D 0%, #01282C 100%); padding: 32px 30px 28px 30px; text-align: left;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <!-- Brand Pill -->
                    <div style="display: inline-block; background-color: rgba(182, 146, 38, 0.2); border: 1px solid rgba(182, 146, 38, 0.5); color: #F7E7A9; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px;">
                      ✦ Grofi Lead Alert
                    </div>
                    <h1 style="margin: 0; color: #FFFFFF; font-size: 24px; font-weight: 800; line-height: 1.25;">
                      ${formTitle}
                    </h1>
                    <p style="margin: 6px 0 0 0; color: #CBD5E0; font-size: 13px;">
                      Form: <strong style="color: #FFFFFF;">${formType}</strong> &bull; Received on <strong>${timestampStr}</strong>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 28px 30px;">

              ${quickActionsSection}

              <!-- Submission Details Table -->
              <div style="font-size: 12px; font-weight: 800; color: #718096; text-transform: uppercase; letter-spacing: 0.75px; margin-bottom: 10px;">
                Submitted Information
              </div>

              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #E2E8F0; border-radius: 10px; overflow: hidden; border-collapse: separate; border-spacing: 0;">
                <tbody>
                  ${tableRowsHtml}
                </tbody>
              </table>

              <!-- Footer Notice -->
              <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #EDF2F7; text-align: center;">
                <p style="margin: 0; color: #718096; font-size: 12px;">
                  This notification was triggered automatically by a user submission on <a href="https://grofi.in" target="_blank" style="color: #02474D; font-weight: 700; text-decoration: none;">grofi.in</a>.
                </p>
                <p style="margin: 4px 0 0 0; color: #A0AEC0; font-size: 11px;">
                  Sent directly to <span style="color: #4A5568; font-weight: 600;">${toEmail}</span> via Resend Email Service.
                </p>
              </div>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // Generate plain text alternative
  const plainTextLines = [
    `=== NEW GROFI FORM SUBMISSION ===`,
    `Form Title: ${formTitle}`,
    `Form Type: ${formType}`,
    `Received At: ${timestampStr}`,
    `----------------------------------------`,
    ...filteredEntries.map(
      ([k, v]) => `${formatFieldLabel(k)}: ${v}`
    ),
    `----------------------------------------`,
    `Delivered to: ${toEmail}`,
  ];
  const plainText = plainTextLines.join("\n");

  try {
    const payload: Parameters<typeof client.emails.send>[0] = {
      from: fromEmail,
      to: toEmail,
      subject: emailSubject,
      html,
      text: plainText,
      replyTo: customerEmail || undefined,
    };

    if (attachments && attachments.length > 0) {
      payload.attachments = attachments.map((att) => ({
        filename: att.filename,
        content: att.content,
      }));
    }

    const { data, error } = await client.emails.send(payload);

    if (error) {
      console.error("[Resend Error] Failed to send email notification:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    console.log(`[Resend Success] Email sent successfully (ID: ${data?.id}) to ${toEmail}`);
    return {
      success: true,
      id: data?.id,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[Resend Exception] Unexpected error sending email notification:", message);
    return {
      success: false,
      error: message,
    };
  }
}
