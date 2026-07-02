import { cn } from "@/lib/helpers/cn";
import WindowDots from "@/components/atoms/window-dots";
import avatar from "@/assets/avatar.jpeg";
import { type ReactNode } from "react";
import frank from "@/assets/testimonials/frank.png";
import cristian from "@/assets/testimonials/cristian.png";

type Testimonial = {
  avatar: string;
  quote: ReactNode;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    avatar: cristian.src,
    quote:
      "Quedamos muy satisfechos con el trabajo realizado en la migración de nuestras plataformas a DigitalOcean. Toda la infraestructura fue configurada con contenedores y automatización mediante CI/CD, permitiéndonos realizar despliegues mucho más rápidos y seguros.",
    name: "Cristian Bedoya",
    role: "Software Engineer · Fundación ROFÉ",
  },
  {
    avatar: frank.src,
    quote:
      "Diseñó una arquitectura robusta para nuestro SaaS desde cero. Ahora nuestros clientes nos felicitan por la velocidad de nuestro sistema.",
    name: "Frank Smith Rivas",
    role: "Co-Founder · Queron Technologies",
  },
];

export default function Testimonials({
  className,
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) {
  return (
    <div
      className={cn(
        "ring-primary/40 relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-[#0a0410] text-white shadow-2xl ring-1 select-none",
        className,
      )}
    >
      {/* title bar — retro arcade chrome */}
      <div className="border-primary/30 z-20 flex items-center gap-3 border-b bg-black/60 px-4 py-2 backdrop-blur">
        <WindowDots onClose={onClose} />
        <span className="bg-primary grid size-5 place-items-center rounded-sm text-xs font-bold text-black">
          ★
        </span>
        <span className="text-primary font-mono text-sm font-semibold tracking-[0.3em] uppercase drop-shadow-[0_0_8px_var(--color-primary)]">
          Testimonials
        </span>
      </div>

      {/* neo-retro futurism backdrop: neon perspective grid + horizon glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* sun / horizon glow */}
        <div className="bg-primary/25 absolute top-1/4 left-1/2 size-96 -translate-x-1/2 rounded-full blur-3xl" />
        {/* perspective floor grid */}
        <div
          className="absolute inset-x-[-50%] bottom-[-10%] h-2/3 origin-bottom"
          style={{
            transform: "perspective(340px) rotateX(60deg)",
            backgroundImage:
              "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "linear-gradient(to top, black 10%, transparent 80%)",
            WebkitMaskImage:
              "linear-gradient(to top, black 10%, transparent 80%)",
            opacity: 0.4,
          }}
        />
      </div>

      {/* stage — scrollable so tall content (stacked cards on mobile) is reachable */}
      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center gap-6 overflow-y-auto p-6 sm:justify-center sm:gap-10 sm:p-8">
        <h2 className="font-mono-heading text-primary shrink-0 text-4xl font-bold drop-shadow-[0_0_25px_var(--color-primary)] sm:text-6xl">
          Testimonios
        </h2>

        <div className="grid w-full max-w-5xl gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <Card key={i} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ testimonial }: { testimonial: Testimonial }) {
  const { avatar, quote, name, role } = testimonial;

  return (
    <div className="border-primary/50 flex flex-col gap-5 rounded-lg border bg-white/5 p-6 shadow-[0_0_25px_rgba(246,161,198,0.25)] backdrop-blur-sm">
      <p className="text-sm leading-relaxed text-white/90 italic">“{quote}”</p>

      <div className="border-primary/20 mt-auto flex items-center gap-4 border-t pt-4">
        <img
          src={avatar}
          alt={name}
          className="ring-primary size-14 rounded-full object-cover shadow-[0_0_12px_var(--color-primary)] ring-2"
        />
        <div className="flex flex-col">
          <span className="font-mono font-semibold text-white">{name}</span>
          <span className="text-primary font-mono text-xs tracking-wide uppercase">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}
