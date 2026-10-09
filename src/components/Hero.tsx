import Image from "next/image";
import type { CSSProperties } from "react";
import { DownloadSimple, Play, Pause, SkipBack, SkipForward } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { Equalizer } from "./Equalizer";

type Vars = CSSProperties & Record<`--${string}`, string>;

export function Hero() {
  const [main, left, right] = site.heroTracks;
  return (
    <section
      id="topo"
      className="grid items-center gap-10 pb-14 pt-16 md:pt-20 lg:grid-cols-[1fr_1.05fr]"
    >
      {/* Texto: no máximo 4 elementos (rótulo, título, subtítulo, botões) */}
      <div className="flex min-w-0 flex-col gap-7">
        <p
          className="rise inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.16em] text-accent-ink"
          style={{ "--d": ".1s" } as Vars}
        >
          <Equalizer />
          Tocando agora
        </p>
        <h1
          className="rise text-[clamp(48px,7vw,84px)] font-bold leading-none tracking-[-0.04em]"
          style={{ "--d": ".2s" } as Vars}
        >
          {site.name}
        </h1>
        <p className="rise max-w-[46ch] text-lg leading-relaxed text-muted" style={{ "--d": ".3s" } as Vars}>
          {site.role}. {site.tagline}
        </p>
        <div className="rise flex flex-wrap gap-3" style={{ "--d": ".4s" } as Vars}>
          <a
            href="#projetos"
            className="press inline-flex h-13 items-center gap-2.5 whitespace-nowrap rounded-full bg-accent pl-5 pr-6 font-semibold text-ink"
          >
            <Play size={18} weight="fill" aria-hidden="true" />
            Ver projetos
          </a>
          <a
            href={site.resumeUrl}
            className="press glass inline-flex h-13 items-center gap-2.5 whitespace-nowrap rounded-full pl-5 pr-6 font-semibold"
          >
            <DownloadSimple size={18} weight="bold" aria-hidden="true" />
            Currículo
          </a>
        </div>
      </div>

      {/* Visual: foto + "faixas" orbitando, como nas referências */}
      <div className="relative h-[500px] min-w-0 md:h-[600px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center [perspective:900px]">
          <div className="grid aspect-square w-[118%] place-items-center [transform:rotateX(72deg)]">
            <svg viewBox="0 0 400 400" className="spin-slow size-full">
              <circle cx="200" cy="200" r="190" fill="none" stroke="var(--line)" strokeWidth="1.5" />
              <circle cx="200" cy="200" r="160" fill="none" stroke="var(--accent)" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="220 80" />
            </svg>
          </div>
        </div>

        <div
          className="rise absolute left-1/2 top-[48%] h-[230px] w-[190px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-surface bg-solid md:h-[320px] md:w-[260px]"
          style={{ "--d": ".3s" } as Vars}
        >
          {site.photo ? (
            <Image src={site.photo} alt={`Foto de ${site.name}`} fill priority sizes="260px" className="object-cover" />
          ) : (
            // TODO: coloque sua foto em /public (retrato 3:4, cerca de 640x800) e defina site.photo
            <div className="grid size-full place-items-center rounded-surface border border-dashed border-line p-4 text-center font-mono text-xs text-muted">
              [Sua foto aqui]
              <br />
              retrato 3:4
            </div>
          )}
        </div>

        {site.available && (
          <div
            className="float-card glass absolute left-0 top-[6%] flex w-[164px] items-center gap-3 rounded-surface p-3 md:w-[220px] md:px-4 md:py-3.5"
            style={{ "--r": "-5deg", "--d": ".5s" } as Vars}
          >
            {/* Ponto verde = estado real de disponibilidade (único ponto de status da página) */}
            <span aria-hidden="true" className="size-2.5 flex-none rounded-full bg-[#3fb37f] shadow-[0_0_0_4px_rgb(63_179_127/0.18)]" />
            <div>
              <p className="text-sm font-semibold">Disponível</p>
              <p className="text-xs text-muted">para novas vagas</p>
            </div>
          </div>
        )}

        <div
          className="float-card glass absolute right-0 top-[14%] flex w-[164px] flex-col gap-3 rounded-surface p-3 md:w-[230px] md:p-3.5"
          style={{ "--r": "5deg", "--d": ".65s" } as Vars}
        >
          <div className="flex items-center gap-3">
            <span className="grid size-10 flex-none place-items-center rounded-thumb bg-accent font-mono text-[13px] font-bold text-ink">
              {main.abbr}
            </span>
            <div>
              <p className="text-sm font-semibold">{main.name}</p>
              <p className="text-xs text-muted">{main.role}</p>
            </div>
          </div>
          <div aria-hidden="true" className="flex items-center justify-around text-muted">
            <SkipBack size={16} weight="fill" />
            <span className="grid size-[30px] place-items-center rounded-full bg-text text-bg">
              <Pause size={14} weight="fill" />
            </span>
            <SkipForward size={16} weight="fill" />
          </div>
        </div>

        <MiniTrack {...left} className="left-[2%] top-[66%]" r="4deg" d=".8s" />
        <MiniTrack {...right} className="right-[3%] top-[72%]" r="-4deg" d=".95s" />
      </div>
    </section>
  );
}

function MiniTrack({
  abbr,
  name,
  role,
  className,
  r,
  d,
}: {
  abbr: string;
  name: string;
  role: string;
  className: string;
  r: string;
  d: string;
}) {
  return (
    <div
      className={`float-card glass absolute flex w-[164px] items-center gap-3 rounded-surface p-3 md:w-[210px] md:p-3.5 ${className}`}
      style={{ "--r": r, "--d": d } as Vars}
    >
      <span className="grid size-10 flex-none place-items-center rounded-thumb border border-line bg-surface-2 font-mono text-[13px] font-bold">
        {abbr}
      </span>
      <div>
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-xs text-muted">{role}</p>
      </div>
    </div>
  );
}
