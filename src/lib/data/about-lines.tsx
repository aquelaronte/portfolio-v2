import type { TerminalLine } from "@/components/organisms/terminal";
import me from "@/assets/me.jpeg";

export const aboutLines: TerminalLine[] = [
  {
    content: "Hola, soy Brahian Arias.",
    prompt: true,
  },
  {
    content: "Software Engineer.",
  },
  {
    content:
      "Soy un desarrollador de software con una trayectoria altamente acelerada debido a mi alto compromiso y convicción con mi carrera. Llevándome a participar en proyectos en producción a gran escala donde mis principales roles técnicos son:",
  },
  {
    content: (
      <>
        • Desarrollo de sistemas <u>backend</u> y{" "}
        <u>diseño de bases de datos</u>.
      </>
    ),
    tabLevel: 1,
  },
  {
    content: (
      <>
        • Arquitectura de software, donde he manejado el planteamiento y
        ejecución de la infraestructura con los proveedores estándar de la
        industria: <u>Amazon Web Services (AWS)</u> y{" "}
        <u>Google Cloud Platform (GCP)</u>.
      </>
    ),
    tabLevel: 1,
  },
  {
    content: (
      <>
        • Integración de <u>agentes de inteligencia artificial (IA)</u> en
        negocios y aplicaciones empresariales, implementando habilidades para
        contextualización de modelos de lenguaje (RAG) y ajustes de modelos para
        casos precisos de negocio (fine-tuning).
      </>
    ),
    tabLevel: 1,
  },
  {
    content: <img src={me.src} className="mt-6 size-80 object-cover" />,
    tabLevel: 1,
  },
  {
    content: (
      <>
        Presiona <u>Enter</u> para continuar o <u>'q'</u> para ir al escritorio
      </>
    ),
    prompt: true,
  },
];
