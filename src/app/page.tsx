import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { site } from "@/content/site";

export default function Home() {
  return (
    <div className="relative overflow-x-clip">
      {/* Luzes de fundo: dão o que o vidro fosco desfocar. Estáticas de propósito. */}
      <div aria-hidden="true" className="orb -right-[180px] -top-[160px] size-[640px]" />
      <div aria-hidden="true" className="orb -left-[220px] top-[1250px] size-[560px]" />
      <div aria-hidden="true" className="orb -right-[240px] top-[2250px] size-[620px]" />

      {/* Atalho de teclado: aparece só ao receber foco. */}
      <a
        href="#conteudo"
        className="sr-only rounded-full bg-solid px-5 py-3 text-sm font-semibold text-text focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        Pular para o conteúdo
      </a>

      <div className="relative mx-auto max-w-[1240px] px-4 pb-10 pt-5">
        <Nav />
        <main id="conteudo" tabIndex={-1} className="outline-none">
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <footer className="px-1 pt-6 font-mono text-xs text-muted">© 2026 {site.name}</footer>
      </div>
    </div>
  );
}
