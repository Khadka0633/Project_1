

import PhotoSlot from "./PhotoSlot";
export default function Hero () {
    return(
            <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
          {/* Left: primary tall photo */}
          <div className="hero__primary">
            <PhotoSlot
              src="/images/front-image.jpg"
              alt="Maison Lumière — hero bag"
              colorHex="#C8956C"
              label="Main Hero Photo"
            />
            <div className="hero__overlay">
              <p className="hero__season">✦ New Season · Spring 2026</p>
              <h1 className="hero__title">
                Carry Your<br />
                <em>Story</em><br />
                with Grace
              </h1>
              <div className="hero__ctas">
                <button className="hero__cta-primary">Explore Collection</button>
                <button className="hero__cta-ghost">Our Story</button>
              </div>
            </div>
          </div>
        </section>
        
    )
}