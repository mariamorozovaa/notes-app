import { memo } from "react";
import "../styles/NoteCard.css";

const NoteCard = memo(function NoteCard({ note, category, onNoteClick, onEdit, onDelete, onTogglePin }) {
  let preview = "";

  if (note.content.length > 100) preview = note.content.slice(0, 100) + "...";
  else preview = note.content;

  function formatDate() {
    return new Date(note.updatedAt).toLocaleDateString("ru-RU");
  }

  return (
    <div className="note-card" onClick={() => onNoteClick(note)}>
      <div className="note-header">
        <h3>
          {note.title} {note.isPinned && <span>📌</span>}
        </h3>
        <button
          className="pinNote"
          onClick={(e) => {
            e.stopPropagation();
            onTogglePin(note.id);
          }}>
          {note.isPinned ? "Открепить" : "Закрепить"}
        </button>
      </div>

      <span className="category-badge" style={{ backgroundColor: category?.color }}>
        {category?.name}
      </span>
      <p className="note-preview">{preview}</p>
      <div className="note-footer">
        <span className="note-date">{formatDate()}</span>
        <div className="note-actions">
          <button
            type="button"
            className="btn-default"
            style={{ marginRight: "10px" }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(note);
            }}>
            ✏️
          </button>
          <button
            type="button"
            className="btn-default"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
});

export default NoteCard;
