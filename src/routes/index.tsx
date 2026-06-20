import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "Modelo", href: "#modelo" },
  { label: "Vans", href: "#vans" },
  { label: "Starbucks", href: "#starbucks" },
  { label: "Fuentes", href: "#fuentes" },
];

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference">
      <div className="flex items-center justify-between px-6 md:px-10 py-6">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm tracking-tight text-white">
          <span className="inline-block w-5 h-5 rounded-sm bg-accent" />
          NEUROPIRÁMIDE
        </a>
        <nav className="hidden md:flex items-center gap-9 text-sm text-white">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="hover:text-accent transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#cta"
          className="hidden md:inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-accent-foreground hover:scale-110 transition-transform"
          aria-label="Ir abajo"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle, oklch(0.92 0.21 125 / 0.6), transparent 60%)" }}
      />

      {/* Animated stacked pyramid blocks (à la hyperframe) */}
      <motion.div
        style={{ y, opacity }}
        className="absolute right-[5%] top-[10%] hidden md:flex flex-col items-end gap-2"
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-12 rounded-md border border-white/10 bg-gradient-to-r from-white/5 to-white/15 backdrop-blur"
            style={{ width: `${120 + i * 80}px` }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 px-6 md:px-10 pt-40 md:pt-48 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-xs tracking-widest text-muted-foreground uppercase mb-8"
        >
          UVEG · Módulo I · 15.06.26
        </motion.div>

        <h1 className="h-display text-[14vw] md:text-[10vw] leading-[0.88] text-balance max-w-[18ch]">
          {"Neuromarketing,".split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.03, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {c === " " ? "\u00A0" : c}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="inline-block text-muted-foreground"
          >
            decodificado<span className="text-accent">.</span>
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-16 md:mt-24 grid md:grid-cols-3 gap-10 max-w-5xl"
        >
          <div className="md:col-span-2">
            <p className="text-xl md:text-2xl text-balance leading-snug">
              Un recorrido por los <span className="text-accent">seis niveles</span> de la
              Neuropirámide de Romano, aplicada a dos marcas que la dominan:
              Vans y Starbucks.
            </p>
          </div>
          <div className="font-mono text-xs text-muted-foreground space-y-1 md:text-right">
            <div>PRESENTA</div>
            <div className="text-foreground">José Antonio Lorenzo Mora</div>
            <div>MAT. 25023307</div>
            <div>REV. Dra. Eva María Alonso Zaragoza</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-6 md:left-10 font-mono text-xs text-muted-foreground flex items-center gap-3"
      >
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-accent animate-pulse-ring" />
          <span className="relative rounded-full w-2 h-2 bg-accent" />
        </span>
        DESPLÁZATE PARA EXPLORAR
      </motion.div>
    </section>
  );
}

function Marquee() {
  const words = ["ATENCIÓN", "SENSORIAL", "EMOCIÓN", "COGNICIÓN", "FILTRO", "ACCIÓN", "LEALTAD"];
  return (
    <div className="relative border-y border-border py-6 overflow-hidden bg-surface/40">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span key={i} className="mx-10 font-mono text-sm tracking-[0.3em] flex items-center gap-10">
            {w}
            <span className="w-2 h-2 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}

function IconNodeNetwork() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-9 h-9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6.5" r="2.25" />
      <circle cx="18" cy="6.5" r="2.25" />
      <circle cx="12" cy="18" r="2.25" />
      <path d="M7.9 8.1 10.5 16.1M16.1 8.1 13.5 16.1M8.25 6.5h7.5" />
    </svg>
  );
}

