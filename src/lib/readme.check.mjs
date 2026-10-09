// Verificação rápida do resumo de README. Rode: node src/lib/readme.check.mjs
import assert from "node:assert/strict";
import { summarizeReadme } from "./readme.ts";

const watchlytics = `# Watchlytics

**Descoberta de filmes, séries e anime por swipe** — catálogo pessoal, perfil
público e match com amigos.

**▶ [watchlytics.pages.dev](https://watchlytics.pages.dev)** — no ar, em beta.

[![check](https://x/badge.svg)](https://x)

<!-- comentário
longo -->

- item de lista`;

assert.equal(
  summarizeReadme(watchlytics),
  "Descoberta de filmes, séries e anime por swipe, catálogo pessoal, perfil público e match com amigos. ▶ watchlytics.pages.dev, no ar, em beta.",
);
assert.equal(summarizeReadme("Uma API simples em Java."), "Uma API simples em Java.");
assert.equal(summarizeReadme("# Só título\n\n![img](a.png)"), null);

const long = summarizeReadme("palavra ".repeat(100));
assert.ok(long.length <= 401 && long.endsWith("…"));
assert.ok(!/[—–]/.test(summarizeReadme("a — b – c")));

console.log("readme ok");
