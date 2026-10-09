import { site, type Skill } from "@/content/site";
import { Equalizer } from "./Equalizer";
import { Reveal } from "./Reveal";
import { VinylRings } from "./VinylRings";

export function Skills() {
  const featured = site.featuredSkill;
  return (
    <section id="competencias" className="flex scroll-mt-6 flex-col gap-8 pb-10 pt-18">
      <Reveal className="flex max-w-[65ch] flex-col gap-3">
        <h2 className="text-[clamp(32px,4.2vw,52px)] font-bold leading-[1.05] tracking-[-0.035em]">Competências</h2>
        <p className="text-base leading-relaxed text-muted">
          Minha stack principal e as ferramentas que uso com frequência.
        </p>
      </Reveal>

      <div className="bento">
        <Reveal style={{ gridArea: "f" }}>
          <article className="tile on-accent relative flex h-full min-h-[360px] flex-col justify-between gap-6 overflow-hidden rounded-surface bg-accent p-7 text-ink">
            <VinylRings className="absolute -bottom-[70px] -right-[70px] size-[280px] opacity-20" />
            <Equalizer className="h-[22px]" />
            <div className="relative flex flex-col gap-3">
              <h3 className="text-[clamp(30px,3.4vw,44px)] font-bold leading-[1.05] tracking-[-0.03em]">
                {featured.title}
              </h3>
              <p className="max-w-[40ch] text-[15px] leading-relaxed text-ink/80">{featured.description}</p>
              <span className="font-mono text-xs text-ink/80">{featured.years}</span>
            </div>
          </article>
        </Reveal>

        {site.skills.map((skill, i) => (
          <Reveal key={skill.name} style={{ gridArea: skill.area }} delay={0.06 * (i + 1)}>
            <SkillTile skill={skill} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function SkillTile({ skill }: { skill: Skill }) {
  if (skill.variant === "inverse") {
    return (
      <article className="tile flex h-full items-center justify-between gap-5 rounded-surface bg-text p-6 text-bg">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[26px] font-bold tracking-[-0.02em]">{skill.name}</h3>
          <p className="text-sm opacity-80">{skill.role}</p>
        </div>
        <span className="font-mono text-[40px] font-bold opacity-90" aria-hidden="true">
          {skill.abbr}
        </span>
      </article>
    );
  }

  if (skill.variant === "wide") {
    return (
      <article className="tile glass flex h-full items-center justify-between gap-5 rounded-surface p-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[26px] font-bold tracking-[-0.02em]">{skill.name}</h3>
          <p className="text-sm text-muted">{skill.role}</p>
        </div>
        <span
          aria-hidden="true"
          className="grid size-14 flex-none place-items-center rounded-thumb bg-accent font-mono text-[15px] font-bold text-ink"
        >
          {skill.abbr}
        </span>
      </article>
    );
  }

  return (
    <article className="tile glass flex h-full flex-col gap-3.5 rounded-surface p-5">
      <span
        aria-hidden="true"
        className="grid size-11 place-items-center rounded-thumb border border-line bg-surface-2 font-mono text-sm font-bold"
      >
        {skill.abbr}
      </span>
      <div>
        <h3 className="text-lg font-semibold">{skill.name}</h3>
        <p className="mt-1 text-[13px] text-muted">{skill.role}</p>
      </div>
    </article>
  );
}
