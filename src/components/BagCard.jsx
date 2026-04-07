import PhotoSlot from "./PhotoSlot";
import Stars from "./Stars";
import { act, useState } from "react";


export default function BagCard({ bag, onAdd, onWishlist, wishlistIds }) {
  const [added, setAdded] = useState(false);
  const [activeColor, setActiveColor] = useState(
    bag.colors?.[0] || { name: bag.color, hex: bag.colorHex, photo: bag.photo }
  );

  const isWished = wishlistIds.includes(bag.id);
  const discount = bag.originalPrice ? Math.round(((bag.originalPrice - bag.price) / bag.originalPrice) * 100) : null;

  const handleAdd = () => {
    onAdd(bag);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const colors = bag.colors || [{ name: bag.color, hex: bag.colorHex, photo: bag.photo }];

  return (
    <div className="bag-card">
      {/* Photo area — swap photo prop to activate */}
      <div className="bag-card__photo-wrap">
        <PhotoSlot
          src={activeColor.photo}
          alt={bag.name}
          className="bag-card__photo"
          colorHex={activeColor.hex}
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
          onClick={(e) => { e.stopPropagation(); onWishlist(bag); }}
          className={`wishlist-btn ${isWished ? "wished" : ""}`}
        >
          <svg width="16" height="16" fill={isWished ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Color swatch */}
       <div className="color-swatches">
          {colors.map((c) => (
            <button
              key={c.name}
              className={`color-swatch ${activeColor.name === c.name ? "active" : ""}`}
              style={{ background: c.hex }}
              title={c.name}
              onClick={() => setActiveColor(c)}
            />
          ))}
        </div>
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
