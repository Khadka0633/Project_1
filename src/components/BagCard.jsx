import PhotoSlot from "./PhotoSlot";
import Stars from "./Stars";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BagCard.css"

export default function BagCard({ bag, onAdd, onWishlist, wishlistIds }) {
  const [added, setAdded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState(null);

  const colors = bag.colors?.length ? bag.colors
    : [{ name: bag.color, hex: bag.colorHex, photo: bag.photo }];

  const activeColor = colors[activeIndex];
  const isWished = wishlistIds.includes(bag.id);
  const discount = bag.originalPrice
    ? Math.round(((bag.originalPrice - bag.price) / bag.originalPrice) * 100) : null;

  const switchTo = (nextIndex, dir) => {
    if (nextIndex === activeIndex || sliding) return;
    setPrevIndex(activeIndex);
    setDirection(dir);
    setSliding(true);
    setTimeout(() => {
      setActiveIndex(nextIndex);
      setPrevIndex(null);
      setSliding(false);
      setDirection(null);
    }, 350);
  };

  const prev = (e) => {
    e.stopPropagation();
    switchTo((activeIndex - 1 + colors.length) % colors.length, 'right');
  };

  const next = (e) => {
    e.stopPropagation();
    switchTo((activeIndex + 1) % colors.length, 'left');
  };

  const handleAdd = () => {
    onAdd(bag);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const navigate = useNavigate()

  return (
    <div className="bag-card" onClick={()=> navigate(`/product/${bag.id}`)}>
      <div className="bag-card__photo-wrap">

        {/* Outgoing photo — slides out */}
        {sliding && prevIndex !== null && (
  <div style={{
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    transform: direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)',
    transition: 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  }}>
    <PhotoSlot
      src={colors[prevIndex].photo}
      alt={bag.name}
      className="bag-card__photo"
      colorHex={colors[prevIndex].hex}
      label={bag.name}
    />
  </div>
)}

        {/* Incoming photo — slides in */}
        <div style={{
  position: 'absolute',
  inset: 0,
  zIndex: 2,
  transform: sliding
    ? 'translateX(0)'
    : direction === 'left' ? 'translateX(100%)' : direction === 'right' ? 'translateX(-100%)' : 'translateX(0)',
  transition: sliding ? 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
  height: '100%',
}}>
          <PhotoSlot
            src={activeColor.photo}
            alt={bag.name}
            className="bag-card__photo"
            colorHex={activeColor.hex}
            label={bag.name}
          />
        </div>

        {/* Badges */}
        <div className="bag-card__badges" style={{ zIndex: 3 }}>
          {bag.badge && (
            <span className={`badge badge--${bag.badge.toLowerCase()}`}>
              {bag.badge === "Sale" && discount ? `−${discount}%` : bag.badge}
            </span>
          )}
          <span className="badge badge--tag">{bag.tag}</span>
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(bag); }}
          className={`wishlist-btn ${isWished ? "wished" : ""}`}
          style={{ zIndex: 3 }}
        >
          <svg width="16" height="16" fill={isWished ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Arrow buttons */}
        {colors.length > 1 && (
          <>
            <button className="card-arrow card-arrow--prev" onClick={prev} aria-label="Previous color" style={{ zIndex: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button className="card-arrow card-arrow--next" onClick={next} aria-label="Next color" style={{ zIndex: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>

            <div className="card-dots" style={{ zIndex: 4 }}>
              {colors.map((_, i) => (
                <button
                  key={i}
                  className={`card-dot ${i === activeIndex ? "card-dot--active" : ""}`}
                  onClick={(e) => { e.stopPropagation(); switchTo(i, i > activeIndex ? 'left' : 'right'); }}
                  aria-label={`Color ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {colors.length > 1 && (
          <div className="card-color-pill" style={{ zIndex: 4 }}>
            <span className="card-color-pill__dot" style={{ background: activeColor.hex }} />
            {activeColor.name}
          </div>
        )}

      </div>

      {/* Info */}
      <div className="bag-card__body">
        <p className="bag-card__category">{bag.category}</p>
        <div className="bag-card__row">
          <h3 className="bag-card__name">{bag.name}</h3>
          <div className="bag-card__pricing">
            <span className="bag-card__price">Rs{bag.price}</span>
            {bag.originalPrice && <span className="bag-card__original">Rs{bag.originalPrice}</span>}
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