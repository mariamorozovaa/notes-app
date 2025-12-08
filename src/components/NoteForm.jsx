import { useState, useEffect } from "react";

export default function NoteForm({ categories, editingNote, onAddNote, onUpdateNote, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0].id);
  // const [isPinned, setIsPinned] = useState(false)
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    function editData() {
      if (editingNote) {
        setTitle(editingNote.title);
        setContent(editingNote.content);
        setCategoryId(editingNote.categoryId);
        setFormData({
          title: editingNote.title,
          content: editingNote.content,
          categoryId: editingNote.categoryId,
        });
      }
    }

    editData();
  }, [editingNote]);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(...formData, name, value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Пустой заголовок");
      return;
    } else if (!content.trim()) {
      setError("Пустой контент");
      return;
    }
  }
}
