import { NextResponse } from "next/server";
import { sendFormNotification } from "@/libs/resend";
import prisma from "@/libs/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid submission payload. Expected JSON object." },
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

    // Build human-friendly form title if not explicitly provided
    const resolvedTitle = formTitle || `New Lead: ${formType}`;

    // Extract core contact and context fields for structured queryability
    const rawName = rawFields.fullName || rawFields.name || rawFields.businessName || null;
    const rawPhone = rawFields.phone || rawFields.number || null;
    const rawEmail = rawFields.email || rawFields.newsletterEmail || replyTo || null;
    const rawService = rawFields.service || rawFields.selectedProduct || rawFields.feature || rawFields.lender || null;
    const sourcePage = rawFields.page || rawFields.sourceUrl || request.headers.get("referer") || null;
    const consentTimestamp = rawFields.consentTimestamp
      ? new Date(rawFields.consentTimestamp)
      : new Date();

    const cleanPhone = rawPhone ? String(rawPhone).replace(/\D/g, "") : null;

    // Log the lead
    console.log(`=== NEW FORM SUBMISSION: ${formType} ===`);
    console.log("Fields:", JSON.stringify(rawFields, null, 2));

    // 1. Save every lead to the Lead table FIRST (guaranteeing no lead loss)
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
        consentTimestamp,
        payload: rawFields,
        emailSent: false,
      },
    });

    console.log(`[Lead Saved] Successfully persisted lead ${lead.id} to database.`);

    // 2. Then attempt email notification via Resend
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

    // 3. Update lead record with email delivery status
    if (!emailResult.success) {
      console.warn(
        `[Form Submit] Note: Email dispatch had warning/error: ${emailResult.error}`
      );
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          emailSent: false,
          emailError: emailResult.error || "Email delivery failed",
        },
      });

      // Do NOT return success: true when email fails or RESEND_API_KEY is missing
      return NextResponse.json(
        {
          success: false,
          error: emailResult.error || "Failed to deliver email notification.",
          leadId: lead.id,
        },
        { status: 500 }
      );
    }

    await prisma.lead.update({
      where: { id: lead.id },
      data: {
        emailSent: true,
        emailId: emailResult.id,
        emailError: null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Form received and processed successfully.",
      leadId: lead.id,
      emailDelivered: true,
      emailId: emailResult.id,
    });
  } catch (error) {
    console.error("[Form Submit Error]:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}

