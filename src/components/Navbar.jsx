import { useState } from "react"
import {Link} from "react-router-dom"
import UserDropdown from "./UserDropdown"
import "./Navbar.css"


const navLinks = [
  {label: "Collection", path:"/collection"},
  {label: "New Arrivals", path:"/new-arrivals"},
  {label: "Bestsellers", path:"/bestsellers"},
  {label: "Stories", path:"/stories"},
  {label: "About", path:"/about"},
]

 
 export default function Navbar ({cartCount,wishlistCount, onCartOpen, onWishlistOpen}) {
    const [mobileMenu, setMobileMenu] = useState(false);
    return (
        <>
        <div className="announce">
        ✦ &nbsp; Complimentary shipping on all orders &nbsp;·&nbsp; Free gift wrapping &nbsp;·&nbsp; 30-day returns &nbsp; ✦
      </div>

      {/* ── Navbar ───────────────────────────────────────── */}
      <nav className="nav">
        <div className="nav__inner">

          <Link to="/" className="nav__logo">
            <div className="nav__logo-mark">H</div>
            <div>
              <div className="nav__brand">HIMSAMA</div>
              <div className="nav__tagline">Luxury Bags</div>
            </div>
          </Link>

         <div className="nav__links">
            {navLinks.map(({ label, path }) => (
              <Link key={label} to={path} className="nav__link">
                {label}
              </Link>
            ))}
          </div>

          <div className="nav__actions">
            <button className="nav__search-pill">
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              Search
            </button>

            <UserDropdown/>


            <button className="nav__action-btn" onClick={onCartOpen}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {cartCount > 0 && <span className="nav__cart-count">{cartCount}</span>}
            </button>
            <button className="nav__action-btn" onClick={onWishlistOpen}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                 d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                 {wishlistCount > 0 && <span className="nav__cart-count">{wishlistCount}</span>}
            </button>
            <button className="nav__mobile-btn" onClick={() => setMobileMenu(!mobileMenu)}>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>


      {mobileMenu && (
          <div className="nav__mobile-menu">
            {navLinks.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                className="nav__link"
                onClick={() => setMobileMenu(false)} // close menu on navigate
              >
                {label}
              </Link>
            ))}

            <div style={{ padding: "12px 24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <UserDropdown/>
            </div>

          </div>
        )}
      </nav>
        </>
    )
 }
 
 