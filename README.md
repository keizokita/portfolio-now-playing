# Portfólio "Now Playing"

Portfólio pessoal de Leonardo Kita, desenvolvedor full stack (Java, Angular e IA no ciclo de desenvolvimento).

A interface usa a linguagem de um player de música: as competências orbitam a foto como faixas, os projetos do GitHub aparecem num coverflow de capas de álbum e uma barra de player troca de projeto sozinha.

## Destaques

- **Hero de player**: cards de vidro fosco flutuando ao redor da foto, com anel girando e equalizador.
- **Bento de competências** com uma área por item, sem células vazias.
- **Coverflow de projetos** com mola, autoplay, barra de progresso e navegação pelas setas do teclado.
- **Projetos vindos do GitHub**: o servidor busca os repositórios e guarda o resultado em cache por 1 hora.
- **Tema claro e escuro** que segue o sistema, com escolha salva e sem "piscar" no carregamento.
- **Acessível**: contraste WCAG AA nos dois temas e todas as animações param com "reduzir movimento".

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components)
- TypeScript e Tailwind CSS v4
- [Motion](https://motion.dev) para o coverflow e as revelações no scroll
- Phosphor Icons
- Fontes auto-hospedadas: Sora Variable e JetBrains Mono

## Rodando localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

Opcional: copie `.env.example` para `.env.local` e defina `GITHUB_TOKEN` para aumentar o limite de requisições da API do GitHub.

## Escolhendo os projetos exibidos

Os projetos são os repositórios marcados com o topic `portfolio` no GitHub (até 6, os atualizados por último primeiro).

1. Abra o repositório no GitHub.
2. Clique na engrenagem ao lado de "About".
3. Adicione o topic `portfolio`.

A mudança aparece no site em até 1 hora. Sem nenhum repositório marcado, a página usa os projetos de `fallbackProjects`.

## Personalizando

Todo o conteúdo editável fica em `src/content/site.ts`: nome, frase, contatos, competências e projetos de reserva. As decisões de design, a regra de cores e formas e o que ainda falta fazer estão em `CONTEXTO.md`.

## Estrutura

| Caminho | O que é |
|---|---|
| `src/content/site.ts` | Conteúdo editável |
| `src/lib/github.ts` | Busca e cache dos repositórios |
| `src/components/` | Seções da página (Hero, Skills, ProjectsPlayer, Contact) |
| `src/app/globals.css` | Tokens de cor, utilitário `glass`, bento e animações |
| `public/curriculo.pdf` | Currículo baixado pelo botão do hero |

## Build

```bash
npm run lint
npm run build
npm start
```
