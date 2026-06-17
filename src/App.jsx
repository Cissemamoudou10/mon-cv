import { useState, useEffect, useRef } from "react";

// ============================================================
//  PALETTE & TOKENS  (esprit Aesop : noir / blanc cassé / doré sobre)
// ============================================================
const C = {
  ink: "#0A0A0A",
  cream: "#FAF8F4",
  white: "#FFFFFF",
  gold: "#B08D57",
  grey: "#6B6B6B",
  line: "#E4DFD6",
};

const SERIF = "'Cormorant Garamond', Georgia, serif";
const BODY = "'EB Garamond', Georgia, serif";
const SANS = "'Inter', -apple-system, sans-serif";

// ============================================================
//  DONNÉES DE DÉMO  (gamme mixte : peau, corps, cheveux)
// ============================================================
const PRODUCTS = [
  {
    id: 1,
    name: "Sérum Centella Apaisant",
    type: "Visage",
    desc: "Sérum concentré aux actifs coréens pour une peau apaisée et lumineuse.",
    price: "29 000 FCFA",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80",
  },
  {
    id: 2,
    name: "Crème Riz Fermenté",
    type: "Visage",
    desc: "Texture fondante nourrissante, éclat et confort immédiat.",
    price: "24 000 FCFA",
    img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=900&q=80",
  },
  {
    id: 3,
    name: "Essence Ginseng",
    type: "Visage",
    desc: "Essence revitalisante, fermeté et lumière jour après jour.",
    price: "25 500 FCFA",
    img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900&q=80",
  },
  {
    id: 4,
    name: "Crème Mucine d'Escargot",
    type: "Visage",
    desc: "Réparation intense, peau rebondie et lissée.",
    price: "14 500 FCFA",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=80",
  },
  {
    id: 5,
    name: "Toner Acide Hyaluronique",
    type: "Visage",
    desc: "Lotion hydratante repulpante, fraîcheur instantanée.",
    price: "21 000 FCFA",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=80",
  },
  {
    id: 6,
    name: "Masque Thé Vert Purifiant",
    type: "Visage",
    desc: "Masque purifiant à l'argile et thé vert, pores resserrés.",
    price: "18 500 FCFA",
    img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=80",
  },
];

const MARQUEE = [
  "Centella", "Acide hyaluronique", "Niacinamide", "Ginseng", "Mucine d'escargot",
  "Thé vert", "Riz fermenté", "Propolis", "Rétinol", "Vitamine C",
];

// Préoccupations (entrée visuelle sur l'accueil)
const CONCERNS = [
  { title: "Hydratation & confort", img: "1556228720-195a672e8a03" },
  { title: "Éclat & teint terne", img: "1620916566398-39f1143ab7be" },
  { title: "Imperfections & pores", img: "1612817288484-6f916006741a" },
  { title: "Anti-âge", img: "1571781926291-c477ebfd024b" },
];

// Nouveautés
const NEW_PRODUCTS = [
  { id: "n1", name: "Essence Lumière", type: "Visage", price: "32 000 FCFA", img: "1556228453-efd6c1ff04f6" },
  { id: "n2", name: "Masque Nuit Réparateur", type: "Visage", price: "27 000 FCFA", img: "1608248597279-f99d160bfcbc" },
  { id: "n3", name: "Huile Précieuse Corps", type: "Corps", price: "30 000 FCFA", img: "1601049541289-9b1b7bbbfe19" },
  { id: "n4", name: "Brume Cheveux Légère", type: "Cheveux", price: "19 000 FCFA", img: "1608248543803-ba4f8c70ae0b" },
];

// Best-sellers
const BEST_SELLERS = [
  { id: "b1", name: "Sérum Centella Apaisant", type: "Visage", price: "29 000 FCFA", img: "1556228720-195a672e8a03" },
  { id: "b2", name: "Toner Acide Hyaluronique", type: "Visage", price: "21 000 FCFA", img: "1620916566398-39f1143ab7be" },
  { id: "b3", name: "Crème Riz Fermenté", type: "Visage", price: "24 000 FCFA", img: "1556228578-8c89e6adf883" },
  { id: "b4", name: "Masque Thé Vert Purifiant", type: "Visage", price: "18 500 FCFA", img: "1612817288484-6f916006741a" },
];

// Marques partenaires (modèle hybride)
const PARTNER_BRANDS = ["Hanbit", "Seoul Dew", "Pure Seoul", "Goyo", "Hanok", "Dami"];

// Avis clients
const REVIEWS = [
  { name: "Aïssata D.", city: "Bamako", text: "Une qualité que je n'avais jamais trouvée localement. Le sérum a transformé ma peau en quelques semaines." },
  { name: "Fanta K.", city: "Bamako", text: "Conseil parfait via WhatsApp, livraison rapide. L'expérience est aussi soignée que les produits." },
  { name: "Mariam T.", city: "Kati", text: "J'adore la philosophie de la marque. Des soins simples, efficaces, avec de vrais actifs coréens." },
];

// Journal / articles
const ARTICLES = [
  { title: "Construire sa routine en 4 gestes", cat: "Conseils", img: "1556228578-8c89e6adf883" },
  { title: "La mucine d'escargot, secret coréen", cat: "Ingrédients", img: "1620916566398-39f1143ab7be" },
  { title: "Adopter le rituel du soir", cat: "Rituels", img: "1556228720-195a672e8a03" },
];

