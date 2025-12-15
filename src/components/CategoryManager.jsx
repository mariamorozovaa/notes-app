import { useState } from "react";
import "../styles/CategoryManager.css";

export default function CategoryManager({ categories, notes, onAddCategory, onUpdateCategory, onDeleteCategory }) {
  const PRESET_COLORS = ["#FF1744", "#FF9100", "#FFC400", "#00E676", "#00B0FF", "#2979FF", "#aa00f9ff", "#ff40dcff", "#9E9E9E"];

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    color: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name) {
      console.log("Пустое имя категории");
      return;
    }
    if (editingId) {
      onUpdateCategory(editingId, formData);
      setEditingId(null);
    } else {
      const newCategory = {
        id: crypto.randomUUID(),
        name: formData.name,
        color: formData.color,
      };
      onAddCategory(newCategory);
      setIsAdding(false);
      setFormData({
        name: "",
        color: "",
      });
    }
  }
  function handleEdit(category) {
    setEditingId(category.id);
    setFormData({ name: category.name, color: category.color });
    setIsAdding(true);
  }

  function handleDelete(categoryId) {
    const count = notes.filter((n) => n.categoryId === categoryId).length;
    if (count > 0) {
      let confirmation = window.confirm("Вы действительно хотите удалить категорию? В ней содержаться заметки");
      if (!confirmation) return;
    }
    onDeleteCategory(categoryId);
  }

  return (
    <div>
      <div className="title-categories">
        <h1>Управление категориями</h1>
        <button onClick={() => setIsAdding(true)} className="btn-add">
          + Добавить категорию
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="form-category" style={{ marginBottom: "20px" }}>
          <label htmlFor="title">Название категории</label>
          <input
            type="text"
            name="title"
            placeholder="Введите название категории"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            style={{
              fontSize: "18px",
              padding: "10px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: "rgba(221, 221, 225, 0.546)",
              marginBottom: "10px",
            }}
          />
          <label htmlFor="color">Цвет</label>
          <div className="colors">
            {PRESET_COLORS.map((color) => (
              <button
                type="button"
                id="color"
                name="color"
                key={color}
                style={{
                  backgroundColor: color,
                  width: "50px",
                  height: "50px",
                  border: formData.color === color ? "3px solid black" : "1px solid #ccc",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={() => setFormData((prev) => ({ ...prev, color }))}></button>
            ))}
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              marginBottom: "10px",
            }}>
            Создать
          </button>
          <button onClick={() => setIsAdding(false)} className="btn-secondary">
            Отменить
          </button>
        </form>
      )}
      {categories.map((category) => (
        <div key={category.id} className="category-card">
          <div style={{ display: "flex" }}>
            <div
              className="count"
              style={{ backgroundColor: `${category.color}`, width: "20px", height: "20px", marginRight: "10px" }}></div>
            <p className="bold-text" style={{ fontSize: "20px" }}>
              {category.name}
            </p>
          </div>

          <div>
            <button className="btn-default" style={{ marginRight: "10px" }} onClick={() => handleEdit(category)}>
              ✏️
            </button>
            <button className="btn-default" onClick={() => handleDelete(category.id)}>
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
