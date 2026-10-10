import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { sendFormNotification } from "@/libs/resend";
import prisma from "@/libs/db";

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

    // Validation
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

    // Strict PDF check
    const isPdfType = resumeFile.type === "application/pdf";
    const hasPdfExtension = resumeFile.name.toLowerCase().endsWith(".pdf");

    if (!isPdfType && !hasPdfExtension) {
      return NextResponse.json(
        { error: "Only PDF resumes are accepted. Please upload a .pdf file." },
        { status: 400 }
      );
    }

    // Ensure uploads directory exists
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "resumes");
    await mkdir(uploadsDir, { recursive: true });

    // Sanitize and save PDF file
    const safeBaseName = resumeFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${Date.now()}-${safeBaseName}`;
    const filePath = path.join(uploadsDir, filename);

    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await writeFile(filePath, buffer);

    console.log("=== NEW JOB APPLICATION RECEIVED ===");
    console.log("Name:", name);
    console.log("Phone:", cleanPhone);
    console.log("Role Applied For:", role || "Not specified");
    console.log("City:", city);
    console.log("Currently Working:", currentlyWorking);
    console.log("Current Salary:", currentSalary);
    console.log("Notice Period:", noticePeriod);
    console.log("Resume Saved To:", `/uploads/resumes/${filename}`);
    console.log("Timestamp:", new Date().toISOString());
    console.log("=====================================");

    // 1. Save applicant lead to database first
    const sourcePage = request.headers.get("referer") || "/careers";
    const lead = await prisma.lead.create({
      data: {
        formType: "Careers Application Form",
        formTitle: `Job Application: ${name} (${role || "Open Role"})`,
        name,
        phone: cleanPhone,
        service: role || "Open Role",
        status: "NEW",
        sourcePage,
        consentTimestamp: new Date(),
        payload: {
          name,
          number: cleanPhone,
          role: role || "Not specified",
          city,
          currentlyWorking: currentlyWorking === "yes" ? "Yes" : "No",
          currentSalary,
          noticePeriod,
          resumeFilename: resumeFile.name,
          resumePath: `/uploads/resumes/${filename}`,
          sourcePage,
        },
        emailSent: false,
      },
    });

    // 2. Send email notification to NOTIFICATION_EMAIL with attached resume PDF
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
        resumeFilename: resumeFile.name,
        sourcePage,
      },
      attachments: [
        {
          filename: resumeFile.name,
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
          error: emailResult.error || "Application saved but email notification failed.",
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
        resumePath: `/uploads/resumes/${filename}`,
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
