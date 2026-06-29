import { cn } from "@/lib/helpers/cn";
import Slide from "@/components/molecules/slide";
import { useEffect, useState, type ReactNode } from "react";

const slides: ReactNode[] = [
  // Slide 1 — title
  <Slide className="flex flex-col items-center justify-center gap-8 text-center">
    <h2 className="font-mono-heading text-8xl font-bold drop-shadow-[0_0_25px_rgba(168,85,247,0.65)]">
      Mi experiencia
    </h2>

    <div className="space-y-1 text-xl font-medium text-white/90">
      <p>By Brahian Arias</p>
    </div>

    <p className="absolute bottom-5">Hecho con mucho amor y café</p>
  </Slide>,
  // Slide 2 - First job
  <Slide className="px-10 py-8">
    <div className="max-w-2xl">
      <h2 className="font-mono-heading text-7xl font-bold drop-shadow-[0_0_25px_rgba(168,85,247,0.65)]">
        Fundación ROFÉ
      </h2>
      <p className="mt-1 font-mono text-sm tracking-wide text-indigo-300">
        mayo - junio (2023)
      </p>

      <p className="mt-8 text-white/90">
        Mi primer contacto con el software empezó mientras aún estudiaba en
        secundaria, cuando tuve la oportunidad de trabajar a mano con la
        fundación ROFÉ haciendo mantenimiento supervisado durante un tiempo
        corto a sus dos plataformas:
      </p>
      <ul className="mt-3 list-disc text-white/90 marker:text-fuchsia-400 [&_li]:ml-6">
        <li>Jóvenes Creativos</li>
        <li>Mujeres ROFÉ</li>
      </ul>
    </div>
  </Slide>,
  // Slide 3 - Second job
  <Slide className="px-10 py-8">
    <div className="max-w-2xl">
      <h2 className="font-mono-heading text-7xl font-bold drop-shadow-[0_0_25px_rgba(168,85,247,0.65)]">
        Byte4Bit
      </h2>
      <p className="mt-1 font-mono text-sm tracking-wide text-indigo-300">
        enero (2024) - mayo (2026)
      </p>

      <p className="mt-8 text-white/90">
        Byte4Bit es una startup que desarrolla soluciones tecnológicas para
        clientes terceros.
      </p>
      <p className="mt-4 text-white/90">
        Durante mi labor en esta empresa, lideré varios proyectos. Entre ellos
        los más destacados son:
      </p>
      <ul className="mt-3 list-disc text-white/90 marker:text-fuchsia-400 [&_li]:ml-6">
        <li>
          ToLinkme: Aumenté la eficiencia y mejoré el tiempo de respuesta en el
          backend a través del rediseño de la base datos y lógica de servidor.
          Adicionalmente diseñé un pipeline CI/CD para la infraestructura,
          frontend y backend, con terraform y github actions{" "}
          <a
            href="https://tolinkme.com/"
            className="font-bold text-fuchsia-400 underline"
            target="_blank"
          >
            Visitar
          </a>
        </li>
        <li className="mt-3">
          Audit1: Orquesté 4 portales frontend a través de una arquitectura
          monorepo y el manejo de una librería compartida.{" "}
          <a
            href="https://audit1.com"
            className="font-bold text-fuchsia-400 underline"
            target="_blank"
          >
            Visitar
          </a>
        </li>
      </ul>
    </div>
  </Slide>,
  <Slide className="flex items-center justify-center">
    <p>Gracias por ver :)</p>
  </Slide>,
];

export default function PowerpointShowcase({
  className,
  onOpenNavigator,
}: {
  className?: string;
  onOpenNavigator?: () => void;
}) {
  const total = slides.length;
  const [current, setCurrent] = useState(0);

  const go = (index: number) =>
    setCurrent(Math.min(Math.max(index, 0), total - 1));

  // arrow keys navigate between slides
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") go(current + 1);
      if (event.key === "ArrowLeft") go(current - 1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-xl bg-neutral-100 text-neutral-800 shadow-2xl select-none",
        className,
      )}
    >
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-neutral-300 bg-white px-4 py-2">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-500"></span>
          <span className="size-3 rounded-full bg-yellow-500"></span>
          <span className="size-3 rounded-full bg-green-500"></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="grid size-5 place-items-center rounded-sm bg-[#C43E1C] text-xs font-bold text-white">
            P
          </span>
          <span className="text-sm font-semibold">Mi experiencia</span>
        </div>

        <button
          type="button"
          onClick={onOpenNavigator}
          className="ml-auto flex items-center gap-1.5 rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 ring-1 ring-neutral-300 hover:bg-neutral-200"
          aria-label="Abrir navegador"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
            <path d="M2 12h20"></path>
          </svg>
          Abrir navegador
        </button>
      </div>

      {/* body: thumbnail rail + slide stage */}
      <div className="flex min-h-0 flex-1">
        {/* thumbnail rail */}
        <div className="hidden w-44 shrink-0 space-y-3 overflow-y-auto border-r border-neutral-300 bg-white p-3 md:block">
          {slides.map((slide, i) => (
            <button
              key={`thumb-${i}`}
              type="button"
              onClick={() => go(i)}
              className="flex w-full items-start gap-2 text-left"
            >
              <span className="pt-1 text-xs text-neutral-400">{i + 1}</span>
              <div
                className={cn(
                  "aspect-video flex-1 overflow-hidden rounded-sm ring-1",
                  i === current ? "ring-2 ring-[#C43E1C]" : "ring-neutral-300",
                )}
              >
                <div className="pointer-events-none h-[500%] w-[500%] origin-top-left scale-[0.2]">
                  {slide}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* slide stage */}
        <div className="flex flex-1 items-center justify-center bg-neutral-200 p-8">
          <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-sm bg-white shadow-lg ring-1 ring-black/5">
            {slides[current]}
          </div>
        </div>
      </div>

      {/* status bar */}
      <div className="flex items-center justify-between border-t border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-500">
        <span>
          Slide {current + 1} of {total}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(current - 1)}
            disabled={current === 0}
            className="grid size-7 place-items-center rounded text-lg leading-none hover:bg-neutral-200 disabled:opacity-40"
            aria-label="Previous slide"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={() => go(current + 1)}
            disabled={current === total - 1}
            className="grid size-7 place-items-center rounded text-lg leading-none hover:bg-neutral-200 disabled:opacity-40"
            aria-label="Next slide"
          >
            &#8250;
          </button>
        </div>
      </div>
    </div>
  );
}
