import { useState } from "react";
import "./Newsletter.css"

export default function Newsletter () {
     const [newsletter, setNewsletter] = useState("");
      const [subscribed, setSubscribed] = useState(false);
    return (
         <section className="newsletter">
        <div className="newsletter__inner">
          <p className="newsletter__eyebrow">Inner Circle</p>
          <h2 className="newsletter__title">First to Know.<br />First to Love.</h2>
          <p className="newsletter__sub">Join our private list for early access to new arrivals and exclusive offers.</p>
          {subscribed ? (
            <div className="newsletter__success">
              <div className="newsletter__success-title">Welcome to HIMSAMA</div>
              <div className="newsletter__success-sub">Check your inbox for a welcome gift</div>
            </div>
          ) : (
            <div className="newsletter__form">
              <input className="newsletter__input" value={newsletter} onChange={e => setNewsletter(e.target.value)} placeholder="your@email.com" />
              <button className="newsletter__btn" onClick={() => { if (newsletter) setSubscribed(true); }}>Join Now</button>
            </div>
          )}
        </div>
      </section>

    )
}