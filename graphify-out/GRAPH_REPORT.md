# Graph Report - portfolio-now-playing  (2026-10-09)

## Corpus Check
- Corpus is ~17,357 words - fits in a single context window. You may not need a graph.

## Summary
- 163 nodes · 242 edges · 11 communities (9 shown, 2 thin omitted)
- Extraction: 90% EXTRACTED · 10% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.87)
- Token cost: 62,693 input · 0 output

## Community Hubs (Navigation)
- Taste Skill Design Rules
- Package Scripts & Next Config
- Project Conventions & Visual Theme
- Page Sections UI
- Projects Player & Motion
- TypeScript Config
- Dev Dependencies
- Runtime Dependencies
- Color Lock & Amber Accent
- Theme Toggle
- ESLint Config

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `site` - 13 edges
3. `Final Pre-Flight Check` - 13 edges
4. `Taste Skill (design-taste-frontend)` - 11 edges
5. `ProjectsPlayer()` - 9 edges
6. `The Three Dials` - 7 edges
7. `Project Instructions (CLAUDE.md)` - 7 edges
8. `Portfolio Now Playing` - 7 edges
9. `Stack` - 6 edges
10. `scripts` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Hero()` --implements--> `Anti-Center Bias`  [INFERRED]
  src/components/Hero.tsx → .claude/skills/taste-skill/SKILL.md
- `Hero()` --implements--> `Music Player Theme`  [INFERRED]
  src/components/Hero.tsx → CONTEXTO.md
- `Player Autoplay` --references--> `ProjectsPlayer()`  [EXTRACTED]
  CONTEXTO.md → src/components/ProjectsPlayer.tsx
- `ProjectsPlayer()` --implements--> `Music Player Theme`  [INFERRED]
  src/components/ProjectsPlayer.tsx → CONTEXTO.md
- `Skills()` --implements--> `Bento Exact Cell Count`  [INFERRED]
  src/components/Skills.tsx → .claude/skills/taste-skill/SKILL.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Taste-skill consistency locks applied in the portfolio visual system** — contexto_single_amber_accent, contexto_shape_rule, contexto_theme_toggle, _claude_skills_taste_skill_skill_color_consistency_lock, _claude_skills_taste_skill_skill_shape_consistency_lock, _claude_skills_taste_skill_skill_dark_mode_protocol [INFERRED 0.85]
- **Music-player UI composition** — contexto_music_player_concept, src_components_hero_hero, src_components_projectsplayer_projectsplayer, contexto_glass_utility, contexto_coverflow_spring [INFERRED 0.85]
- **Agent onboarding chain before changes** — claude_project_instructions, agents_nextjs_breaking_changes, contexto_portfolio_now_playing, _claude_skills_taste_skill_skill_pre_flight_check [EXTRACTED 1.00]

## Communities (11 total, 2 thin omitted)

### Community 0 - "Taste Skill Design Rules"
Cohesion: 0.10
Nodes (29): AI Tells (Forbidden Patterns), Anti-Center Bias, Anti-Default Discipline, Bento Exact Cell Count, Block Library, Brief Inference (Section 0), Design Read One-Liner, Brief to Design System Map (+21 more)

### Community 1 - "Package Scripts & Next Config"
Cohesion: 0.08
Nodes (23): nextConfig, name, private, scripts, build, dev, lint, start (+15 more)

### Community 2 - "Project Conventions & Visual Theme"
Cohesion: 0.10
Nodes (23): Dark Mode Protocol, Apple Liquid Glass Honest Web Approximation, node_modules/next/dist/docs, Next.js Breaking Changes Notice, Editable Content Centralization Rule, Lint and Build Before Completion, Project Instructions (CLAUDE.md), Respond in Brazilian Portuguese (+15 more)

### Community 3 - "Page Sections UI"
Cohesion: 0.21
Nodes (9): Contact(), Equalizer(), TODO: coloque sua foto em /public (retrato 3:4, cerca de 640x800) e defina…, Vars, Nav(), Skills(), VinylRings(), site (+1 more)

### Community 4 - "Projects Player & Motion"
Cohesion: 0.16
Nodes (14): Spring Physics (stiffness 100, damping 20), Coverflow Spring (stiffness 100, damping 20), Motion (motion/react), react, Projects(), ProjectsPlayer(), SPRING, subscribe() (+6 more)

### Community 5 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 6 - "Dev Dependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/turbopack, @types/node, @types/react, @types/react-dom (+1 more)

### Community 7 - "Runtime Dependencies"
Cohesion: 0.25
Nodes (8): dependencies, @fontsource/jetbrains-mono, @fontsource-variable/sora, motion, next, @phosphor-icons/react, react, react-dom

### Community 8 - "Color Lock & Amber Accent"
Cohesion: 0.50
Nodes (4): Color Consistency Lock, The Lila Rule, Project Covers by Luminance (cv-a, cv-b, cv-c), Single Amber Accent #E8A33D

## Knowledge Gaps
- **65 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+60 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 79 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Projects Player & Motion` to `Package Scripts & Next Config`, `Page Sections UI`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **Why does `Final Pre-Flight Check` connect `Taste Skill Design Rules` to `Color Lock & Amber Accent`, `Project Conventions & Visual Theme`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `site` connect `Page Sections UI` to `Package Scripts & Next Config`, `Project Conventions & Visual Theme`, `Projects Player & Motion`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `site` (e.g. with `Contact()` and `Skills()`) actually correct?**
  _`site` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _65 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Taste Skill Design Rules` be split into smaller, more focused modules?**
  _Cohesion score 0.0960591133004926 - nodes in this community are weakly interconnected._
- **Should `Package Scripts & Next Config` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._