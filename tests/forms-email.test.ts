import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getDefaultFromEmail, getNotificationEmail, sendFormNotification } from "../libs/resend";

describe("Forms & Email Notification Verification", () => {
  test("Resend email configuration defaults are configured", () => {
    const fromEmail = getDefaultFromEmail();
    const toEmail = getNotificationEmail();

    assert.ok(fromEmail.length > 0, "Default sender email must be defined");
    assert.ok(toEmail.length > 0, "Notification recipient email must be defined");
    assert.ok(toEmail.includes("@"), "Notification email must be a valid email format");
  });

  test("sendFormNotification safely handles missing API key without unhandled exceptions", async () => {
    // When RESEND_API_KEY is not defined, sendFormNotification should gracefully return failure result
    const origKey = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY;

    try {
      const result = await sendFormNotification({
        formTitle: "Test Lead Form",
        formType: "Unit Test Verification",
        fields: {
          fullName: "Test User",
          phone: "9876543210",
        },
      });

      assert.equal(result.success, false);
      assert.ok(result.error?.includes("RESEND_API_KEY"));
    } finally {
      if (origKey !== undefined) {
        process.env.RESEND_API_KEY = origKey;
      }
    }
  });

  test("All form endpoint files import and execute sendFormNotification", () => {
    const endpoints = [
      "app/api/forms/submit/route.ts",
      "app/api/connect/route.ts",
      "app/api/careers/apply/route.ts",
    ];

    for (const endpoint of endpoints) {
      const fullPath = path.resolve(process.cwd(), endpoint);
      assert.ok(fs.existsSync(fullPath), `Endpoint file ${endpoint} must exist`);
      const content = fs.readFileSync(fullPath, "utf-8");
      assert.ok(
        content.includes("sendFormNotification"),
        `Endpoint ${endpoint} must call sendFormNotification to guarantee email dispatch`
      );
    }
  });

  test("Every interactive lead form on the website posts to an email-dispatching endpoint", () => {
    const formComponents = [
      // Personal Loans
      "app/personal-loans/components/PersonalLoanHeroForm.tsx",
      "app/personal-loans/[loan]/components/LoanHeroForm.tsx",
      "app/personal-loans/instant-loans/components/InstantLoanHeroForm.tsx",
      "app/personal-loans/instant-loans/[loan]/components/InstantLoanHeroForm.tsx",
      "app/personal-loans/short-term-loans/components/ShortTermLoanHeroForm.tsx",
      "app/personal-loans/short-term-loans/[loan]/components/ShortTermLoanHeroForm.tsx",

      // Business Loans
      "app/business-loans/components/BusinessLoanHeroForm.tsx",
      "app/business-loans/[loan]/components/BusinessLoanHeroForm.tsx",

      // Home Loans & LAP & Balance Transfer
      "app/home-loans/components/HomeLoanHeroForm.tsx",
      "app/home-loans/[loan]/components/HomeLoanHeroForm.tsx",
      "app/home-loans/loan-against-property/components/LoanAgainstPropertyHeroForm.tsx",
      "app/home-loans/loan-against-property/[loan]/components/LoanAgainstPropertyLoanHeroForm.tsx",
      "app/home-loans/balance-transfer/[loan]/components/BalanceTransferLoanHeroForm.tsx",

      // Credit Cards Eligibility
      "app/credit-cards/[bank]/components/HeroEligibilityForm.tsx",

      // CyberShield Protection
      "app/secure-with-us/components/EnrollmentModal.tsx",

      // Sitewide Connect & Apply Modals
      "app/context/ApplyModalContext.tsx",
      "app/components/FloatingConnectButton.tsx",

      // Careers
      "app/careers/components/CareersApplicationForm.tsx",
      "app/careers/components/CareersJobModal.tsx",
      "app/careers/components/CareersGeneralApplyModal.tsx",

      // Subscriptions & Early Access
      "app/components/Footer.tsx",
      "app/blogs/components/BlogExplorer.tsx",
      "app/components/ComingSoon.tsx",
    ];

    for (const comp of formComponents) {
      const fullPath = path.resolve(process.cwd(), comp);
      assert.ok(fs.existsSync(fullPath), `Component file ${comp} must exist`);
      const content = fs.readFileSync(fullPath, "utf-8");

      // Verify each component has a POST fetch to one of the email-sending routes
      const hasEmailEndpointPost =
        content.includes('"/api/forms/submit"') ||
        content.includes("'/api/forms/submit'") ||
        content.includes('"/api/connect"') ||
        content.includes("'/api/connect'") ||
        content.includes('"/api/careers/apply"') ||
        content.includes("'/api/careers/apply'");

      assert.ok(
        hasEmailEndpointPost,
        `Form component "${comp}" must post to an email-sending API route (/api/forms/submit, /api/connect, or /api/careers/apply)`
      );

      // Verify no fake submit timeouts exist
      const hasFakeSubmitTimeout =
        content.includes("await new Promise((resolve) => setTimeout(resolve") ||
        content.includes("setIsSubmitting(false);\n      setIsSubmitted(true);") ||
        content.includes("setIsSubmitting(false);\n      setStep(\"certificate\");");

      assert.ok(
        !hasFakeSubmitTimeout,
        `Form component "${comp}" must not use fake timeout delay in place of server submission.`
      );
    }
  });
});
