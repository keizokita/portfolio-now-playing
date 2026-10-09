import { cacheLife } from "next/cache";
import { site, type Project } from "@/content/site";
import { summarizeReadme } from "./readme";

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

type GitHubCommit = {
  sha: string;
  html_url: string;
  commit: { message: string; author: { date: string } | null };
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

    return await Promise.all(
      selected.map(async (r) => {
        const repo = `https://api.github.com/repos/${encodeURIComponent(user)}/${encodeURIComponent(r.name)}`;
        const [readme, languages, commits] = await Promise.all([
          getText(`${repo}/readme`, { ...headers, Accept: "application/vnd.github.raw" }),
          getJson<Record<string, number>>(`${repo}/languages`, headers),
          getJson<GitHubCommit[]>(`${repo}/commits?per_page=5`, headers),
        ]);
        return {
          name: r.name,
          description:
            site.fallbackProjects.find((p) => p.name === r.name)?.description ?? r.description ?? "Sem descrição no GitHub.",
          // No máximo 2 itens: a taste-skill limita separadores "·" a um por linha.
          stack: [r.language, ...(r.topics ?? []).filter((t) => t !== site.githubTopic)]
            .filter((s): s is string => Boolean(s))
            .slice(0, 2),
          url: r.html_url,
          summary: (readme && summarizeReadme(readme)) ?? undefined,
          languages: languages ? toPercentages(languages) : undefined,
          commits: commits?.map((c) => ({
            sha: c.sha.slice(0, 7),
            // Travessões viram vírgula, como no resumo do README.
            message: c.commit.message.split("\n")[0].replace(/\s*[—–]\s*/g, ", "),
            date: c.commit.author?.date ?? "",
            url: c.html_url,
          })),
        };
      }),
    );
  } catch {
    return site.fallbackProjects;
  }
}

// Falhas nos detalhes não derrubam a lista: o projeto só fica sem aquele bloco na modal.
async function getText(url: string, headers: Record<string, string>): Promise<string | null> {
  try {
    const res = await fetch(url, { headers });
    return res.ok ? await res.text() : null;
  } catch {
    return null;
  }
}

async function getJson<T>(url: string, headers: Record<string, string>): Promise<T | null> {
  const text = await getText(url, headers);
  try {
    return text ? (JSON.parse(text) as T) : null;
  } catch {
    return null;
  }
}

/** Bytes por linguagem em porcentagens; o que fica abaixo de 1% vira "Outras". */
function toPercentages(bytes: Record<string, number>): { name: string; percent: number }[] {
  const total = Object.values(bytes).reduce((a, b) => a + b, 0);
  if (!total) return [];
  const rows = Object.entries(bytes)
    .map(([name, n]) => ({ name, percent: (n / total) * 100 }))
    .sort((a, b) => b.percent - a.percent);
  const main = rows.filter((r) => r.percent >= 1);
  const rest = rows.filter((r) => r.percent < 1).reduce((a, r) => a + r.percent, 0);
  return rest > 0 ? [...main, { name: "Outras", percent: rest }] : main;
}