// ============================================================
//  HOOK : révélation au scroll
// ============================================================
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setShown(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 1s ease ${delay}s, transform 1s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ============================================================
//  HEADER  — logo à gauche, nav multi-volets (desktop),
//            bouton menu (mobile uniquement)
// ============================================================
// Structure de navigation à plusieurs volets, avec sous-menus illustrés (mega-menu).
// Chaque volet peut porter des vignettes "feature" illustrant une entrée.
const NAV = [
  {
    label: "Préoccupations",
    sub: ["Hydratation & confort", "Éclat & teint terne", "Imperfections & pores", "Anti-âge", "Sensibilité & rougeurs", "Soin du regard"],
    feature: [
      { title: "Hydratation & confort", img: "1556228720-195a672e8a03" },
      { title: "Éclat & teint terne", img: "1620916566398-39f1143ab7be" },
    ],
  },
  {
    label: "Soins",
    sub: ["Nettoyants", "Toniques & brumes", "Sérums & ampoules", "Crèmes & hydratants", "Exfoliants & masques", "Solaires"],
    feature: [
      { title: "Sérums & ampoules", img: "1608248543803-ba4f8c70ae0b" },
      { title: "Crèmes & hydratants", img: "1571781926291-c477ebfd024b" },
    ],
  },
  {
    label: "Corps & Cheveux",
    sub: ["Gels & gommages corps", "Laits & crèmes corps", "Mains & pieds", "Shampoings & soins", "Huiles capillaires"],
    feature: [
      { title: "Laits & crèmes corps", img: "1601049541289-9b1b7bbbfe19" },
      { title: "Huiles capillaires", img: "1612817288484-6f916006741a" },
    ],
  },
  {
    label: "Marques",
    sub: ["Myra", "Marques partenaires", "Nouveautés", "Best-sellers"],
    feature: [
      { title: "La marque Myra", img: "1556228578-8c89e6adf883" },
      { title: "Nouveautés", img: "1580870069867-74c57ee1bb07" },
    ],
  },
  { label: "Histoire", sub: null },
  { label: "Contact", sub: null },
];

function NavItem({ item, alignRight }) {
  const [open, setOpen] = useState(false);
  const hasSub = !!item.sub;
  const hasFeature = !!item.feature;
  // Les volets larges proches du bord droit s'alignent à droite pour ne pas déborder.
  const wide = hasFeature && alignRight;
  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => hasSub && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a href="#" style={{
        fontFamily: SANS, fontSize: 11, letterSpacing: "0.16em",
        textTransform: "uppercase", color: C.ink, textDecoration: "none",
        display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 0",
        whiteSpace: "nowrap",
      }}>
        {item.label}
        {hasSub && <span style={{
          fontSize: 8, color: C.gold,
          transform: open ? "rotate(180deg)" : "rotate(0)",
          transition: "transform .3s ease",
        }}>▾</span>}
      </a>
      {hasSub && (
        <div style={{
          position: "absolute", top: "100%",
          left: wide ? "auto" : "50%",
          right: wide ? 0 : "auto",
          transform: wide
            ? (open ? "translateY(0)" : "translateY(8px)")
            : (open ? "translate(-50%,0)" : "translate(-50%,8px)"),
          background: C.cream,
          border: `1px solid ${C.line}`, padding: hasFeature ? 22 : "14px 0",
          opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
          transition: "all .3s ease", boxShadow: "0 18px 50px rgba(10,10,10,0.08)",
          display: hasFeature ? "grid" : "block",
          gridTemplateColumns: hasFeature ? "auto auto" : "none",
          gap: hasFeature ? 26 : 0,
        }}>
          {/* Colonne des liens */}
          <div style={{ display: "flex", flexDirection: "column", minWidth: 200, justifyContent: "center" }}>
            {item.sub.map((s) => (
              <a key={s} href="#" style={{
                display: "block", padding: hasFeature ? "8px 8px" : "9px 24px",
                fontFamily: BODY, fontSize: 15, color: C.grey, textDecoration: "none",
                whiteSpace: "nowrap", transition: "color .2s ease",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.color = C.ink; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = C.grey; }}
              >{s}</a>
            ))}
          </div>
          {/* Colonne des vignettes illustratives */}
          {hasFeature && (
            <div style={{ display: "flex", gap: 14 }}>
              {item.feature.map((f) => (
                <a key={f.title} href="#" style={{ textDecoration: "none", display: "block", width: 150 }}>
                  <div style={{
                    width: 150, height: 110, overflow: "hidden", marginBottom: 8, background: C.white,
                  }}>
                    <img src={`https://images.unsplash.com/photo-${f.img}?w=320&q=70`} alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <span style={{
                    fontFamily: SANS, fontSize: 10, letterSpacing: "0.1em",
                    textTransform: "uppercase", color: C.ink,
                  }}>{f.title}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Header({ onMenu, solid }) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
      {/* TOP BAR — nom de la marque bien centré (façon Cosmeticary) */}
      <div style={{
        background: C.ink, color: C.cream, textAlign: "center",
        padding: solid ? "7px 0" : "9px 0", transition: "padding .4s ease",
      }}>
        <span style={{
          fontFamily: SERIF, fontSize: solid ? 16 : 19, letterSpacing: "0.22em",
          textTransform: "uppercase", transition: "font-size .4s ease",
        }}>Myra Skin Care</span>
      </div>

      {/* BARRE PRINCIPALE */}
      <header
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: solid ? "12px 40px" : "18px 40px",
          background: solid ? "rgba(250,248,244,0.95)" : "rgba(250,248,244,0.6)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${solid ? C.line : "transparent"}`,
          transition: "all .5s ease",
        }}
      >
        {/* EMPLACEMENT LOGO À GAUCHE — à remplacer par votre image de logo */}
        <div style={{
          width: 120, height: 44, display: "flex", alignItems: "center",
          justifyContent: "center", border: `1px dashed ${C.line}`,
          fontFamily: SANS, fontSize: 9, letterSpacing: "0.14em",
          color: C.grey, textTransform: "uppercase",
        }}>
          [ Logo ]
        </div>

        {/* NAV MULTI-VOLETS — desktop uniquement */}
        <nav className="nav-desktop" style={{ display: "flex", gap: 30, alignItems: "center" }}>
          {NAV.map((item, i) => <NavItem key={item.label} item={item} alignRight={i >= 3} />)}
        </nav>

        {/* BOUTON MENU — mobile uniquement */}
        <button onClick={onMenu} className="nav-burger" style={{
          background: "none", border: "none", cursor: "pointer",
          fontFamily: SANS, fontSize: 11, letterSpacing: "0.18em",
          textTransform: "uppercase", color: C.ink, display: "none",
          alignItems: "center", gap: 8,
        }}>
          Menu&nbsp;&nbsp;☰
        </button>
      </header>
    </div>
  );
}

// ============================================================
//  PANNEAU LATÉRAL (menu mobile qui glisse depuis la DROITE)
// ============================================================
function SidePanel({ open, onClose }) {
  const [openIdx, setOpenIdx] = useState(-1);
  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 60,
        background: "rgba(10,10,10,0.4)",
        opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
        transition: "opacity .5s ease",
      }} />
      <aside style={{
        position: "fixed", top: 0, right: 0, bottom: 0, width: 360, maxWidth: "85vw",
        zIndex: 70, background: C.cream, padding: "32px 30px",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform .55s cubic-bezier(.4,0,.2,1)",
        display: "flex", flexDirection: "column", overflowY: "auto",
      }}>
        <button onClick={onClose} style={{
          alignSelf: "flex-end", background: "none", border: "none",
          cursor: "pointer", fontFamily: SANS, fontSize: 11,
          letterSpacing: "0.18em", textTransform: "uppercase", color: C.ink,
          marginBottom: 40,
        }}>Fermer&nbsp;&nbsp;✕</button>

        <nav style={{ display: "flex", flexDirection: "column" }}>
          {NAV.map((item, i) => {
            const isOpen = openIdx === i;
            const hasSub = !!item.sub;
            return (
              <div key={item.label} style={{ borderBottom: `1px solid ${C.line}` }}>
                <button
                  onClick={() => hasSub ? setOpenIdx(isOpen ? -1 : i) : onClose()}
                  style={{
                    width: "100%", display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "16px 0", background: "none",
                    border: "none", cursor: "pointer", textAlign: "left",
                    fontFamily: SERIF, fontSize: 26, fontWeight: 500, color: C.ink,
                  }}
                >
                  {item.label}
                  {hasSub && <span style={{
                    fontFamily: SERIF, fontSize: 22, color: C.gold,
                    transform: isOpen ? "rotate(45deg)" : "rotate(0)",
                    transition: "transform .3s ease",
                  }}>+</span>}
                </button>
                {hasSub && (
                  <div style={{
                    maxHeight: isOpen ? item.sub.length * 46 : 0, overflow: "hidden",
                    transition: "max-height .4s ease",
                  }}>
                    {item.sub.map((s) => (
                      <a key={s} href="#" style={{
                        display: "block", padding: "10px 0 10px 14px",
                        fontFamily: BODY, fontSize: 16, color: C.grey, textDecoration: "none",
                      }}>{s}</a>
                    ))}
                    <div style={{ height: 8 }} />
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

// ============================================================
//  HERO
// ============================================================
// Vignettes dispersées en arrière-plan — positionnées vers les bords
// pour laisser un couloir central libre au texte.
const HERO_TILES = [
  { img: "1556228720-195a672e8a03", top: "12%", left: "8%",  w: 150, rot: -14, op: 0.5 },
  { img: "1601049541289-9b1b7bbbfe19", top: "60%", left: "6%",  w: 130, rot: 9,   op: 0.45 },
  { img: "1620916566398-39f1143ab7be", top: "22%", left: "82%", w: 140, rot: 18,  op: 0.5 },
  { img: "1608248543803-ba4f8c70ae0b", top: "64%", left: "84%", w: 155, rot: -22, op: 0.45 },
  { img: "1556228578-8c89e6adf883",    top: "6%",  left: "60%", w: 110, rot: 24,  op: 0.4 },
  { img: "1612817288484-6f916006741a", top: "74%", left: "44%", w: 120, rot: -8,  op: 0.4 },
  { img: "1571781926291-c477ebfd024b", top: "40%", left: "90%", w: 100, rot: 30,  op: 0.38 },
  { img: "1580870069867-74c57ee1bb07", top: "44%", left: "2%",  w: 105, rot: -28, op: 0.38 },
];

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      position: "relative", height: "100vh", minHeight: 620,
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden", background: C.cream, paddingTop: 90,
    }}>
      {/* Vignettes d'arrière-plan inclinées */}
      <div className="hero-tiles" style={{ position: "absolute", inset: 0 }}>
        {HERO_TILES.map((t, i) => (
          <div key={i} style={{
            position: "absolute", top: t.top, left: t.left,
            width: t.w, aspectRatio: "3/4",
            transform: loaded
              ? `rotate(${t.rot}deg) translateY(0)`
              : `rotate(${t.rot}deg) translateY(18px)`,
            opacity: loaded ? t.op : 0,
            transition: `opacity 1.4s ease ${i * 0.08}s, transform 1.4s ease ${i * 0.08}s`,
            overflow: "hidden",
            boxShadow: "0 10px 40px rgba(10,10,10,0.06)",
          }}>
            <img
              src={`https://images.unsplash.com/photo-${t.img}?w=400&q=70`}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>

      <div style={{
        position: "relative", textAlign: "center", color: C.ink, padding: 24, zIndex: 2,
      }}>
        <p style={{
          fontFamily: SANS, fontSize: 11, letterSpacing: "0.3em",
          textTransform: "uppercase", marginBottom: 24, opacity: 0.9,
        }}>Beauté coréenne · K-Beauty</p>
        <h1 style={{
          fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(44px, 8vw, 104px)",
          lineHeight: 1.02, margin: 0, letterSpacing: "-0.01em",
        }}>
          L'essentiel,<br />
          <span style={{ fontStyle: "italic" }}>magnifié</span>
        </h1>
        <p style={{
          fontFamily: BODY, fontSize: 18, maxWidth: 460, margin: "28px auto 36px",
          lineHeight: 1.6, opacity: 0.92,
        }}>
          La beauté coréenne au service de votre éclat naturel.
        </p>
        <Button variant="dark">Découvrir la collection</Button>
      </div>
    </section>
  );
}

// ============================================================
//  BANDEROLE DÉFILANTE (marquee)
// ============================================================
function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div style={{
      background: C.ink, color: C.cream, padding: "20px 0",
      overflow: "hidden", whiteSpace: "nowrap",
    }}>
      <div style={{
        display: "inline-flex", animation: "scroll 38s linear infinite",
      }}>
        {items.map((w, i) => (
          <span key={i} style={{
            fontFamily: SERIF, fontSize: 26, fontStyle: "italic",
            padding: "0 38px", display: "inline-flex", alignItems: "center",
          }}>
            {w}
            <span style={{ color: C.gold, marginLeft: 38, fontSize: 14 }}>✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// ============================================================
//  BOUTONS (variantes)
// ============================================================
function Button({ children, variant = "dark", onClick }) {
  const [hover, setHover] = useState(false);
  const base = {
    fontFamily: SANS, fontSize: 11, letterSpacing: "0.18em",
    textTransform: "uppercase", padding: "15px 32px", cursor: "pointer",
    border: "1px solid", transition: "all .4s ease", background: "transparent",
  };
  const styles = {
    dark: {
      ...base, borderColor: C.ink,
      color: hover ? C.cream : C.ink,
      background: hover ? C.ink : "transparent",
    },
    light: {
      ...base, borderColor: C.white,
      color: hover ? C.ink : C.white,
      background: hover ? C.white : "transparent",
    },
    solid: {
      ...base, borderColor: C.ink,
      color: hover ? C.ink : C.cream,
      background: hover ? "transparent" : C.ink,
    },
  };
  return (
    <button
      style={styles[variant]}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >{children}</button>
  );
}

// Lien souligné (3e variante)
function TextLink({ children }) {
  const [h, setH] = useState(false);
  return (
    <a href="#" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: SANS, fontSize: 11, letterSpacing: "0.18em",
        textTransform: "uppercase", color: C.ink, textDecoration: "none",
        position: "relative", paddingBottom: 4,
      }}>
      {children}
      <span style={{
        position: "absolute", left: 0, bottom: 0, height: 1,
        width: h ? "100%" : "0%", background: C.gold, transition: "width .4s ease",
      }} />
    </a>
  );
}

// ============================================================
//  CARTE PRODUIT
// ============================================================
function ProductCard({ p, onOpen }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen(p)}
      style={{ cursor: "pointer" }}
    >
      <div style={{
        position: "relative", overflow: "hidden", background: C.white,
        aspectRatio: "3/4", marginBottom: 18,
      }}>
        <img src={p.img} alt={p.name} style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hover ? "scale(1.05)" : "scale(1)",
          transition: "transform 1.2s cubic-bezier(.2,0,.2,1)",
        }} />
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
          padding: 16, display: "flex", justifyContent: "center",
          transform: hover ? "translateY(0)" : "translateY(100%)",
          opacity: hover ? 1 : 0, transition: "all .45s ease",
        }}>
          <span style={{
            background: C.cream, color: C.ink, fontFamily: SANS, fontSize: 10,
            letterSpacing: "0.18em", textTransform: "uppercase",
            padding: "12px 22px", width: "100%", textAlign: "center",
          }}>Voir le produit</span>
        </div>
      </div>
      <p style={{
        fontFamily: SANS, fontSize: 10, letterSpacing: "0.2em",
        textTransform: "uppercase", color: C.gold, margin: "0 0 8px",
      }}>{p.type}</p>
      <h3 style={{
        fontFamily: SERIF, fontSize: 23, fontWeight: 500, margin: "0 0 8px", color: C.ink,
      }}>{p.name}</h3>
      <p style={{
        fontFamily: BODY, fontSize: 15, lineHeight: 1.5, color: C.grey,
        margin: "0 0 12px",
      }}>{p.desc}</p>
      <p style={{ fontFamily: SANS, fontSize: 13, letterSpacing: "0.05em", color: C.ink }}>{p.price}</p>
    </div>
  );
}

// ============================================================
//  GRILLE COLLECTION
// ============================================================
function Collection({ onOpen }) {
  return (
    <section style={{ padding: "110px 40px", background: C.cream }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 70 }}>
          <p style={{
            fontFamily: SANS, fontSize: 11, letterSpacing: "0.3em",
            textTransform: "uppercase", color: C.gold, marginBottom: 16,
          }}>La collection</p>
          <h2 style={{
            fontFamily: SERIF, fontSize: "clamp(34px,5vw,56px)", fontWeight: 500,
            margin: 0, color: C.ink,
          }}>Soins du quotidien</h2>
        </div>
      </Reveal>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "56px 40px", maxWidth: 1200, margin: "0 auto",
      }}>
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 0.1}>
            <ProductCard p={p} onOpen={onOpen} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ============================================================
//  SECTION ÉDITORIALE (storytelling)
// ============================================================
function Editorial() {
  return (
    <section style={{
      display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 560,
    }} className="editorial">
      <div style={{
        background: C.ink, color: C.cream, display: "flex",
        flexDirection: "column", justifyContent: "center", padding: "80px 7vw",
      }}>
        <Reveal>
          <p style={{
            fontFamily: SANS, fontSize: 11, letterSpacing: "0.3em",
            textTransform: "uppercase", color: C.gold, marginBottom: 24,
          }}>Notre philosophie</p>
          <h2 style={{
            fontFamily: SERIF, fontSize: "clamp(30px,3.4vw,46px)", fontWeight: 500,
            lineHeight: 1.15, margin: "0 0 24px",
          }}>
            L'expertise coréenne,<br /><span style={{ fontStyle: "italic" }}>au service de votre peau</span>
          </h2>
          <p style={{
            fontFamily: BODY, fontSize: 17, lineHeight: 1.7, color: "#C9C4BA",
            maxWidth: 440, marginBottom: 24,
          }}>
            Myra Skin Care est une boutique spécialisée dans les soins coréens (K-Beauty) :
            nettoyants, sérums, crèmes hydratantes, masques, protections solaires et
            traitements ciblés, formulés avec des ingrédients innovants.
          </p>
          <p style={{
            fontFamily: BODY, fontSize: 17, lineHeight: 1.7, color: "#C9C4BA",
            maxWidth: 440, marginBottom: 32,
          }}>
            Notre mission : aider chacun à révéler une peau saine, éclatante et
            naturellement belle, grâce à des soins de qualité adaptés à tous les types de peau.
          </p>
          <TextLinkLight>Lire notre histoire</TextLinkLight>
        </Reveal>
      </div>
      <div style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1100&q=80')",
        backgroundSize: "cover", backgroundPosition: "center",
      }} />
    </section>
  );
}

