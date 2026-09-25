import { ImageResponse } from "next/og";

// Provisional home-screen icon for iPhone (iOS rounds the corners itself)
export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B2545",
          color: "#F2A900",
          fontSize: 130,
          fontWeight: 700,
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}
