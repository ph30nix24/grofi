import { NextResponse } from "next/server";
import { sendFormNotification } from "@/libs/resend";

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

    // Log the lead
    console.log(`=== NEW FORM SUBMISSION: ${formType} ===`);
    console.log("Fields:", JSON.stringify(rawFields, null, 2));

    // Send email notification via Resend
    const emailResult = await sendFormNotification({
      formTitle: resolvedTitle,
      formType,
      subject,
      replyTo,
      fields: rawFields,
    });

    if (!emailResult.success) {
      console.warn(
        `[Form Submit] Note: Email dispatch had warning/error: ${emailResult.error}`
      );
    }

    return NextResponse.json({
      success: true,
      message: "Form received and processed successfully.",
      emailDelivered: emailResult.success,
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