function TextLinkLight({ children }) {
  const [h, setH] = useState(false);
  return (
    <a href="#" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: SANS, fontSize: 11, letterSpacing: "0.18em",
        textTransform: "uppercase", color: C.cream, textDecoration: "none",
        position: "relative", paddingBottom: 4, alignSelf: "flex-start",
      }}>
      {children}
      <span style={{
        position: "absolute", left: 0, bottom: 0, height: 1,
        width: h ? "100%" : "30%", background: C.gold, transition: "width .4s ease",
      }} />
    </a>
  );
}

// ============================================================
//  ACCORDÉON
// ============================================================
function Accordion({ title, children, open, onToggle }) {
  return (
    <div style={{ borderBottom: `1px solid ${C.line}` }}>
      <button onClick={onToggle} style={{
        width: "100%", display: "flex", justifyContent: "space-between",
        alignItems: "center", padding: "20px 0", background: "none",
        border: "none", cursor: "pointer", textAlign: "left",
      }}>
        <span style={{
          fontFamily: SANS, fontSize: 12, letterSpacing: "0.12em",
          textTransform: "uppercase", color: C.ink,
        }}>{title}</span>
        <span style={{
          fontFamily: SERIF, fontSize: 24, color: C.gold,
          transform: open ? "rotate(45deg)" : "rotate(0)",
          transition: "transform .35s ease",
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 200 : 0, overflow: "hidden",
        transition: "max-height .45s ease",
      }}>
        <p style={{
          fontFamily: BODY, fontSize: 16, lineHeight: 1.65, color: C.grey,
          paddingBottom: 22, margin: 0,
        }}>{children}</p>
      </div>
    </div>
  );
}

