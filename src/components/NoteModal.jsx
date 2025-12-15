export default function NoteModal({ note, category, onClose, onEdit, onDelete }) {
  const formattedDate = new Date(note.updatedAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>{note.title}</h2>
          <button className="btn-default" onClick={onClose}>
            x
          </button>
        </div>

        <span className="category-badge" style={{ backgroundColor: category?.color }}>
          {category?.name}
        </span>

        <p className="note-preview">{note.content}</p>

        <footer>
          <p className="note-date">{formattedDate}</p>
          <button
            className="btn-default"
            style={{ marginRight: "10px" }}
            onClick={() => {
              onEdit(note);
              onClose();
            }}>
            Редактировать
          </button>
          <button
            className="btn-default"
            onClick={() => {
              onDelete(note.id);
              onClose();
            }}>
            Удалить
          </button>
        </footer>
      </div>
    </div>
  );
}
