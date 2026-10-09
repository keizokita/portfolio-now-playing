"use client";

import { useCallback, useEffect, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { GithubLogo, Pause, Play, SkipBack, SkipForward } from "@phosphor-icons/react";
import type { Project } from "@/content/site";
import { Equalizer } from "./Equalizer";
import { VinylRings } from "./VinylRings";

const TRACK_SECONDS = 6;
const VARIANTS = ["cv-a", "cv-b", "cv-c"] as const;
const SPRING = { type: "spring", stiffness: 100, damping: 20 } as const;

// Distância entre capas: menor no celular.
const mobileQuery = "(max-width: 767px)";
function subscribe(cb: () => void) {
  const mq = window.matchMedia(mobileQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function useStep() {
  const isMobile = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(mobileQuery).matches,
    () => false,
  );
  return isMobile ? 118 : 210;
}

export function ProjectsPlayer({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const step = useStep();
  const n = projects.length;
  const [active, setActive] = useState(0);
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  // Autoplay ligado por padrão, desligado com "reduzir movimento" até a pessoa apertar play.
  const playing = userPlaying ?? !reduce;

  // Progresso da "faixa" fica num motion value: anima sem re-renderizar o React.
  const progress = useMotionValue(0);
  const elapsed = useTransform(progress, (p) => `0:0${Math.min(TRACK_SECONDS - 1, Math.floor(p * TRACK_SECONDS))}`);
  const remaining = useTransform(progress, (p) => `-0:0${TRACK_SECONDS - Math.min(TRACK_SECONDS - 1, Math.floor(p * TRACK_SECONDS))}`);

  const go = useCallback(
    (i: number) => {
      progress.set(0);
      setActive(((i % n) + n) % n);
    },
    [n, progress],
  );

  useEffect(() => {
    if (!playing || n < 2) return;
    const controls = animate(progress, 1, {
      duration: TRACK_SECONDS * (1 - progress.get()),
      ease: "linear",
      onComplete: () => go(active + 1),
    });
    return () => controls.stop();
  }, [playing, active, n, go, progress]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  }

  if (n === 0) {
    return (
      <div className="glass rounded-surface p-8 text-muted">
        Nenhum repositório para mostrar ainda. Configure seu usuário em <code className="font-mono">src/content/site.ts</code>.
      </div>
    );
  }

  const current = projects[active];

  return (
    <div className="flex flex-col gap-8">
      <div
        role="group"
        aria-roledescription="carrossel"
        aria-label="Capas dos projetos. Use as setas para navegar."
        onKeyDown={onKeyDown}
        className="relative h-[400px] overflow-hidden [perspective:1400px]"
      >
        {projects.map((p, i) => {
          let off = i - active;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const a = Math.abs(off);
          return (
            <motion.button
              key={p.name}
              type="button"
              onClick={() => go(i)}
              aria-label={`Selecionar ${p.name}`}
              aria-current={a === 0 ? "true" : undefined}
              tabIndex={a === 0 ? 0 : -1}
              className={`${VARIANTS[i % 3]} absolute left-1/2 top-4 -ml-[130px] flex h-[350px] w-[260px] cursor-pointer flex-col overflow-hidden rounded-surface border border-line bg-surface text-left shadow-[0_30px_50px_-26px_var(--shadow)]`}
              style={{ zIndex: 10 - a }}
              initial={false}
              animate={{
                x: off * step,
                z: -a * 160,
                rotateY: off * -30,
                scale: 1 - a * 0.06,
                opacity: a === 0 ? 1 : a === 1 ? 0.75 : 0.35,
              }}
              transition={reduce ? { duration: 0 } : SPRING}
            >
              <div className="relative flex h-[260px] w-full items-end overflow-hidden bg-[var(--cbg)] p-5 text-[var(--cfg)]">
                <VinylRings className="absolute -right-[54px] -top-[54px] size-[230px] opacity-30" />
                <span className="relative break-words font-mono text-xl font-bold leading-tight">{p.name}</span>
              </div>
              <div className="flex w-full flex-1 flex-col justify-center gap-1 bg-solid px-5 py-3.5">
                <span className="text-[15px] font-semibold">{p.name}</span>
                <span className="text-[13px] text-muted">{p.stack.join(" · ")}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="glass flex flex-wrap items-center gap-x-5 gap-y-4 rounded-[32px] px-3.5 py-3 md:rounded-full">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Projeto anterior"
            className="press grid size-12 place-items-center rounded-full hover:bg-surface-2"
          >
            <SkipBack size={20} weight="fill" />
          </button>
          <button
            type="button"
            onClick={() => setUserPlaying(!playing)}
            aria-label={playing ? "Pausar" : "Tocar"}
            className="press grid size-14 place-items-center rounded-full bg-text text-bg"
          >
            {playing ? <Pause size={20} weight="fill" /> : <Play size={20} weight="fill" />}
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Próximo projeto"
            className="press grid size-12 place-items-center rounded-full hover:bg-surface-2"
          >
            <SkipForward size={20} weight="fill" />
          </button>
        </div>

        <div className="flex min-w-0 flex-[999_1_300px] items-center gap-3.5">
          <div
            aria-hidden="true"
            className={`${VARIANTS[active % 3]} size-12 flex-none rounded-thumb border border-line bg-[var(--cbg)]`}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {/* Anuncia a troca de projeto para leitores de tela só quando o autoplay está parado */}
            <p aria-live={playing ? "off" : "polite"} className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <span className="font-mono text-[15px] font-bold">{current.name}</span>
              <span className="text-[13px] text-muted">{current.description}</span>
            </p>
            <div className="flex items-center gap-2.5" aria-hidden="true">
              <motion.span className="w-[30px] font-mono text-[11px] text-muted">{elapsed}</motion.span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                <motion.div className="h-full w-full origin-left rounded-full bg-accent" style={{ scaleX: progress }} />
              </div>
              <motion.span className="w-9 text-right font-mono text-[11px] text-muted">{remaining}</motion.span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Equalizer paused={!playing} />
          <a
            href={current.url}
            target="_blank"
            rel="noreferrer"
            className="press inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-full border border-line bg-surface-2 px-5 text-sm font-semibold"
          >
            <GithubLogo size={18} weight="bold" aria-hidden="true" />
            Abrir repositório
          </a>
        </div>
      </div>
    </div>
  );
}
