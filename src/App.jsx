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
    name: "Sérum Équilibrant",
    type: "Visage",
    desc: "Huile légère aux actifs botaniques pour une peau apaisée et lumineuse.",
    price: "29 000 FCFA",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=900&q=80",
  },
  {
    id: 2,
    name: "Baume Corps Néroli",
    type: "Corps",
    desc: "Texture fondante nourrissante, parfum subtil de fleur d'oranger.",
    price: "24 000 FCFA",
    img: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=900&q=80",
  },
  {
    id: 3,
    name: "Huile Capillaire Argan",
    type: "Cheveux",
    desc: "Soin réparateur sans rinçage, brillance et discipline.",
    price: "25 500 FCFA",
    img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900&q=80",
  },
  {
    id: 4,
    name: "Crème Mains Cèdre",
    type: "Corps",
    desc: "Protection quotidienne, absorption immédiate, parfum boisé.",
    price: "14 500 FCFA",
    img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=80",
  },
  {
    id: 5,
    name: "Tonique Rose Pure",
    type: "Visage",
    desc: "Brume hydratante à la rose de Damas, fraîcheur instantanée.",
    price: "21 000 FCFA",
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=80",
  },
  {
    id: 6,
    name: "Gommage Sel & Menthe",
    type: "Corps",
    desc: "Exfoliant minéral revitalisant, peau douce et tonifiée.",
    price: "18 500 FCFA",
    img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=900&q=80",
  },
];

const MARQUEE = [
  "Néroli", "Argan", "Rose de Damas", "Cèdre", "Vétiver",
  "Camomille", "Bergamote", "Santal", "Lavande", "Géranium",
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
//  HEADER
// ============================================================
function Header({ onMenu, solid }) {
  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: solid ? "16px 40px" : "26px 40px",
        background: solid ? "rgba(250,248,244,0.92)" : "transparent",
        backdropFilter: solid ? "blur(10px)" : "none",
        borderBottom: solid ? `1px solid ${C.line}` : "1px solid transparent",
        transition: "all .5s ease",
      }}
    >
      <button onClick={onMenu} style={{
        background: "none", border: "none", cursor: "pointer",
        fontFamily: SANS, fontSize: 11, letterSpacing: "0.18em",
        textTransform: "uppercase", color: C.ink,
      }}>
        ☰&nbsp;&nbsp;Menu
      </button>

      {/* NOM DE MARQUE — remplaçable par votre image de logo */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        lineHeight: 1,
      }}>
        <span style={{
          fontFamily: SERIF, fontSize: 25, fontWeight: 500, color: C.ink,
          letterSpacing: "0.04em",
        }}>Mira</span>
        <span style={{
          fontFamily: SANS, fontSize: 8, letterSpacing: "0.34em",
          textTransform: "uppercase", color: C.grey, marginTop: 3,
        }}>Skin Care</span>
      </div>

      <nav style={{ display: "flex", gap: 28 }}>
        {["Boutique", "Histoire", "Contact"].map((l) => (
          <a key={l} href="#" style={{
            fontFamily: SANS, fontSize: 11, letterSpacing: "0.18em",
            textTransform: "uppercase", color: C.ink, textDecoration: "none",
          }}>{l}</a>
        ))}
      </nav>
    </header>
  );
}

