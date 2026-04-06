



export default function CartSidebar({ cart, onClose, onRemove, onQty }) {
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