// ============================================================
//  MODALE FICHE PRODUIT
// ============================================================
function ProductModal({ product, onClose }) {
  const [openAcc, setOpenAcc] = useState(0);
  const open = !!product;
  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 80,
        background: "rgba(10,10,10,0.5)",
        opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
        transition: "opacity .4s ease",
      }} />
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 90,
        width: 720, maxWidth: "94vw", background: C.cream,
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform .55s cubic-bezier(.4,0,.2,1)",
        overflowY: "auto",
      }} className="modal">
        {product && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100%" }} className="modal-grid">
            <img src={product.img} alt={product.name} style={{
              width: "100%", height: "100%", objectFit: "cover", minHeight: 280,
            }} />
            <div style={{ padding: "48px 44px", position: "relative" }}>
              <button onClick={onClose} style={{
                position: "absolute", top: 24, right: 28, background: "none",
                border: "none", cursor: "pointer", fontFamily: SANS, fontSize: 18, color: C.ink,
              }}>✕</button>
              <p style={{
                fontFamily: SANS, fontSize: 10, letterSpacing: "0.2em",
                textTransform: "uppercase", color: C.gold, margin: "0 0 12px",
              }}>{product.type}</p>
              <h2 style={{
                fontFamily: SERIF, fontSize: 38, fontWeight: 500, margin: "0 0 16px", color: C.ink,
              }}>{product.name}</h2>
              <p style={{
                fontFamily: BODY, fontSize: 17, lineHeight: 1.6, color: C.grey, margin: "0 0 24px",
              }}>{product.desc}</p>
              <p style={{
                fontFamily: SANS, fontSize: 16, letterSpacing: "0.05em", color: C.ink, marginBottom: 28,
              }}>{product.price}</p>
              <div style={{ marginBottom: 32 }}>
                <Button variant="solid">Commander</Button>
              </div>
              {["Description", "Ingrédients", "Conseils d'usage"].map((t, i) => (
                <Accordion key={t} title={t} open={openAcc === i}
                  onToggle={() => setOpenAcc(openAcc === i ? -1 : i)}>
                  {i === 0 && "Une formule concentrée, pensée pour s'intégrer naturellement à votre rituel quotidien."}
                  {i === 1 && "Actifs coréens innovants : acide hyaluronique, centella, niacinamide, sans additifs superflus."}
                  {i === 2 && "Appliquer matin et soir sur peau propre, en massant délicatement."}
                </Accordion>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ============================================================
//  FOOTER
// ============================================================
function Footer() {
  return (
    <footer style={{ background: C.cream, borderTop: `1px solid ${C.line}`, padding: "70px 40px 40px" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1.4fr 1fr 1.2fr", gap: 50,
      }} className="footer-grid">

        {/* À PROPOS */}
        <div>
          <div style={{ marginBottom: 18, lineHeight: 1 }}>
            <span style={{
              fontFamily: SERIF, fontSize: 28, fontWeight: 500, color: C.ink,
              letterSpacing: "0.04em",
            }}>Myra</span>
            <span style={{
              fontFamily: SANS, fontSize: 9, letterSpacing: "0.34em",
              textTransform: "uppercase", color: C.grey, marginLeft: 10,
            }}>Skin Care</span>
          </div>
          <p style={{
            fontFamily: SANS, fontSize: 10, letterSpacing: "0.2em",
            textTransform: "uppercase", color: C.gold, marginBottom: 14,
          }}>À propos</p>
          <p style={{
            fontFamily: BODY, fontSize: 15, lineHeight: 1.65, color: C.grey, maxWidth: 330, marginBottom: 16,
          }}>
            Myra Skin Care, c'est votre destination beauté dédiée aux soins coréens
            authentiques. Notre mission : vous offrir des produits efficaces,
            sélectionnés avec soin pour révéler l'éclat naturel de votre peau.
          </p>
          <p style={{ fontFamily: BODY, fontSize: 15, color: C.ink, marginBottom: 6 }}>Bamako, Mali</p>
          <a href="mailto:skincaremyra97@gmail.com" style={{
            fontFamily: BODY, fontSize: 15, color: C.ink, textDecoration: "none",
            borderBottom: `1px solid ${C.gold}`, paddingBottom: 1,
          }}>skincaremyra97@gmail.com</a>
          <div style={{ display: "flex", gap: 18, marginTop: 22 }}>
            {["Instagram", "TikTok", "WhatsApp"].map((s) => (
              <a key={s} href="#" style={{
                fontFamily: SANS, fontSize: 10, letterSpacing: "0.14em",
                textTransform: "uppercase", color: C.grey, textDecoration: "none",
              }}>{s}</a>
            ))}
          </div>
        </div>

        {/* INFOS */}
        <div>
          <p style={{
            fontFamily: SANS, fontSize: 10, letterSpacing: "0.2em",
            textTransform: "uppercase", color: C.ink, marginBottom: 18,
          }}>Infos</p>
          {[
            "Conditions Générales de Vente",
            "Mentions Légales",
            "Expéditions et Livraisons",
            "Politique de Retour",
            "Politique de Confidentialité",
          ].map((x) => (
            <a key={x} href="#" style={{
              display: "block", fontFamily: BODY, fontSize: 15, color: C.grey,
              textDecoration: "none", marginBottom: 11,
            }}>{x}</a>
          ))}
        </div>

        {/* NEWSLETTER */}
        <div>
          <p style={{
            fontFamily: SANS, fontSize: 10, letterSpacing: "0.2em",
            textTransform: "uppercase", color: C.ink, marginBottom: 18,
          }}>Newsletter</p>
          <p style={{
            fontFamily: BODY, fontSize: 15, lineHeight: 1.6, color: C.grey, marginBottom: 22,
          }}>
            Inscrivez-vous pour recevoir nos conseils skincare, découvrir nos
            nouveautés coréennes et profiter d'offres exclusives.
          </p>
          <div style={{ display: "flex", borderBottom: `1px solid ${C.line}`, paddingBottom: 6, marginBottom: 18 }}>
            <input placeholder="Votre adresse e-mail" style={{
              flex: 1, border: "none", outline: "none", background: "transparent",
              fontFamily: BODY, fontSize: 15, color: C.ink, padding: "6px 0",
            }} />
          </div>
          <Button variant="solid">S'inscrire</Button>
        </div>
      </div>

      <div style={{
        maxWidth: 1200, margin: "50px auto 0", paddingTop: 24,
        borderTop: `1px solid ${C.line}`, display: "flex",
        justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: "0.1em", color: C.grey }}>
          © 2026 Myra Skin Care — Tous droits réservés
        </span>
        <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: "0.1em", color: C.grey }}>
          La beauté coréenne au service de votre éclat naturel.
        </span>
      </div>
    </footer>
  );
}

// ============================================================
//  COMPOSANTS SUPPLÉMENTAIRES (pour le catalogue)
// ============================================================

// Barre de recherche
function SearchBar() {
  const [v, setV] = useState("");
  const [focus, setFocus] = useState(false);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      borderBottom: `1px solid ${focus ? C.gold : C.line}`,
      paddingBottom: 8, maxWidth: 360, transition: "border-color .3s ease",
    }}>
      <span style={{ fontFamily: SANS, fontSize: 15, color: C.grey }}>⌕</span>
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder="Rechercher un soin…"
        style={{
          flex: 1, border: "none", outline: "none", background: "transparent",
          fontFamily: BODY, fontSize: 16, color: C.ink,
        }}
      />
    </div>
  );
}

