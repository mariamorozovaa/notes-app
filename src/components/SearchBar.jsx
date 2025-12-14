import { useState, useEffect } from "react";
import { memo } from "react";
import "../styles/SearchBar.css";

const SearchBar = memo(function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="search-bar">
      <p className="icon-search">🔍</p>
      <input
        className="input-search"
        type="text"
        placeholder="Поиск..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button className="btn-danger" style={{ marginLeft: "10px" }} onClick={() => setValue("")}>
          x
        </button>
      )}
    </div>
  );
});

export default SearchBar;
