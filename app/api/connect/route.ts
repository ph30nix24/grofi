import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, cibilScore, service } = body;

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

    // Log the lead for follow-up
    console.log("=== NEW CONNECT LEAD ===");
    console.log("Name:", name.trim());
    console.log("Phone: +91", cleanPhone);
    console.log("CIBIL Score:", cibilScore || "Not provided");
    console.log("Selected Service:", service);
    console.log("Received At:", new Date().toISOString());
    console.log("========================");

    return NextResponse.json({
      success: true,
      message: "Lead received successfully. Our advisor will connect with you shortly.",
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
