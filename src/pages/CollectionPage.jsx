import { useState } from "react";
import { bags } from "../data/bags";
import BagCard from "../components/BagCard";

const CATEGORIES = ["All", "Tote", "Clutch", "Crossbody", "Shoulder", "Mini"];

export default function CollectionPage({ addToCart, toggleWishlist, wishlistIds }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const filtered = bags
    .filter(b => activeCategory === "All" || b.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <>
      {/* ── Banner Hero ───────────────────────────── */}
      <section className="collection-hero">
        <div className="collection-hero__overlay" />
        <div className="collection-hero__content">
          <p className="collection-hero__eyebrow">✦ Spring 2026</p>
          <h1 className="collection-hero__title">The Collection</h1>
          <p className="collection-hero__sub">
            Every piece tells a story. Find yours.
          </p>
        </div>
      </section>

      {/* ── Filter Bar ───────────────────────────── */}
      <section className="collection-filter-bar">
        <div className="collection-filter-bar__categories">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`collection-filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="collection-filter-bar__sort">
          <select
            className="collection-sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>
      </section>

      {/* ── Results count ───────────────────────── */}
      <div className="collection-meta">
        <p>{filtered.length} {filtered.length === 1 ? "piece" : "pieces"}</p>
      </div>

      {/* ── Grid ─────────────────────────────────── */}
      <section className="collection-grid-section">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">◻</div>
            <p className="empty-state__title">No pieces in this category</p>
            <button className="empty-state__clear" onClick={() => setActiveCategory("All")}>
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
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}