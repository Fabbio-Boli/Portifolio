import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/lib/projects";

export function ProjectCard({ project }: { project: PortfolioProject }) {
  const tags = [...(project.language ? [project.language] : []), ...project.topics];

  return (
    <article className="project-card">
      <Link className="project-image-link" href={`/projetos/${project.slug}`} aria-label={`Ver detalhes de ${project.title}`}>
        <Image
          className="project-image"
          src={project.imageSrc}
          alt={project.imageAlt}
          width={1200}
          height={700}
        />
      </Link>
      <div className="project-card-body">
        <h2><Link href={`/projetos/${project.slug}`}>{project.title}</Link></h2>
        <p>{project.summary}</p>
        {tags.length > 0 && (
          <ul className="tag-list" aria-label={`Tecnologias e temas de ${project.title}`}>
            {tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        )}
        <div className="project-links">
          <Link href={`/projetos/${project.slug}`}>Ver projeto <span aria-hidden="true">→</span></Link>
          {project.repositoryUrl && <a href={project.repositoryUrl} target="_blank" rel="noreferrer">Repositório <span aria-hidden="true">↗</span></a>}
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer">Demonstração <span aria-hidden="true">↗</span></a>}
        </div>
      </div>
    </article>
  );
}