// Filtres de collection (pills)
function Filters() {
  const [active, setActive] = useState("Tous");
  const cats = ["Tous", "Visage", "Corps", "Cheveux"];
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      {cats.map((c) => {
        const on = active === c;
        return (
          <button key={c} onClick={() => setActive(c)} style={{
            fontFamily: SANS, fontSize: 11, letterSpacing: "0.12em",
            textTransform: "uppercase", padding: "10px 20px", cursor: "pointer",
            border: `1px solid ${on ? C.ink : C.line}`,
            background: on ? C.ink : "transparent",
            color: on ? C.cream : C.ink, transition: "all .3s ease",
          }}>{c}</button>
        );
      })}
    </div>
  );
}

// Fil d'ariane
function Breadcrumb() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      fontFamily: SANS, fontSize: 11, letterSpacing: "0.1em",
      textTransform: "uppercase", color: C.grey,
    }}>
      <span>Accueil</span>
      <span style={{ color: C.line }}>/</span>
      <span>Boutique</span>
      <span style={{ color: C.line }}>/</span>
      <span style={{ color: C.ink }}>Visage</span>
    </div>
  );
}

// Badges / étiquettes
function Badges() {
  const items = [
    { t: "Nouveau", bg: C.ink, fg: C.cream },
    { t: "Best-seller", bg: "transparent", fg: C.gold, border: C.gold },
    { t: "Édition limitée", bg: "transparent", fg: C.ink, border: C.line },
  ];
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {items.map((b) => (
        <span key={b.t} style={{
          fontFamily: SANS, fontSize: 10, letterSpacing: "0.15em",
          textTransform: "uppercase", padding: "7px 16px",
          background: b.bg, color: b.fg,
          border: `1px solid ${b.border || b.bg}`,
        }}>{b.t}</span>
      ))}
    </div>
  );
}

