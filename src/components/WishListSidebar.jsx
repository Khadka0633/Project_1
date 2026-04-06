import PhotoSlot from "./PhotoSlot";

export default function WishlistSidebar({ wishlistItems, onClose, onRemove, onAddToCart }) {
  return (
    <div className="cart-overlay">
      <div className="cart-backdrop" onClick={onClose} />
      <div className="cart-panel">
        <div className="cart-header">
          <div>
            <h2 className="cart-title">Your Favourites</h2>
            <p className="cart-subtitle">{wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved</p>
          </div>
          <button onClick={onClose} className="cart-close">✕</button>
        </div>

        <div className="cart-items">
          {wishlistItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">♡</div>
              <p className="cart-empty-title">No favourites yet</p>
              <p className="cart-empty-sub">Click the heart on any bag to save it</p>
            </div>
          ) : wishlistItems.map(item => (
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
                <p className="cart-item__price" style={{ marginTop: "6px" }}>Rs{item.price}</p>
                <button
                  className="add-btn"
                  style={{ marginTop: "8px", padding: "8px", fontSize: "9px" }}
                  onClick={() => onAddToCart(item)}
                >
                  Add to Bag
                </button>
              </div>
              <button onClick={() => onRemove(item.id)} className="cart-item__remove">✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}