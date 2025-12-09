export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <button onClick={onCancel}>Отмена</button>
        <button onClick={onConfirm} style={{ color: "red" }}>
          Удалить
        </button>
      </div>
    </div>
  );
}
