
import "./Footer.css"
export default function Footer(){
    return(

        <footer className="footer">
        <div className="footer__main">
          <div>
            <div className="footer__brand-name">HIMSAMA</div>
            <div className="footer__brand-tag">Luxury Bags Since 2014</div>
            <p className="footer__brand-body">Handcrafted with heritage. Worn with intention. Made to be remembered.</p>
          </div>
          {[
            { title: "Shop",        links: ["New Arrivals", "Totes", "Clutches", "Crossbody", "Sale"] },
            { title: "HIMSAMA",      links: ["Our Story", "Craftsmanship", "Sustainability", "Careers"] },
            { title: "Client Care", links: ["Shipping & Returns", "Size Guide", "Authentication", "Contact Us"] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="footer__col-title">{col.title}</h4>
              <ul className="footer__links">
                {col.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">© 2026 Maison Lumière · All Rights Reserved</p>
          <div className="footer__legal">
            {["Privacy", "Terms", "Cookies"].map(l => <a key={l} href="#">{l}</a>)}
          </div>
        </div>
      </footer>
    )
}

