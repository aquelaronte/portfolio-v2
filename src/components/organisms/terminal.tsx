import { cn } from "@/lib/helpers/cn";
import { useEffect, useState, type ReactNode } from "react";

// delay between each line appearing
const LINE_STAGGER_MS = 350;

export type TerminalLine = {
  content?: ReactNode;
  className?: string;
  prompt?: boolean;
  tabLevel?: number;
};

export default function Terminal({
  className,
  lines,
  title,
  active = false,
  startDelay = 0,
}: {
  className?: string;
  lines: TerminalLine[];
  title?: string;
  // when true, the lines start appearing one after another
  active?: boolean;
  // how long to wait before the first line appears
  startDelay?: number;
}) {
  // how many lines are currently visible
  const [visibleLines, setVisibleLines] = useState(0);

  // Reveal the lines one after another once the terminal is active.
  useEffect(() => {
    if (!active) {
      setVisibleLines(0);
      return;
    }

    const timers = lines.map((_, i) =>
      window.setTimeout(
        () => setVisibleLines((count) => Math.max(count, i + 1)),
        startDelay + i * LINE_STAGGER_MS,
      ),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [active, startDelay, lines.length]);

  return (
    <div
      className={cn(
        "flex flex-col gap-2 overflow-y-auto rounded-xl bg-black/70 px-6 pt-5 text-white outline outline-neutral-600 backdrop-blur-md",
        className,
      )}
    >
      {title && (
        <div className="-mx-6 -mt-5 mb-3 flex items-center border-b border-neutral-600 px-4 py-2">
          <div className="flex gap-1.5">
            <span className="size-3 rounded-full bg-red-500"></span>
            <span className="size-3 rounded-full bg-yellow-500"></span>
            <span className="size-3 rounded-full bg-green-500"></span>
          </div>
          <span className="flex-1 text-center text-xs font-bold text-neutral-300">
            {title}
          </span>
          <div className="w-12"></div>
        </div>
      )}

      {lines.map((line, i) => (
        <p
          className={cn(
            "font-mono text-sm opacity-0",
            i < visibleLines && "opacity-100",
            line.className,
          )}
          style={{
            marginLeft: `${2 * (line.tabLevel ?? 0)}rem`,
          }}
          key={`terminal-line-${i}`}
        >
          {line.prompt && (
            <span className="inline text-lg font-bold text-green-300">
              &gt;{" "}
            </span>
          )}
          {line.content}
        </p>
      ))}
    </div>
  );
}
