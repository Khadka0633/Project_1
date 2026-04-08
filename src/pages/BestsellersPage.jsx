import { useState } from "react";
import { bags } from "../data/bags";
import BagCard from "../components/BagCard";
import "./BestSellersPage.css"

// Mark your top selling bag IDs here
const BESTSELLER_IDS = [1, 2, 3, 4, 5, 6];

const STATS = [
  { number: "12K+", label: "Happy Customers" },
  { number: "4.9★", label: "Average Rating" },
  { number: "98%", label: "Would Recommend" },
  { number: "10+", label: "Years of Craft" },
];

export default function BestsellersPage({ addToCart, toggleWishlist, wishlistIds }) {
  const [sortBy, setSortBy] = useState("default");

  const bestsellerBags = bags
    .filter(b => BESTSELLER_IDS.includes(b.id))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="bs-hero">
        <div className="bs-hero__overlay" />
        <div className="bs-hero__content">
          <p className="bs-hero__eyebrow">✦ Customer Favourites</p>
          <h1 className="bs-hero__title">Bestsellers</h1>
          <p className="bs-hero__sub">The pieces our clients return to, again and again.</p>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────── */}
      <div className="bs-stats">
        {STATS.map(s => (
          <div key={s.label} className="bs-stats__item">
            <span className="bs-stats__number">{s.number}</span>
            <span className="bs-stats__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Sort + Count ─────────────────────────── */}
      <section className="collection-filter-bar">
        <p className="collection-meta" style={{ margin: 0 }}>
          {bestsellerBags.length} bestselling {bestsellerBags.length === 1 ? "piece" : "pieces"}
        </p>
        <select
          className="collection-sort-select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="default">Sort: Most Popular</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A–Z</option>
        </select>
      </section>

      {/* ── Grid ─────────────────────────────────── */}
      <section className="collection-grid-section">
        <div className="bag-grid">
          {bestsellerBags.map((bag, i) => (
            <div key={bag.id} className="bs-card-wrap">
              <div className="bs-rank">#{i + 1}</div>
              <BagCard
                bag={bag}
                onAdd={addToCart}
                onWishlist={toggleWishlist}
                wishlistIds={wishlistIds}
                badge="Bestseller"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust Strip ──────────────────────────── */}
      <section className="bs-trust">
        <div className="bs-trust__item">
          <span className="bs-trust__icon">🏅</span>
          <p className="bs-trust__text">Authenticity Guaranteed</p>
        </div>
        <div className="bs-trust__divider" />
        <div className="bs-trust__item">
          <span className="bs-trust__icon">📦</span>
          <p className="bs-trust__text">Complimentary Shipping</p>
        </div>
        <div className="bs-trust__divider" />
        <div className="bs-trust__item">
          <span className="bs-trust__icon">↩️</span>
          <p className="bs-trust__text">30-Day Returns</p>
        </div>
        <div className="bs-trust__divider" />
        <div className="bs-trust__item">
          <span className="bs-trust__icon">🎁</span>
          <p className="bs-trust__text">Free Gift Wrapping</p>
        </div>
      </section>
    </>
  );
}