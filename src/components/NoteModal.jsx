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
        <h2>{note.title}</h2>
        <span className="modal-badge" style={{ backgroundColor: category?.color }}>
          {category?.name}
        </span>
        <button onClick={onClose}>x</button>

        <p>{note.content}</p>

        <footer>
          <p>{formattedDate}</p>
          <button
            onClick={() => {
              onEdit(note);
              onClose();
            }}>
            Редактировать
          </button>
          <button
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
