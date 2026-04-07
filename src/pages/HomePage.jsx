
import { useState, useEffect} from "react";
import BagCard from "../components/BagCard";
import Editorial from "../components/Editorial"
import Testimonials from "../components/Testimonials"
import Newsletter from "../components/Newsletter"
import "../styles/global.css"
import StatusBar from "../components/StatusBar";
import CategoryStrip from "../components/CategoryStrip";
import Hero from "../components/Hero";







// ─── Main ─────────────────────────────────────────────────────────────────────
export default function HomePage({bags, testimonials, addToCart,toggleWishlist, wishlistIds}) {
  
  
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [heroVisible, setHeroVisible] = useState(false);
 

  useEffect (() => {
    setTimeout(() => setHeroVisible(true), 100)
  }, [])
 
 

 


  const filtered = bags.filter(b => {
    const catOk = activeCategory === "All" || b.category === activeCategory;
    const searchOk = b.name.toLowerCase().includes(search.toLowerCase()) || b.color.toLowerCase().includes(search.toLowerCase());
    return catOk && searchOk;
  });

  return (
    <>
      
    
      <Hero visible={heroVisible}/>
    
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
              <BagCard key={bag.id} bag={bag} onAdd={addToCart} onWishlist={toggleWishlist} wishlistIds={wishlistIds} />
            ))}
          </div>
        )}
      </section>

     
      <Editorial/>

    
      <Testimonials testimonials = {testimonials}/>

      
     <Newsletter/>
     
      
      
      
  
    </>
  );
}
