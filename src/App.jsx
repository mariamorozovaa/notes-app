import "./App.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import NoteForm from "./components/NoteForm";

const DEFAULT_CATEGORIES = [
  {
    id: "work",
    name: "Работа",
    color: "#3498db",
  },
  {
    id: "personal",
    name: "Личное",
    color: "#1cbe7dff",
  },
  {
    id: "ideas",
    name: "Идеи",
    color: "#d89e1fff",
  },
  {
    id: "important",
    name: "Важное",
    color: "#f33939ff",
  },
  {
    id: "different",
    name: "Разное",
    color: "#6b7d89ff",
  },
];

function App() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);

  return <NoteForm />;
}

export default App;
