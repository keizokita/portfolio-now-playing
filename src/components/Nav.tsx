import { ChatCircleText, SquaresFour, VinylRecord } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { Equalizer } from "./Equalizer";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  return (
    <nav
      aria-label="Principal"
      className="glass rise flex h-16 items-center justify-between gap-3 rounded-full pl-4 pr-2.5 sm:gap-4 sm:pl-6"
    >
      {/* Abaixo de 640px o nome sai do menu (o hero logo abaixo já mostra) para caber os atalhos das seções. */}
      <a
        href="#topo"
        aria-label={site.name}
        className="flex h-11 items-center gap-2.5 whitespace-nowrap font-mono text-[15px] font-bold"
      >
        <Equalizer />
        <span className="hidden sm:inline">{site.name}</span>
      </a>
      {/* h-11: área de clique de 44px mesmo com o texto pequeno. */}
      <div className="hidden items-center gap-6 text-sm md:flex">
        <a href="#competencias" className="flex h-11 items-center px-1 text-muted transition-colors hover:text-text">
          Competências
        </a>
        <a href="#projetos" className="flex h-11 items-center px-1 text-muted transition-colors hover:text-text">
          Projetos
        </a>
      </div>
      <div className="flex items-center gap-1">
        {/* No celular os links das seções viram ícones. */}
        <a
          href="#competencias"
          aria-label="Competências"
          className="press grid size-11 place-items-center rounded-full text-text hover:bg-surface-2 md:hidden"
        >
          <SquaresFour size={20} weight="bold" />
        </a>
        <a
          href="#projetos"
          aria-label="Projetos"
          className="press grid size-11 place-items-center rounded-full text-text hover:bg-surface-2 md:hidden"
        >
          <VinylRecord size={20} weight="bold" />
        </a>
        <ThemeToggle />
        <a
          href="#contato"
          // Abaixo de 380px o botão vira só ícone; o texto fica para leitores de tela.
          className="press inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-text px-4 text-sm font-semibold text-bg max-[379px]:w-11 max-[379px]:px-0 sm:px-5"
        >
          <ChatCircleText size={20} weight="bold" aria-hidden="true" className="min-[380px]:hidden" />
          <span className="max-[379px]:sr-only">Falar comigo</span>
        </a>
      </div>
    </nav>
  );
}
