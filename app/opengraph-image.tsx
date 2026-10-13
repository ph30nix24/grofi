import { ImageResponse } from "next/og";

export const alt = "Grofi - Smart Financial Growth Partner";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#02474D",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(16, 185, 129, 0.25) 0%, rgba(2, 71, 77, 0) 55%), radial-gradient(circle at 15% 85%, rgba(13, 148, 136, 0.3) 0%, rgba(2, 71, 77, 0) 50%)",
          padding: "60px 70px",
          fontFamily: "sans-serif",
          color: "#FFFFFF",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontSize: "44px",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                color: "#FFFFFF",
              }}
            >
              Grofi
            </span>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#10B981",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "9999px",
              padding: "8px 20px",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: "#A7F3D0",
              textTransform: "uppercase",
            }}
          >
            India&apos;s Trusted Financial Marketplace
          </div>
        </div>

        {/* Middle Hero */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <h1
            style={{
              fontSize: "62px",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: 0,
              color: "#FFFFFF",
            }}
          >
            Smart Financial Growth Partner
          </h1>
          <p
            style={{
              fontSize: "24px",
              lineHeight: 1.45,
              color: "#D1D5DB",
              margin: 0,
              maxWidth: "920px",
            }}
          >
            Compare &amp; apply for top Personal Loans, Home Loans, Business Loans &amp;
            Credit Cards with fast approvals and paperless e-KYC.
          </p>
        </div>

        {/* Bottom Bar: Value badges & URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: "14px" }}>
            {["Zero CIBIL Impact Check", "10+ Partner Banks", "Lowest Rates from 7.15%"].map(
              (badge) => (
                <div
                  key={badge}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    border: "1px solid rgba(255, 255, 255, 0.16)",
                    borderRadius: "12px",
                    padding: "10px 18px",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#E5E7EB",
                  }}
                >
                  {badge}
                </div>
              )
            )}
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#10B981",
              letterSpacing: "0.02em",
            }}
          >
            grofi.in
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
