import { cacheLife } from "next/cache";
import { site, type Project } from "@/content/site";

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
};

/**
 * Busca os repositórios no servidor e guarda o resultado em cache por algumas horas.
 * Opcional: defina GITHUB_TOKEN no .env.local para um limite maior de requisições.
 */
export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("hours");

  const user = site.github;
  if (!user || user === "seu-usuario") return site.fallbackProjects;

  try {
    const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=100&sort=updated`,
      { headers },
    );
    if (!res.ok) return site.fallbackProjects;

    const repos = ((await res.json()) as GitHubRepo[]).filter((r) => !r.fork && !r.archived);

    // A API já devolve os repositórios do atualizado por último ao mais antigo.
    const selected = repos.filter((r) => r.topics?.includes(site.githubTopic)).slice(0, 6);

    if (!selected.length) return site.fallbackProjects;

    return selected.map((r) => ({
      name: r.name,
      description:
        site.fallbackProjects.find((p) => p.name === r.name)?.description ?? r.description ?? "Sem descrição no GitHub.",
      // No máximo 2 itens: a taste-skill limita separadores "·" a um por linha.
      stack: [r.language, ...(r.topics ?? []).filter((t) => t !== site.githubTopic)]
        .filter((s): s is string => Boolean(s))
        .slice(0, 2),
      url: r.html_url,
    }));
  } catch {
    return site.fallbackProjects;
  }
}
