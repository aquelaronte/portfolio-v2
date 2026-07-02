import { cn } from "@/lib/helpers/cn";
import dayventCover from "@/assets/projects/dayvent/cover.png";
import iceWearCover from "@/assets/projects/ice-wear/cover.png";
import WindowDots from "@/components/atoms/window-dots";
import {
  ArrowLeft,
  ArrowUp,
  Gamepad2,
  Lock,
  Mail,
  Newspaper,
  X,
} from "lucide-react";
import { SiGithub, SiYoutube } from "@icons-pack/react-simple-icons";
import { useEffect, useRef, useState, type ReactNode } from "react";

// where the contact form sends to
const CONTACT_EMAIL = "me@arias.systems";

type ProjectData = {
  slug: string;
  cover: string;
  title: string;
  description: string;
  // content blocks rendered on the project detail page
  blocks?: Block[];
  tags: string[];
  link?: string;
  // optional public GitHub repository
  repo?: string;
  // optional YouTube demo video
  video?: string;
  // optional blog article
  article?: string;
  priv?: boolean;
};

const projects: ProjectData[] = [
  {
    slug: "ice-wear-store",
    cover: iceWearCover.src,
    title: "Ice Wear Store",
    description:
      "Página web para tienda de ropa ficticia con un agente de inteligencia artificial encargado de guiar a los clientes a través del catálogo de la tienda, recomendando artículos según preferencias del cliente. Con capacidad para entender imágenes y recomendar prendas parecidas a la imagen o encontrar la referencia exacta si la foto es del catálogo",
    tags: ["Inteligencia artificial", "Arquitectura de software"],
    priv: true,
    repo: "https://github.com/aquelaronte/ice-wear-store",
    video: "https://youtu.be/hqhJbz8XrlI",
    blocks: [
      {
        type: "p",
        content: (
          <>
            Ice Wear Store es un proyecto personal para mi portfolio que consta
            de un chatbot el cual guía a los clientes a través del catálogo de
            una tienda, dicho chatbot tiene la capacidad de encontrar prendas en
            la base de datos según la descripción del usuario y entender
            imágenes.
          </>
        ),
      },
      {
        type: "p",
        content: (
          <>
            Este proyecto consta de un repositorio público el cual contiene
            dentro 3 proyectos de backend y 1 de frontend:
            <ol className="ml-10 list-decimal">
              <li>
                <b>Frost AI (python):</b> Maneja todo lo referente al modelo de
                inteligencia artificial y expone un endpoint público para poder
                recibir peticiones. No maneja autenticación en las peticiones
                debido a la intención de no hacer el proyecto público.
              </li>
              <li>
                <b>Web Scraper (python):</b> Se encarga de obtener el catálogo
                de ropa extrayéndolo de dos páginas externas: <u>undergold</u> y{" "}
                <u>clemont</u>. Funciona para la mayoría de tiendas de ropa
                hechas con shopify.
              </li>
              <li>
                <b>Main Server (go):</b> El backend gateway principal, maneja la
                base de datos y la comunicación con el cliente. Se conecta con
                el resto de backends.
              </li>
              <li>
                <b>Web Client (react):</b> El cliente web para conectarse al{" "}
                <i>Main Server.</i>
              </li>
            </ol>
          </>
        ),
      },
      {
        type: "p",
        content:
          "Mira por qué escogí el stack y la arquitectura de software en el artículo de mi blog.",
      },
    ],
    article: "#",
  },
  {
    slug: "dayvent",
    cover: dayventCover.src,
    title: "Dayvent",
    description:
      "Sistema para manejo de restaurantes con soporte para gestión de empleados, ventas, inventario y facturación electrónica con la DIAN. Con múltiples clientes activos bajo un modelo de suscripción mensual.",
    tags: [
      "Arquitectura de software",
      "Diseño de bases de datos",
      "Diseño web",
    ],
    blocks: [
      {
        type: "p",
        content: (
          <>
            Dayvent es un proyecto para gestión de restaurantes encargado de
            manejar la fidelización de clientes, ventas y cumplimiento de
            responsabilidades tributarias.
          </>
        ),
      },
      {
        type: "p",
        content: (
          <>
            Para este proyecto en conjunto, el rol que asumí es de{" "}
            <u>tech lead</u>. Me encargué del diseño de la arquitectura de
            software abarcando la infraestructura tecnológica montada en{" "}
            <i>Google Cloud Platform (GCP)</i>, el backend en <i>go</i> y el
            frontend con <i>vite + react</i>.
          </>
        ),
      },
      {
        type: "p",
        content: (
          <>
            Para el diseño de este SaaS, balanceé mis decisiones técnicas entre
            productividad y rendimiento. Donde afectan diversos factores como el
            conocimiento técnico del equipo, los tiempos de entrega continuos
            con los stakeholders, el deadline para la entrega del MVP y la
            expectativa de rendimiento.
          </>
        ),
      },
      {
        type: "p",
        content:
          "Mira por qué escogí esta arquitectura, el rendimiento del sistema y otros problemas técnicos que enfrenté en el artículo de mi blog.",
      },
    ],
    link: "https://dayvent.app/",
    article: "/blog/dayvent-how-i-structured-a-pos-system-from-scratch",
  },
];

