import { memo } from "react";
import "../styles/Statistics.css";

const Statistics = memo(function Statistics({ notes, categories }) {
  const totalNotes = notes.length;
  const pinnedNotes = notes.filter((n) => n.isPinned).length;
  const today = new Date().toDateString();
  const todayNotes = notes.filter((n) => new Date(n.createdAt).toDateString() === today).length;
  const categoryStats = categories.map((category) => ({
    ...category,
    count: notes.filter((n) => n.categoryId === category.id).length,
  }));
  categoryStats.sort((a, b) => b.count - a.count);

  return (
    <>
      <div className="stats-grid" style={{ marginBottom: "30px" }}>
        <h1 style={{ marginBottom: "10px" }}>Статистика</h1>
        <div className="stats-item">
          <p className="icon">📝</p>
          <div className="stats-item-text">
            <p className="bold-text">{totalNotes}</p>
            <p>ВСЕГО ЗАМЕТОК</p>
          </div>
        </div>
        <div className="stats-item">
          <p className="icon">📌</p>
          <div className="stats-item-text">
            <p className="bold-text">{pinnedNotes}</p>
            <p>ЗАКРЕПЛЕНО</p>
          </div>
        </div>
        <div className="stats-item">
          <p className="icon">📁</p>
          <div className="stats-item-text">
            <p className="bold-text">{todayNotes}</p>
            <p>СЕГОДНЯ</p>
          </div>
        </div>
      </div>

      <div className="stats-grid-category">
        <h2 style={{ marginBottom: "10px" }}>По категориям</h2>
        {categoryStats.map((category) => (
          <div key={category.id} className="notes-count-categories" style={{ border: `2px solid ${category.color}` }}>
            <p>{category.name}</p>
            <div
              className="count"
              style={{ backgroundColor: `${category.color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <p className="count-text">{category.count}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
});

export default Statistics;
