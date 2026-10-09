// Todo o conteúdo editável do portfólio fica aqui.
// Troque os valores entre colchetes pelos seus dados reais.

export type Project = {
  name: string;
  description: string;
  stack: string[];
  url: string;
};

export type Skill = {
  /** Posição no bento. A grade espera exatamente estas 7 áreas: f, a, b, c, d, e, g. */
  area: "f" | "a" | "b" | "c" | "d" | "e" | "g";
  /** featured = card grande em destaque; glass = card de vidro; inverse = card de cor invertida; wide = card largo de vidro */
  variant: "featured" | "glass" | "inverse" | "wide";
  name: string;
  abbr: string;
  role: string;
};

export const site = {
  name: "Leonardo Kita",
  role: "Desenvolvedor full stack",
  // Até 20 palavras (regra da taste-skill para o hero).
  tagline: "Construo sistemas em Java 17 e Angular e uso IA para modernizar código legado com mais testes.",
  available: true,
  email: "keizokato@gmail.com",
  // Usuário do GitHub. Enquanto for "seu-usuario", a página usa os projetos de exemplo abaixo.
  github: "keizokita",
  linkedin: "leonardo-keizo-kita",
  resumeUrl: "/curriculo.pdf",
  // Caminho dentro de /public, por exemplo "/foto.jpg". null mostra o espaço reservado.
  photo: null as string | null,
  contactLine: "Procuro vagas de desenvolvedor full stack com Java e Angular, em times que usam IA no dia a dia.",

  // Faixas que flutuam ao redor da foto no hero. A primeira vira o card grande do player.
  heroTracks: [
    { abbr: "J17", name: "Java 17", role: "Linguagem principal" },
    { abbr: "Ng", name: "Angular", role: "Interfaces" },
    { abbr: "Sb", name: "Spring Boot", role: "APIs REST" },
  ],

  featuredSkill: {
    title: "Java 17 e Angular",
    description:
      "Migrei sozinho um sistema fiscal de 12 anos para Java 17 e mais de 60 telas de AngularJS para Angular.",
    years: "4 anos de experiência",
  },

  skills: [
    { area: "a", variant: "glass", name: "Spring Boot", abbr: "Sb", role: "APIs REST com JPA e Hibernate" },
    { area: "b", variant: "glass", name: "TypeScript", abbr: "TS", role: "Front-end tipado" },
    { area: "c", variant: "glass", name: "Bancos SQL", abbr: "SQL", role: "SQL Server, Oracle e PostgreSQL" },
    { area: "d", variant: "glass", name: "Git", abbr: "Gt", role: "Code review e trabalho em equipe" },
    { area: "e", variant: "inverse", name: "IA no desenvolvimento", abbr: "IA", role: "Análise de código, refatoração e testes" },
    { area: "g", variant: "wide", name: "Docker e CI/CD", abbr: "Dk", role: "Ambientes e deploy automatizado" },
  ] satisfies Skill[],

  // Topic do GitHub que marca os repositórios exibidos no portfólio (até 6, os atualizados por último primeiro).
  // Para mostrar ou esconder um repositório, adicione ou remova esse topic no GitHub.
  githubTopic: "portfolio",

  // Usados enquanto o GitHub não estiver configurado, se a API falhar ou se nenhum repositório tiver o topic.
  // A descrição daqui também substitui a do GitHub quando o nome do repositório bate.
  fallbackProjects: [
    { name: "watchlytics", description: "Descoberta de filmes, séries e animes por swipe, com match entre amigos", stack: ["TypeScript", "React"], url: "https://github.com/keizokita/watchlytics" },
    { name: "watchlytics-application-backend", description: "Back-end de análise e descoberta de filmes sobre a API do TMDB", stack: ["Java", "Spring Boot"], url: "https://github.com/keizokita/watchlytics-application-backend" },
    { name: "task-manager-backend", description: "Gestão de tarefas para times de desenvolvimento, com prioridades e progresso", stack: ["Java", "Spring Boot"], url: "https://github.com/keizokita/task-manager-backend" },
    { name: "anymarket-extension", description: "Extensão do VS Code que ajuda a seguir os padrões do front-end da Anymarket", stack: ["VS Code", "TypeScript"], url: "https://github.com/keizokita/anymarket-extension" },
    { name: "tcc-project-back", description: "Back-end do trabalho de conclusão de curso em Sistemas de Informação", stack: ["Java", "Spring Boot"], url: "https://github.com/keizokita/tcc-project-back" },
  ] satisfies Project[],
};
