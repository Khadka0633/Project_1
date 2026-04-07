import { useState } from "react";
import { bags } from "../data/bags";
import BagCard from "../components/BagCard";

// Tag your newest bags — adjust IDs to match your actual data
const NEW_ARRIVAL_IDS = [1, 2, 3, 4, 5, 6];

const FILTERS = ["All", "Tote", "Clutch", "Crossbody", "Shoulder", "Mini"];

export default function NewArrivalsPage({ addToCart, toggleWishlist, wishlistIds }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const newBags = bags.filter(b => NEW_ARRIVAL_IDS.includes(b.id));

  const filtered = newBags.filter(b =>
    activeFilter === "All" || b.category === activeFilter
  );

  return (
    <>
      {/* ── Banner Hero ───────────────────────────── */}
      <section className="na-hero">
        <div className="na-hero__overlay" />
        <div className="na-hero__content">
          <p className="na-hero__eyebrow">✦ Just Landed</p>
          <h1 className="na-hero__title">New Arrivals</h1>
          <p className="na-hero__sub">Fresh silhouettes. Timeless craftsmanship.</p>
          <div className="na-hero__badge">Spring 2026 Edit</div>
        </div>
      </section>

      {/* ── Intro Strip ──────────────────────────── */}
    <div className="na-intro-strip">
  <span>✦</span>
  <p>New pieces arriving weekly — sourced fresh from global collections</p>
  <span>✦</span>
</div>

      {/* ── Filter Bar ───────────────────────────── */}
      <section className="collection-filter-bar">
        <div className="collection-filter-bar__categories">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`collection-filter-btn ${activeFilter === f ? "active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <p className="collection-meta" style={{ margin: 0 }}>
          {filtered.length} new {filtered.length === 1 ? "piece" : "pieces"}
        </p>
      </section>

      {/* ── Grid ─────────────────────────────────── */}
      <section className="collection-grid-section">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">◻</div>
            <p className="empty-state__title">No new arrivals in this category</p>
            <button className="empty-state__clear" onClick={() => setActiveFilter("All")}>
              View All
            </button>
          </div>
        ) : (
          <div className="bag-grid">
            {filtered.map(bag => (
              <BagCard
                key={bag.id}
                bag={bag}
                onAdd={addToCart}
                onWishlist={toggleWishlist}
                wishlistIds={wishlistIds}
                badge="New"
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Bottom CTA ───────────────────────────── */}
      <section className="na-cta">
        <p className="na-cta__label">Don't miss a drop</p>
        <h2 className="na-cta__title">Join the Inner Circle</h2>
        <p className="na-cta__sub">Get early access to new arrivals before anyone else.</p>
        <div className="na-cta__form">
          <input className="na-cta__input" type="email" placeholder="Your email address" />
          <button className="na-cta__btn">Notify Me</button>
        </div>
      </section>
    </>
  );
}