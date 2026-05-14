const { useState, useEffect, useRef, useMemo } = React;

// ---------- DATA ----------
const HERO_SLIDES = [
  {
    id: 1,
    name: "Casa Mirador",
    location: "Valle de Bravo · México",
    typology: "Residencial",
    year: "2025",
    area: "420 m²",
    status: "Recién entregado",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80",
  },
  {
    id: 2,
    name: "Pabellón Ocoyoacac",
    location: "Estado de México",
    typology: "Cultural",
    year: "2024",
    area: "860 m²",
    status: "En curaduría",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2200&q=80",
  },
  {
    id: 3,
    name: "Casa Aguamiel",
    location: "San Miguel de Allende",
    typology: "Residencial",
    year: "2024",
    area: "510 m²",
    status: "En construcción",
    img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=80",
  },
  {
    id: 4,
    name: "Torre Liminal",
    location: "Polanco · CDMX",
    typology: "Comercial",
    year: "2026",
    area: "12 400 m²",
    status: "En diseño",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2200&q=80",
  },
];

const PROJECTS = [
  { id: "p1", name: "Casa Horizonte", year: 2025, place: "Tepoztlán", cat: "Residencial", span: "span-7", ar: "62%", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80" },
  { id: "p2", name: "Refugio Pinar", year: 2025, place: "Valle de Bravo", cat: "Residencial", span: "span-5", ar: "62%", img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80" },
  { id: "p3", name: "Estudio Cantera", year: 2024, place: "Querétaro", cat: "Comercial", span: "span-4", ar: "82%", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80" },
  { id: "p4", name: "Pabellón del Agua", year: 2024, place: "Xochitepec", cat: "Cultural", span: "span-4", ar: "82%", img: "https://images.unsplash.com/photo-1600210492493-0946911123c4?auto=format&fit=crop&w=1400&q=80" },
  { id: "p5", name: "Casa Volcán", year: 2024, place: "Puebla", cat: "Residencial", span: "span-4", ar: "82%", img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80" },
  { id: "p6", name: "Foro Brutalista", year: 2023, place: "Monterrey", cat: "Cultural", span: "span-8", ar: "55%", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=80" },
  { id: "p7", name: "Estancia Bardo", year: 2023, place: "Oaxaca", cat: "Hospitalidad", span: "span-4", ar: "110%", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" },
  { id: "p8", name: "Casa Ribera", year: 2023, place: "Mérida", cat: "Residencial", span: "span-6", ar: "70%", img: "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1600&q=80" },
  { id: "p9", name: "Loft Industria", year: 2022, place: "CDMX", cat: "Interiorismo", span: "span-6", ar: "70%", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80" },
];

const CATEGORIES = ["Todos", "Residencial", "Cultural", "Comercial", "Hospitalidad", "Interiorismo"];

const AWARDS = [
  { yr: "2025", name: "Casa Mirador", who: "AIA Honor Award", where: "Nueva York" },
  { yr: "2024", name: "Pabellón del Agua", who: "Mención Bienal Iberoamericana", where: "Lisboa" },
  { yr: "2024", name: "Casa Volcán", who: "Premio Obras Cemex · Plata", where: "Monterrey" },
  { yr: "2023", name: "Foro Brutalista", who: "Architizer A+ Finalist", where: "Internacional" },
  { yr: "2023", name: "Estancia Bardo", who: "Dezeen Awards · Longlist", where: "Londres" },
];

// ---------- ICONS ----------
const Arrow = ({ dir = "right" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}>
    <path d="M5 12h14M13 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Plus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
  </svg>
);
const IG = () => <svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.25.07 1.62.07 4.8s0 3.55-.07 4.8c-.05 1.17-.25 1.81-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.25.06-1.62.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.81-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.21 15.55 2.2 15.18 2.2 12s0-3.55.07-4.8c.05-1.17.25-1.81.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.4 2.21 8.78 2.2 12 2.2zm0 1.95c-3.15 0-3.5 0-4.74.07-1.07.05-1.65.23-2.04.38-.51.2-.88.44-1.27.83-.39.39-.63.76-.83 1.27-.15.39-.33.97-.38 2.04-.06 1.16-.07 1.5-.07 4.42s0 3.27.07 4.42c.05 1.07.23 1.65.38 2.04.2.51.44.88.83 1.27.39.39.76.63 1.27.83.39.15.97.33 2.04.38 1.16.06 1.5.07 4.42.07s3.27 0 4.42-.07c1.07-.05 1.65-.23 2.04-.38.51-.2.88-.44 1.27-.83.39-.39.63-.76.83-1.27.15-.39.33-.97.38-2.04.06-1.16.07-1.5.07-4.42s0-3.27-.07-4.42c-.05-1.07-.23-1.65-.38-2.04-.2-.51-.44-.88-.83-1.27a3.43 3.43 0 0 0-1.27-.83c-.39-.15-.97-.33-2.04-.38-1.16-.06-1.5-.07-4.42-.07zm0 3.32a4.55 4.55 0 1 1 0 9.1 4.55 4.55 0 0 1 0-9.1zm0 1.95a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2zm5.79-2.17a1.07 1.07 0 1 1-2.14 0 1.07 1.07 0 0 1 2.14 0z"/></svg>;
const Pin = () => <svg viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 0-3.77-4.25c-2.04-.39-3.42.55-4.27 1.93-.85-1.38-2.23-2.32-4.27-1.93A4.83 4.83 0 0 0 3.5 6.69c-.13 3.65 4.36 7.42 8.05 9.65 3.69-2.23 8.18-6 8.04-9.65zM11.55 22.5c-.66-1.07-2.05-3.5-2.5-4.93h5.5c-.45 1.42-1.85 3.86-2.5 4.93-.13.21-.36.21-.5 0z"/></svg>;
const LI = () => <svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 18.34v-7.92H5.7v7.92h2.64zM7.02 9.34a1.54 1.54 0 1 0 0-3.08 1.54 1.54 0 0 0 0 3.08zm11.32 9V14c0-2.27-1.21-3.32-2.83-3.32-1.31 0-1.9.72-2.23 1.22v-1.05h-2.64c.04.74 0 7.92 0 7.92h2.64v-4.43c0-.24.02-.47.09-.64.18-.47.62-.97 1.34-.97.95 0 1.33.72 1.33 1.78v4.26h2.3z"/></svg>;
const Be = () => <svg viewBox="0 0 24 24"><path d="M9.6 7.3c1.78 0 3.13.97 3.13 3 0 .95-.42 1.77-1.12 2.27 1.05.4 1.75 1.43 1.75 2.7 0 2.06-1.74 3.02-3.6 3.02H4V7.3h5.6zm-3 2.36v2.42h2.5c.92 0 1.4-.47 1.4-1.22 0-.83-.6-1.2-1.5-1.2H6.6zm0 4.4v2.62h2.6c1 0 1.6-.45 1.6-1.3 0-.84-.55-1.32-1.6-1.32H6.6zm12.18-.36c-1.05 0-1.62.55-1.75 1.4h3.4c-.05-.97-.7-1.4-1.65-1.4zm.05 4.07c.7 0 1.32-.27 1.5-.86h2.2c-.5 1.62-1.92 2.4-3.78 2.4-2.42 0-4.1-1.58-4.1-4.08 0-2.45 1.7-4.1 4-4.1 2.6 0 3.96 1.97 3.96 4.46v.42h-5.55c.1 1.2.78 1.76 1.77 1.76zM21.5 8.1V9.4h-4.6V8.1h4.6z"/></svg>;

// ---------- COMPONENTS ----------
function Header({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["work", "Proyectos"],
    ["studio", "Estudio"],
    ["awards", "Premios"],
    ["journal", "Diario"],
    ["contact", "Contacto"],
  ];
  return (
    <header className={"header" + (scrolled ? " scrolled" : "")}>
      <a href="#top" className="brand" onClick={(e) => { e.preventDefault(); setActive("top"); document.getElementById("top").scrollIntoView({ behavior: "smooth" }); }}>
        <span className="mark">AV</span>
        <span>Atelier Vértice</span>
      </a>
      <nav className="nav">
        {links.map(([id, label]) => (
          <a key={id} href={"#" + id}
             className={active === id ? "active" : ""}
             onClick={(e) => { e.preventDefault(); setActive(id); document.getElementById(id).scrollIntoView({ behavior: "smooth" }); }}>
            {label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="cta-mini"
         onClick={(e) => { e.preventDefault(); setActive("contact"); document.getElementById("contact").scrollIntoView({ behavior: "smooth" }); }}>
        <span className="dot"></span>
        <span>Briefing 2026</span>
      </a>
    </header>
  );
}

function Hero() {
  const [idx, setIdx] = useState(0);
  const len = HERO_SLIDES.length;

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % len), 6500);
    return () => clearInterval(t);
  }, [len]);

  const cur = HERO_SLIDES[idx];

  return (
    <section className="hero" id="top">
      <div className="hero-stage">
        {HERO_SLIDES.map((s, i) => (
          <div key={s.id} className={"hero-slide " + (i === idx ? "active" : "")}>
            <div className="img" style={{ backgroundImage: `url(${s.img})` }} />
            <div className="shade" />
          </div>
        ))}
        <div className="hero-grid-overlay" />
      </div>

      <div className="hero-side">
        <span>Scroll · Descubrir</span>
        <span className="v-rule"></span>
        <span>Atelier · MMXXVI</span>
      </div>

      <div className="hero-content">
        <div className="hero-top mono">
          <div className="crumbs">
            <span>Featured</span>
            <span className="sep"></span>
            <span>Obra reciente</span>
          </div>
          <div>{cur.status}</div>
        </div>

        <div className="hero-mid">
          <div className="hero-eyebrow mono">
            <span className="bar"></span>
            <span>{cur.typology} · {cur.year}</span>
          </div>
          <h1 className="hero-title">
            {cur.name.split(" ").map((w, i) => (
              <span key={i}>
                {i === 1 ? <em>{w}</em> : w}
                {i < cur.name.split(" ").length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <dl className="hero-meta mono">
            <div>
              <dt>Ubicación</dt>
              <dd>{cur.location}</dd>
            </div>
            <div>
              <dt>Superficie</dt>
              <dd>{cur.area}</dd>
            </div>
            <div>
              <dt>Tipología</dt>
              <dd>{cur.typology}</dd>
            </div>
          </dl>
        </div>

        <div className="hero-bottom">
          <div className="hero-pager">
            <span className="num">{String(idx + 1).padStart(2, "0")}</span>
            <span className="track"><span className="fill" style={{ width: `${((idx + 1) / len) * 100}%` }}></span></span>
            <span className="total">{String(len).padStart(2, "0")}</span>
          </div>
          <div className="hero-controls">
            <button onClick={() => setIdx((idx - 1 + len) % len)} aria-label="Anterior"><Arrow dir="left" /></button>
            <button onClick={() => setIdx((idx + 1) % len)} aria-label="Siguiente"><Arrow /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["Arquitectura habitada", "Materia · Luz · Tiempo", "Desde 2008", "México · Iberoamérica", "Diseño con consciencia", "Atelier Vértice"];
  const loop = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {loop.map((t, i) => (
          <span key={i}>
            {t}
            <span className="dot"></span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState("Todos");
  const filtered = useMemo(
    () => filter === "Todos" ? PROJECTS : PROJECTS.filter((p) => p.cat === filter),
    [filter]
  );
  const counts = useMemo(() => {
    const c = { Todos: PROJECTS.length };
    PROJECTS.forEach((p) => { c[p.cat] = (c[p.cat] || 0) + 1; });
    return c;
  }, []);

  return (
    <section id="work">
      <div className="section-head reveal">
        <div className="left">
          <span className="mono dim">— 01 / Obra seleccionada</span>
          <h2>Proyectos<br /><em>en curso & archivo</em></h2>
        </div>
        <p className="lead">
          Una práctica que oscila entre la casa y la ciudad. Construimos lugares
          donde la materia se vuelve atmósfera y el dibujo, una manera de pensar.
        </p>
      </div>

      <div className="filters reveal">
        {CATEGORIES.map((c) => (
          <button key={c} className={c === filter ? "active" : ""} onClick={() => setFilter(c)}>
            {c}<span className="count">[{counts[c] || 0}]</span>
          </button>
        ))}
      </div>

      <div className="grid">
        {filtered.map((p, i) => (
          <article key={p.id} className={"card reveal " + p.span} style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
            <div className="thumb" style={{ "--ar": p.ar }}>
              <div className="img" style={{ backgroundImage: `url(${p.img})` }}></div>
              <div className="veil"></div>
              <span className="card-tag">{p.cat}</span>
              <span className="card-arrow"><Arrow /></span>
            </div>
            <div className="card-meta">
              <div>
                <div className="name">{p.name}</div>
                <div className="sub mono">
                  <span>{p.place}</span>
                  <span>·</span>
                  <span>{p.cat}</span>
                </div>
              </div>
              <span className="year">{p.year}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="philosophy" id="studio">
      <div className="section-head reveal">
        <div className="left">
          <span className="mono dim">— 02 / Filosofía</span>
          <h2>Lo construido<br /><em>como un acto</em><br />de escucha.</h2>
        </div>
        <p className="lead">
          Fundado en 2008 por Inés Vallejo y Mateo Aldama, Atelier Vértice opera
          desde la sospecha de que un edificio se justifica solo si mejora la vida
          de quien lo habita y de quien lo rodea.
        </p>
      </div>

      <div className="philo-grid reveal">
        <p className="philo-quote">
          “Diseñar es <em>desocupar</em> el lugar de todo aquello que no le pertenece.
          Lo que queda —la luz, la pendiente, la sombra— ya estaba ahí.”
        </p>
        <div className="philo-side">
          <div className="philo-pillars">
            <div className="pillar">
              <h4>Materia</h4>
              <p>Trabajamos con concreto, madera y piedra local. La materia nos ata al sitio y al oficio.</p>
            </div>
            <div className="pillar">
              <h4>Luz</h4>
              <p>Cada proyecto se proyecta dos veces: una en planta y otra en función del recorrido del sol.</p>
            </div>
            <div className="pillar">
              <h4>Programa</h4>
              <p>Antes del trazo, una conversación larga. La casa empieza por preguntar cómo vive la familia.</p>
            </div>
            <div className="pillar">
              <h4>Paisaje</h4>
              <p>No diseñamos el edificio y el jardín por separado. La arquitectura es paisaje continuado.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="stats">
        <div className="stat"><div className="num">17</div><div className="label">años de práctica continua</div></div>
        <div className="stat"><div className="num"><em>92</em></div><div className="label">proyectos construidos</div></div>
        <div className="stat"><div className="num">11</div><div className="label">países donde hemos publicado</div></div>
        <div className="stat"><div className="num"><em>24</em></div><div className="label">premios y reconocimientos</div></div>
      </div>
    </section>
  );
}

function Awards() {
  return (
    <section className="awards" id="awards">
      <div className="section-head reveal">
        <div className="left">
          <span className="mono dim">— 03 / Reconocimientos</span>
          <h2>Distinciones<br /><em>recientes</em></h2>
        </div>
        <p className="lead">
          La obra ha sido reconocida en circuitos académicos, editoriales y bienales.
          La crítica nos importa menos que el cliente que vuelve.
        </p>
      </div>
      <div className="awards-list reveal">
        {AWARDS.map((a, i) => (
          <div className="award-row" key={i}>
            <div className="yr">{a.yr}</div>
            <div className="name">{a.name}</div>
            <div className="who">{a.who}</div>
            <div className="where">{a.where}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [budget, setBudget] = useState("MX $5–10M");
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: "", email: "", project: "", message: "" }); }, 3200);
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-grid">
        <div className="reveal">
          <span className="mono dim">— 04 / Briefing</span>
          <h2 style={{ marginTop: 16 }}>Cuéntanos<br />de tu <em>terreno</em>,<br />tu programa,<br />tu hora del día.</h2>
          <dl className="contact-info">
            <div className="row">
              <dt className="mono">Estudio</dt>
              <dd>Calle Tonalá 184<br/>Roma Norte · CDMX 06700</dd>
            </div>
            <div className="row">
              <dt className="mono">Correo</dt>
              <dd>hola@ateliervertice.mx</dd>
            </div>
            <div className="row">
              <dt className="mono">Teléfono</dt>
              <dd>+52 55 4221 0817</dd>
            </div>
            <div className="row">
              <dt className="mono">Horario</dt>
              <dd>Lun – Vie · 09 — 19 h</dd>
            </div>
          </dl>
        </div>

        <form className="form reveal" onSubmit={submit}>
          <div className="field-row">
            <div className="field">
              <label>Nombre</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Inés Vallejo" />
            </div>
            <div className="field">
              <label>Correo</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="ines@correo.mx" />
            </div>
          </div>
          <div className="field">
            <label>Tipo de proyecto</label>
            <input value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} placeholder="Casa de campo en Valle de Bravo, 380 m²" />
          </div>
          <div className="field">
            <label>Presupuesto estimado</label>
            <div className="budget-row" style={{ marginTop: 10 }}>
              {["MX $2–5M", "MX $5–10M", "MX $10–25M", "MX $25M +", "Por definir"].map((b) => (
                <button type="button" key={b} className={budget === b ? "active" : ""} onClick={() => setBudget(b)}>{b}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Cuéntanos más</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="El terreno mira al sur, hay un viejo huizache que queremos preservar…" />
          </div>
          <button type="submit" className={"submit" + (sent ? " sent" : "")}>
            <span>{sent ? "Enviado · gracias" : "Enviar briefing"}</span>
            <Arrow />
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer" id="journal">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand-lg">Atelier<br /><em>Vértice</em></div>
          <p>Estudio de arquitectura fundado en CDMX. Trabajamos en residencia, cultura, hospitalidad e interiorismo desde una geometría sencilla y una mirada larga al tiempo.</p>
          <div className="socials">
            <a href="#" aria-label="Instagram"><IG /></a>
            <a href="#" aria-label="LinkedIn"><LI /></a>
            <a href="#" aria-label="Pinterest"><Pin /></a>
            <a href="#" aria-label="Behance"><Be /></a>
          </div>
        </div>
        <div className="footer-col">
          <h5>Estudio</h5>
          <ul>
            <li><a href="#studio">Filosofía</a></li>
            <li><a href="#">Equipo</a></li>
            <li><a href="#">Proceso</a></li>
            <li><a href="#">Publicaciones</a></li>
            <li><a href="#">Vacantes</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Obra</h5>
          <ul>
            <li><a href="#work">Residencial</a></li>
            <li><a href="#work">Cultural</a></li>
            <li><a href="#work">Comercial</a></li>
            <li><a href="#work">Hospitalidad</a></li>
            <li><a href="#work">Interiorismo</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Contacto</h5>
          <ul>
            <li>Tonalá 184<br />Roma Norte, CDMX</li>
            <li><a href="mailto:hola@ateliervertice.mx">hola@ateliervertice.mx</a></li>
            <li><a href="tel:+525542210817">+52 55 4221 0817</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© MMXXVI · Atelier Vértice · Estudio de Arquitectura</span>
        <div className="links">
          <a href="#">Aviso de privacidad</a>
          <a href="#">Términos</a>
          <a href="#">Colofón</a>
        </div>
      </div>
    </footer>
  );
}

// ---------- ROOT ----------
function App() {
  const [active, setActive] = useState("top");

  // Reveal on scroll
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Update active link based on scroll position
  useEffect(() => {
    const ids = ["top", "work", "studio", "awards", "contact"];
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let cur = "top";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="grain"></div>
      <Header active={active} setActive={setActive} />
      <Hero />
      <Marquee />
      <Projects />
      <Philosophy />
      <Awards />
      <Contact />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
