import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { bags } from "../data/bags";
import Stars from "../components/Stars";
import SizeGuideModal from "../components/SizeGuideModal";
import "./ProductDetailPage.css";

// ─── Mock reviews ─────────────────────────────────────────────────────────────
const MOCK_REVIEWS = [
  { id: 1, name: "Amara S.", location: "Dubai", rating: 5, date: "March 2025", text: "Absolutely stunning. The leather is buttery soft and the hardware feels genuinely luxurious. I've received so many compliments already.", verified: true },
  { id: 2, name: "Priya M.", location: "Mumbai", rating: 5, date: "February 2025", text: "Worth every rupee. The craftsmanship is exceptional — the stitching is immaculate and the bag holds its shape perfectly.", verified: true },
  { id: 3, name: "Sofia L.", location: "London", rating: 4, date: "January 2025", text: "Beautiful bag, exactly as pictured. Delivery was fast and the packaging was gorgeous. The interior compartments are very practical.", verified: true },
];

export default function ProductDetailPage({ addToCart, toggleWishlist, wishlistIds }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const bag = bags.find(b => String(b.id) === String(id));

  useEffect(() => {
    if (!bag) navigate("/collection");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  if (!bag) return null;

  const colors = bag.colors?.length
    ? bag.colors
    : [{ name: bag.color, hex: bag.colorHex, photo: bag.photo }];

 const [activeColorIdx, setActiveColorIdx] = useState(0);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const activeColor = colors[activeColorIdx];

  // Build photo array: use all color photos + extras if available
  const photos = bag.photos?.length
    ? bag.photos
    : colors.map(c => c.photo).filter(Boolean);

  const isWished = wishlistIds?.includes(bag.id);
  const discount = bag.originalPrice
    ? Math.round(((bag.originalPrice - bag.price) / bag.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart({ ...bag, selectedColor: activeColor });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleColorChange = (idx) => {
    setActiveColorIdx(idx);
    setActivePhotoIdx(idx < photos.length ? idx : 0);
  };

  // Related bags — same category, different id
  const related = bags.filter(b => b.category === bag.category && b.id !== bag.id).slice(0, 3);

  return (
    <div className={`pdp ${visible ? "pdp--visible" : ""}`}>

      {/* ── Breadcrumb ──────────────────────────────────── */}
      <nav className="pdp__breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/collection">Collection</Link>
        <span>/</span>
        <span>{bag.name}</span>
      </nav>

      {/* ── Main layout ─────────────────────────────────── */}
      <div className="pdp__main">

        {/* ── Gallery ─────────────────────────────────── */}
        <div className="pdp__gallery">
          {/* Thumbnail strip */}
          <div className="pdp__thumbs">
            {photos.map((photo, i) => (
              <button
                key={i}
                className={`pdp__thumb ${i === activePhotoIdx ? "pdp__thumb--active" : ""}`}
                onClick={() => setActivePhotoIdx(i)}
              >
                <img src={photo} alt={`${bag.name} view ${i + 1}`} />
              </button>
            ))}
          </div>
        
          {/* Main photo */}
          <div className="pdp__photo-wrap">
            {bag.badge && (
              <div className="pdp__badge">
                {bag.badge === "Sale" && discount ? `−${discount}%` : bag.badge}
              </div>
            )}
            <img
              key={activePhotoIdx}
              className="pdp__photo"
              src={photos[activePhotoIdx] || activeColor.photo}
              alt={bag.name}
            />
            {/* Arrow nav */}
            {photos.length > 1 && (
              <>
                <button className="pdp__arrow pdp__arrow--prev" onClick={() => setActivePhotoIdx(i => (i - 1 + photos.length) % photos.length)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <button className="pdp__arrow pdp__arrow--next" onClick={() => setActivePhotoIdx(i => (i + 1) % photos.length)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── Info panel ──────────────────────────────── */}
        <div className="pdp__info">
          <p className="pdp__category">{bag.category}</p>
          <h1 className="pdp__name">{bag.name}</h1>

          {/* Rating */}
          <div className="pdp__rating">
            <Stars count={5} />
            <span className="pdp__rating-score">{bag.rating}</span>
            <span className="pdp__rating-count">({bag.reviews?.toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div className="pdp__price-row">
            <span className="pdp__price">Rs{bag.price?.toLocaleString()}</span>
            {bag.originalPrice && (
              <span className="pdp__original">Rs{bag.originalPrice?.toLocaleString()}</span>
            )}
            {discount && <span className="pdp__discount-pill">−{discount}%</span>}
          </div>

          <p className="pdp__subtitle">{bag.subtitle}</p>

          {/* ── Colour selector ────────────────────────── */}
         {colors.length > 1 && (
            <div className="pdp__section">
              <p className="pdp__section-label">
                Colour — <span className="pdp__section-value">{activeColor.name}</span>
              </p>
              
            <div className="pdp__colors">
                {colors.map((c, i) => (
                  <button
                    key={i}
                    className={`pdp__color-swatch ${i === activeColorIdx ? "pdp__color-swatch--active" : ""}`}
                    style={{ background: c.hex }}
                    onClick={() => handleColorChange(i)}
                    aria-label={c.name}
                    title={c.name}
                  />
                ))}
              </div>
              
            </div>
          )}
            

          {/* ── Size guide link ────────────────────────── */}
          <div className="pdp__section">
            <div className="pdp__size-row">
              <p className="pdp__section-label">Dimensions</p>
              <button className="pdp__size-guide-link" onClick={() => setSizeGuideOpen(true)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                Size Guide
              </button>
            </div>
            <div className="pdp__dims">
              <span>W 28cm</span><span>·</span>
              <span>H 20cm</span><span>·</span>
              <span>D 10cm</span>
            </div>
          </div>

          {/* ── CTA buttons ────────────────────────────── */}
          <div className="pdp__ctas">
            <button
              className={`pdp__add-btn ${added ? "pdp__add-btn--added" : ""}`}
              onClick={handleAddToCart}
            >
              {added
                ? <><CheckIcon /> Added to Bag</>
                : "Add to Bag"
              }
            </button>
            <button
              className={`pdp__wish-btn ${isWished ? "pdp__wish-btn--active" : ""}`}
              onClick={() => toggleWishlist(bag)}
              aria-label={isWished ? "Remove from wishlist" : "Save to wishlist"}
            >
              <svg width="20" height="20" fill={isWished ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>

          {/* ── Trust badges ───────────────────────────── */}
          <div className="pdp__trust">
            <div className="pdp__trust-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8"/></svg>
              <span>Free shipping</span>
            </div>
            <div className="pdp__trust-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              <span>30-day returns</span>
            </div>
            <div className="pdp__trust-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              <span>Authenticity guaranteed</span>
            </div>
            <div className="pdp__trust-item">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a4 4 0 00-4-4H5.45a4 4 0 00-3.9 2.914l-.548 2.19a2 2 0 001.94 2.52h.06"/></svg>
              <span>Gift wrapping</span>
            </div>
          </div>

          {/* ── Tabs ───────────────────────────────────── */}
          <div className="pdp__tabs">
            {["details", "care", "shipping"].map(tab => (
              <button
                key={tab}
                className={`pdp__tab ${activeTab === tab ? "pdp__tab--active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="pdp__tab-content">
            {activeTab === "details" && (
              <ul className="pdp__detail-list">
                <li>Full-grain vegetable-tanned leather</li>
                <li>Solid brass hardware, antique finish</li>
                <li>Interior: 1 zip pocket, 2 slip pockets</li>
                <li>Adjustable crossbody strap included</li>
                <li>Dust bag included</li>
                <li>Made in Italy</li>
              </ul>
            )}
            {activeTab === "care" && (
              <ul className="pdp__detail-list">
                <li>Wipe clean with a dry cloth</li>
                <li>Avoid prolonged exposure to sunlight</li>
                <li>Store in the provided dust bag</li>
                <li>Do not submerge in water</li>
                <li>Condition leather every 3–6 months</li>
              </ul>
            )}
            {activeTab === "shipping" && (
              <ul className="pdp__detail-list">
                <li>Complimentary shipping on all orders</li>
                <li>Delivered in 3–5 business days</li>
                <li>Express delivery available at checkout</li>
                <li>Free returns within 30 days</li>
                <li>Signature required on delivery</li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* ── Reviews ──────────────────────────────────────── */}
      <section className="pdp__reviews">
        <div className="pdp__reviews-header">
          <div>
            <h2 className="pdp__section-heading">Client Reviews</h2>
            <div className="pdp__reviews-summary">
              <span className="pdp__reviews-avg">{bag.rating}</span>
              <Stars count={5} />
              <span className="pdp__reviews-total">from {bag.reviews?.toLocaleString()} reviews</span>
            </div>
          </div>
        </div>
        <div className="pdp__reviews-grid">
          {MOCK_REVIEWS.map(r => (
            <div key={r.id} className="pdp__review-card">
              <div className="pdp__review-top">
                <div className="pdp__review-avatar">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="pdp__review-name">{r.name}</p>
                  <p className="pdp__review-meta">{r.location} · {r.date}</p>
                </div>
                {r.verified && <span className="pdp__verified">✓ Verified</span>}
              </div>
              <Stars count={r.rating} />
              <p className="pdp__review-text">{r.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Related products ─────────────────────────────── */}
      {related.length > 0 && (
        <section className="pdp__related">
          <p className="pdp__related-eyebrow">You may also love</p>
          <h2 className="pdp__section-heading">Related Pieces</h2>
          <div className="pdp__related-grid">
            {related.map(b => {
              const firstPhoto = b.colors?.[0]?.photo || b.photo;
              const relDiscount = b.originalPrice
                ? Math.round(((b.originalPrice - b.price) / b.originalPrice) * 100) : null;
              return (
                <Link key={b.id} to={`/product/${b.id}`} className="pdp__related-card">
                  <div className="pdp__related-img-wrap">
                    <img src={firstPhoto} alt={b.name} />
                    {b.badge && (
                      <span className="pdp__related-badge">
                        {b.badge === "Sale" && relDiscount ? `−${relDiscount}%` : b.badge}
                      </span>
                    )}
                  </div>
                  <div className="pdp__related-info">
                    <p className="pdp__related-cat">{b.category}</p>
                    <p className="pdp__related-name">{b.name}</p>
                    <p className="pdp__related-price">Rs{b.price?.toLocaleString()}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Size Guide Modal ──────────────────────────────── */}
      {sizeGuideOpen && <SizeGuideModal onClose={() => setSizeGuideOpen(false)} bagName={bag.name} />}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
    </svg>
  );
}
