import { memo } from "react";
import "../styles/CategoryFilter.css";

const CategoryFilter = memo(function CategoryFilter({ categories, notes, selectedCategory, onSelectCategory }) {
  function getCategoryCount(categoryId) {
    return notes.filter((note) => note.categoryId === categoryId).length;
  }

  return (
    <div className="container" style={{ marginBottom: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>Категории</h1>

      <div className="categories">
        <button onClick={() => onSelectCategory("all")} className={`category-btn ${selectedCategory === "all" ? "active" : ""}`}>
          Все ({notes.length})
        </button>

        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => onSelectCategory(category.id)}
              className={`category-btn ${selectedCategory === category.id ? "active" : ""}`}
              style={{ borderLeft: `15px solid ${category.color}` }}>
              {category.name} ({getCategoryCount(category.id)})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default CategoryFilter;