function ModelSection() {
  const pillars = [
    {
      icon: <IconNodeNetwork />,
      title: "Decodificación cerebral",
      body: "Entiende cómo los estímulos se transforman en respuestas neurofisiológicas reales.",
    },
    {
      icon: "◎",
      title: "Optimización de mensaje",
      body: "Elimina el ruido y susurra directamente a la atención, la emoción y la razón.",
    },
    {
      icon: "✦",
      title: "Vínculo de lealtad",
      body: "Integra la marca en la identidad profunda y los valores del consumidor.",
    },
  ];

  return (
    <section id="modelo" className="relative px-6 md:px-10 py-32 md:py-48">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="font-mono text-xs tracking-widest text-accent uppercase mb-6">
            01 — El modelo
          </div>
          <h2 className="h-display text-5xl md:text-8xl text-balance max-w-[14ch]">
            El corazón del marketing moderno<span className="text-accent">.</span>
          </h2>
          <p className="mt-10 text-lg md:text-xl text-muted-foreground max-w-2xl">
            La Neuropirámide decodifica cómo los estímulos externos se transforman
            en decisiones biológicas profundas, capa por capa.
          </p>
        </motion.div>

        <div className="mt-20 grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-8 rounded-2xl border border-border bg-surface/50 hover:border-accent/60 transition-colors overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent/10 blur-3xl group-hover:bg-accent/30 transition-colors" />
              <div className="relative">
                <div className="flex items-center justify-center w-9 h-9 mb-8 text-4xl text-accent">{p.icon}</div>
                <h3 className="text-2xl font-medium mb-3 tracking-tight">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
              <div className="relative mt-10 font-mono text-xs text-muted-foreground">
                0{i + 1} / 03
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Level = { n: string; title: string; body: string };

function CaseStudy({
  id,
  brand,
  tagline,
  accentText,
  levelsA,
  levelsB,
  align = "left",
}: {
  id: string;
  brand: string;
  tagline: string;
  accentText: string;
  levelsA: Level[];
  levelsB: Level[];
  align?: "left" | "right";
}) {
  return (
    <section id={id} className="relative px-6 md:px-10 py-32 md:py-48 border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: align === "right" ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`flex flex-col max-w-2xl ${align === "right" ? "items-end text-right ml-auto" : "items-start text-left"}`}
        >
          <div className="font-mono text-xs tracking-widest text-accent uppercase mb-6">
            Caso de estudio
          </div>
          <h2 className="h-display text-balance leading-[0.9] text-[clamp(3rem,11vw,8.5rem)]">
            {brand}<span className="text-accent">.</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-md">
            {tagline}
          </p>
          <div className="mt-10 inline-block px-4 py-2 rounded-full border border-accent/40 bg-accent/10 text-accent font-mono text-xs tracking-widest uppercase">
            {accentText}
          </div>
        </motion.div>

        <LevelStack title="El viaje sensorial" range="Niveles I — III" levels={levelsA} />
        <LevelStack title="De la mente a la acción" range="Niveles IV — VI" levels={levelsB} />
      </div>
    </section>
  );
}

function LevelStack({
  title,
  range,
  levels,
}: {
  title: string;
  range: string;
  levels: Level[];
}) {
  return (
    <div className="mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mb-10 border-b border-border pb-6">
        <h3 className="text-2xl md:text-4xl tracking-tight">{title}</h3>
        <span className="font-mono text-xs text-muted-foreground tracking-widest whitespace-nowrap">
          {range}
        </span>
      </div>
      <div className="grid md:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
        {levels.map((lvl, i) => (
          <LevelCard key={lvl.n} level={lvl} index={i} />
        ))}
      </div>
    </div>
  );
}

function LevelCard({ level, index }: { level: Level; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-8 md:p-10 bg-background hover:bg-surface transition-colors group min-h-[320px] flex flex-col justify-between"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs tracking-widest text-muted-foreground">
          NIVEL
        </span>
        <span className="h-display text-6xl text-accent group-hover:scale-110 origin-right transition-transform">
          {level.n}
        </span>
      </div>
      <div>
        <h4 className="text-2xl md:text-3xl tracking-tight mb-4 text-balance">
          {level.title}
        </h4>
        <p className="text-muted-foreground leading-relaxed">{level.body}</p>
      </div>
      <div className="absolute bottom-0 left-0 h-px bg-accent w-0 group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
}

function Quote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const text =
    "El neuromarketing no es una técnica para manipular la mente del consumidor; es una disciplina científica que ayuda a comprenderla para diseñar productos y servicios que realmente satisfagan sus necesidades.";
  const words = text.split(" ");

  return (
    <section ref={ref} className="relative px-6 md:px-10 py-40 md:py-56 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="font-mono text-xs tracking-widest text-accent uppercase mb-10">
          Reflexión final
        </div>
        <p className="h-display text-3xl md:text-6xl leading-[1.05] text-balance">
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return <Word key={i} word={w} progress={scrollYProgress} range={[start, end]} />;
          })}
        </p>
      </div>
    </section>
  );
}

function Word({ word, progress, range }: { word: string; progress: any; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {word}
    </motion.span>
  );
}

