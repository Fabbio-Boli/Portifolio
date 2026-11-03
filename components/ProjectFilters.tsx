"use client";

import { useMemo, useState } from "react";
import type { PortfolioProject } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectFilters({ projects }: { projects: PortfolioProject[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("");
  const topics = [...new Set(projects.flatMap((project) => project.topics))].sort();
  const languages = [...new Set(projects.flatMap((project) => project.language ? [project.language] : []))].sort();
  const visibleProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return projects.filter((project) => {
      const haystack = [project.title, project.summary, project.language, ...project.topics].filter(Boolean).join(" ").toLocaleLowerCase("pt-BR");
      return (!normalizedQuery || haystack.includes(normalizedQuery)) && (!topic || project.topics.includes(topic)) && (!language || project.language === language);
    });
  }, [language, projects, query, topic]);

  if (projects.length === 0) {
    return <p className="empty-state">Ainda não há projetos públicos para mostrar.</p>;
  }

  return (
    <>
      <form className="project-filters" onSubmit={(event) => event.preventDefault()}>
        <label>
          Buscar projetos
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nome, tecnologia ou tema" type="search" />
        </label>
        <label>
          Tema
          <select value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="">Todos os temas</option>
            {topics.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          Linguagem
          <select value={language} onChange={(event) => setLanguage(event.target.value)}>
            <option value="">Todas as linguagens</option>
            {languages.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </form>
      {visibleProjects.length > 0 ? (
        <div className="project-grid">{visibleProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
      ) : (
        <p className="empty-state">Nenhum projeto corresponde a estes filtros. Tente outra busca ou remova um filtro.</p>
      )}
    </>
  );
}
