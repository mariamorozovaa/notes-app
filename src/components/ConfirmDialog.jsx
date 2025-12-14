import "../styles/ConfirmDialog.css";

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-text">{message}</p>
        <button onClick={onCancel} className="btn-secondary" style={{ marginRight: "10px" }}>
          Отмена
        </button>
        <button onClick={onConfirm} className="btn-danger">
          Удалить
        </button>
      </div>
    </div>
  );
}