// ============================================================
//  PANNEAU LATÉRAL (menu qui glisse)
// ============================================================
function SidePanel({ open, onClose }) {
  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, zIndex: 60,
        background: "rgba(10,10,10,0.4)",
        opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none",
        transition: "opacity .5s ease",
      }} />
      <aside style={{
        position: "fixed", top: 0, left: 0, bottom: 0, width: 360, maxWidth: "85vw",
        zIndex: 70, background: C.cream, padding: "40px 36px",
        transform: open ? "translateX(0)" : "translateX(-100%)",
        transition: "transform .55s cubic-bezier(.4,0,.2,1)",
        display: "flex", flexDirection: "column",
      }}>
        <button onClick={onClose} style={{
          alignSelf: "flex-start", background: "none", border: "none",
          cursor: "pointer", fontFamily: SANS, fontSize: 11,
          letterSpacing: "0.18em", textTransform: "uppercase", color: C.ink,
          marginBottom: 60,
        }}>✕&nbsp;&nbsp;Fermer</button>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {["Tous les soins", "Visage", "Corps", "Cheveux", "Notre histoire", "Contact"].map((l, i) => (
            <a key={l} href="#" style={{
              fontFamily: SERIF, fontSize: 32, fontWeight: 500,
              color: C.ink, textDecoration: "none", padding: "8px 0",
              borderBottom: i < 5 ? `1px solid ${C.line}` : "none",
            }}>{l}</a>
          ))}
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
      overflow: "hidden", background: C.cream,
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
        }}>Soins formulés avec intention</p>
        <h1 style={{
          fontFamily: SERIF, fontWeight: 500, fontSize: "clamp(44px, 8vw, 104px)",
          lineHeight: 1.02, margin: 0, letterSpacing: "-0.01em",
        }}>
          L'essentiel,<br />
          <span style={{ fontStyle: "italic" }}>magnifié</span>
        </h1>
        <p style={{
          fontFamily: BODY, fontSize: 18, maxWidth: 440, margin: "28px auto 36px",
          lineHeight: 1.6, opacity: 0.92,
        }}>
          Une collection de soins pour la peau, le corps et les cheveux,
          composée des plus belles matières botaniques.
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
            Le soin comme<br /><span style={{ fontStyle: "italic" }}>un rituel</span>
          </h2>
          <p style={{
            fontFamily: BODY, fontSize: 17, lineHeight: 1.7, color: "#C9C4BA",
            maxWidth: 420, marginBottom: 32,
          }}>
            Chaque formule naît d'une recherche patiente des meilleures matières
            botaniques. Nous croyons en des gestes simples, répétés avec attention —
            là où naît la vraie beauté.
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
                  {i === 1 && "Extraits botaniques, huiles essentielles pures, sans additifs superflus."}
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
        display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40,
      }} className="footer-grid">
        <div>
          <div style={{ marginBottom: 20, lineHeight: 1 }}>
            <span style={{
              fontFamily: SERIF, fontSize: 28, fontWeight: 500, color: C.ink,
              letterSpacing: "0.04em",
            }}>Mira</span>
            <span style={{
              fontFamily: SANS, fontSize: 9, letterSpacing: "0.34em",
              textTransform: "uppercase", color: C.grey, marginLeft: 10,
            }}>Skin Care</span>
          </div>
          <p style={{
            fontFamily: BODY, fontSize: 15, lineHeight: 1.6, color: C.grey, maxWidth: 280,
          }}>Soins botaniques formulés avec intention. Conçus au Mali, à Bamako.</p>
        </div>
        {[
          { h: "Boutique", l: ["Visage", "Corps", "Cheveux"] },
          { h: "Maison", l: ["Notre histoire", "Ingrédients", "Contact"] },
          { h: "Suivez-nous", l: ["Instagram", "WhatsApp", "Newsletter"] },
        ].map((col) => (
          <div key={col.h}>
            <p style={{
              fontFamily: SANS, fontSize: 10, letterSpacing: "0.2em",
              textTransform: "uppercase", color: C.ink, marginBottom: 18,
            }}>{col.h}</p>
            {col.l.map((x) => (
              <a key={x} href="#" style={{
                display: "block", fontFamily: BODY, fontSize: 15, color: C.grey,
                textDecoration: "none", marginBottom: 10,
              }}>{x}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        maxWidth: 1200, margin: "50px auto 0", paddingTop: 24,
        borderTop: `1px solid ${C.line}`, display: "flex",
        justifyContent: "space-between", flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: "0.1em", color: C.grey }}>
          © 2026 Mira Skin Care — Tous droits réservés
        </span>
        <span style={{ fontFamily: SANS, fontSize: 11, letterSpacing: "0.1em", color: C.grey }}>
          Mentions légales · Confidentialité
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
      </div>
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
          Recevez les nouveautés et conseils de soin de Mira Skin Care, avec discrétion.
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
      <Collection onOpen={setProduct} />
      <Editorial />
      <ComponentCatalog onModal={() => setModalOpen(true)} />

      <Footer />
      <ProductModal product={product} onClose={() => setProduct(null)} />
      <CenterModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}