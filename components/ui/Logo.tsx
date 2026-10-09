import { useId } from "react";

/** Path data for the brand mark: a code chevron beside a "J" whose top is a graph node. 32×32 viewBox. */
export const logoPaths = {
  chevron: "M11 10 5.5 16l5.5 6",
  j: "M23.5 12v7.5a5 5 0 0 1-10 0",
  node: { cx: 23.5, cy: 7.6, r: 2.1 },
} as const;

/** The mark as a standalone SVG string with fixed colors, for the OG image and other non-DOM uses. */
export function logoSvg(from = "#8b95ff", to = "#3dd6c3") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><defs><linearGradient id="g" x1="4" y1="5" x2="27" y2="27" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><g fill="none" stroke="url(#g)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="${logoPaths.chevron}"/><path d="${logoPaths.j}"/></g><circle cx="${logoPaths.node.cx}" cy="${logoPaths.node.cy}" r="${logoPaths.node.r}" fill="url(#g)"/></svg>`;
}

/** Brand mark drawn in the theme's accent gradient. */
export function LogoMark({ className }: { className?: string }) {
  const id = useId();
  const gradient = `logo-${id}`;

  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <defs>
        <linearGradient id={gradient} x1="4" y1="5" x2="27" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${gradient})`} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
        <path d={logoPaths.chevron} />
        <path d={logoPaths.j} />
      </g>
      <circle {...logoPaths.node} fill={`url(#${gradient})`} />
    </svg>
  );
}
