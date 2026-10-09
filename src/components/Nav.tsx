import { site } from "@/content/site";
import { Equalizer } from "./Equalizer";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <nav
      aria-label="Principal"
      className="glass rise flex h-16 items-center justify-between gap-4 rounded-full pl-6 pr-2.5"
    >
      <a href="#topo" className="flex items-center gap-2.5 whitespace-nowrap font-mono text-[15px] font-bold">
        <Equalizer />
        {site.name}
      </a>
      <div className="hidden items-center gap-8 text-sm md:flex">
        <a href="#competencias" className="text-muted transition-colors hover:text-text">
          Competências
        </a>
        <a href="#projetos" className="text-muted transition-colors hover:text-text">
          Projetos
        </a>
      </div>
      <div className="flex items-center gap-1">
        <ThemeToggle />
        <a
          href="#contato"
          className="press inline-flex h-11 items-center whitespace-nowrap rounded-full bg-text px-5 text-sm font-semibold text-bg"
        >
          Falar comigo
        </a>
      </div>
    </nav>
  );
}
