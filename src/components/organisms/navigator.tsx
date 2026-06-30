import { cn } from "@/lib/helpers/cn";
import dayventCover from "@/assets/projects/dayvent/cover.png";
import iceWearCover from "@/assets/projects/ice-wear/cover.png";
import { Lock, Newspaper } from "lucide-react";
import { SiGithub, SiYoutube } from "@icons-pack/react-simple-icons";
import { useEffect, useRef, useState, type ReactNode } from "react";

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
    article: "#",
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

export default function Navigator({ className }: { className?: string }) {
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

  // scroll back to top whenever the visible route changes
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [index]);

  const url = active ? `my-projects/${active.slug}.html` : "my-projects.html";

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-xl bg-white text-neutral-800 shadow-2xl select-none",
        className,
      )}
    >
      {/* browser chrome */}
      <div className="flex items-center gap-3 border-b border-neutral-200 bg-neutral-100 px-4 py-2">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-500"></span>
          <span className="size-3 rounded-full bg-yellow-500"></span>
          <span className="size-3 rounded-full bg-green-500"></span>
        </div>

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
        <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-neutral-400 ring-1 ring-neutral-200">
          <Lock size={13} />
          <span>{url}</span>
        </div>
      </div>

      {/* page content */}
      <div
        ref={scrollRef}
        className="flex flex-1 flex-col gap-10 overflow-y-auto bg-white px-20 py-10"
      >
        {active ? (
          <ProjectDetail project={active} />
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
    </div>
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
        "flex w-full flex-row items-center justify-between gap-10 transition-all duration-700 ease-out",
        inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
      )}
    >
      <img src={cover} className="h-auto w-[40%] rounded-lg" />

      <div className="flex flex-col gap-3 py-4">
        <h3 className="font-sans! text-3xl">{title}</h3>

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

function ProjectDetail({ project }: { project: ProjectData }) {
  const { cover, title, blocks = [], repo, video, article } = project;

  return (
    <div className="flex flex-col gap-6 font-sans! text-lg text-neutral-700">
      <div className="relative -mx-20 -mt-10">
        <img src={cover} className="h-72 w-full object-cover object-center" />

        {/* fade starting around the middle of the image down to the page */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-white via-white/80 to-transparent" />

        <h2 className="absolute bottom-5 left-20 font-sans! text-5xl font-medium text-neutral-900">
          {title}
        </h2>

        <div className="absolute right-20 bottom-7 flex items-center gap-3">
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
