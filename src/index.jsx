import { useState, useEffect, useRef } from "react";
import { bags, categories } from "./data/bags";
import { testimonials } from "./data/testimonials";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";






// ─── Photo Placeholder ────────────────────────────────────────────────────────
// Drop in any <img src="..."> and it fills perfectly.
// When photo prop is null, shows a styled placeholder that matches your brand.
function PhotoSlot({ src, alt, className = "", style = {}, colorHex = "#C8956C", label = "" }) {
  return (
    <div
      className={`photo-slot ${className}`}
      style={style}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="photo-slot__img"
          loading="lazy"
          draggable={false}
        />
      ) : (
        <div className="photo-slot__placeholder">
          <div className="photo-slot__placeholder-inner">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="photo-slot__icon">
              <rect x="2" y="6" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <circle cx="12" cy="15" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M2 26l8-7 6 6 5-4 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {label && <span className="photo-slot__label">{label}</span>}
          </div>
          <div className="photo-slot__color-bar" style={{ background: colorHex }} />
        </div>
      )}
    </div>
  );
}

// ─── Stars ────────────────────────────────────────────────────────────────────
function Stars({ count = 5 }) {
  return (
    <span style={{ display: "flex", gap: "2px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 20 20" fill="#C8956C">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────
function CartSidebar({ cart, onClose, onRemove, onQty }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="cart-overlay">
      <div className="cart-backdrop" onClick={onClose} />
      <div className="cart-panel">
        <div className="cart-header">
          <div>
            <h2 className="cart-title">Your Selections</h2>
            <p className="cart-subtitle">{cart.reduce((s, i) => s + i.qty, 0)} piece{cart.reduce((s,i)=>s+i.qty,0)!==1?"s":""} curated</p>
          </div>
          <button onClick={onClose} className="cart-close">✕</button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">◻</div>
              <p className="cart-empty-title">Your bag awaits</p>
              <p className="cart-empty-sub">Discover something beautiful</p>
            </div>
          ) : cart.map(item => (
            <div key={item.id} className="cart-item">
              <PhotoSlot
                src={item.photo}
                alt={item.name}
                className="cart-item__photo"
                colorHex={item.colorHex}
                label={item.name}
              />
              <div className="cart-item__info">
                <p className="cart-item__name">{item.name}</p>
                <p className="cart-item__color">{item.color}</p>
                <div className="cart-item__controls">
                  <button onClick={() => onQty(item.id, -1)} className="qty-btn">−</button>
                  <span className="qty-val">{item.qty}</span>
                  <button onClick={() => onQty(item.id, 1)} className="qty-btn">+</button>
                  <span className="cart-item__price">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => onRemove(item.id)} className="cart-item__remove">✕</button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-row"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
            <div className="cart-row"><span>Shipping</span><span className="free">Complimentary</span></div>
            <div className="cart-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
            <p className="cart-note">Free returns · Secure checkout · Gift wrapping available</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Bag Card ─────────────────────────────────────────────────────────────────
function BagCard({ bag, onAdd, onWishlist, wishlistIds }) {
  const [added, setAdded] = useState(false);
  const isWished = wishlistIds.includes(bag.id);
  const discount = bag.originalPrice ? Math.round(((bag.originalPrice - bag.price) / bag.originalPrice) * 100) : null;

  const handleAdd = () => {
    onAdd(bag);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="bag-card">
      {/* Photo area — swap photo prop to activate */}
      <div className="bag-card__photo-wrap">
        <PhotoSlot
          src={bag.photo}
          alt={bag.name}
          className="bag-card__photo"
          colorHex={bag.colorHex}
          label={bag.name}
        />

        {/* Badges */}
        <div className="bag-card__badges">
          {bag.badge && (
            <span className={`badge badge--${bag.badge.toLowerCase()}`}>
              {bag.badge === "Sale" && discount ? `−${discount}%` : bag.badge}
            </span>
          )}
          <span className="badge badge--tag">{bag.tag}</span>
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(bag.id); }}
          className={`wishlist-btn ${isWished ? "wished" : ""}`}
        >
          <svg width="16" height="16" fill={isWished ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Color swatch */}
        <div className="color-chip">
          <div className="color-chip__dot" style={{ background: bag.colorHex }} />
          <span>{bag.color}</span>
        </div>
      </div>

      {/* Info */}
      <div className="bag-card__body">
        <p className="bag-card__category">{bag.category}</p>
        <div className="bag-card__row">
          <h3 className="bag-card__name">{bag.name}</h3>
          <div className="bag-card__pricing">
            <span className="bag-card__price">${bag.price}</span>
            {bag.originalPrice && <span className="bag-card__original">${bag.originalPrice}</span>}
          </div>
        </div>
        <p className="bag-card__subtitle">{bag.subtitle}</p>
        <div className="bag-card__rating">
          <Stars count={5} />
          <span>{bag.rating} ({bag.reviews.toLocaleString()})</span>
        </div>
        <button onClick={handleAdd} className={`add-btn ${added ? "added" : ""}`}>
          {added ? "✓ Added to Bag" : "Add to Bag"}
        </button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Start() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [newsletter, setNewsletter] = useState("");

  const addToCart = (bag) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === bag.id);
      if (ex) return prev.map(i => i.id === bag.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...bag, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQty = (id, d) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const toggleWishlist = (id) => setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const filtered = bags.filter(b => {
    const catOk = activeCategory === "All" || b.category === activeCategory;
    const searchOk = b.name.toLowerCase().includes(search.toLowerCase()) || b.color.toLowerCase().includes(search.toLowerCase());
    return catOk && searchOk;
  });

  return (
    <>
      <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

        /* ── Tokens ───────────────────────────────────────────── */
        :root {
          --cream:    #F5EFE6;
          --sand:     #EBE0D0;
          --mink:     #C8B49A;
          --caramel:  #C8956C;
          --espresso: #2C1810;
          --warm-mid: #7D6540;
          --ghost:    #9B7E6A;
          --white:    #FDFAF6;
          --ff-serif: 'Playfair Display', Georgia, serif;
          --ff-italic:'Cormorant Garamond', Georgia, serif;
          --ff-sans:  'Jost', sans-serif;
          --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--cream); font-family: var(--ff-sans); color: var(--espresso); -webkit-font-smoothing: antialiased; }

        /* ── Google Fonts ─────────────────────────────────────── */
      
        /* ── Photo Slot System ────────────────────────────────── */
        /*
          HOW TO USE:
          In the bags array, set: photo: "/your-image.jpg"
          The image will fill the space perfectly — no extra CSS needed.
          object-fit: cover handles all aspect ratios automatically.
        */
        .photo-slot {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: var(--sand);
        }
        .photo-slot__img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;        /* fills slot, crops if needed */
          object-position: center;  /* centers the subject */
          display: block;
          transition: transform 0.7s var(--ease-out);
        }
        .bag-card:hover .photo-slot__img {
          transform: scale(1.04);
        }
        /* Placeholder shown when no photo */
        .photo-slot__placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--sand);
        }
        .photo-slot__placeholder-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: var(--mink);
        }
        .photo-slot__icon { opacity: 0.5; }
        .photo-slot__label {
          font-family: var(--ff-sans);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ghost);
          text-align: center;
          max-width: 120px;
          line-height: 1.4;
        }
        /* Thin color accent bar at bottom of placeholder */
        .photo-slot__color-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          opacity: 0.6;
        }

        
        /* ── Hero ─────────────────────────────────────────────── */
        /*
          HERO PHOTO LAYOUT — Hermès style.
          Left: tall primary photo (fills 55% width)
          Right: stacked secondary + tertiary photos

          To add photos, set heroPhotos object below.
          All slots use object-fit: cover — just provide any image.
        */
        .hero {
          display: grid;
          grid-template-columns: 55fr 45fr;
          height: calc(100vh - 70px - 40px); /* full viewport minus nav and announce */
          min-height: 580px;
          max-height: 900px;
        }
        /* Left: single tall photo */
        .hero__primary {
          position: relative;
          overflow: hidden;
        }
        .hero__primary .photo-slot { height: 100%; }
        .hero__primary .photo-slot__placeholder { background: #E8DECE; }

        /* Right: two stacked photos */
        .hero__secondary-stack {
          display: grid;
          grid-template-rows: 1fr 1fr;
        }
        .hero__secondary { position: relative; overflow: hidden; }
        .hero__secondary .photo-slot { height: 100%; }
        .hero__secondary:first-child .photo-slot__placeholder { background: #DDD4C4; }
        .hero__secondary:last-child  .photo-slot__placeholder { background: #E4DAC8; }

        /* Overlay text on hero primary */
        .hero__overlay {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 40px 44px;
          background: linear-gradient(to top, rgba(30,16,8,0.72) 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }
        .hero__season {
          font-family: var(--ff-sans);
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--mink);
          margin-bottom: 12px;
        }
        .hero__title {
          font-family: var(--ff-serif);
          font-size: clamp(36px, 4vw, 58px);
          font-weight: 700;
          color: var(--white);
          line-height: 1.05;
          margin-bottom: 20px;
        }
        .hero__title em {
          font-style: italic;
          color: var(--caramel);
        }
        .hero__ctas {
          display: flex; gap: 12px;
          pointer-events: all;
        }
        .hero__cta-primary {
          font-family: var(--ff-sans);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--espresso);
          background: var(--white);
          border: none;
          padding: 14px 28px;
          cursor: pointer;
          transition: background 0.25s, color 0.25s;
        }
        .hero__cta-primary:hover { background: var(--caramel); color: var(--white); }
        .hero__cta-ghost {
          font-family: var(--ff-sans);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--white);
          background: transparent;
          border: 1px solid rgba(255,255,255,0.4);
          padding: 14px 28px;
          cursor: pointer;
          transition: border-color 0.25s, background 0.25s;
        }
        .hero__cta-ghost:hover { border-color: white; background: rgba(255,255,255,0.08); }

        /* Badge on secondary photos */
        .hero__photo-label {
          position: absolute;
          bottom: 24px; left: 24px;
          z-index: 2;
          background: rgba(245,239,230,0.92);
          backdrop-filter: blur(6px);
          padding: 10px 16px;
          border-radius: 2px;
        }
        .hero__photo-label-sub {
          font-family: var(--ff-sans);
          font-size: 9px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--ghost);
        }
        .hero__photo-label-name {
          font-family: var(--ff-serif);
          font-size: 15px;
          font-weight: 600;
          color: var(--espresso);
          margin-top: 2px;
        }
        .hero__photo-label-price {
          font-family: var(--ff-sans);
          font-size: 11px;
          color: var(--caramel);
          margin-top: 4px;
        }

        /* ── Stats Bar ────────────────────────────────────────── */
        .stats-bar {
          background: var(--espresso);
          padding: 20px 40px;
          display: flex;
          justify-content: center;
          gap: 80px;
        }
        .stat { text-align: center; }
        .stat__num { font-family: var(--ff-serif); font-size: 22px; font-weight: 700; color: var(--caramel); }
        .stat__lbl { font-family: var(--ff-sans); font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--mink); margin-top: 2px; }

        /* ── Category Strip ───────────────────────────────────── */
        .cat-strip {
          background: var(--espresso);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 14px 40px;
        }
        .cat-strip__inner {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          gap: 8px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .cat-strip__inner::-webkit-scrollbar { display: none; }
        .cat-btn {
          flex-shrink: 0;
          padding: 8px 20px;
          border-radius: 999px;
          border: 1px solid transparent;
          background: none;
          font-family: var(--ff-sans);
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--mink);
        }
        .cat-btn--active { background: var(--caramel); color: white; }
        .cat-btn:not(.cat-btn--active):hover { border-color: rgba(255,255,255,0.2); color: var(--sand); }

        /* ── Products ─────────────────────────────────────────── */
        .products { max-width: 1400px; margin: 0 auto; padding: 80px 40px; }
        .products__header { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 56px; flex-wrap: wrap; }
        .products__eyebrow { font-family: var(--ff-sans); font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--caramel); margin-bottom: 8px; }
        .products__title { font-family: var(--ff-serif); font-size: 38px; font-weight: 700; color: var(--espresso); }
        .products__count { font-family: var(--ff-italic); font-size: 17px; font-style: italic; color: var(--ghost); margin-top: 4px; }
        .search-input-wrap { position: relative; }
        .search-icon {
          position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
          color: var(--mink); pointer-events: none;
        }
        .search-input {
          padding: 12px 18px 12px 40px;
          border: 1px solid var(--sand);
          border-radius: 999px;
          background: white;
          font-family: var(--ff-sans);
          font-size: 13px;
          color: var(--espresso);
          width: 220px;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input::placeholder { color: var(--mink); }
        .search-input:focus { border-color: var(--caramel); }

        /* Product grid */
        .bag-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 28px;
        }

        /* ── Bag Card ─────────────────────────────────────────── */
        .bag-card {
          background: white;
          border-radius: 0;               /* square, editorial */
          overflow: hidden;
          transition: box-shadow 0.4s var(--ease-out), transform 0.4s var(--ease-out);
          cursor: pointer;
        }
        .bag-card:hover {
          box-shadow: 0 20px 60px rgba(44,24,16,0.12);
          transform: translateY(-4px);
        }

        /* Card photo — fixed 320px tall; image fills it */
        .bag-card__photo-wrap {
          position: relative;
          height: 320px;
          overflow: hidden;
        }
        .bag-card__photo { height: 100%; }

        /* Badges */
        .bag-card__badges { position: absolute; top: 14px; left: 14px; display: flex; flex-direction: column; gap: 6px; z-index: 2; }
        .badge {
          display: inline-block;
          padding: 4px 10px;
          font-family: var(--ff-sans);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-radius: 999px;
        }
        .badge--sale { background: #C0392B; color: white; }
        .badge--new  { background: var(--espresso); color: var(--sand); }
        .badge--bestseller { background: var(--caramel); color: white; }
        .badge--tag { background: rgba(255,255,255,0.85); backdrop-filter: blur(4px); color: var(--warm-mid); }

        /* Wishlist */
        .wishlist-btn {
          position: absolute; top: 14px; right: 14px; z-index: 2;
          width: 34px; height: 34px;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(4px);
          border: none; border-radius: 50%; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: var(--ghost);
          opacity: 0;
          transition: opacity 0.2s, color 0.2s;
        }
        .bag-card:hover .wishlist-btn { opacity: 1; }
        .wishlist-btn.wished { opacity: 1; color: #e05050; }

        /* Color chip */
        .color-chip {
          position: absolute; bottom: 14px; left: 14px; z-index: 2;
          display: flex; align-items: center; gap: 7px;
          background: rgba(255,255,255,0.85); backdrop-filter: blur(4px);
          padding: 5px 12px; border-radius: 999px;
          font-family: var(--ff-sans); font-size: 10px; color: var(--warm-mid);
        }
        .color-chip__dot { width: 10px; height: 10px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.6); box-shadow: 0 0 0 1px rgba(0,0,0,0.06); }

        /* Card body */
        .bag-card__body { padding: 20px 22px 22px; }
        .bag-card__category { font-family: var(--ff-sans); font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--caramel); margin-bottom: 6px; }
        .bag-card__row { display: flex; align-items: flex-start; justify-content: space-between; gap: 8px; margin-bottom: 4px; }
        .bag-card__name { font-family: var(--ff-serif); font-size: 18px; font-weight: 700; color: var(--espresso); line-height: 1.2; }
        .bag-card__pricing { text-align: right; flex-shrink: 0; }
        .bag-card__price { display: block; font-family: var(--ff-serif); font-size: 17px; font-weight: 700; color: var(--espresso); }
        .bag-card__original { display: block; font-family: var(--ff-sans); font-size: 11px; color: var(--mink); text-decoration: line-through; margin-top: 2px; }
        .bag-card__subtitle { font-family: var(--ff-italic); font-size: 13px; font-style: italic; color: var(--ghost); margin-bottom: 10px; }
        .bag-card__rating { display: flex; align-items: center; gap: 8px; font-family: var(--ff-sans); font-size: 11px; color: var(--ghost); margin-bottom: 16px; }
        .add-btn {
          width: 100%;
          padding: 13px;
          border: 1px solid var(--espresso);
          background: none;
          font-family: var(--ff-sans);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--espresso);
          cursor: pointer;
          transition: all 0.25s;
        }
        .add-btn:hover { background: var(--espresso); color: var(--sand); }
        .add-btn.added { background: #f0faf4; border-color: #6abf8a; color: #3a7d55; }

        /* ── Editorial Banner ─────────────────────────────────── */
        .editorial {
          background: var(--espresso);
          padding: 100px 40px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .editorial__bg-text {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--ff-serif);
          font-size: 22vw;
          font-weight: 800;
          color: rgba(255,255,255,0.03);
          white-space: nowrap;
          pointer-events: none;
          user-select: none;
          line-height: 1;
        }
        .editorial__inner { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; }
        .editorial__eyebrow { font-family: var(--ff-sans); font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--caramel); margin-bottom: 20px; }
        .editorial__title { font-family: var(--ff-serif); font-size: clamp(30px, 4vw, 52px); font-weight: 700; color: var(--white); line-height: 1.15; margin-bottom: 24px; }
        .editorial__title em { font-style: italic; color: var(--caramel); }
        .editorial__body { font-family: var(--ff-italic); font-size: 19px; font-style: italic; color: var(--mink); line-height: 1.7; margin-bottom: 50px; }
        .editorial__stats { display: flex; justify-content: center; gap: 80px; }
        .editorial__stat-num { font-family: var(--ff-serif); font-size: 30px; font-weight: 700; color: var(--caramel); }
        .editorial__stat-lbl { font-family: var(--ff-sans); font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--warm-mid); margin-top: 4px; }

        /* ── Testimonials ─────────────────────────────────────── */
        .testimonials { max-width: 1400px; margin: 0 auto; padding: 80px 40px; }
        .testimonials__header { text-align: center; margin-bottom: 56px; }
        .testimonials__eyebrow { font-family: var(--ff-sans); font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--caramel); margin-bottom: 12px; }
        .testimonials__title { font-family: var(--ff-serif); font-size: 36px; font-weight: 700; color: var(--espresso); }
        .testimonials__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .testimonial-card {
          background: white;
          padding: 32px 28px;
          border: 1px solid var(--sand);
          transition: box-shadow 0.3s;
        }
        .testimonial-card:hover { box-shadow: 0 8px 32px rgba(44,24,16,0.08); }
        .testimonial-text { font-family: var(--ff-italic); font-size: 16px; font-style: italic; color: var(--espresso); line-height: 1.7; margin: 16px 0 24px; }
        .testimonial-footer { display: flex; align-items: center; gap: 12px; padding-top: 20px; border-top: 1px solid var(--sand); }
        .testimonial-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, var(--caramel), var(--espresso));
          display: flex; align-items: center; justify-content: center;
          font-family: var(--ff-serif); font-size: 14px; color: white; font-style: italic;
          flex-shrink: 0;
        }
        .testimonial-name { font-family: var(--ff-sans); font-size: 13px; font-weight: 600; color: var(--espresso); }
        .testimonial-meta { font-family: var(--ff-sans); font-size: 11px; color: var(--ghost); margin-top: 2px; }

        /* ── Newsletter ───────────────────────────────────────── */
        .newsletter { background: var(--sand); padding: 80px 40px; text-align: center; }
        .newsletter__inner { max-width: 520px; margin: 0 auto; }
        .newsletter__eyebrow { font-family: var(--ff-sans); font-size: 10px; letter-spacing: 0.4em; text-transform: uppercase; color: var(--caramel); margin-bottom: 16px; }
        .newsletter__title { font-family: var(--ff-serif); font-size: 34px; font-weight: 700; color: var(--espresso); margin-bottom: 10px; }
        .newsletter__sub { font-family: var(--ff-italic); font-size: 17px; font-style: italic; color: var(--warm-mid); margin-bottom: 32px; }
        .newsletter__form { display: flex; gap: 10px; }
        .newsletter__input {
          flex: 1; padding: 14px 20px;
          border: 1px solid var(--mink);
          background: white;
          font-family: var(--ff-sans);
          font-size: 13px;
          color: var(--espresso);
          outline: none;
          transition: border-color 0.2s;
        }
        .newsletter__input::placeholder { color: var(--mink); }
        .newsletter__input:focus { border-color: var(--caramel); }
        .newsletter__btn {
          padding: 14px 28px;
          background: var(--espresso);
          color: var(--sand);
          border: none;
          font-family: var(--ff-sans);
          font-size: 10px;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.25s;
        }
        .newsletter__btn:hover { background: var(--caramel); }
        .newsletter__success { background: white; padding: 28px 36px; border: 1px solid var(--sand); display: inline-block; }
        .newsletter__success-title { font-family: var(--ff-serif); font-size: 20px; font-weight: 700; color: var(--espresso); margin-bottom: 6px; }
        .newsletter__success-sub { font-family: var(--ff-sans); font-size: 12px; color: var(--ghost); }

        /* ── Footer ───────────────────────────────────────────── */
        

        /* ── Cart ─────────────────────────────────────────────── */
        .cart-overlay { position: fixed; inset: 0; z-index: 50; display: flex; }
        .cart-backdrop { flex: 1; background: rgba(0,0,0,0.45); backdrop-filter: blur(4px); }
        .cart-panel {
          width: 100%; max-width: 400px;
          background: var(--cream); display: flex; flex-direction: column;
          box-shadow: -20px 0 60px rgba(0,0,0,0.15);
        }
        .cart-header {
          padding: 24px 28px;
          border-bottom: 1px solid var(--sand);
          display: flex; align-items: center; justify-content: space-between;
        }
        .cart-title { font-family: var(--ff-serif); font-size: 20px; font-weight: 700; color: var(--espresso); }
        .cart-subtitle { font-family: var(--ff-sans); font-size: 11px; color: var(--ghost); margin-top: 2px; }
        .cart-close {
          width: 34px; height: 34px; border-radius: 50%;
          border: 1px solid var(--sand); background: none; cursor: pointer;
          color: var(--ghost); font-size: 12px;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s;
        }
        .cart-close:hover { border-color: var(--ghost); }
        .cart-items { flex: 1; overflow-y: auto; padding: 20px 28px; display: flex; flex-direction: column; gap: 20px; }
        .cart-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 40px; }
        .cart-empty-icon { font-size: 40px; opacity: 0.25; margin-bottom: 16px; font-family: var(--ff-serif); }
        .cart-empty-title { font-family: var(--ff-serif); font-size: 18px; color: var(--espresso); }
        .cart-empty-sub { font-family: var(--ff-sans); font-size: 12px; color: var(--ghost); margin-top: 6px; }
        .cart-item { display: flex; gap: 14px; padding-bottom: 20px; border-bottom: 1px solid var(--sand); }
        .cart-item:last-child { border-bottom: none; }
        .cart-item__photo { width: 76px; height: 76px; flex-shrink: 0; border-radius: 4px; overflow: hidden; }
        .cart-item__info { flex: 1; min-width: 0; }
        .cart-item__name { font-family: var(--ff-serif); font-size: 14px; font-weight: 600; color: var(--espresso); }
        .cart-item__color { font-family: var(--ff-sans); font-size: 11px; color: var(--ghost); margin-top: 2px; }
        .cart-item__controls { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
        .qty-btn {
          width: 24px; height: 24px; border: 1px solid var(--sand); background: none;
          border-radius: 50%; cursor: pointer; color: var(--ghost); font-size: 12px;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s;
        }
        .qty-btn:hover { border-color: var(--caramel); }
        .qty-val { font-family: var(--ff-sans); font-size: 13px; color: var(--espresso); width: 16px; text-align: center; }
        .cart-item__price { margin-left: auto; font-family: var(--ff-serif); font-size: 14px; font-weight: 700; color: var(--caramel); }
        .cart-item__remove { background: none; border: none; cursor: pointer; color: var(--mink); font-size: 12px; align-self: flex-start; margin-top: 2px; transition: color 0.2s; }
        .cart-item__remove:hover { color: #e05050; }
        .cart-footer { padding: 20px 28px; border-top: 1px solid var(--sand); display: flex; flex-direction: column; gap: 10px; }
        .cart-row { display: flex; justify-content: space-between; font-family: var(--ff-sans); font-size: 13px; color: var(--ghost); }
        .free { color: #4a9e6b; font-weight: 500; }
        .cart-total { display: flex; justify-content: space-between; padding-top: 12px; border-top: 1px solid var(--sand); font-family: var(--ff-serif); font-size: 18px; font-weight: 700; color: var(--espresso); }
        .checkout-btn {
          width: 100%; padding: 16px;
          background: var(--espresso); color: var(--sand);
          border: none; cursor: pointer;
          font-family: var(--ff-sans); font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
          transition: background 0.25s;
        }
        .checkout-btn:hover { background: var(--caramel); }
        .cart-note { font-family: var(--ff-sans); font-size: 10px; color: var(--mink); text-align: center; }

        /* ── Empty state ──────────────────────────────────────── */
        .empty-state { text-align: center; padding: 100px 20px; }
        .empty-state__icon { font-size: 48px; opacity: 0.25; margin-bottom: 16px; }
        .empty-state__title { font-family: var(--ff-serif); font-size: 26px; color: var(--espresso); margin-bottom: 12px; }
        .empty-state__clear { font-family: var(--ff-sans); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--caramel); background: none; border: none; border-bottom: 1px solid var(--caramel); cursor: pointer; padding-bottom: 1px; transition: opacity 0.2s; }
        .empty-state__clear:hover { opacity: 0.6; }

        /* ── Responsive ───────────────────────────────────────── */
        @media (max-width: 1024px) {
          .hero { grid-template-columns: 1fr; height: 70vw; max-height: 600px; }
          .hero__secondary-stack { display: none; }
          .testimonials__grid { grid-template-columns: 1fr; }
          .footer__main { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .nav__inner { padding: 0 20px; }
          .nav__links { display: none; }
          .nav__search-pill { display: none; }
          .nav__mobile-btn { display: block; }
          .nav__mobile-menu { padding: 16px 20px; }
          .hero { height: 75vw; min-height: 420px; }
          .hero__overlay { padding: 24px 24px; }
          .stats-bar { gap: 32px; padding: 16px 20px; flex-wrap: wrap; }
          .cat-strip { padding: 12px 20px; }
          .products { padding: 48px 20px; }
          .testimonials { padding: 48px 20px; }
          .newsletter { padding: 48px 20px; }
          .newsletter__form { flex-direction: column; }
          .footer__main { grid-template-columns: 1fr; padding: 40px 20px; }
          .footer__bottom { flex-direction: column; gap: 12px; padding: 16px 20px; }
          .editorial__stats { gap: 32px; flex-wrap: wrap; }
        }

        /* ── Animations ───────────────────────────────────────── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero__overlay > * {
          animation: fadeUp 0.9s var(--ease-out) both;
        }
        .hero__overlay > *:nth-child(1) { animation-delay: 0.1s; }
        .hero__overlay > *:nth-child(2) { animation-delay: 0.25s; }
        .hero__overlay > *:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      {/* ── Announcement ─────────────────────────────────── */}
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)}/>
     

      {/* ── Hero — Hermès layout ──────────────────────────── */}
      {/*
        TO ADD PHOTOS:
          Primary (left tall):  set src="/your-hero-main.jpg"
          Top-right:            set src="/your-hero-top.jpg"
          Bottom-right:         set src="/your-hero-bottom.jpg"
        That's it. No other changes needed.
      */}
     <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
  {/* Left: primary tall photo */}
  <div className="hero__primary">
    <PhotoSlot
      src="/images/front-image.jpg"
      alt="Maison Lumière — hero bag"
      colorHex="#C8956C"
      label="Main Hero Photo"
    />
    <div className="hero__overlay">
      <p className="hero__season">✦ New Season · Spring 2026</p>
      <h1 className="hero__title">
        Carry Your<br />
        <em>Story</em><br />
        with Grace
      </h1>
      <div className="hero__ctas">
        <button className="hero__cta-primary">Explore Collection</button>
        <button className="hero__cta-ghost">Our Story</button>
      </div>
    </div>
  </div>
