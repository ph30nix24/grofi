import { NextResponse } from "next/server";
import { sendFormNotification } from "@/libs/resend";
import prisma from "@/libs/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, cibilScore, service, page, consentTimestamp: rawConsent } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid full name (minimum 2 characters)" },
        { status: 400 }
      );
    }

    const cleanPhone = (phone || "").toString().replace(/\D/g, "");
    if (cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone)) {
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

    const sourcePage = page || request.headers.get("referer") || null;
    const consentTimestamp = rawConsent ? new Date(rawConsent) : new Date();

    // Log the lead for follow-up
    console.log("=== NEW CONNECT LEAD ===");
    console.log("Name:", name.trim());
    console.log("Phone: +91", cleanPhone);
    console.log("CIBIL Score:", cibilScore || "Not provided");
    console.log("Selected Service:", service);
    console.log("Source Page:", sourcePage);
    console.log("Received At:", new Date().toISOString());
    console.log("========================");

    // 1. Save every lead to the Lead table FIRST (guaranteeing no lead loss)
    const lead = await prisma.lead.create({
      data: {
        formType: "Connect With Our Advisors",
        formTitle: `Advisor Callback Request: ${name.trim()}`,
        name: name.trim(),
        phone: cleanPhone,
        service,
        status: "NEW",
        sourcePage: sourcePage ? String(sourcePage) : null,
        consentTimestamp,
        payload: {
          name: name.trim(),
          phone: cleanPhone,
          cibilScore: cibilScore || "Not provided",
          service,
          sourcePage,
        },
        emailSent: false,
      },
    });

    console.log(`[Connect Lead Saved] Persisted lead ${lead.id} to database.`);

    // 2. Then send email notification via Resend to NOTIFICATION_EMAIL
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

    if (!emailResult.success) {
      console.warn(
        `[Connect Lead] Email dispatch warning/error: ${emailResult.error}`
      );
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          emailSent: false,
          emailError: emailResult.error || "Email delivery failed",
        },
      });

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