function Sources() {
  const sources = [
    { author: "Romano, J.", year: "2012", title: "Neuropirámide", publisher: "Editorial Planeta" },
    { author: "Enrique Digital", year: "2018", title: "Los seis niveles del neuromarketing", publisher: "Opinión" },
    { author: "Starbucks México", year: "2015", title: "Everything just for you", publisher: "YouTube" },
    { author: "Mercadotecnia Total", year: "2017", title: "Neuropirámide de Romano — Base del Neuromarketing", publisher: "Portal especializado" },
    { author: "Vans", year: "2023", title: "Mexico Skate Team takes the City of Berlin", publisher: "YouTube" },
    { author: "Braidot, N.", year: "2009", title: "Neuromarketing en acción", publisher: "Editorial Granica · Redalyc" },
  ];

  return (
    <section id="fuentes" className="relative px-6 md:px-10 py-32 md:py-40 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-5">
            <div className="font-mono text-xs tracking-widest text-accent uppercase mb-6">
              04 — Bibliografía
            </div>
            <h2 className="h-display text-5xl md:text-7xl">Fuentes académicas<span className="text-accent">.</span></h2>
          </div>
        </div>
        <div className="border-t border-border">
          {sources.map((s, i) => (
            <motion.a
              key={i}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-baseline gap-6 py-8 border-b border-border hover:bg-surface/40 transition-colors px-2"
            >
              <span className="font-mono text-xs text-muted-foreground w-10">0{i + 1}</span>
              <div className="flex-1 grid md:grid-cols-12 gap-4 items-baseline">
                <div className="md:col-span-3 font-mono text-sm text-muted-foreground">
                  {s.author} ({s.year})
                </div>
                <div className="md:col-span-6 text-xl md:text-2xl tracking-tight group-hover:text-accent transition-colors">
                  {s.title}
                </div>
                <div className="md:col-span-3 text-sm text-muted-foreground md:text-right">
                  {s.publisher}
                </div>
              </div>
              <span className="text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="cta" className="relative px-6 md:px-10 py-32 md:py-48 border-t border-border overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at center bottom, oklch(0.92 0.21 125 / 0.6), transparent 60%)",
        }}
      />
      <div className="relative max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-display text-5xl md:text-8xl text-balance"
        >
          Entender el cerebro<br />
          es entender al<br />
          <span className="text-accent">consumidor.</span>
        </motion.h2>
      </div>
    </section>
  );
}

function Footer() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer className="px-6 md:px-10 py-10 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-6 font-mono text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded-sm bg-accent" />
          NEUROPIRÁMIDE · UVEG · 2026
        </div>
        <div className="flex items-center gap-6">
          <span>MÓDULO I — NEUROMARKETING</span>
          <span>{time} CDMX</span>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <ModelSection />

      <CaseStudy
        id="vans"
        brand="Vans"
        tagline="Off the Wall — Cuando una marca se vuelve identidad."
        accentText="Cultura urbana · Libertad"
        levelsA={[
          { n: "I", title: "Atención focalizada", body: "Branding 'Off the Wall' de alto impacto que rompe patrones visuales desde el primer segundo." },
          { n: "II", title: "Activación sensorial", body: "El ritmo del skate y la estética urbana activan vista y oído de forma simultánea y potente." },
          { n: "III", title: "Conexión emocional", body: "Valores de libertad y resiliencia generan un vínculo límbico profundo y auténtico." },
        ]}
        levelsB={[
          { n: "IV", title: "Análisis cognitivo", body: "El cerebro asocia Vans con una comunidad global de expresión personal y cultura urbana." },
          { n: "V", title: "Filtro regulador", body: "Validación de autenticidad: la marca se percibe genuina, accesible y alejada del lujo inalcanzable." },
          { n: "VI", title: "Acción e identidad", body: "El usuario adopta la filosofía 'Off the Wall' como parte de su identidad, generando lealtad profunda." },
        ]}
      />

      <CaseStudy
        id="starbucks"
        brand="Starbucks"
        tagline="Conexión humana — Cuando el cliente se siente visto."
        accentText="Aroma · Pertenencia · Ritual"
        align="right"
        levelsA={[
          { n: "I", title: "Atención personalizada", body: "El nombre escrito a mano en el vaso es el disparador visual más potente: captura el foco al instante." },
          { n: "II", title: "Activación sensorial", body: "Aromas de café tostado y texturas cálidas crean una atmósfera sensorial única y reconocible." },
          { n: "III", title: "Pertenencia y afecto", body: "Sentirse 'visto' y valorado genera un estado de placer que trasciende el simple consumo de café." },
        ]}
        levelsB={[
          { n: "IV", title: "Análisis cognitivo", body: "El cerebro justifica el valor premium a través de la narrativa de calidad y el origen ético del café." },
          { n: "V", title: "Filtro regulador", body: "Los sellos de responsabilidad social validan la decisión, alineándola con los valores del usuario." },
          { n: "VI", title: "Acción y lealtad", body: "Culmina en un consumo recurrente donde el cliente se siente parte de una experiencia superior al producto." },
        ]}
      />

      <Quote />
      <Sources />
      <CTA />
      <Footer />
    </main>
  );
}
