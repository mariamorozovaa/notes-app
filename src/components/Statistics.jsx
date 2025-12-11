export default function Statistics({ notes, categories }) {
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
      <h1>Статистика</h1>
      <div className="stats-grid">
        <p>Всего заметок: {totalNotes}</p>
        <p>Закреплено: {pinnedNotes}</p>
        <p>Сегодня: {todayNotes}</p>
      </div>

      <div className="stats-grid-category">
        {categoryStats.map((category) => (
          <div key={category.id}>
            <div style={{ backgroundColor: `${category.color}` }}></div>
            <p>{category.name}</p>
            <p>{category.count}</p>
          </div>
        ))}
      </div>
    </>
  );
}
