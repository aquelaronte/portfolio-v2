import { cn } from "@/lib/helpers/cn";
import { onFinishedLoad } from "@/lib/load-handler/progress";
import {
  FileCode,
  FileText,
  FileTerminal,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Navigator from "./navigator";
import PowerpointShowcase from "./powerpoint-showcase";
import Terminal, { type TerminalLine } from "./terminal";
import Testimonials from "./testimonials";
import { welcomeLines } from "@/lib/data/welcome-lines";
import { aboutLines } from "@/lib/data/about-lines";

// how long the open/close transition takes (must match the duration below)
const FADE_MS = 200;
// how long the initial main-content fade takes before the welcome lines start
const INITIAL_REVEAL_DELAY_MS = 700;

type Phase =
  "welcome" | "about" | "showcase" | "navigator" | "testimonials" | "desktop";

// Enter advances to the next phase along this chain.
const NEXT_PHASE: Partial<Record<Phase, Phase>> = {
  welcome: "about",
  about: "showcase",
  showcase: "navigator",
  navigator: "testimonials",
};

// the steps shown as files on the desktop
const DESKTOP_STEPS: { phase: Phase; label: string; Icon: LucideIcon }[] = [
  { phase: "welcome", label: "bienvenida.sh", Icon: FileTerminal },
  { phase: "about", label: "sobre-mi.sh", Icon: FileTerminal },
  { phase: "showcase", label: "mi-experiencia.pptx", Icon: FileText },
  { phase: "navigator", label: "mis-proyectos.html", Icon: FileCode },
  { phase: "testimonials", label: "Testimonials", Icon: Gamepad2 },
];

export default function TerminalScreen({ className }: { className?: string }) {
  // every tracked resource has loaded
  const [loaded, setLoaded] = useState(false);
  // which view is currently shown
  const [phase, setPhase] = useState<Phase>("welcome");
  // drives the fade of the current view (false = faded out)
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

  // The window's red/yellow buttons close it and return to the desktop.
  const backToDesktop = () => advance("desktop");

  // Enter advances to the next phase; 'q' drops to the desktop.
  useEffect(() => {
    if (!loaded || phase === "desktop") return;

    const handle = (event: KeyboardEvent) => {
      // don't hijack keys while the user is typing (e.g. the contact form)
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      // ignore keys during the fade transition to avoid double-advancing
      if (!visible) return;

      if (event.key.toLowerCase() === "q") {
        advance("desktop");
      } else if (event.key === "Enter") {
        const next = NEXT_PHASE[phase];
        if (next) advance(next);
      }
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [phase, loaded, visible]);

  return (
    <div className={cn("relative h-full w-full", className)}>
      {/* desktop stays static behind any open window */}
      <Desktop onOpen={(next) => advance(next)} />

      {/* the open window, animated like an OS window opening/closing */}
      <div
        className={cn(
          "absolute inset-0 origin-center transition-all duration-200 ease-out",
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
          phase === "desktop" && "pointer-events-none",
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
            title={"Sobre mi"}
            lines={aboutLines}
            active={visible}
            startDelay={FADE_MS}
            onClose={backToDesktop}
          />
        )}

        {phase === "showcase" && (
          <PowerpointShowcase
            onOpenNavigator={() => advance("navigator")}
            onClose={backToDesktop}
          />
        )}

        {phase === "navigator" && (
          <Navigator
            onClose={backToDesktop}
            onOpenTestimonials={() => advance("testimonials")}
          />
        )}

        {phase === "testimonials" && <Testimonials onClose={backToDesktop} />}
      </div>

      {/* hint that 'q' returns to the desktop */}
      {phase !== "desktop" && (
        <span className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2 text-xs text-white/40">
          q para ir al escritorio
        </span>
      )}
    </div>
  );
}

// desktop grid cell size in px
const CELL = 96;
// pixels the pointer must travel before a press counts as a drag (not a click)
const DRAG_THRESHOLD = 4;

type Cell = { col: number; row: number };

// Windows-style "align to grid": find the nearest free cell, spiralling out.
function nearestFreeCell(
  target: Cell,
  occupied: Set<string>,
  cols: number,
  rows: number,
): Cell {
  const fits = (c: Cell) =>
    c.col >= 0 &&
    c.row >= 0 &&
    c.col < cols &&
    c.row < rows &&
    !occupied.has(`${c.col},${c.row}`);

  if (fits(target)) return target;

  for (let ring = 1; ring < cols + rows; ring++) {
    for (let dc = -ring; dc <= ring; dc++) {
      for (let dr = -ring; dr <= ring; dr++) {
        if (Math.max(Math.abs(dc), Math.abs(dr)) !== ring) continue;
        const cell = { col: target.col + dc, row: target.row + dr };
        if (fits(cell)) return cell;
      }
    }
  }

  return target;
}

function Desktop({ onOpen }: { onOpen: (phase: Phase) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  // grid position of each icon; defaults to a top-left column
  const [cells, setCells] = useState<Record<string, Cell>>(() =>
    Object.fromEntries(
      DESKTOP_STEPS.map((step, i) => [step.phase, { col: 0, row: i }]),
    ),
  );

  // live drag state (pixel position of the icon being dragged)
  const [drag, setDrag] = useState<{
    phase: Phase;
    x: number;
    y: number;
    startX: number;
    startY: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const moved =
    !!drag &&
    (Math.abs(drag.x - drag.startX) > DRAG_THRESHOLD ||
      Math.abs(drag.y - drag.startY) > DRAG_THRESHOLD);

  const onPointerDown = (event: React.PointerEvent, phase: Phase) => {
    const rect = ref.current!.getBoundingClientRect();
    const cell = cells[phase];
    const iconX = cell.col * CELL;
    const iconY = cell.row * CELL;

    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({
      phase,
      x: iconX,
      y: iconY,
      startX: iconX,
      startY: iconY,
      offsetX: event.clientX - rect.left - iconX,
      offsetY: event.clientY - rect.top - iconY,
    });
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!drag) return;
    const rect = ref.current!.getBoundingClientRect();
    setDrag({
      ...drag,
      x: event.clientX - rect.left - drag.offsetX,
      y: event.clientY - rect.top - drag.offsetY,
    });
  };

  const onPointerUp = (phase: Phase) => {
    if (!drag) return;

    // a press without movement is a click → open the file
    if (!moved) {
      setDrag(null);
      onOpen(phase);
      return;
    }

    // snap to the nearest free grid cell
    const rect = ref.current!.getBoundingClientRect();
    const cols = Math.max(1, Math.floor(rect.width / CELL));
    const rows = Math.max(1, Math.floor(rect.height / CELL));
    const target = {
      col: Math.min(Math.max(Math.round(drag.x / CELL), 0), cols - 1),
      row: Math.min(Math.max(Math.round(drag.y / CELL), 0), rows - 1),
    };
    const occupied = new Set(
      Object.entries(cells)
        .filter(([p]) => p !== phase)
        .map(([, c]) => `${c.col},${c.row}`),
    );

    setCells((prev) => ({
      ...prev,
      [phase]: nearestFreeCell(target, occupied, cols, rows),
    }));
    setDrag(null);
  };

  return (
    <div ref={ref} className="relative h-full w-full select-none">
      {DESKTOP_STEPS.map(({ phase, label, Icon }) => {
        const dragging = drag?.phase === phase;
        const left = dragging ? drag!.x : cells[phase].col * CELL;
        const top = dragging ? drag!.y : cells[phase].row * CELL;

        return (
          <button
            key={phase}
            type="button"
            onPointerDown={(event) => onPointerDown(event, phase)}
            onPointerMove={onPointerMove}
            onPointerUp={() => onPointerUp(phase)}
            style={{ left, top, width: CELL, height: CELL }}
            className={cn(
              "absolute flex touch-none flex-col items-center gap-1 rounded-md p-2 hover:bg-white/10",
              dragging && "z-10 opacity-80",
            )}
          >
            <Icon className="size-12 text-white drop-shadow" />
            <span className="line-clamp-2 text-center text-xs leading-tight text-white drop-shadow">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
