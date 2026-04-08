

import "./AboutPage.css"
const VALUES = [
  {
    icon: "✦",
    title: "Curated Selection",
    desc: "We handpick every bag from the world's finest designers and brands — so you don't have to. Only the best makes it to our shelves.",
  },
  {
    icon: "◈",
    title: "Authentic Guaranteed",
    desc: "Every bag we sell is 100% authentic, sourced directly from authorized distributors and verified suppliers worldwide.",
  },
  {
    icon: "◇",
    title: "Global Taste, Local Heart",
    desc: "Based in Kathmandu, we bring the world's most coveted bag brands to your doorstep — with the warmth of local service.",
  },
  {
    icon: "○",
    title: "Client First",
    desc: "From browsing to delivery, we make luxury shopping effortless. Complimentary wrapping, easy returns, and real human support.",
  },
];

const TEAM = [
  {
    name: "Hima Shrestha",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=400&q=80",
    quote: "I started HIMSAMA because I couldn't find a bag that felt both beautiful and honest.",
  },
  {
    name: "Sama Rai",
    role: "Head of Craftsmanship",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    quote: "Every stitch is a promise. We don't cut corners — we add them.",
  },
  {
    name: "Arjun Karki",
    role: "Design Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    quote: "Good design is invisible. You just feel it when you carry the bag.",
  },
];

const MILESTONES = [
  { year: "2014", event: "HIMSAMA founded — importing our first curated selection of luxury bags." },
  { year: "2016", event: "Expanded our brand portfolio to include 20+ international labels." },
  { year: "2018", event: "Opened our first showroom in Kathmandu." },
  { year: "2021", event: "Launched online store — shipping across Nepal and beyond." },
  { year: "2024", event: "Reached 12,000 happy customers and 50+ brands in our catalogue." },
  { year: "2026", event: "Spring 2026 edit — our most exclusive curation yet." },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="about-hero">
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <p className="about-hero__eyebrow">✦ Since 2014</p>
          <h1 className="about-hero__title">Our Story</h1>
          <p className="about-hero__sub">Handcrafted with heritage. Worn with intention. Made to be remembered.</p>
        </div>
      </section>

      {/* ── Mission Statement ─────────────────────── */}
      <section className="about-mission">
        <div className="about-mission__inner">
          <p className="about-mission__eyebrow">Our Mission</p>
          
          <h2 className="about-mission__title">
              "We believe every woman deserves access to the world's finest bags —
               without the hassle of hunting for them."
         </h2>
          <p className="about-mission__body">
            HIMSAMA was founded in Kathmandu in 2014 with a simple idea: bring the world's 
           most sought-after luxury bags directly to you. We travel the globe, vet the suppliers, 
        verify the authenticity, and do all the hard work — so that when your bag arrives, 
         all you feel is joy.
        </p>
        </div>
      </section>

      {/* ── Values ───────────────────────────────── */}
      <section className="about-values">
        <div className="about-values__header">
          <p className="about-section-eyebrow">What We Stand For</p>
          <h2 className="about-section-title">Our Values</h2>
        </div>
        <div className="about-values__grid">
          {VALUES.map(v => (
            <div key={v.title} className="about-value-card">
              <span className="about-value-card__icon">{v.icon}</span>
              <h3 className="about-value-card__title">{v.title}</h3>
              <p className="about-value-card__desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────── */}
      <section className="about-timeline">
        <div className="about-values__header">
          <p className="about-section-eyebrow">How We Got Here</p>
          <h2 className="about-section-title">Our Journey</h2>
        </div>
        <div className="about-timeline__track">
          {MILESTONES.map((m, i) => (
            <div key={m.year} className={`about-timeline__item ${i % 2 === 0 ? "left" : "right"}`}>
              <div className="about-timeline__dot" />
              <div className="about-timeline__card">
                <span className="about-timeline__year">{m.year}</span>
                <p className="about-timeline__event">{m.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Split Image Section ───────────────────── */}
    
{/* ── Split Image Section ───────────────────── */}
<section className="about-split">
  <div className="about-split__img-wrap">
    <img
      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
      alt="Sourced Globally"
      className="about-split__img"
    />
  </div>
  <div className="about-split__body">
    <p className="about-section-eyebrow">✦ The HIMSAMA Promise</p>
    <h2 className="about-split__title">Sourced Globally.<br/>Delivered Locally.</h2>
    <div className="about-split__divider" />
    <p className="about-split__text">
      We travel the world so you don't have to. Every bag in our collection 
      is handpicked from authorized distributors and trusted suppliers across 
      Europe, Asia, and the Americas.
    </p>
    <p className="about-split__text">
      Before anything reaches your hands, it passes our authenticity check. 
      Because when you invest in luxury — you deserve exactly that.
    </p>
    <div className="about-split__stats">
      <div className="about-split__stat">
        <span className="about-split__stat-num">50+</span>
        <span className="about-split__stat-label">Brands We Carry</span>
      </div>
      <div className="about-split__stat-sep" />
      <div className="about-split__stat">
        <span className="about-split__stat-num">30+</span>
        <span className="about-split__stat-label">Countries Sourced From</span>
      </div>
      <div className="about-split__stat-sep" />
      <div className="about-split__stat">
        <span className="about-split__stat-num">100%</span>
        <span className="about-split__stat-label">Authenticity Guaranteed</span>
      </div>
    </div>
  </div>
</section>
      {/* ── Team ─────────────────────────────────── 
      
      <section className="about-team">
        <div className="about-values__header">
          <p className="about-section-eyebrow">The People</p>
          <h2 className="about-section-title">Meet the Team</h2>
        </div>
        <div className="about-team__grid">
          {TEAM.map(member => (
            <div key={member.name} className="about-team-card">
              <div className="about-team-card__img-wrap">
                <img src={member.image} alt={member.name} className="about-team-card__img" />
              </div>
              <div className="about-team-card__body">
                <h3 className="about-team-card__name">{member.name}</h3>
                <p className="about-team-card__role">{member.role}</p>
                <p className="about-team-card__quote">"{member.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      */}
      
      {/* ── CTA ──────────────────────────────────── */}
      <section className="about-cta">
        <div className="about-cta__overlay" />
        <div className="about-cta__content">
          <p className="about-hero__eyebrow">✦ Ready to find yours?</p>
          <h2 className="about-cta__title">Explore the Collection</h2>
          <a href="/collection" className="about-cta__btn">Shop Now</a>
        </div>
      </section>
    </>
  );
}