// Reveals its element once it scrolls into the given scroll container.
function useInView<T extends HTMLElement>(
  root?: React.RefObject<HTMLElement | null>,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { root: root?.current ?? null, threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [root]);

  return { ref, inView };
}

export default function Navigator({
  className,
  onClose,
  onOpenTestimonials,
}: {
  className?: string;
  onClose?: () => void;
  onOpenTestimonials?: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  // browser-like history of visited routes (null = project list)
  const [history, setHistory] = useState<(string | null)[]>([null]);
  const [index, setIndex] = useState(0);

  const route = history[index];
  const active = projects.find((project) => project.slug === route) ?? null;
  const canBack = index > 0;
  const canForward = index < history.length - 1;

  // navigate to a new route, dropping any forward entries (like a real browser)
  const navigate = (next: string | null) => {
    setHistory((prev) => [...prev.slice(0, index + 1), next]);
    setIndex((prev) => prev + 1);
  };

  const back = () => canBack && setIndex((prev) => prev - 1);
  const forward = () => canForward && setIndex((prev) => prev + 1);

  // gmail-style contact compose popup
  const [composing, setComposing] = useState(false);

  // scroll back to top whenever the visible route changes
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [index]);

  const url = active ? `my-projects/${active.slug}.html` : "my-projects.html";

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-white text-neutral-800 shadow-2xl select-none",
        className,
      )}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-100 px-3 py-2 sm:gap-3 sm:px-4">
        <WindowDots onClose={onClose} />

        {/* nav controls */}
        <div className="flex items-center gap-1 text-lg leading-none text-neutral-400">
          <button
            type="button"
            onClick={back}
            className="grid size-7 place-items-center rounded hover:bg-neutral-200 disabled:opacity-40"
            disabled={!canBack}
            aria-label="Back"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={forward}
            className="grid size-7 place-items-center rounded hover:bg-neutral-200 disabled:opacity-40"
            disabled={!canForward}
            aria-label="Forward"
          >
            &#8250;
          </button>
        </div>

        {/* address bar */}
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-neutral-400 ring-1 ring-neutral-200">
          <Lock size={13} className="shrink-0" />
          <span className="truncate">{url}</span>
        </div>

        {onOpenTestimonials && (
          <button
            type="button"
            onClick={onOpenTestimonials}
            className="flex shrink-0 items-center gap-1.5 rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600 ring-1 ring-neutral-300 hover:bg-neutral-200"
            aria-label="Abrir testimonials"
          >
            <Gamepad2 size={14} />
            <span className="hidden sm:inline">Testimonials</span>
          </button>
        )}
      </div>

      {/* points up toward the "Testimonials" button in the browser chrome */}
      {onOpenTestimonials && (
        <div className="pointer-events-none absolute top-16 right-6 z-10 flex animate-bounce flex-col items-center gap-1 text-neutral-500">
          <ArrowUp className="size-6" />
          <span className="text-sm font-medium">Prueba el juego</span>
        </div>
      )}

      {/* page content */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-10 overflow-y-auto bg-white px-5 py-6 sm:px-20 sm:py-10"
      >
        {active ? (
          <ProjectDetail project={active} onBack={back} />
        ) : (
          projects.map((project) => (
            <Project
              key={project.slug}
              project={project}
              scrollRoot={scrollRef}
              onOpen={() => navigate(project.slug)}
            />
          ))
        )}
      </div>

      {/* contact (gmail-style) */}
      {composing ? (
        <ContactCompose onClose={() => setComposing(false)} />
      ) : (
        <button
          type="button"
          onClick={() => setComposing(true)}
          className="absolute right-6 bottom-6 z-10 flex items-center gap-2 rounded-full bg-[#0b57d0] px-5 py-3 text-sm font-medium text-white shadow-lg hover:bg-[#0a4bb8]"
        >
          <Mail size={18} />
          Contáctame
        </button>
      )}
    </div>
  );
}

function ContactCompose({ onClose }: { onClose: () => void }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.open(href, "_blank");
    onClose();
  };

  return (
    <form
      onSubmit={send}
      className="absolute inset-x-2 bottom-2 z-20 flex h-[70vh] flex-col overflow-hidden rounded-lg bg-white text-sm text-neutral-800 shadow-2xl ring-1 ring-black/10 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:h-112 sm:w-104 sm:rounded-t-lg"
    >
      {/* header */}
      <div className="flex items-center justify-between bg-[#404040] px-4 py-2 text-white">
        <span className="font-medium">Mensaje nuevo</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="grid size-6 place-items-center rounded hover:bg-white/15"
        >
          <X size={16} />
        </button>
      </div>

      {/* to (fixed) */}
      <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-2">
        <span className="text-neutral-500">Para</span>
        <span>{CONTACT_EMAIL}</span>
      </div>

      {/* subject */}
      <input
        value={subject}
        onChange={(event) => setSubject(event.target.value)}
        placeholder="Asunto"
        required
        className="border-b border-neutral-200 px-4 py-2 outline-none placeholder:text-neutral-400"
      />

      {/* body */}
      <textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Escribe tu mensaje..."
        required
        className="flex-1 resize-none px-4 py-3 outline-none placeholder:text-neutral-400"
      />

      {/* footer */}
      <div className="flex items-center px-4 py-3">
        <button
          type="submit"
          className="rounded-full bg-[#0b57d0] px-6 py-2 font-medium text-white hover:bg-[#0a4bb8]"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}

