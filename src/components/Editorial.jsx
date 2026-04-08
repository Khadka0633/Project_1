
import "./Editorial.css"
export default function Editorial () {
    return(
        <section className="editorial">
        <div className="editorial__bg-text">HIMSAMA</div>
        <div className="editorial__inner">
          <p className="editorial__eyebrow">Our Promise</p>
          <h2 className="editorial__title">
            Crafted for Women<br />
            <em>Who Know Their Power</em>
          </h2>
          <p className="editorial__body">
            We believe a bag should feel like an heirloom from the moment you hold it.
            Each piece is stitched by hand, aged to perfection, made to outlive trends.
          </p>
          <div className="editorial__stats">
            {[{ n: "2014", l: "Est." }, { n: "48h", l: "Dispatch" }, { n: "Lifetime", l: "Guarantee" }].map(s => (
              <div key={s.l}>
                <div className="editorial__stat-num">{s.n}</div>
                <div className="editorial__stat-lbl">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}