// Sélecteur de quantité
function QtyStepper() {
  const [n, setN] = useState(1);
  const btn = {
    width: 42, height: 42, border: `1px solid ${C.line}`, background: "transparent",
    cursor: "pointer", fontFamily: SERIF, fontSize: 20, color: C.ink,
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button style={btn} onClick={() => setN(Math.max(1, n - 1))}>–</button>
      <span style={{
        width: 56, textAlign: "center", fontFamily: SANS, fontSize: 14, color: C.ink,
      }}>{n}</span>
      <button style={btn} onClick={() => setN(n + 1)}>+</button>
    </div>
  );
}

// Toast / notification
function ToastDemo() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(t);
  }, [show]);
  return (
    <div>
      <Button variant="dark" onClick={() => setShow(true)}>Afficher une notification</Button>
      <div style={{
        position: "fixed", bottom: 30, left: "50%", zIndex: 120,
        transform: show ? "translate(-50%,0)" : "translate(-50%,120%)",
        transition: "transform .5s cubic-bezier(.4,0,.2,1)",
        background: C.ink, color: C.cream, padding: "16px 26px",
        display: "flex", alignItems: "center", gap: 14,
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
      }}>
        <span style={{ color: C.gold, fontSize: 14 }}>✦</span>
        <span style={{ fontFamily: BODY, fontSize: 15 }}>
          Le produit a été ajouté à votre sélection.
        </span>
      </div>
    </div>
  );
}

// Pagination
function Pagination() {
  const [page, setPage] = useState(1);
  const total = 5;
  const arrow = (dir, disabled) => ({
    fontFamily: SERIF, fontSize: 20, color: disabled ? C.line : C.ink,
    background: "none", border: "none", cursor: disabled ? "default" : "pointer",
    padding: "0 6px",
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <button style={arrow("prev", page === 1)} disabled={page === 1}
        onClick={() => setPage((p) => Math.max(1, p - 1))}>←</button>
      {Array.from({ length: total }, (_, i) => i + 1).map((n) => {
        const on = n === page;
        return (
          <button key={n} onClick={() => setPage(n)} style={{
            width: 38, height: 38, cursor: "pointer",
            fontFamily: SANS, fontSize: 13, letterSpacing: "0.05em",
            border: `1px solid ${on ? C.ink : "transparent"}`,
            background: on ? C.ink : "transparent",
            color: on ? C.cream : C.ink, transition: "all .25s ease",
          }}>{n}</button>
        );
      })}
      <button style={arrow("next", page === total)} disabled={page === total}
        onClick={() => setPage((p) => Math.min(total, p + 1))}>→</button>
    </div>
  );
}

// ============================================================
//  CATALOGUE DE COMPOSANTS
// ============================================================
function ComponentItem({ label, children }) {
  return (
    <div style={{
      border: `1px solid ${C.line}`, padding: "32px 30px", background: C.cream,
      display: "flex", flexDirection: "column", gap: 22,
    }}>
      <span style={{
        fontFamily: SANS, fontSize: 10, letterSpacing: "0.2em",
        textTransform: "uppercase", color: C.gold,
      }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", minHeight: 50 }}>
        {children}
      </div>
    </div>
  );
}

function ComponentCatalog({ onModal }) {
  return (
    <section style={{ padding: "110px 40px", background: C.white }}>
      <Reveal>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{
            fontFamily: SANS, fontSize: 11, letterSpacing: "0.3em",
            textTransform: "uppercase", color: C.gold, marginBottom: 16,
          }}>Bibliothèque</p>
          <h2 style={{
            fontFamily: SERIF, fontSize: "clamp(32px,5vw,52px)", fontWeight: 500,
            margin: 0, color: C.ink,
          }}>Catalogue des composants</h2>
          <p style={{
            fontFamily: BODY, fontSize: 17, color: C.grey, marginTop: 16,
            maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6,
          }}>
            L'ensemble des éléments d'interface, présentés isolément pour la revue.
          </p>
        </div>
      </Reveal>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: 24, maxWidth: 1100, margin: "0 auto",
      }}>
        <Reveal><ComponentItem label="Barre de recherche"><SearchBar /></ComponentItem></Reveal>
        <Reveal delay={0.05}><ComponentItem label="Filtres de collection"><Filters /></ComponentItem></Reveal>
        <Reveal delay={0.1}><ComponentItem label="Fil d'ariane"><Breadcrumb /></ComponentItem></Reveal>
        <Reveal><ComponentItem label="Étiquettes produit"><Badges /></ComponentItem></Reveal>
        <Reveal delay={0.05}><ComponentItem label="Sélecteur de quantité"><QtyStepper /></ComponentItem></Reveal>
        <Reveal delay={0.1}><ComponentItem label="Notification (toast)"><ToastDemo /></ComponentItem></Reveal>
        <Reveal><ComponentItem label="Boutons">
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            <Button variant="dark">Contour</Button>
            <Button variant="solid">Plein</Button>
          </div>
        </ComponentItem></Reveal>
        <Reveal delay={0.05}><ComponentItem label="Fenêtre modale">
          <Button variant="dark" onClick={onModal}>Ouvrir une modale</Button>
        </ComponentItem></Reveal>
        <Reveal delay={0.1}><ComponentItem label="Séparateur">
          <div style={{ width: "100%" }}>
            <div style={{ height: 1, background: C.line, position: "relative" }}>
              <span style={{
                position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)",
                background: C.cream, padding: "0 14px", color: C.gold, fontSize: 13,
              }}>✦</span>
            </div>
          </div>
        </ComponentItem></Reveal>
        <Reveal><ComponentItem label="Pagination"><Pagination /></ComponentItem></Reveal>
      </div>
    </section>
  );
}

// ============================================================
//  NOUVELLES SECTIONS DE PAGE
// ============================================================

// En-tête de section réutilisable
function SectionHead({ eyebrow, title, sub, light }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <p style={{
        fontFamily: SANS, fontSize: 11, letterSpacing: "0.3em",
        textTransform: "uppercase", color: C.gold, marginBottom: 16,
      }}>{eyebrow}</p>
      <h2 style={{
        fontFamily: SERIF, fontSize: "clamp(30px,4.5vw,50px)", fontWeight: 500,
        margin: 0, color: light ? C.cream : C.ink,
      }}>{title}</h2>
      {sub && <p style={{
        fontFamily: BODY, fontSize: 17, color: light ? "#C9C4BA" : C.grey, marginTop: 14,
        maxWidth: 460, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6,
      }}>{sub}</p>}
    </div>
  );
}

