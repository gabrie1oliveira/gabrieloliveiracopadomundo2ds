import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { cups, titulos, artilheirosHistoria, quiz, type Cup } from "@/lib/worldcups";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Copa do Mundo FIFA — Trajetória dos Campeões (1930–2022)" },
      { name: "description", content: "Site interativo sobre todas as Copas do Mundo: campeões, vices, trajetórias, estatísticas, quiz e curiosidades de 1930 a 2022." },
      { property: "og:title", content: "Copa do Mundo FIFA — História completa" },
      { property: "og:description", content: "Trajetórias, estatísticas, mascotes e curiosidades de todas as Copas do Mundo." },
    ],
  }),
  component: Home,
});

function Home() {
  const [tab, setTab] = useState<"copas" | "ranking" | "artilheiros" | "quiz" | "curiosidades">("copas");
  const [selectedCup, setSelectedCup] = useState<Cup>(cups[cups.length - 1]);
  const [search, setSearch] = useState("");

  const filteredCups = useMemo(
    () => cups.filter(c =>
      c.ano.toString().includes(search) ||
      c.sede.toLowerCase().includes(search.toLowerCase()) ||
      c.campeao.nome.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  return (
    <div className="min-h-screen">
      <Header tab={tab} setTab={setTab} />

      {tab === "copas" && <CopasSection cups={filteredCups} selected={selectedCup} setSelected={setSelectedCup} search={search} setSearch={setSearch} />}
      {tab === "ranking" && <RankingSection />}
      {tab === "artilheiros" && <ArtilheirosSection />}
      {tab === "quiz" && <QuizSection />}
      {tab === "curiosidades" && <CuriosidadesSection />}

      <Footer />
    </div>
  );
}

function Header({ tab, setTab }: { tab: string; setTab: (t: any) => void }) {
  const items = [
    { id: "copas", label: "Copas" },
    { id: "ranking", label: "Ranking" },
    { id: "artilheiros", label: "Artilheiros" },
    { id: "quiz", label: "Quiz" },
    { id: "curiosidades", label: "Curiosidades" },
  ];
  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-border" style={{ background: "color-mix(in oklab, var(--background) 80%, transparent)" }}>
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-3 sm:py-4">
          <a href="#top" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gold grid place-items-center text-2xl shadow-[var(--shadow-gold)]">🏆</div>
            <div className="leading-tight">
              <div className="font-display text-xl sm:text-2xl tracking-wider">COPA DO MUNDO</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-[0.2em]">1930 — 2022 · FIFA</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {items.map(it => (
              <button key={it.id} onClick={() => setTab(it.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${tab === it.id ? "bg-gold text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                {it.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="md:hidden flex overflow-x-auto gap-1 px-3 pb-3">
          {items.map(it => (
            <button key={it.id} onClick={() => setTab(it.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium ${tab === it.id ? "bg-gold text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {it.label}
            </button>
          ))}
        </div>
      </header>

      <section id="top" className="relative overflow-hidden border-b border-border" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-20 field-stripes" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 text-xs uppercase tracking-widest text-muted-foreground mb-6">
            <span>⚽</span> A história completa em um só lugar
          </div>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display leading-none">
            <span className="text-gold">A MAIOR COMPETIÇÃO</span><br />DO PLANETA
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
            Trajetórias, estatísticas, artilheiros, mascotes e curiosidades de todas as Copas do Mundo da FIFA — de 1930 a 2022.
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <Stat n="22" label="Edições" />
            <Stat n="8" label="Campeões" />
            <Stat n="84+" label="Seleções" />
            <Stat n="∞" label="Emoções" />
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-4">
      <div className="text-3xl sm:text-4xl font-display text-gold">{n}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function CopasSection({ cups: list, selected, setSelected, search, setSearch }: any) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <SectionTitle eyebrow="Edições" title="Todas as Copas" />

      <div className="mt-6 mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por ano, sede ou campeão..."
          className="w-full sm:max-w-md px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {list.map((c: Cup) => (
          <button
            key={c.ano}
            onClick={() => { setSelected(c); document.getElementById("detail")?.scrollIntoView({ behavior: "smooth" }); }}
            className={`group text-left p-4 rounded-2xl border transition relative overflow-hidden ${
              selected.ano === c.ano
                ? "border-primary bg-card shadow-[var(--shadow-gold)]"
                : "border-border bg-card/40 hover:bg-card hover:border-primary/50"
            }`}
          >
            <div className="text-3xl">{c.sedeBandeira}</div>
            <div className="mt-2 font-display text-2xl text-gold">{c.ano}</div>
            <div className="text-xs text-muted-foreground">{c.sede}</div>
            <div className="mt-3 text-sm flex items-center gap-2">
              <span className="text-lg">{c.campeao.bandeira}</span>
              <span className="font-medium">{c.campeao.nome}</span>
            </div>
          </button>
        ))}
      </div>

      <div id="detail" className="mt-16">
        <CupDetail cup={selected} />
      </div>
    </section>
  );
}

function CupDetail({ cup }: { cup: Cup }) {
  return (
    <article className="rounded-3xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]">
      <div className="p-6 sm:p-10 relative" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10 field-stripes" />
        <div className="relative flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Copa do Mundo FIFA</div>
            <h2 className="font-display text-6xl sm:text-8xl text-gold leading-none">{cup.ano}</h2>
            <div className="mt-2 text-lg flex items-center gap-2">
              <span className="text-2xl">{cup.sedeBandeira}</span>
              <span className="text-muted-foreground">Sede: <span className="text-foreground font-medium">{cup.sede}</span></span>
            </div>
          </div>
          <div className="space-y-1 text-sm">
            {cup.artilheiro && <Info label="Artilheiro" value={cup.artilheiro} />}
            {cup.melhorJogador && <Info label="Melhor jogador" value={cup.melhorJogador} />}
            {cup.melhorGoleiro && <Info label="Melhor goleiro" value={cup.melhorGoleiro} />}
            {cup.mascote && <Info label="Mascote" value={cup.mascote} />}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-px bg-border">
        <TeamPanel team={cup.campeao} role="Campeão" highlight />
        <TeamPanel team={cup.vice} role="Vice-campeão" />
      </div>

      {cup.curiosidades?.length > 0 && (
        <div className="p-6 sm:p-10 border-t border-border">
          <h3 className="font-display text-2xl mb-4">Curiosidades</h3>
          <ul className="grid sm:grid-cols-2 gap-3">
            {cup.curiosidades.map((c, i) => (
              <li key={i} className="flex gap-3 p-4 rounded-xl bg-muted/40 border border-border">
                <span className="text-primary">▸</span><span className="text-sm">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-right">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function TeamPanel({ team, role, highlight }: any) {
  return (
    <div className={`p-6 sm:p-8 ${highlight ? "bg-card" : "bg-card/70"}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{role}</div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-4xl">{team.bandeira}</span>
            <h3 className="font-display text-3xl">{team.nome}</h3>
          </div>
        </div>
        {highlight && <span className="text-4xl">🏆</span>}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
        <Mini n={team.jogos} label="J" />
        <Mini n={team.vitorias} label="V" />
        <Mini n={team.empates} label="E" />
        <Mini n={team.derrotas} label="D" />
        <Mini n={team.golsPro} label="GP" />
        <Mini n={team.golsContra} label="GC" />
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/40">
              <th className="text-left p-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">Fase</th>
              <th className="text-left p-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">Adversário</th>
              <th className="text-right p-2 font-medium text-muted-foreground text-xs uppercase tracking-wider">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {team.trajetoria.map((m: any, i: number) => (
              <tr key={i} className="border-t border-border">
                <td className="p-2 text-muted-foreground">{m.fase}</td>
                <td className="p-2">{m.adversario}</td>
                <td className="p-2 text-right font-mono text-primary">{m.resultado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Mini({ n, label }: { n: number; label: string }) {
  return (
    <div className="text-center p-2 rounded-lg bg-muted/40 border border-border">
      <div className="font-display text-xl">{n}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function RankingSection() {
  const max = titulos[0].titulos;
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <SectionTitle eyebrow="Histórico" title="Maiores campeões" />
      <div className="mt-8 space-y-3">
        {titulos.map((t, i) => (
          <div key={t.selecao} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl text-muted-foreground w-6">{i + 1}</span>
                <span className="text-xl">{t.selecao}</span>
              </div>
              <div className="font-display text-2xl text-gold">{t.titulos} 🏆</div>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gold" style={{ width: `${(t.titulos / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ArtilheirosSection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <SectionTitle eyebrow="Gols" title="Maiores artilheiros da história" />
      <div className="mt-8 rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/40">
              <th className="text-left p-4 text-xs uppercase tracking-widest text-muted-foreground">#</th>
              <th className="text-left p-4 text-xs uppercase tracking-widest text-muted-foreground">Jogador</th>
              <th className="text-left p-4 text-xs uppercase tracking-widest text-muted-foreground">País</th>
              <th className="text-right p-4 text-xs uppercase tracking-widest text-muted-foreground">Gols</th>
            </tr>
          </thead>
          <tbody>
            {artilheirosHistoria.map((a, i) => (
              <tr key={a.jogador} className="border-t border-border">
                <td className="p-4 font-display text-xl text-muted-foreground">{i + 1}</td>
                <td className="p-4 font-medium">{a.jogador}</td>
                <td className="p-4 text-muted-foreground">{a.pais}</td>
                <td className="p-4 text-right font-display text-2xl text-gold">{a.gols}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function QuizSection() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const question = quiz[current];

  function answer(i: number) {
    if (answered !== null) return;
    setAnswered(i);
    if (i === question.correct) setScore(s => s + 1);
    setTimeout(() => {
      if (current + 1 >= quiz.length) {
        setDone(true);
      } else {
        setCurrent(c => c + 1);
        setAnswered(null);
      }
    }, 900);
  }

  function reset() {
    setCurrent(0); setScore(0); setAnswered(null); setDone(false);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <SectionTitle eyebrow="Desafio" title="Quiz da Copa" />

      <div className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-[var(--shadow-card)]">
        {done ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">{score >= 6 ? "🏆" : score >= 4 ? "⚽" : "🥅"}</div>
            <h3 className="font-display text-4xl mb-2">Fim de jogo!</h3>
            <p className="text-muted-foreground mb-6">Você acertou</p>
            <div className="font-display text-7xl text-gold mb-8">{score} / {quiz.length}</div>
            <button onClick={reset} className="px-6 py-3 rounded-full bg-gold text-primary-foreground font-medium hover:scale-105 transition">
              Jogar novamente
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Pergunta {current + 1} de {quiz.length}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Placar: <span className="text-primary">{score}</span></span>
            </div>
            <div className="h-1 bg-muted rounded-full mb-8 overflow-hidden">
              <div className="h-full bg-gold transition-all" style={{ width: `${((current) / quiz.length) * 100}%` }} />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl mb-8">{question.q}</h3>
            <div className="grid gap-3">
              {question.a.map((opt, i) => {
                const isCorrect = answered !== null && i === question.correct;
                const isWrong = answered === i && i !== question.correct;
                return (
                  <button key={i} onClick={() => answer(i)} disabled={answered !== null}
                    className={`text-left p-4 rounded-xl border transition ${
                      isCorrect ? "border-secondary bg-secondary/20" :
                      isWrong ? "border-accent bg-accent/20" :
                      "border-border bg-muted/30 hover:border-primary hover:bg-card"
                    }`}>
                    <span className="font-mono text-muted-foreground mr-3">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function CuriosidadesSection() {
  const items = [
    { emoji: "⚽", title: "Maior goleada", txt: "Hungria 10 x 1 El Salvador (1982)" },
    { emoji: "🥅", title: "Mais gols em uma Copa", txt: "Just Fontaine — 13 gols em 1958" },
    { emoji: "🎯", title: "Maior artilheiro de todos os tempos", txt: "Miroslav Klose — 16 gols" },
    { emoji: "🏟️", title: "Maior público", txt: "Final de 1950: ~199.854 no Maracanã" },
    { emoji: "🧤", title: "Defesas perfeitas", txt: "Casillas (2010), Buffon (2006), Barthez (1998) — 2 gols sofridos" },
    { emoji: "💯", title: "100% de aproveitamento", txt: "Brasil em 1970 e 2002 venceu todos os jogos" },
    { emoji: "👑", title: "Mais finais consecutivas", txt: "Alemanha Ocidental — 1982, 1986 e 1990" },
    { emoji: "🌟", title: "Final mais emocionante", txt: "Argentina 3x3 França (2022) — decidida nos pênaltis" },
    { emoji: "🎭", title: "Maracanazo", txt: "Uruguai venceu o Brasil em pleno Maracanã (1950)" },
    { emoji: "✋", title: "La Mano de Dios", txt: "Maradona, 1986, contra a Inglaterra" },
    { emoji: "💔", title: "Mineirazo", txt: "Alemanha 7x1 Brasil na semifinal de 2014" },
    { emoji: "🌍", title: "Total de seleções", txt: "Mais de 84 países diferentes já disputaram a Copa" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <SectionTitle eyebrow="Você sabia?" title="Curiosidades históricas" />
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((c, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5 hover:border-primary/50 transition">
            <div className="text-3xl mb-3">{c.emoji}</div>
            <div className="font-display text-lg mb-1">{c.title}</div>
            <p className="text-sm text-muted-foreground">{c.txt}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-10">
        <h3 className="font-display text-2xl mb-6">Mascotes inesquecíveis</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            ["1966", "Willie"], ["1970", "Juanito"], ["1974", "Tip e Tap"], ["1978", "Gauchito"],
            ["1982", "Naranjito"], ["1986", "Pique"], ["1990", "Ciao"], ["1994", "Striker"],
            ["1998", "Footix"], ["2002", "Ato/Kaz/Nik"], ["2006", "Goleo"], ["2010", "Zakumi"],
            ["2014", "Fuleco"], ["2018", "Zabivaka"], ["2022", "La'eeb"],
          ].map(([ano, nome]) => (
            <div key={ano} className="p-3 rounded-xl bg-muted/30 border border-border text-center">
              <div className="font-display text-lg text-gold">{ano}</div>
              <div className="text-sm">{nome}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center">
      <div className="text-xs uppercase tracking-[0.3em] text-primary">{eyebrow}</div>
      <h2 className="font-display text-4xl sm:text-5xl mt-2">{title}</h2>
      <div className="mt-3 mx-auto h-0.5 w-16 bg-gold" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="mx-auto max-w-7xl px-4 py-10 text-center">
        <div className="text-2xl mb-2">🏆 ⚽ 🥇</div>
        <p className="text-sm text-muted-foreground">
          Colégio Estadual Barbosa Ferraz — Programação Back-End I · Prof. Borzuk Lindo
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Projeto: Concurso de Site "Copa do Mundo de Futebol" · Dados de 1930 a 2022
        </p>
      </div>
    </footer>
  );
}
