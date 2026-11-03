export const metadata = { title: "Currículo | Fabbio Boli", description: "Formação e competências de Fabbio Boli, desenvolvedor Full Stack." };

const skills = [
  ["Frontend", "React, JavaScript, TypeScript, HTML e CSS"],
  ["Backend", "Node.js, Python, PHP, C e C#"],
  ["Mobile", "React Native, Capacitor e Android Studio"],
  ["Dados", "PostgreSQL, MySQL e Supabase"],
  ["Ferramentas", "Git, GitHub, Figma e Adobe"],
];

export default function ResumePage() {
  return <main className="site-main profile-page"><section className="page-intro"><p className="eyebrow">Currículo</p><h1>Experiência e competências.</h1><p>Uma visão das tecnologias, formação e experiências que fazem parte da minha trajetória.</p><a className="download-link" href="/curriculo.pdf" download>Baixar currículo em PDF ↓</a></section>
    <section className="resume-section"><h2>Formação</h2><h3>Engenharia de Computação — FIAP (2020–2025)</h3><p>Formação técnica em Web Design — Microcamp (2011–2014)</p></section>
    <section className="resume-section"><h2>Competências</h2><div className="skills-grid">{skills.map(([title, details]) => <div className="skill-card" key={title}><h3>{title}</h3><p>{details}</p></div>)}</div></section>
    <section className="resume-section"><h2>Experiência</h2><h3>Nutri Nex · Desenvolvimento de software (2026)</h3><p>Aplicação mobile com React Native, Capacitor e Supabase, conforme descrito no currículo.</p><h3>Auxiliar de Backoffice · Atento (2015–2016)</h3><p>Apoio operacional, controle de estoque e atendimento.</p></section>
  </main>;
}
