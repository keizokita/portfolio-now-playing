import { EnvelopeSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/ssr";
import { site } from "@/content/site";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contato" className="scroll-mt-6 pb-12 pt-26">
      <Reveal className="glass flex flex-col gap-8 rounded-surface p-[clamp(28px,6vw,72px)]">
        <div className="flex max-w-[65ch] flex-col gap-4">
          <h2 className="text-[clamp(40px,6vw,76px)] font-bold leading-none tracking-[-0.04em]">Vamos conversar?</h2>
          <p className="text-[17px] leading-relaxed text-muted">{site.contactLine}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="press inline-flex h-14 items-center gap-2.5 whitespace-nowrap rounded-full bg-accent px-6 font-semibold text-ink"
          >
            <EnvelopeSimple size={20} weight="bold" aria-hidden="true" />
            {site.email}
          </a>
          <a
            href={`https://github.com/${site.github}`}
            target="_blank"
            rel="noreferrer"
            className="press inline-flex h-14 items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-surface-2 px-6 font-semibold"
          >
            <GithubLogo size={20} weight="bold" aria-hidden="true" />
            GitHub
            <span className="font-mono text-[13px] font-normal text-muted">@{site.github}</span>
          </a>
          <a
            href={`https://www.linkedin.com/in/${site.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="press inline-flex h-14 items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-surface-2 px-6 font-semibold"
          >
            <LinkedinLogo size={20} weight="bold" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </Reveal>
    </section>
  );
}
