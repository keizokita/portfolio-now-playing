"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowSquareOut, GitCommit, X } from "@phosphor-icons/react";
import { site, type Project } from "@/content/site";

// Fatias da barra de linguagens: mesmo âmbar em luminosidades diferentes (trava de cor única).
const SHADES = [100, 65, 40, 22];
const shade = (i: number) =>
  i < SHADES.length ? `color-mix(in oklab, var(--accent) ${SHADES[i]}%, var(--solid))` : "var(--line)";

const relative = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });
function timeAgo(iso: string) {
  const days = Math.round((new Date(iso).getTime() - Date.now()) / 86_400_000);
  if (Math.abs(days) < 30) return relative.format(days, "day");
  if (Math.abs(days) < 365) return relative.format(Math.round(days / 30), "month");
  return relative.format(Math.round(days / 365), "year");
}

export function ProjectModal({
  project,
  variant,
  onClose,
}: {
  project: Project | null;
  /** Classe de tom da capa (cv-a, cv-b, cv-c): o banner usa a mesma cor da capa no carrossel. */
  variant?: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // Clique no fundo escurecido (fora do conteúdo) fecha a modal.
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby="project-modal-title"
      className="m-auto max-h-[85dvh] w-[calc(100%-32px)] max-w-[560px] overflow-y-auto rounded-surface border border-line bg-solid p-0 text-text shadow-[0_40px_80px_-30px_var(--shadow)] backdrop:bg-black/55 backdrop:backdrop-blur-sm"
    >
      {project && (
        <div className="relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar detalhes"
            className="press absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full border border-line bg-solid md:right-6 md:top-6"
          >
            <X size={18} weight="bold" />
          </button>

          {site.covers[project.name] && (
            <div className={`${variant ?? ""} relative h-40 overflow-hidden bg-[var(--cbg)] md:h-[200px]`}>
              {/* Mesmo tratamento da capa: a imagem entra só com a luz, a cor vem do tom da capa. */}
              <Image
                src={site.covers[project.name]}
                alt=""
                fill
                sizes="560px"
                className="object-cover opacity-90 mix-blend-luminosity"
              />
              <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-solid to-transparent to-60%" />
            </div>
          )}

          <div className="flex flex-col gap-7 p-6 md:p-8">
            <header className="flex items-start justify-between gap-4 pr-12">
              <div className="flex min-w-0 flex-col gap-2">
                <h3 id="project-modal-title" className="break-words font-mono text-xl font-bold leading-tight">
                  {project.name}
                </h3>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink hover:underline"
                >
                  Abrir no GitHub
                  <ArrowSquareOut size={15} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </header>

            <p className="text-[15px] leading-relaxed text-muted">{project.summary ?? project.description}</p>

            {project.languages?.length ? (
              <section className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold">Linguagens</h4>
                <div className="flex h-2.5 overflow-hidden rounded-full" aria-hidden="true">
                  {project.languages.map((l, i) => (
                    <span key={l.name} style={{ width: `${l.percent}%`, background: shade(i) }} />
                  ))}
                </div>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
                  {project.languages.map((l, i) => (
                    <li key={l.name} className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full" style={{ background: shade(i) }} aria-hidden="true" />
                      <span className="font-semibold">{l.name}</span>
                      <span className="font-mono text-muted">{l.percent.toFixed(1)}%</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : (
              <p className="text-[13px] text-muted">Stack: {project.stack.join(", ")}</p>
            )}

            {project.commits?.length ? (
              <section className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold">Últimos commits</h4>
                <ol className="flex flex-col gap-1">
                  {project.commits.map((c) => (
                    <li key={c.sha}>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-start gap-3 rounded-thumb px-2 py-2 transition-colors hover:bg-surface-2"
                      >
                        <GitCommit size={18} className="mt-0.5 flex-none text-muted" aria-hidden="true" />
                        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                          <span className="break-words text-sm">{c.message}</span>
                          <span className="font-mono text-[12px] text-muted">
                            {c.sha} · {c.date && timeAgo(c.date)}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
          </div>
        </div>
      )}
    </dialog>
  );
}
