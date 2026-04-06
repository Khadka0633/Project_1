
import { categories } from "../data/bags"

export default function CategoryStrip ({activeCategory, setActiveCategory}) {
      
    return (
         <div className="cat-strip">
        <div className="cat-strip__inner">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`cat-btn ${activeCategory === cat ? "cat-btn--active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    )
}