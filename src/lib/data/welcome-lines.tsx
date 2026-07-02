import AsciiGlobe from "@/components/organisms/ascii-globe";
import type { TerminalLine } from "@/components/organisms/terminal";

export const welcomeLines: TerminalLine[] = [
  {
    content: "Brahian Arias",
    className: "font-mono-heading sm:text-9xl text-7xl",
  },
  {
    content: "Software Engineer",
    className: "text-primary",
    prompt: true,
  },
  {
    content: "Backend, IA y Cloud",
    prompt: true,
  },
  {
    content: (
      <>
        Presiona <u>Enter</u> para continuar o <u>'q'</u> para ir al escritorio
      </>
    ),
    prompt: true,
  },
  {
    content: <AsciiGlobe />,
    className: "mt-auto flex justify-center",
  },
];
