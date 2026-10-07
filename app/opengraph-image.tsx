import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = "Jeffrey Ramirez — Senior Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#08090b",
        backgroundImage:
          "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(139,149,255,0.22), transparent), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "100% 100%, 56px 56px, 56px 56px",
        color: "#f4f4f5",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: "#a1a1aa" }}>
        <div
          style={{
            display: "flex",
            width: 52,
            height: 52,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.18)",
            alignItems: "center",
            justifyContent: "center",
            color: "#f4f4f5",
            fontSize: 20,
          }}
        >
          {profile.initials}
        </div>
        {profile.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 30, color: "#8b95ff", marginBottom: 20 }}>{profile.positioning}</div>
        <div style={{ fontSize: 68, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05, maxWidth: 980 }}>
          {profile.hero.headline}
        </div>
      </div>
      <div style={{ display: "flex", gap: 28, fontSize: 24, color: "#71717a" }}>
        {["React", "Next.js", "TypeScript", "Django REST", "PostgreSQL", "Docker"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>,
    size,
  );
}