// 1 — Bande de réassurance
function Reassurance() {
  const items = [
    { t: "Livraison à Bamako", d: "Sous 24 à 48 h, et partout au Mali." },
    { t: "Conseil personnalisé", d: "Échangez avec nous sur WhatsApp." },
    { t: "Paiement à la livraison", d: "Réglez en toute confiance, à réception." },
  ];
  return (
    <section style={{ background: C.white, borderBottom: `1px solid ${C.line}`, padding: "44px 40px" }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto", display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 30,
      }}>
        {items.map((it) => (
          <div key={it.t} style={{ textAlign: "center" }}>
            <p style={{ color: C.gold, fontSize: 18, marginBottom: 10 }}>✦</p>
            <p style={{
              fontFamily: SANS, fontSize: 12, letterSpacing: "0.14em",
              textTransform: "uppercase", color: C.ink, marginBottom: 6,
            }}>{it.t}</p>
            <p style={{ fontFamily: BODY, fontSize: 15, color: C.grey, lineHeight: 1.5 }}>{it.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// 2 — Par préoccupation
function Concerns() {
  return (
    <section style={{ padding: "100px 40px", background: C.cream }}>
      <Reveal>
        <SectionHead eyebrow="Par où commencer" title="Quel est votre besoin ?"
          sub="Trouvez les soins adaptés à votre peau, selon ce qui compte pour vous." />
      </Reveal>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 20, maxWidth: 1100, margin: "0 auto",
      }}>
        {CONCERNS.map((c, i) => (
          <Reveal key={c.title} delay={(i % 4) * 0.08}>
            <a href="#" style={{ textDecoration: "none", display: "block", position: "relative", overflow: "hidden" }}
              onMouseEnter={(e) => { e.currentTarget.querySelector("img").style.transform = "scale(1.06)"; }}
              onMouseLeave={(e) => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; }}
            >
              <div style={{ aspectRatio: "4/5", overflow: "hidden", background: C.white }}>
                <img src={`https://images.unsplash.com/photo-${c.img}?w=500&q=75`} alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 1s cubic-bezier(.2,0,.2,1)" }} />
              </div>
              <div style={{
                position: "absolute", left: 0, right: 0, bottom: 0,
                padding: "26px 20px 20px",
                background: "linear-gradient(transparent, rgba(10,10,10,0.55))",
              }}>
                <span style={{
                  fontFamily: SERIF, fontSize: 21, fontWeight: 500, color: C.cream,
                }}>{c.title}</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// Mini-carte produit (pour carrousels nouveautés / best-sellers)
function MiniCard({ p, badge }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ cursor: "pointer" }}>
      <div style={{ position: "relative", overflow: "hidden", background: C.white, aspectRatio: "3/4", marginBottom: 14 }}>
        {badge && <span style={{
          position: "absolute", top: 12, left: 12, zIndex: 2,
          fontFamily: SANS, fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase",
          background: C.ink, color: C.cream, padding: "6px 12px",
        }}>{badge}</span>}
        <img src={`https://images.unsplash.com/photo-${p.img}?w=500&q=75`} alt={p.name}
          style={{ width: "100%", height: "100%", objectFit: "cover",
            transform: hover ? "scale(1.05)" : "scale(1)", transition: "transform 1.1s cubic-bezier(.2,0,.2,1)" }} />
      </div>
      <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: C.gold, margin: "0 0 6px" }}>{p.type}</p>
      <h3 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 500, margin: "0 0 6px", color: C.ink }}>{p.name}</h3>
      <p style={{ fontFamily: SANS, fontSize: 13, color: C.ink }}>{p.price}</p>
    </div>
  );
}

// 3 — Nouveautés
function NewArrivals() {
  return (
    <section style={{ padding: "100px 40px", background: C.white }}>
      <Reveal><SectionHead eyebrow="Tout juste arrivés" title="Les nouveautés" /></Reveal>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
        gap: "44px 30px", maxWidth: 1100, margin: "0 auto",
      }}>
        {NEW_PRODUCTS.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 0.08}><MiniCard p={p} badge="Nouveau" /></Reveal>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Button variant="dark">Voir toutes les nouveautés</Button>
      </div>
    </section>
  );
}

// 4 — Best-sellers
function BestSellers() {
  return (
    <section style={{ padding: "100px 40px", background: C.cream }}>
      <Reveal><SectionHead eyebrow="Les préférés" title="Best-sellers"
        sub="Les soins plébiscités par notre clientèle." /></Reveal>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
        gap: "44px 30px", maxWidth: 1100, margin: "0 auto",
      }}>
        {BEST_SELLERS.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 0.08}><MiniCard p={p} badge="Best-seller" /></Reveal>
        ))}
      </div>
    </section>
  );
}

