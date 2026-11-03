import Link from "next/link";
import { ContactLinks } from "@/components/ContactLinks";
import { ProjectFilters } from "@/components/ProjectFilters";
import { getProjects } from "@/lib/projects";

const stack = [
  { name: "Front-end & mobile", items: ["React & React Native", "TypeScript & JavaScript", "HTML & CSS", "Capacitor"] },
  { name: "Back-end", items: ["C# / .NET", "Python & Java", "PHP", "Node.js"] },
  { name: "Dados & integração", items: ["PostgreSQL & MySQL", "Supabase", "SQLite", "APIs & MQTT"] },
  { name: "Design & ferramentas", items: ["Figma & UI/UX", "Git & GitHub", "Arquitetura de sistemas", "Automação com Codex"] },
];

export default function Home() {
  const allProjects = getProjects();
  const projects = [...allProjects].sort((a, b) => Number(b.slug === "codex-automation-recommender") - Number(a.slug === "codex-automation-recommender"));
  return <main className="site-main home-page">
    <section id="sobre" className="hero" aria-labelledby="hero-title">
      <div><p className="eyebrow">FULL STACK · SOFTWARE · PRODUTO</p><h1 id="hero-title">DESENVOLVEDOR <span>FULL STACK</span><br />&amp; SOFTWARE</h1><p className="hero-copy">Olá, eu sou Fabbio Boli. Crio aplicações, interfaces e integrações que conectam pessoas, dados e tecnologia.</p><div className="hero-actions"><a className="primary-action" href="#projetos">Ver projetos <span aria-hidden="true">↗</span></a><a className="outline-action" href="#contato">&gt;_ Contato</a></div></div>
      <aside className="hero-aside" aria-label="Áreas de atuação"><span className="hero-code">&lt;fabbioboli /&gt;</span><p>Do front-end ao back-end, com interesse em arquitetura, automação e experiências digitais.</p><span className="hero-status">● disponível para conexões</span></aside>
    </section>
    <section className="home-section about-section" aria-labelledby="about-title"><p className="eyebrow">{"/* um pouco sobre mim */"}</p><h2 id="about-title">POR TRÁS DO CÓDIGO<span>.</span></h2><p>Sou Fabbio Boli, desenvolvedor Full Stack com formação em Engenharia de Computação e Web Design. Gosto de unir lógica, arquitetura e design para transformar ideias em soluções úteis, do aplicativo mobile aos sistemas e integrações.</p></section>
    <section id="trajetoria" className="home-section" aria-labelledby="journey-title"><p className="eyebrow">{"/* trajetória */"}</p><h2 id="journey-title">MINHA JORNADA<span>.</span></h2><div className="timeline"><article><p className="timeline-date">2026 · PROJETOS</p><h3>Produtos e automação</h3><p>Desenvolvimento do Nutri Nex e criação do Codex Automation Recommender, reunindo mobile, dados e ferramentas para desenvolvedores.</p></article><article><p className="timeline-date">2020 — 2025</p><h3>Engenharia de Computação · FIAP</h3><p>Formação em computação com projetos em equipe que conectam software, sistemas embarcados e nuvem.</p></article><article><p className="timeline-date">2011 — 2014</p><h3>Web Design · Microcamp</h3><p>Base em design de interfaces e estruturação visual para a web.</p></article></div></section>
    <section id="projetos" className="home-section projects-section" aria-labelledby="projects-title"><p className="eyebrow">{"/* projetos selecionados e sincronizados */"}</p><div className="section-intro"><div><h2 id="projects-title">CÓDIGO, DESIGN<br />E IDEIAS EM AÇÃO<span>.</span></h2><p>Conheça meus projetos e explore suas tecnologias. O Codex Automation Recommender abre a seleção.</p></div></div><ProjectFilters projects={projects} /></section>
    <section id="stack" className="home-section" aria-labelledby="stack-title"><p className="eyebrow">{"/* ferramentas e tecnologias */"}</p><h2 id="stack-title">MINHA STACK<span>.</span></h2><div className="skills-grid home-skills">{stack.map(group => <article className="skill-card" key={group.name}><h3>&gt;_ {group.name}</h3><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
    <section id="curriculo" className="home-section" aria-labelledby="resume-title"><div className="resume-box"><p className="eyebrow">{"/* minha experiência */"}</p><h2 id="resume-title">MEU CURRÍCULO<span>.</span></h2><p>Veja minha formação, competências e experiências em projetos.</p><a className="primary-action" href="/curriculo.pdf" download>Baixar currículo em PDF ↓</a><Link className="resume-more" href="/curriculo">Ver informações no site →</Link></div></section>
    <section id="contato" className="home-section contact-section" aria-labelledby="contact-title"><p className="eyebrow">{"/* vamos conversar */"}</p><h2 id="contact-title">VAMOS TRABALHAR<br />JUNTOS<span>?</span></h2><p>Tem uma oportunidade ou quer conversar sobre tecnologia? Entre em contato por um dos canais abaixo.</p><ContactLinks /></section>
  </main>;
}

