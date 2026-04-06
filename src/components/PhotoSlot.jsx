



export default function PhotoSlot({ src, alt, className = "", style = {}, colorHex = "#C8956C", label = "" }) {
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