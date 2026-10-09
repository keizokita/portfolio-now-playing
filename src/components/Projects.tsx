import { getProjects } from "@/lib/github";
import { ProjectsPlayer } from "./ProjectsPlayer";
import { Reveal } from "./Reveal";

export async function Projects() {
  const projects = await getProjects();
  return (
    <section id="projetos" className="flex scroll-mt-6 flex-col gap-8 pb-10 pt-22">
      <Reveal className="flex max-w-[65ch] flex-col gap-3">
        <h2 className="text-[clamp(32px,4.2vw,52px)] font-bold leading-[1.05] tracking-[-0.035em]">
          Projetos no GitHub
        </h2>
        <p className="text-base leading-relaxed text-muted">
          Repositórios selecionados. Clique numa capa ou use os controles do player.
        </p>
      </Reveal>
      <Reveal>
        <ProjectsPlayer projects={projects} />
      </Reveal>
    </section>
  );
}
