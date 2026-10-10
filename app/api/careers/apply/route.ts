import { NextResponse } from "next/server";
import { sendFormNotification } from "@/libs/resend";
import prisma from "@/libs/db";
import { resolveServerConsent } from "@/app/constants/consent";

// Maximum allowed resume file size: 5 MB
const MAX_RESUME_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name")?.toString().trim();
    const number = formData.get("number")?.toString().trim();
    const role = formData.get("role")?.toString().trim();
    const city = formData.get("city")?.toString().trim();
    const currentlyWorking = formData.get("currentlyWorking")?.toString().trim();
    const currentSalary = formData.get("currentSalary")?.toString().trim() || "Not provided";
    const noticePeriod = formData.get("noticePeriod")?.toString().trim() || "Not specified";
    const resumeFile = formData.get("resume") as File | null;
    const rawConsentGiven = formData.get("consentGiven");
    const rawConsentVersion = formData.get("consentVersion");

    const { consentGiven, consentVersion, consentTimestamp } = resolveServerConsent(
      rawConsentGiven,
      rawConsentVersion
    );

    if (!consentGiven) {
      return NextResponse.json(
        { error: "Please agree to the privacy policy to submit your application." },
        { status: 400 }
      );
    }

    // 1. Text validations
    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name (minimum 2 characters)" },
        { status: 400 }
      );
    }

    const cleanPhone = (number || "").replace(/\D/g, "");
    if (cleanPhone.length !== 10 || !/^[6-9]/.test(cleanPhone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9" },
        { status: 400 }
      );
    }

    if (!city || city.length < 2) {
      return NextResponse.json(
        { error: "Please enter your current city" },
        { status: 400 }
      );
    }

    if (!resumeFile) {
      return NextResponse.json(
        { error: "Please upload your resume in PDF format" },
        { status: 400 }
      );
    }

    // 2. Strict PDF checks: size limit, extension check AND %PDF magic bytes check
    if (resumeFile.size > MAX_RESUME_SIZE) {
      return NextResponse.json(
        { error: "Resume file size must not exceed 5 MB." },
        { status: 400 }
      );
    }

    if (resumeFile.size < 4) {
      return NextResponse.json(
        { error: "The uploaded file is empty or invalid." },
        { status: 400 }
      );
    }

    const fileNameLower = resumeFile.name.toLowerCase();
    const hasPdfExtension = fileNameLower.endsWith(".pdf");
    if (!hasPdfExtension) {
      return NextResponse.json(
        { error: "Only PDF resumes (.pdf) are accepted." },
        { status: 400 }
      );
    }

    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Verify %PDF magic bytes: 0x25, 0x50, 0x44, 0x46 ("%PDF")
    const hasPdfMagicBytes =
      buffer.length >= 4 &&
      buffer[0] === 0x25 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x44 &&
      buffer[3] === 0x46;

    if (!hasPdfMagicBytes) {
      return NextResponse.json(
        { error: "The uploaded file is not a valid PDF document." },
        { status: 400 }
      );
    }

    // Sanitize filename for attachment
    const safeResumeName = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");

    console.log("=== NEW JOB APPLICATION RECEIVED ===");
    console.log("Name:", name);
    console.log("Phone: +91", cleanPhone);
    console.log("Role Applied For:", role || "Not specified");
    console.log("City:", city);
    console.log("Currently Working:", currentlyWorking);
    console.log("Current Salary:", currentSalary);
    console.log("Notice Period:", noticePeriod);
    console.log("Resume File:", safeResumeName, `(${Math.round(buffer.length / 1024)} KB)`);
    console.log("Timestamp:", new Date().toISOString());
    console.log("=====================================");

    const sourcePage = request.headers.get("referer") || "/careers";

    // 3. PERSIST LEAD IN DATABASE FIRST: guarantees no lost applications even if email fails
    const lead = await prisma.lead.create({
      data: {
        formType: "Careers Application Form",
        formTitle: `Job Application: ${name} (${role || "Open Role"})`,
        name,
        phone: cleanPhone,
        service: role || "Open Role",
        status: "NEW",
        sourcePage,
        consentGiven,
        consentVersion,
        consentTimestamp,
        payload: {
          name,
          number: cleanPhone,
          role: role || "Not specified",
          city,
          currentlyWorking: currentlyWorking === "yes" ? "Yes" : "No",
          currentSalary,
          noticePeriod,
          resumeFilename: safeResumeName,
          resumeSizeBytes: buffer.length,
          sourcePage,
        },
        emailSent: false,
      },
    });

    console.log(`[Careers Apply] Application lead ${lead.id} safely persisted to database.`);

    // 4. Send email notification with in-memory resume attachment (zero disk writes, no public file exposure)
    const emailResult = await sendFormNotification({
      formTitle: `Job Application: ${name} (${role || "Open Role"})`,
      formType: "Careers Application Form",
      fields: {
        name,
        number: cleanPhone,
        role: role || "Not specified",
        city,
        currentlyWorking: currentlyWorking === "yes" ? "Yes" : "No",
        currentSalary,
        noticePeriod,
        resumeFilename: safeResumeName,
        sourcePage,
      },
      attachments: [
        {
          filename: safeResumeName,
          content: buffer,
          contentType: "application/pdf",
        },
      ],
    });

    if (!emailResult.success) {
      console.warn(`[Careers Apply] Email notification error: ${emailResult.error}`);
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
          error: emailResult.error || "Application saved, but email notification could not be delivered.",
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

    // 5. Return success without exposing any private file paths
    return NextResponse.json({
      success: true,
      message: "Application submitted successfully! Our HR team will reach out within 48 hours.",
      leadId: lead.id,
      data: {
        name,
        phone: cleanPhone,
        role,
        city,
        currentlyWorking,
        currentSalary,
        noticePeriod,
      },
    });
  } catch (error) {
    console.error("Error submitting job application:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your application. Please try again." },
      { status: 500 }
    );
  }
}
