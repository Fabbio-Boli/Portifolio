import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug);
  return project
    ? { title: `${project.title} | Fabbio Boli`, description: project.summary }
    : { title: "Projeto não encontrado | Fabbio Boli" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug((await params).slug);
  if (!project) notFound();
  const tags = [...(project.language ? [project.language] : []), ...project.topics];

  return (
    <>
      <main className="site-main project-detail">
        <Link className="back-link" href="/projetos">← Todos os projetos</Link>
        <section className="project-hero" aria-labelledby="project-title">
          <div>
            <p className="eyebrow">{project.caseStudy?.eyebrow ?? "Repositório público"}</p>
            <h1 id="project-title">{project.title}</h1>
            <p>{project.summary}</p>
            {tags.length > 0 && <ul className="tag-list">{tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>}
            <div className="project-links project-detail-links">
              {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer">Abrir repositório <span aria-hidden="true">↗</span></a>}
              {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer">Abrir demonstração <span aria-hidden="true">↗</span></a>}
            </div>
          </div>
          <Image className="project-detail-image" src={project.imageSrc} alt={project.imageAlt} width={1200} height={700} priority />
        </section>

        {project.caseStudy ? (
          <section className="case-study" aria-labelledby="case-study-title">
            <h2 id="case-study-title">Estudo de caso</h2>
            <p>{project.caseStudy.overview}</p>
            <h3>O que está documentado</h3>
            <ul>{project.caseStudy.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            <h3>Tecnologias e temas</h3>
            <ul className="tag-list">{project.caseStudy.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
            {project.caseStudy.note && <p className="project-note">{project.caseStudy.note}</p>}
          </section>
        ) : (
          <section className="case-study neutral-case-study" aria-labelledby="case-study-title">
            <h2 id="case-study-title">Contexto do repositório</h2>
            <p>Este projeto faz parte do catálogo público sincronizado. Um estudo de caso editorial ainda não foi revisado para esta entrada.</p>
          </section>
        )}

        {project.readmeExcerpt && (
          <section className="readme-excerpt" aria-labelledby="readme-title">
            <h2 id="readme-title">Trecho do README</h2>
            <p>{project.readmeExcerpt}</p>
          </section>
        )}
      </main>
    </>
  );
}
