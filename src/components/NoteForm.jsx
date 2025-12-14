import { useState, useEffect } from "react";
import "../styles/NoteForm.css";

export default function NoteForm({ categories, editingNote, onAddNote, onUpdateNote, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: categories[0]?.id || null,
    isPinned: false,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    function editData() {
      if (editingNote) {
        setFormData({
          title: editingNote.title,
          content: editingNote.content,
          categoryId: editingNote.categoryId,
          isPinned: editingNote.isPinned,
        });
      }
    }

    editData();
  }, [editingNote]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Пустой заголовок");
      return;
    } else if (!formData.content.trim()) {
      setError("Пустое описание");
      return;
    }
    if (editingNote) {
      const updatedNote = {
        ...editingNote,
        ...formData,
      };
      onUpdateNote(updatedNote);
    } else {
      const newNote = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onAddNote(newNote);
    }
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {editingNote ? <h1>Редактировать заметку</h1> : <h1>Новая заметка</h1>}
        <button onClick={onClose}>x</button>

        <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
          {error ? <p>{error}</p> : ""}
          <label htmlFor="title">Заголовок:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Введите заголовок"
            autoFocus
          />
          <label htmlFor="content">Описание:</label>
          <textarea
            name="content"
            id="content"
            rows="8"
            value={formData.content}
            onChange={handleChange}
            placeholder="Введите текст"></textarea>
          <label htmlFor="categoryId">Категория:</label>
          <select name="categoryId" id="categoryId" value={formData.categoryId} onChange={handleChange}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="isPinned">Закрепить заметку</label>
          <input
            type="checkbox"
            id="isPinned"
            name="isPinned"
            checked={formData.isPinned}
            onChange={(e) => setFormData((prev) => ({ ...prev, isPinned: e.target.checked }))}
          />
          <button type="button" onClick={onClose}>
            Отмена
          </button>
          <button type="submit">{editingNote ? "Сохранить" : "Создать"}</button>
        </form>
      </div>
    </div>
  );
}
