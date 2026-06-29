import { cn } from "@/lib/helpers/cn";
import type { ReactNode } from "react";

// Shared "spacial" background used by every slide of the presentation.
// `className` styles the content layer, so each slide controls its own layout.
export default function Slide({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(ellipse_at_top,#312e81_0%,#0f0a2e_50%,#000000_100%)] text-white">
      {/* starfield */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: `radial-gradient(1.5px 1.5px at 25px 35px, #fff, transparent),
            radial-gradient(1.5px 1.5px at 150px 120px, #fff, transparent),
            radial-gradient(1px 1px at 90px 200px, #fff, transparent),
            radial-gradient(2px 2px at 220px 60px, #fff, transparent),
            radial-gradient(1px 1px at 300px 160px, #cbd5ff, transparent),
            radial-gradient(1.5px 1.5px at 50px 250px, #fff, transparent),
            radial-gradient(1px 1px at 250px 240px, #fff, transparent),
            radial-gradient(1.5px 1.5px at 350px 30px, #fde68a, transparent)`,
          backgroundRepeat: "repeat",
          backgroundSize: "400px 300px",
        }}
      ></div>

      {/* nebula glows */}
      <div className="pointer-events-none absolute -top-24 -right-10 size-80 rounded-full bg-fuchsia-600/25 blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-10 left-0 size-72 rounded-full bg-cyan-500/20 blur-3xl"></div>

      {/* planet */}
      <div className="pointer-events-none absolute -right-20 -bottom-24 size-72 rounded-full bg-linear-to-br from-indigo-400 to-purple-800 shadow-[0_0_70px_rgba(139,92,246,0.55)]"></div>

      {/* content */}
      <div className={cn("relative h-full w-full", className)}>{children}</div>
    </div>
  );
}
