# Contexto do projeto: Portfólio "Now Playing"

Este documento resume tudo o que foi decidido na conversa de design, para continuar o trabalho no código.

## Objetivo

Portfólio pessoal de desenvolvedor de software. Ele mostra as principais competências e os projetos pessoais do GitHub.

A inspiração são três imagens de referência com o tema "player de música":
- cards de player em vidro fosco flutuando ao redor de uma pessoa;
- linhas de órbita ao redor da pessoa;
- um coverflow de capas de álbum com uma barra de player embaixo.

## Leitura de design (taste-skill)

> Portfólio de desenvolvedor para recrutadores e tech leads, com linguagem de player de música em vidro fosco, puxando para CSS nativo (aproximação web de glassmorphism) com movimento fluido e contido.

| Ajuste | Valor | Por quê |
|---|---|---|
| `DESIGN_VARIANCE` | 7 | Preset de portfólio dev (6), +1 pelo pedido de visual marcante |
| `MOTION_INTENSITY` | 6 | O usuário pediu "animações fluidas" |
| `VISUAL_DENSITY` | 4 | Espaçamento padrão, leitura rápida para recrutadores |

A taste-skill está em `.claude/skills/taste-skill/SKILL.md`. Rode o **Final Pre-Flight Check** (seção 14 dela) antes de considerar qualquer mudança visual pronta.

## Stack

- **Next.js 16** (App Router, Cache Components ligado). Esta versão tem APIs diferentes das versões antigas. Consulte `node_modules/next/dist/docs/` antes de mexer em cache, dados ou rotas (veja `AGENTS.md`).
- **TypeScript**, **Tailwind CSS v4** (tokens em `src/app/globals.css`, via `@theme inline`).
- **Motion** (`motion/react`) para o coverflow, o progresso do player e a revelação no scroll.
- **Phosphor Icons**: em Server Components use `@phosphor-icons/react/ssr`; em Client Components use `@phosphor-icons/react`.
- **Fontes auto-hospedadas** via Fontsource: Sora Variable (texto) e JetBrains Mono (detalhes técnicos). Não use `<link>` do Google Fonts.

## Onde fica cada coisa

| Arquivo | O que é |
|---|---|
| `src/content/site.ts` | **Todo o conteúdo editável**: nome, frase, e-mail, GitHub, LinkedIn, foto, competências, repositórios em destaque |
| `src/lib/github.ts` | Busca os repositórios na API do GitHub no servidor (`"use cache"` + `cacheLife("hours")`), com dados de exemplo como reserva |
| `src/app/globals.css` | Tokens de cor (claro e escuro), utilitário `glass`, bento, animações |
| `src/app/layout.tsx` | Fontes, metadados (SEO e Open Graph), script anti-"piscar" de tema |
| `src/components/Hero.tsx` | Hero dividido: texto à esquerda, foto com faixas orbitando à direita |
| `src/components/Skills.tsx` | Bento de competências |
| `src/components/ProjectsPlayer.tsx` | Coverflow + barra de player com autoplay (Client Component) |
| `src/components/Contact.tsx` | Chamada de contato com os canais |
| `src/components/Reveal.tsx` | Revelação suave ao entrar na tela |

## Sistema visual

**Cor: um único acento.** O âmbar `#E8A33D` é usado na página toda. No modo claro, textos em acento usam `--accent-deep` (`#805A22`) para manter o contraste. Não adicione outras cores de destaque. O único verde é o ponto de "Disponível", que indica um estado real.

**Tema.** Segue o sistema por padrão. O botão na navegação fixa claro ou escuro e salva a escolha em `localStorage`. Todas as cores vêm de variáveis CSS (`--bg`, `--surface`, `--text`, `--muted` etc.). Sempre teste os dois modos.

**Regra de forma** (trava de forma da taste-skill):
- Botões, controles, navegação e barra do player: pílula (`rounded-full`).
- Superfícies (cards, tiles, capas grandes, painel de contato): 24px (`rounded-surface`).
- Capas pequenas e miniaturas: 12px (`rounded-thumb`).

**Vidro fosco.** O utilitário `glass` é uma aproximação web com `backdrop-filter`, borda interna e realce. Não é o Liquid Glass da Apple. Ele tem versão sólida para `prefers-reduced-transparency`.

**Capas de projeto.** Variam por luminosidade (`cv-a` acento, `cv-b` sólido, `cv-c` invertido), não por cor.

## Animações e o motivo de cada uma

Toda animação precisa comunicar algo. Todas usam só `transform` e `opacity` e param com "reduzir movimento".

| Animação | O que comunica |
|---|---|
| Entrada do hero em sequência (CSS) | Ordem de leitura: rótulo, nome, frase, botões |
| Faixas flutuando e anel girando no hero | O conceito "player": as competências orbitam você |
| Equalizador | Estado tocando ou pausado (pausa junto com o player) |
| Coverflow com mola (`stiffness 100, damping 20`) | Troca de projeto (mudança de estado) |
| Barra de progresso do player | Tempo até o próximo projeto no autoplay |
| Revelação no scroll (`Reveal`) | Apresenta cada seção quando ela chega |
| Hover e clique nos botões e tiles | Feedback tátil |

O autoplay fica desligado para quem usa "reduzir movimento". O carrossel também responde às setas do teclado.

## Regras da taste-skill que já foram aplicadas

- Zero travessões (— ou –) em qualquer texto visível.
- Um rótulo de seção só (o "Tocando agora" do hero). Nada de rótulos numerados como "01 —".
- Títulos de seção com a frase de apoio embaixo, nunca flutuando ao lado.
- Hero com no máximo 4 elementos de texto, e a frase com até 20 palavras.
- Uma intenção por botão: "Falar comigo" (contato), "Ver projetos" (portfólio), "Currículo".
- Sem barras de "nível" de competência (eram números inventados).
- Bento com exatamente uma área por item (7 itens, 7 áreas).
- No máximo um separador "·" por linha.

## O que ainda falta

1. **Foto real**: coloque em `public/` (retrato 3:4, cerca de 640x800) e defina `site.photo` em `src/content/site.ts`.
2. **Textos reais**: tudo que está entre colchetes em `src/content/site.ts`.
3. **GitHub**: defina `site.github` com seu usuário. Marque no GitHub os repositórios a exibir com o topic `portfolio` (`site.githubTopic`); sem nenhum marcado, a página usa `site.fallbackProjects`. Opcional: crie `.env.local` com `GITHUB_TOKEN` (veja `.env.example`).
4. **Competências reais**: edite `site.skills`. Se mudar a quantidade de itens, ajuste `grid-template-areas` do `.bento` em `globals.css` para continuar sem células vazias.
5. **Currículo**: coloque o PDF em `public/curriculo.pdf` (ou mude `site.resumeUrl`).
6. **Imagem de compartilhamento**: criar `src/app/opengraph-image.tsx` para o preview no LinkedIn e no WhatsApp.

## Ideias para depois

- Página de detalhe por projeto ("letra da música": problema, solução, o que aprendeu).
- Seção "Wrapped" com a retrospectiva do ano.
- Ler o README de cada repositório para gerar a descrição automaticamente.
