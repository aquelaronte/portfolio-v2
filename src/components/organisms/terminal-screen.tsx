import { cn } from "@/lib/helpers/cn";
import { onFinishedLoad } from "@/lib/load-handler/progress";
import { useEffect, useState } from "react";
import Navigator from "./navigator";
import PowerpointShowcase from "./powerpoint-showcase";
import Terminal, { type TerminalLine } from "./terminal";

// how long the swap fade takes (must match the transition duration below)
const FADE_MS = 500;
// how long the initial main-content fade takes before the welcome lines start
const INITIAL_REVEAL_DELAY_MS = 700;

type Phase = "welcome" | "about" | "showcase" | "navigator";

// the phase a keypress advances to from the current one
const NEXT_PHASE: Partial<Record<Phase, Phase>> = {
  welcome: "about",
  about: "showcase",
};

export default function TerminalScreen({
  className,
  welcomeLines,
  about,
}: {
  className?: string;
  welcomeLines: TerminalLine[];
  about: { title: string; lines: TerminalLine[] };
}) {
  // every tracked resource has loaded
  const [loaded, setLoaded] = useState(false);
  // which terminal is currently shown
  const [phase, setPhase] = useState<Phase>("welcome");
  // drives the fade of the current terminal (false = faded out)
  const [visible, setVisible] = useState(true);

  // Wait for all resources to load before starting the welcome sequence.
  useEffect(() => {
    const w = window as unknown as { __progress__?: number };

    if ((w.__progress__ ?? 0) >= 100) {
      setLoaded(true);
    } else {
      onFinishedLoad(() => setLoaded(true));
    }
  }, []);

  // Fade the current view out and swap to the given phase.
  const advance = (next: Phase) => {
    setVisible(false);
    window.setTimeout(() => {
      setPhase(next);
      setVisible(true);
    }, FADE_MS);
  };

  // A keypress advances to the next phase (when there is one).
  useEffect(() => {
    if (!loaded) return;

    const next = NEXT_PHASE[phase];
    if (!next) return;

    const handle = () => advance(next);

    window.addEventListener("keydown", handle, { once: true });
    return () => window.removeEventListener("keydown", handle);
  }, [phase, loaded]);

  return (
    <div
      className={cn(
        "h-full w-full transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {phase === "welcome" && (
        <Terminal
          className="h-full w-full select-none"
          lines={welcomeLines}
          active={loaded && visible}
          startDelay={INITIAL_REVEAL_DELAY_MS}
        />
      )}

      {phase === "about" && (
        <Terminal
          className="h-full w-full select-none"
          title={about.title}
          lines={about.lines}
          active={visible}
          startDelay={FADE_MS}
        />
      )}

      {phase === "showcase" && (
        <PowerpointShowcase onOpenNavigator={() => advance("navigator")} />
      )}

      {phase === "navigator" && <Navigator />}
    </div>
  );
}
