

import "./StoriesPage.css"
const STORIES = [
  {
    id: 1,
    category: "Style Guide",
    title: "How to Choose the Right Bag for Every Occasion",
    excerpt: "From boardroom meetings to weekend brunches — here's how to pick the perfect bag for every moment in your life.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    date: "March 12, 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    category: "Brand Spotlight",
    title: "Why Structured Bags Are Having a Moment",
    excerpt: "Clean lines, bold hardware, timeless shapes — we break down why structured bags are dominating runways and street style.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    date: "February 28, 2026",
    readTime: "4 min read",
    featured: false,
  },
  {
    id: 3,
    category: "Buying Guide",
    title: "What to Look for When Buying a Luxury Bag",
    excerpt: "Hardware weight, stitching quality, lining materials — our expert buying guide so you always invest wisely.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    date: "February 10, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 4,
    category: "Trend Report",
    title: "Spring 2026's Biggest Bag Trends",
    excerpt: "Mini bags are back, neutrals are everywhere, and chain straps aren't going anywhere. Here's what's defining this season.",
    image: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?w=800&q=80",
    date: "January 22, 2026",
    readTime: "3 min read",
    featured: false,
  },
  {
    id: 5,
    category: "Care Tips",
    title: "How to Keep Your Luxury Bag Looking New",
    excerpt: "Storage, cleaning, and conditioning — everything you need to know to protect your investment for years to come.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    date: "January 5, 2026",
    readTime: "4 min read",
    featured: false,
  },
];
const TAGS = ["All", "Style Guide", "Brand Spotlight", "Buying Guide", "Trend Report", "Care Tips"];

import { useState } from "react";

export default function StoriesPage() {
  const [activeTag, setActiveTag] = useState("All");

  const featured = STORIES.find(s => s.featured);
  const rest = STORIES.filter(s => !s.featured).filter(s =>
    activeTag === "All" || s.category === activeTag
  );

  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="stories-hero">
        <div className="stories-hero__overlay" />
        <div className="stories-hero__content">
          <p className="stories-hero__eyebrow">✦ The Journal</p>
          <h1 className="stories-hero__title">Stories</h1>
          <p className="stories-hero__sub">Craft, culture, and the world of HIMSAMA.</p>
        </div>
      </section>

      {/* ── Featured Story ────────────────────────── */}
      {featured && (
        <section className="stories-featured">
          <div className="stories-featured__img-wrap">
            <img src={featured.image} alt={featured.title} className="stories-featured__img" />
          </div>
          <div className="stories-featured__body">
            <p className="stories-featured__tag">Featured · {featured.category}</p>
            <h2 className="stories-featured__title">{featured.title}</h2>
            <p className="stories-featured__excerpt">{featured.excerpt}</p>
            <div className="stories-featured__meta">
              <span>{featured.date}</span>
              <span className="stories-meta-dot">·</span>
              <span>{featured.readTime}</span>
            </div>
            <button className="stories-featured__btn">Read the Story →</button>
          </div>
        </section>
      )}

      {/* ── Tag Filter ───────────────────────────── */}
      <div className="stories-tags">
        {TAGS.map(tag => (
          <button
            key={tag}
            className={`stories-tag-btn ${activeTag === tag ? "active" : ""}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* ── Stories Grid ─────────────────────────── */}
      <section className="stories-grid-section">
        <div className="stories-grid">
          {rest.map(story => (
            <article key={story.id} className="story-card">
              <div className="story-card__img-wrap">
                <img src={story.image} alt={story.title} className="story-card__img" />
                <span className="story-card__category">{story.category}</span>
              </div>
              <div className="story-card__body">
                <p className="story-card__meta">{story.date} · {story.readTime}</p>
                <h3 className="story-card__title">{story.title}</h3>
                <p className="story-card__excerpt">{story.excerpt}</p>
                <button className="story-card__link">Read More →</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────── */}
      <section className="na-cta">
        <p className="na-cta__label">✦ The Journal</p>
        <h2 className="na-cta__title">Stories in Your Inbox</h2>
        <p className="na-cta__sub">Craft essays, style guides and behind-the-scenes dispatches — delivered monthly.</p>
        <div className="na-cta__form">
          <input className="na-cta__input" type="email" placeholder="Your email address" />
          <button className="na-cta__btn">Subscribe</button>
        </div>
      </section>
    </>
  );
}