import Link from "next/link";

export const metadata = { title: "Sobre | Fabbio Boli", description: "Conheça Fabbio Boli e suas áreas de interesse em desenvolvimento de software." };

export default function AboutPage() {
  return <main className="site-main profile-page"><section className="page-intro"><p className="eyebrow">Sobre</p><h1>Ideias, código e aprendizado.</h1><p>Sou Fabbio Boli, desenvolvedor Full Stack com experiência em projetos que passam por interfaces, aplicações mobile, serviços e bancos de dados.</p><p>Meu interesse está em conectar as partes de um produto digital e transformar desafios em soluções úteis. Neste portfólio, compartilho projetos e o contexto documentado de cada um.</p><Link className="section-link" href="/projetos">Conheça os projetos →</Link></section></main>;
}
