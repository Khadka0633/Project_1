


export default function StatusBar () {
    return (
        <div className="stats-bar">
                {[{ n: "4.9★", l: "Average Rating" }, { n: "12K+", l: "Happy Clients" }, { n: "100%", l: "Genuine Leather" }, { n: "2014", l: "Est." }].map(s => (
                  <div key={s.l} className="stat">
                    <div className="stat__num">{s.n}</div>
                    <div className="stat__lbl">{s.l}</div>
                  </div>
                ))}
              </div>
    )
}