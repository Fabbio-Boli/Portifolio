import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Desenvolvedor Full Stack | Fabbio Boli",
  description:
    "Portfólio de Fabbio Boli, desenvolvedor Full Stack com foco em produtos digitais, integrações e experiências consistentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <Script id="theme-preference" strategy="beforeInteractive">{`try { const saved = localStorage.getItem('portfolio-theme'); document.documentElement.dataset.theme = saved === 'light' || saved === 'dark' ? saved : 'dark'; } catch {}`}</Script>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

