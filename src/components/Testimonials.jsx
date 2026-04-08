import Stars from "./Stars"
import "./Testimonials.css"
export default function Testimonials ({testimonials}) {

    return (
        <section className="testimonials">
        <div className="testimonials__header">
          <p className="testimonials__eyebrow">Voices of Our Clients</p>
          <h2 className="testimonials__title">She Said It Best</h2>
        </div>
        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <Stars count={t.stars} />
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar">{t.name[0]}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-meta">{t.city} · {t.bag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
}