// 5 — Marques partenaires
function PartnerBrands() {
  return (
    <section style={{ padding: "90px 40px", background: C.white, borderTop: `1px solid ${C.line}` }}>
      <Reveal><SectionHead eyebrow="Notre sélection" title="Les marques partenaires"
        sub="Aux côtés de nos propres soins, une sélection exigeante de marques que nous aimons." /></Reveal>
      <div style={{
        maxWidth: 1000, margin: "0 auto", display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 1,
        background: C.line, border: `1px solid ${C.line}`,
      }}>
        {PARTNER_BRANDS.map((b) => (
          <div key={b} style={{
            background: C.white, padding: "34px 16px", textAlign: "center",
            display: "flex", alignItems: "center", justifyContent: "center", minHeight: 90,
          }}>
            <span style={{ fontFamily: SERIF, fontSize: 22, color: C.ink, letterSpacing: "0.02em" }}>{b.trim()}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// 6 — Avis clients
function Reviews() {
  return (
    <section style={{ padding: "100px 40px", background: C.ink }}>
      <Reveal><SectionHead eyebrow="Témoignages" title="Ce qu'elles en disent" light /></Reveal>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 30, maxWidth: 1100, margin: "0 auto",
      }}>
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={(i % 3) * 0.1}>
            <div style={{ border: `1px solid rgba(255,255,255,0.14)`, padding: "34px 30px", height: "100%" }}>
              <p style={{ color: C.gold, fontSize: 16, marginBottom: 16, letterSpacing: "0.3em" }}>★★★★★</p>
              <p style={{
                fontFamily: SERIF, fontSize: 19, fontStyle: "italic", lineHeight: 1.5,
                color: C.cream, marginBottom: 22,
              }}>« {r.text} »</p>
              <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C9C4BA" }}>
                {r.name} — {r.city}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// 7 — Journal / blog
function Journal() {
  return (
    <section style={{ padding: "100px 40px", background: C.cream }}>
      <Reveal><SectionHead eyebrow="Le journal" title="Conseils & rituels"
        sub="Nos gestes, nos ingrédients, nos inspirations pour prendre soin de soi." /></Reveal>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 34, maxWidth: 1100, margin: "0 auto",
      }}>
        {ARTICLES.map((a, i) => (
          <Reveal key={a.title} delay={(i % 3) * 0.1}>
            <a href="#" style={{ textDecoration: "none", display: "block" }}
              onMouseEnter={(e) => { e.currentTarget.querySelector("img").style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; }}
            >
              <div style={{ aspectRatio: "3/2", overflow: "hidden", background: C.white, marginBottom: 18 }}>
                <img src={`https://images.unsplash.com/photo-${a.img}?w=600&q=75`} alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 1s cubic-bezier(.2,0,.2,1)" }} />
              </div>
              <p style={{ fontFamily: SANS, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, margin: "0 0 10px" }}>{a.cat}</p>
              <h3 style={{ fontFamily: SERIF, fontSize: 24, fontWeight: 500, color: C.ink, margin: "0 0 12px", lineHeight: 1.25 }}>{a.title}</h3>
              <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.ink, borderBottom: `1px solid ${C.gold}`, paddingBottom: 3 }}>Lire l'article</span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// 8 — Newsletter ancrée
function NewsletterBand() {
  return (
    <section style={{ padding: "90px 40px", background: C.white, borderTop: `1px solid ${C.line}` }}>
      <Reveal>
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: SANS, fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: C.gold, marginBottom: 16 }}>Rejoignez-nous</p>
          <h2 style={{ fontFamily: SERIF, fontSize: "clamp(28px,4vw,42px)", fontWeight: 500, color: C.ink, margin: "0 0 16px" }}>Restons en contact</h2>
          <p style={{ fontFamily: BODY, fontSize: 17, color: C.grey, lineHeight: 1.6, marginBottom: 30 }}>
            Recevez nos nouveautés et conseils de soin, avec discrétion. Aucun envoi superflu.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", alignItems: "flex-end" }}>
            <div style={{ flex: "1 1 280px", borderBottom: `1px solid ${C.line}`, paddingBottom: 6 }}>
              <input placeholder="Votre adresse e-mail" style={{
                width: "100%", border: "none", outline: "none", background: "transparent",
                fontFamily: BODY, fontSize: 16, color: C.ink, padding: "8px 0", textAlign: "center",
              }} />
            </div>
            <Button variant="solid">S'inscrire</Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// Section À PROPOS (texte fourni par la cliente)
function About() {
  return (
    <section style={{ padding: "110px 40px", background: C.white }}>
      <Reveal>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{
            fontFamily: SANS, fontSize: 11, letterSpacing: "0.3em",
            textTransform: "uppercase", color: C.gold, marginBottom: 22,
          }}>À propos</p>
          <h2 style={{
            fontFamily: SERIF, fontSize: "clamp(28px,4vw,44px)", fontWeight: 500,
            color: C.ink, lineHeight: 1.2, margin: "0 0 28px",
          }}>
            Votre destination beauté,<br />
            <span style={{ fontStyle: "italic" }}>dédiée aux soins coréens</span>
          </h2>
          <p style={{
            fontFamily: BODY, fontSize: 18, lineHeight: 1.75, color: C.grey, marginBottom: 22,
          }}>
            Myra Skin Care, c'est votre destination beauté dédiée aux soins coréens
            authentiques. Notre mission est de vous offrir des produits efficaces,
            sélectionnés avec soin pour révéler l'éclat naturel de votre peau et vous
            accompagner vers une routine adaptée à vos besoins.
          </p>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 14, marginTop: 8,
            fontFamily: SANS, fontSize: 11, letterSpacing: "0.16em",
            textTransform: "uppercase", color: C.ink,
          }}>
            <span>Bamako, Mali</span>
            <span style={{ color: C.gold }}>✦</span>
            <a href="mailto:skincaremyra97@gmail.com" style={{
              color: C.ink, textDecoration: "none", borderBottom: `1px solid ${C.gold}`, paddingBottom: 2,
              textTransform: "none", letterSpacing: "0.02em", fontSize: 14, fontFamily: BODY,
            }}>skincaremyra97@gmail.com</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ============================================================
//  MODALE CENTRALE (sobre)
// ============================================================
function CenterModal({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(10,10,10,0.5)",
        opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
        transition: "opacity .4s ease",
      }} />
      <div style={{
        position: "fixed", top: "50%", left: "50%", zIndex: 110,
        width: 480, maxWidth: "90vw",
        transform: open
          ? "translate(-50%, -50%) scale(1)"
          : "translate(-50%, -48%) scale(0.98)",
        opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
        transition: "all .45s cubic-bezier(.4,0,.2,1)",
        background: C.cream, padding: "52px 48px", textAlign: "center",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 22, right: 26, background: "none",
          border: "none", cursor: "pointer", fontFamily: SANS, fontSize: 16, color: C.ink,
        }}>✕</button>
        <p style={{
          fontFamily: SANS, fontSize: 10, letterSpacing: "0.25em",
          textTransform: "uppercase", color: C.gold, marginBottom: 18,
        }}>Rejoignez-nous</p>
        <h3 style={{
          fontFamily: SERIF, fontSize: 34, fontWeight: 500, color: C.ink, margin: "0 0 16px",
        }}>Restons en contact</h3>
        <p style={{
          fontFamily: BODY, fontSize: 16, lineHeight: 1.6, color: C.grey,
          margin: "0 0 28px", maxWidth: 340, marginLeft: "auto", marginRight: "auto",
        }}>
          Recevez les nouveautés et conseils de soin de Myra Skin Care, avec discrétion.
        </p>
        <div style={{
          display: "flex", borderBottom: `1px solid ${C.line}`,
          marginBottom: 28, paddingBottom: 4,
        }}>
          <input placeholder="Votre adresse e-mail" style={{
            flex: 1, border: "none", background: "transparent", outline: "none",
            fontFamily: BODY, fontSize: 16, color: C.ink, padding: "8px 0",
          }} />
        </div>
        <Button variant="solid" onClick={onClose}>S'inscrire</Button>
      </div>
    </>
  );
}

// ============================================================
//  APP
// ============================================================
export default function App() {
  const [menu, setMenu] = useState(false);
  const [solid, setSolid] = useState(false);
  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: C.cream, color: C.ink, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=EB+Garamond:ital@0;1&family=Inter:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; }
        body { margin: 0; }
        ::selection { background: ${C.gold}; color: ${C.cream}; }
        @media (max-width: 1024px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }
        @media (max-width: 860px) {
          .editorial { grid-template-columns: 1fr !important; }
          .modal-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .hero-tiles > div:nth-child(n+5) { display: none !important; }
        }
      `}</style>

      <Header onMenu={() => setMenu(true)} solid={solid} />
      <SidePanel open={menu} onClose={() => setMenu(false)} />
      <Hero />
      <Marquee />
      <Reassurance />
      <Concerns />
      <Collection onOpen={setProduct} />
      <NewArrivals />
      <Editorial />
      <BestSellers />
      <PartnerBrands />
      <Reviews />
      <About />
      <Journal />
      <ComponentCatalog onModal={() => setModalOpen(true)} />

      <Footer />
      <ProductModal product={product} onClose={() => setProduct(null)} />
      <CenterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}