const MAX_CHARS = 400;

/**
 * Extrai um resumo em texto simples do README: os primeiros parágrafos de prosa,
 * sem títulos, badges, imagens, listas, código ou HTML.
 * Travessões viram vírgula (regra da taste-skill: zero travessões na página).
 */
export function summarizeReadme(markdown: string): string | null {
  const blocks = markdown
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter((b) => b && !/^(#|!\[|\[!\[|<|\||>|---|[-*+] |\d+\. )/.test(b));

  const parts: string[] = [];
  let length = 0;
  for (const block of blocks) {
    const text = clean(block);
    if (!text) continue;
    parts.push(text);
    length += text.length;
    if (length >= 200 || parts.length === 2) break;
  }
  if (!parts.length) return null;

  const summary = parts.join(" ");
  if (summary.length <= MAX_CHARS) return summary;
  return summary.slice(0, summary.lastIndexOf(" ", MAX_CHARS)) + "…";
}

function clean(block: string): string {
  return block
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/(\*\*|__|\*|_|`)(.+?)\1/g, "$2")
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
}
