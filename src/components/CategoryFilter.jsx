export default function CategoryFilter({ categories, notes, selectedCategory, onSelectCategory }) {
  function getCategoryCount(categoryId) {
    return notes.filter((note) => note.categoryId === categoryId).length;
  }

  return (
    <>
      <h1>Категории</h1>
      <button onClick={() => onSelectCategory("all")} className={`category-btn ${selectedCategory === "all" ? "active" : ""}`}>
        Все ({notes.length})
      </button>

      {categories.map((category) => (
        <div key={category.id}>
          <button
            onClick={() => onSelectCategory(category.id)}
            className={`category-btn ${selectedCategory === category.id ? "active" : ""}`}
            style={{ borderLeft: `6px solid ${category.color}` }}>
            {category.name} ({getCategoryCount(category.id)})
          </button>
        </div>
      ))}
    </>
  );
}