function Project({
  project,
  scrollRoot,
  onOpen,
}: {
  project: ProjectData;
  scrollRoot?: React.RefObject<HTMLElement | null>;
  onOpen: () => void;
}) {
  const { cover, title, description, tags, link, priv, repo } = project;
  const { ref, inView } = useInView<HTMLDivElement>(scrollRoot);

  return (
    <div
      ref={ref}
      className={cn(
        "flex w-full flex-col items-start justify-between gap-5 transition-all duration-700 ease-out sm:flex-row sm:items-center sm:gap-10",
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
    >
      <img src={cover} className="h-auto w-full rounded-lg sm:w-[40%]" />

      <div className="flex flex-col gap-3 py-4">
        <h3 className="font-sans! text-2xl sm:text-3xl">{title}</h3>

        <p>{description}</p>

        {priv && (
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <Lock size={18} className="mt-0.5 shrink-0" />
            <p>
              Proyecto protegido por motivos de seguridad. Envíame un email para
              obtener acceso
            </p>
          </div>
        )}

        {link && (
          <a
            className="ml-2 cursor-pointer text-blue-600 underline"
            href={link}
            target="_blank"
          >
            Visitar página web
          </a>
        )}

        <div className="flex flex-row flex-wrap items-center gap-2">
          {tags.map((tag, i) => (
            <div
              key={i}
              className="rounded-full bg-neutral-700 px-4 py-1 text-sm text-white"
            >
              {tag}
            </div>
          ))}
        </div>

        <div className="mt-2 flex flex-row flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onOpen}
            className="w-fit cursor-pointer rounded-full bg-neutral-900 px-5 py-2 text-sm text-white hover:bg-neutral-700"
          >
            Ver más
          </button>

          {repo && (
            <a
              href={repo}
              target="_blank"
              className="flex w-fit items-center gap-2 rounded-full border border-neutral-900 px-5 py-2 text-sm text-neutral-900 hover:bg-neutral-100"
            >
              <SiGithub size={16} />
              Ver repositorio
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

type Block =
  { type: "p"; content: ReactNode } | { type: "img"; content: string };

function ProjectDetail({
  project,
  onBack,
}: {
  project: ProjectData;
  onBack?: () => void;
}) {
  const { cover, title, blocks = [], repo, video, article } = project;

  return (
    <div className="flex flex-col gap-6 font-sans! text-lg text-neutral-700">
      <div className="relative -mx-5 -mt-6 sm:-mx-20 sm:-mt-10">
        {/* image + overlaid title: the title anchors to this box, not the
            whole header, so mobile buttons below never overlap it */}
        <div className="relative">
          <img
            src={cover}
            className="h-56 w-full object-cover object-center sm:h-72"
          />

            {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="absolute top-5 left-5 flex w-fit items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm ring-1 ring-black/10 backdrop-blur hover:bg-white sm:left-20"
            >
              <ArrowLeft size={16} />
              Volver
            </button>
          )}

          {/* fade starting around the middle of the image down to the page */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-white via-white/80 to-transparent" />

          <h2 className="absolute bottom-5 left-5 font-sans! text-3xl font-medium text-neutral-900 sm:left-20 sm:text-5xl">
            {title}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 px-5 pt-4 sm:absolute sm:right-20 sm:bottom-7 sm:px-0 sm:pt-0">
          {repo && (
            <a
              href={repo}
              target="_blank"
              className="flex w-fit items-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm text-white hover:bg-neutral-700"
            >
              <SiGithub size={16} />
              Ver repositorio
            </a>
          )}

          {video && (
            <a
              href={video}
              target="_blank"
              className="flex w-fit items-center gap-2 rounded-full bg-red-600 px-5 py-2 text-sm text-white hover:bg-red-700"
            >
              <SiYoutube size={16} />
              Ver video
            </a>
          )}

          {article && (
            <a
              href={article}
              target="_blank"
              className="flex w-fit items-center gap-2 rounded-full border border-neutral-900 px-5 py-2 text-sm text-neutral-900 hover:bg-neutral-100"
            >
              <Newspaper size={16} />
              Ver artículo
            </a>
          )}
        </div>
      </div>

      {blocks.map((block, i) =>
        block.type === "p" ? (
          <p key={i} className="whitespace-pre-line">
            {block.content}
          </p>
        ) : (
          <img key={i} src={block.content} />
        ),
      )}
    </div>
  );
}
