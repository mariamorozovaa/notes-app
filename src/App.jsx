import "./App.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import NoteForm from "./components/NoteForm";
import EmptyState from "./components/EmptyState";
import NoteCard from "./components/NoteCard";
import { loadCategories, loadNotes, saveCategories, saveNotes } from "./utils/localStorage";
import NoteModal from "./components/NoteModal";
import ConfirmDialog from "./components/ConfirmDialog";
import CategoryFilter from "./components/CategoryFilter";
import CategoryManager from "./components/CategoryManager";
import SearchBar from "./components/SearchBar";
import Statistics from "./components/Statistics";

const DEFAULT_CATEGORIES = [
  {
    id: "work",
    name: "Работа",
    color: "#2979FF",
  },
  {
    id: "personal",
    name: "Личное",
    color: "#00E676",
  },
  {
    id: "ideas",
    name: "Идеи",
    color: "#FF9100",
  },
  {
    id: "important",
    name: "Важное",
    color: "#FF1744",
  },
  {
    id: "other",
    name: "Другое",
    color: "#9E9E9E",
  },
];

function App() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddNote = useCallback((newNote) => {
    setNotes((prev) => [newNote, ...prev]);
    setIsFormOpen(false);
  }, []);

  const handleUpdateNote = useCallback((updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? { ...updatedNote, updatedAt: new Date().toISOString() } : note))
    );

    setIsFormOpen(false);
    setEditingNote(null);
  }, []);

  const handleEditNote = useCallback((note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  }, []);

  const handleDeleteNote = useCallback((noteId) => {
    setNoteToDelete(noteId);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    setNotes((prev) => prev.filter((note) => note.id !== noteToDelete));
    setNoteToDelete(null);
  }, [noteToDelete]);

  const handleTogglePin = useCallback((noteId) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === noteId ? { ...note, isPinned: !note.isPinned, updatedAt: new Date().toISOString() } : note))
    );
  }, []);

  const handleAddCategory = useCallback((newCategory) => {
    setCategories((prev) => [...prev, newCategory]);
  }, []);

  const handleUpdateCategory = useCallback((categoryId, updates) => {
    setCategories((prev) => prev.map((cat) => (cat.id === categoryId ? { ...cat, ...updates } : cat)));
  }, []);

  const handleDeleteCategory = useCallback((categoryId) => {
    setNotes((prev) => prev.map((note) => (note.categoryId === categoryId ? { ...note, categoryId: "other" } : note)));
    setCategories((prev) => prev.filter((category) => category.id !== categoryId));
  }, []);

  useEffect(() => {
    function loadNotesAndCategories() {
      const loadedNotes = loadNotes();
      if (loadedNotes.length > 0) setNotes(loadedNotes);

      const loadedCategories = loadCategories();
      if (loadedCategories.length > 0) setCategories(loadedCategories);
      else setCategories(DEFAULT_CATEGORIES);
    }
    loadNotesAndCategories();
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  useEffect(() => {
    if (categories.length > 0) saveCategories(categories);
  }, [categories]);

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  }, [notes]);

  const displayedNotes = useMemo(() => {
    let result = sortedNotes;
    if (selectedCategory !== "all") result = result.filter((note) => note.categoryId === selectedCategory);

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter((note) => note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query));
    }

    return result;
  }, [sortedNotes, selectedCategory, searchQuery]);

  return (
    <div className="app">
      <header>
        <h1>Notes App</h1>
        <button className="btn-add" onClick={() => setIsFormOpen(true)}>
          + Новая заметка
        </button>
      </header>
      <SearchBar onSearch={setSearchQuery} />

      {isFormOpen ? (
        <NoteForm
          categories={categories}
          editingNote={editingNote}
          onAddNote={handleAddNote}
          onUpdateNote={handleUpdateNote}
          onClose={() => {
            setIsFormOpen(false);
            setEditingNote(null);
          }}
        />
      ) : (
        ""
      )}
      <CategoryFilter
        categories={categories}
        notes={notes}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {notes.length === 0 ? (
        <EmptyState icon="📝" message="Нет заметок. Создайте первую!" />
      ) : displayedNotes.length === 0 && searchQuery ? (
        <EmptyState message={`Ничего не найдено по запросу "${searchQuery}"`} />
      ) : (
        <div className="notes-grid">
          {displayedNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              category={categories.find((c) => c.id === note.categoryId)}
              onNoteClick={() => setSelectedNote(note)}
              onEdit={() => handleEditNote(note)}
              onDelete={() => handleDeleteNote(note.id)}
              onTogglePin={handleTogglePin}
            />
          ))}
        </div>
      )}

      <Statistics notes={notes} categories={categories} />

      <CategoryManager
        categories={categories}
        notes={notes}
        onAddCategory={handleAddCategory}
        onUpdateCategory={handleUpdateCategory}
        onDeleteCategory={handleDeleteCategory}
      />

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          category={categories.find((c) => c.id === selectedNote.categoryId)}
          onClose={() => setSelectedNote(null)}
          onEdit={handleEditNote}
          onDelete={() => handleDeleteNote(selectedNote.id)}
        />
      )}

      {noteToDelete && (
        <ConfirmDialog
          title="Удалить заметку?"
          message="Это действие нельзя отменить"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setNoteToDelete(null)}
        />
      )}
    </div>
  );
}

export default App;
