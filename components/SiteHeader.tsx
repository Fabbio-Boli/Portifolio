import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function SiteHeader() {
  return <header className="site-header"><Link className="wordmark" href="/#sobre" aria-label="Fabbio Boli, início"><span aria-hidden="true">&gt;_</span> FABBIO<span>.DEV</span></Link><div className="header-actions"><nav className="site-nav" aria-label="Navegação principal"><Link href="/#sobre">Sobre</Link><Link href="/#trajetoria">Trajetória</Link><Link href="/#projetos">Projetos</Link><Link href="/#stack">Stack</Link><Link href="/#curriculo">Currículo</Link><Link href="/#contato">Contato</Link></nav><ThemeToggle /></div></header>;
}
