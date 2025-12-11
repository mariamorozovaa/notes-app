import { useState, useEffect } from "react";
export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="search-bar">
      <p className="icon">🔍</p>
      <input type="text" placeholder="Поиск..." value={value} onChange={(e) => setValue(e.target.value)} />
      {value && <button onClick={() => setValue("")}>x</button>}
    </div>
  );
}
