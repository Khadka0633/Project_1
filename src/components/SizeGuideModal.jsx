import { useEffect } from "react";
import "./SizeGuideModal.css";

const SIZE_DATA = [
  { name: "Mini",      width: "18cm", height: "13cm", depth: "7cm",  strap: "Up to 110cm" },
  { name: "Small",     width: "22cm", height: "16cm", depth: "8cm",  strap: "Up to 120cm" },
  { name: "Medium",    width: "28cm", height: "20cm", depth: "10cm", strap: "Up to 130cm" },
  { name: "Large",     width: "34cm", height: "25cm", depth: "12cm", strap: "Up to 140cm" },
  { name: "Tote",      width: "38cm", height: "30cm", depth: "14cm", strap: "Up to 60cm"  },
];

export default function SizeGuideModal({ onClose, bagName }) {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="sgm__backdrop" onClick={onClose}>
      <div className="sgm__panel" onClick={e => e.stopPropagation()}>

        <div className="sgm__header">
          <div>
            <p className="sgm__eyebrow">Reference Guide</p>
            <h2 className="sgm__title">Size Guide</h2>
          </div>
          <button className="sgm__close" onClick={onClose} aria-label="Close size guide">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Diagram */}
        <div className="sgm__diagram">
          <svg viewBox="0 0 240 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bag body */}
            <rect x="50" y="60" width="140" height="110" rx="4" stroke="#2C1810" strokeWidth="1.5" fill="#EBE0D0"/>
            {/* Flap */}
            <path d="M50 60 Q120 30 190 60" stroke="#2C1810" strokeWidth="1.5" fill="none"/>
            {/* Strap */}
            <path d="M80 60 Q120 20 160 60" stroke="#C8956C" strokeWidth="2" fill="none" strokeDasharray="4 3"/>
            {/* Width arrow */}
            <line x1="50" y1="185" x2="190" y2="185" stroke="#C8956C" strokeWidth="1"/>
            <polygon points="50,183 50,187 44,185" fill="#C8956C"/>
            <polygon points="190,183 190,187 196,185" fill="#C8956C"/>
            <text x="120" y="197" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="9" fill="#7D6540">WIDTH</text>
            {/* Height arrow */}
            <line x1="26" y1="60" x2="26" y2="170" stroke="#C8956C" strokeWidth="1"/>
            <polygon points="24,60 28,60 26,54" fill="#C8956C"/>
            <polygon points="24,170 28,170 26,176" fill="#C8956C"/>
            <text x="14" y="118" textAnchor="middle" fontFamily="Jost,sans-serif" fontSize="9" fill="#7D6540" transform="rotate(-90 14 118)">HEIGHT</text>
          </svg>
        </div>

        {/* Table */}
        <div className="sgm__table-wrap">
          <table className="sgm__table">
            <thead>
              <tr>
                <th>Size</th>
                <th>Width</th>
                <th>Height</th>
                <th>Depth</th>
                <th>Strap Length</th>
              </tr>
            </thead>
            <tbody>
              {SIZE_DATA.map(row => (
                <tr key={row.name} className={bagName?.toLowerCase().includes(row.name.toLowerCase()) ? "sgm__row--active" : ""}>
                  <td>{row.name}</td>
                  <td>{row.width}</td>
                  <td>{row.height}</td>
                  <td>{row.depth}</td>
                  <td>{row.strap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="sgm__note">All measurements are approximate. Dimensions may vary slightly per style.</p>
      </div>
    </div>
  );
}
