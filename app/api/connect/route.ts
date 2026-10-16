import { NextResponse } from "next/server";
import { sendFormNotification } from "@/libs/resend";
import prisma from "@/libs/db";
import { resolveServerConsent } from "@/app/constants/consent";
import {
  getClientIp,
  checkRateLimit,
  isHoneypotTriggered,
  isValidIndianPhone,
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

    // 2. Honeypot Bot Check
    if (isHoneypotTriggered(body)) {
      return NextResponse.json(
        { error: "Submission could not be processed." },
        { status: 400 }
      );
    }

    const {
      name,
      phone,
      cibilScore,
      service,
      page,
      consentGiven: rawConsentGiven,
      consentVersion: rawConsentVersion,
    } = body;

    // 3. Input Validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid full name (minimum 2 characters)" },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || "").toString().replace(/\D/g, "");
    if (!isValidIndianPhone(cleanPhone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9" },
        { status: 400 }
      );
    }

    const validServices = ["credit-cards", "personal-loans", "home-loans"];
    if (!service || !validServices.includes(service)) {
      return NextResponse.json(
        { error: "Please select a valid option: credit-cards, personal-loans, or home-loans" },
        { status: 400 }
      );
    }

    // Resolve versioned consent on server - never trust client timestamps
    const { consentGiven, consentVersion, consentTimestamp } = resolveServerConsent(
      rawConsentGiven,
      rawConsentVersion
    );

    if (!consentGiven) {
      return NextResponse.json(
        { error: "Consent is required to submit your callback request." },
        { status: 400 }
      );
    }

    const sourcePage = page || request.headers.get("referer") || null;

    // 4. DPDP-Compliant Logging: No unmasked PII (name, full phone, salary, CIBIL) in production logs
    console.log(
      `[Connect Lead Received] Service: ${service}, Source: ${sourcePage || "direct"}, IP: ${clientIp}`
    );

    // 5. Persist lead in database FIRST (guaranteeing zero lead loss)
    const lead = await prisma.lead.create({
      data: {
        formType: "Connect With Our Advisors",
        formTitle: `Advisor Callback Request: ${name.trim()}`,
        name: name.trim(),
        phone: cleanPhone,
        service,
        status: "NEW",
        sourcePage: sourcePage ? String(sourcePage) : null,
        consentGiven,
        consentVersion,
        consentTimestamp,
        payload: {
          name: name.trim(),
          phone: cleanPhone,
          cibilScore: cibilScore || "Not provided",
          service,
          sourcePage,
          consentGiven,
          consentVersion,
        },
        emailSent: false,
      },
    });

    console.log(`[Connect Lead Saved] Persisted lead ${lead.id} to database.`);

    // 6. Attempt email notification via Resend
    const emailResult = await sendFormNotification({
      formTitle: `Advisor Callback Request: ${name.trim()}`,
      formType: "Connect With Our Advisors",
      fields: {
        name: name.trim(),
        phone: cleanPhone,
        service,
        cibilScore: cibilScore || "Not provided",
        sourcePage: sourcePage || undefined,
      },
    });

    // 7. Update email status on lead without failing user submission if email fails
    if (!emailResult.success) {
      console.warn(
        `[Connect Lead] Email notification dispatch note: ${emailResult.error}`
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
      message: "Lead received successfully. Our advisor will connect with you shortly.",
      leadId: lead.id,
      data: {
        name: name.trim(),
        phone: cleanPhone,
        cibilScore: cibilScore || "N/A",
        service,
      },
    });
  } catch (error) {
    console.error("Error processing connect lead:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while submitting your request." },
      { status: 500 }
    );
  }
}
