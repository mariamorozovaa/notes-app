import { useState } from "react";
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
      <h1>Категории</h1>
      <button onClick={() => setIsAdding(true)}>Добавить</button>
      {isAdding && (
        <form onSubmit={handleSubmit}>
          <input type="text" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} />
          {PRESET_COLORS.map((color) => (
            <button
              type="button"
              key={color}
              style={{
                backgroundColor: color,
                width: "32px",
                height: "32px",
                border: formData.color === color ? "3px solid black" : "1px solid #ccc",
                borderRadius: "6px",
                cursor: "pointer",
              }}
              onClick={() => setFormData((prev) => ({ ...prev, color }))}></button>
          ))}
          <button onClick={() => setIsAdding(false)}>Отменить</button>
          <button type="submit">Создать</button>
        </form>
      )}
      {categories.map((category) => (
        <div key={category.id}>
          <p>{category.name}</p>
          <button style={{ backgroundColor: `${category.color}` }}></button>
          <p>{notes.filter((note) => note.categoryId === category.id).length}</p>
          <button onClick={() => handleEdit(category)}>Редактировать</button>
          <button onClick={() => handleDelete(category.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}
