import "../styles/EmptyState.css";

export default function EmptyState({ message, icon }) {
  return (
    <div className="empty-state">
      {icon ? <p className="icon">{icon}</p> : ""}
      <p>{message}</p>
    </div>
  );
}
