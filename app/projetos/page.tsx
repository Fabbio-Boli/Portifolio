import { ProjectFilters } from "@/components/ProjectFilters";
import { getProjects } from "@/lib/projects";

export const metadata = {
  title: "Projetos | Fabbio Boli",
  description: "Catálogo de projetos, estudos de caso e repositórios públicos de Fabbio Boli.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <main className="site-main projects-page">
        <section className="page-intro" aria-labelledby="projects-title">
          <p className="eyebrow">Catálogo de projetos</p>
          <h1 id="projects-title">Trabalho, decisões e experimentos.</h1>
          <p>Uma seleção editorial e os repositórios públicos sincronizados. Estudos de caso são publicados apenas quando há material revisado.</p>
        </section>
        <ProjectFilters projects={projects} />
      </main>
    </>
  );
}