</section>

      {/* ── Stats Bar ────────────────────────────────────── */}
      <div className="stats-bar">
        {[{ n: "4.9★", l: "Average Rating" }, { n: "12K+", l: "Happy Clients" }, { n: "100%", l: "Genuine Leather" }, { n: "2014", l: "Est." }].map(s => (
          <div key={s.l} className="stat">
            <div className="stat__num">{s.n}</div>
            <div className="stat__lbl">{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── Category Strip ───────────────────────────────── */}
      <div className="cat-strip">
        <div className="cat-strip__inner">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cat-btn ${activeCategory === cat ? "cat-btn--active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Products ─────────────────────────────────────── */}
      <section className="products">
        <div className="products__header">
          <div>
            <p className="products__eyebrow">Curated for You</p>
            <h2 className="products__title">The Collection</h2>
            <p className="products__count">{filtered.length} pieces, each with a story</p>
          </div>
          <div className="search-input-wrap">
            <svg className="search-icon" width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input
              className="search-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or colour..."
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__icon">◻</div>
            <p className="empty-state__title">No pieces found</p>
            <button className="empty-state__clear" onClick={() => { setSearch(""); setActiveCategory("All"); }}>Clear filters</button>
          </div>
        ) : (
          <div className="bag-grid">
            {filtered.map(bag => (
              <BagCard key={bag.id} bag={bag} onAdd={addToCart} onWishlist={toggleWishlist} wishlistIds={wishlist} />
            ))}
          </div>
        )}
      </section>

      {/* ── Editorial ────────────────────────────────────── */}
      <section className="editorial">
        <div className="editorial__bg-text">LUMIÈRE</div>
        <div className="editorial__inner">
          <p className="editorial__eyebrow">Our Promise</p>
          <h2 className="editorial__title">
            Crafted for Women<br />
            <em>Who Know Their Power</em>
          </h2>
          <p className="editorial__body">
            We believe a bag should feel like an heirloom from the moment you hold it.
            Each piece is stitched by hand, aged to perfection, made to outlive trends.
          </p>
          <div className="editorial__stats">
            {[{ n: "2014", l: "Est." }, { n: "48h", l: "Dispatch" }, { n: "Lifetime", l: "Guarantee" }].map(s => (
              <div key={s.l}>
                <div className="editorial__stat-num">{s.n}</div>
                <div className="editorial__stat-lbl">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="testimonials">
        <div className="testimonials__header">
          <p className="testimonials__eyebrow">Voices of Our Clients</p>
          <h2 className="testimonials__title">She Said It Best</h2>
        </div>
        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <Stars count={t.stars} />
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">{t.name[0]}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-meta">{t.city} · {t.bag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────── */}
      <section className="newsletter">
        <div className="newsletter__inner">
          <p className="newsletter__eyebrow">Inner Circle</p>
          <h2 className="newsletter__title">First to Know.<br />First to Love.</h2>
          <p className="newsletter__sub">Join our private list for early access to new arrivals and exclusive offers.</p>
          {subscribed ? (
            <div className="newsletter__success">
              <div className="newsletter__success-title">Welcome to Maison Lumière</div>
              <div className="newsletter__success-sub">Check your inbox for a welcome gift</div>
            </div>
          ) : (
            <div className="newsletter__form">
              <input className="newsletter__input" value={newsletter} onChange={e => setNewsletter(e.target.value)} placeholder="your@email.com" />
              <button className="newsletter__btn" onClick={() => { if (newsletter) setSubscribed(true); }}>Join Now</button>
            </div>
          )}
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────── */}
      <Footer/>
      

      {/* ── Cart ─────────────────────────────────────────── */}
      {cartOpen && <CartSidebar cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onQty={updateQty} />}
    </>
  );
}
