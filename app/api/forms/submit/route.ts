import { NextResponse } from "next/server";
import { sendFormNotification } from "@/libs/resend";
import prisma from "@/libs/db";
import { resolveServerConsent } from "@/app/constants/consent";
import {
  getClientIp,
  checkRateLimit,
  isHoneypotTriggered,
  isValidIndianPhone,
  isValidEmail,
  isValidFormType,
} from "@/libs/spamProtection";

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Check
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute before submitting again." },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid submission payload. Expected JSON object." },
        { status: 400 }
      );
    }

    // 2. Honeypot Bot Check
    if (isHoneypotTriggered(body)) {
      return NextResponse.json(
        { error: "Submission could not be processed." },
        { status: 400 }
      );
    }

    const {
      formType = "Website Form",
      formTitle,
      subject,
      replyTo,
      ...rawFields
    } = body;

    // 3. Form Type Validation
    if (!isValidFormType(formType)) {
      return NextResponse.json(
        { error: "Invalid or unrecognized form type." },
        { status: 400 }
      );
    }

    // Extract core contact and context fields
    const rawName = rawFields.fullName || rawFields.name || rawFields.businessName || null;
    const rawPhone = rawFields.phone || rawFields.number || null;
    const rawEmail = rawFields.email || rawFields.newsletterEmail || replyTo || null;
    const rawService = rawFields.service || rawFields.selectedProduct || rawFields.feature || rawFields.lender || null;
    const sourcePage = rawFields.page || rawFields.sourceUrl || request.headers.get("referer") || null;

    const cleanPhone = rawPhone ? String(rawPhone).replace(/\D/g, "") : null;
    const hasValidPhone = cleanPhone ? isValidIndianPhone(cleanPhone) : false;
    const hasValidEmail = rawEmail ? isValidEmail(String(rawEmail)) : false;

    // 4. Contact Validation: Every form must provide either a valid phone or a valid email
    if (rawPhone && !hasValidPhone) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9" },
        { status: 400 }
      );
    }

    if (rawEmail && !hasValidEmail) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!hasValidPhone && !hasValidEmail) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit mobile number or email address." },
        { status: 400 }
      );
    }

    // 5. Consent Validation: Resolve versioned consent on server
    const { consentGiven, consentVersion, consentTimestamp } = resolveServerConsent(
      rawFields.consentGiven,
      rawFields.consentVersion
    );

    if (!consentGiven) {
      return NextResponse.json(
        { error: "Consent is required to submit your request." },
        { status: 400 }
      );
    }

    // Build human-friendly form title if not explicitly provided
    const resolvedTitle = formTitle || `New Lead: ${formType}`;

    // 6. DPDP-Compliant Logging: No unmasked PII in server logs
    console.log(
      `[Form Submitted] Type: ${formType}, Source: ${sourcePage || "direct"}, IP: ${clientIp}`
    );

    // 7. Save every lead to the Lead table FIRST (guaranteeing zero lead loss)
    const lead = await prisma.lead.create({
      data: {
        formType,
        formTitle: resolvedTitle,
        name: rawName ? String(rawName).trim() : null,
        phone: cleanPhone || (rawPhone ? String(rawPhone).trim() : null),
        email: rawEmail ? String(rawEmail).trim() : null,
        service: rawService ? String(rawService).trim() : null,
        status: "NEW",
        sourcePage: sourcePage ? String(sourcePage) : null,
        consentGiven,
        consentVersion,
        consentTimestamp,
        payload: {
          ...rawFields,
          consentGiven,
          consentVersion,
        },
        emailSent: false,
      },
    });

    console.log(`[Lead Saved] Successfully persisted lead ${lead.id} to database.`);

    // 8. Attempt email notification via Resend
    const emailResult = await sendFormNotification({
      formTitle: resolvedTitle,
      formType,
      subject,
      replyTo,
      fields: {
        ...rawFields,
        sourcePage: sourcePage || undefined,
      },
    });

    // 9. Update lead record with email delivery status
    if (!emailResult.success) {
      console.warn(
        `[Form Submit] Email notification dispatch note: ${emailResult.error}`
      );
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          emailSent: false,
          emailError: emailResult.error || "Email delivery failed",
        },
      });
    } else {
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          emailSent: true,
          emailId: emailResult.id,
          emailError: null,
        },
      });
    }

    // Always report success if lead is safely saved in the database
    return NextResponse.json({
      success: true,
      message: "Form received and processed successfully.",
      leadId: lead.id,
      emailDelivered: emailResult.success,
      emailId: emailResult.id || null,
    });
  } catch (error) {
    console.error("[Form Submit Error]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
