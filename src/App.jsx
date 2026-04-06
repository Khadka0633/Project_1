
import { useState, useEffect, useRef } from "react";
import { bags } from "./data/bags";
import { testimonials } from "./data/testimonials";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PhotoSlot from "./components/PhotoSlot";
import BagCard from "./components/BagCard";
import CartSidebar from "./components/CartSidebar"
import Editorial from "./components/Editorial"
import Testimonials from "./components/Testimonials"
import Newsletter from "./components/Newsletter"
import "./styles/global.css"
import StatusBar from "./components/StatusBar";
import CategoryStrip from "./components/CategoryStrip";




// ─── Main ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
 
 

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
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)}/>
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

    
      <StatusBar/>

  
     <CategoryStrip activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>

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

     
     <Editorial/>

    
      <Testimonials testimonials = {testimonials}/>

      
     <Newsletter/>
     
      <Footer/>
      

      {/* ── Cart ─────────────────────────────────────────── */}
      {cartOpen && <CartSidebar cart={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} onQty={updateQty} />}
    </>
  );
}
