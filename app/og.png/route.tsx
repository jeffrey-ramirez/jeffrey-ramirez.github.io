import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/*
 * Social share image, exported as /og.png. A route handler (rather than the
 * opengraph-image convention) so the static file keeps its .png extension on
 * GitHub Pages, which sets Content-Type from the extension.
 */
const size = { width: 1200, height: 630 };

// Required for route handlers under `output: "export"`.
export const dynamic = "force-static";

export async function GET() {
  const logo = await readFile(join(process.cwd(), "assets/logo-jr.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by ImageResponse, not the browser */}
        <img width={96} height={60} alt="" src={logoSrc} />
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
