import "./App.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import NoteForm from "./components/NoteForm";
import EmptyState from "./components/EmptyState";
import NoteCard from "./components/NoteCard";
import { loadCategories, loadNotes, saveCategories, saveNotes } from "./utils/localStorage";
import NoteModal from "./components/NoteModal";
import ConfirmDialog from "./components/ConfirmDialog";
import CategoryFilter from "./components/CategoryFilter";

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
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  function handleAddNote(newNote) {
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setIsFormOpen(false);
  }

  function handleUpdateNote(updatedNote) {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? { ...updatedNote, updatedAt: new Date().toISOString() } : note))
    );

    setIsFormOpen(false);
    setEditingNote(null);
  }

  function handleEditNote(note) {
    setEditingNote(note);
    setIsFormOpen(true);
  }

  function handleDeleteNote(noteId) {
    setNoteToDelete(noteId);
  }

  function handleDeleteConfirm() {
    setNotes((prev) => prev.filter((note) => note.id !== noteToDelete));
    setNoteToDelete(null);
  }

  function handleTogglePin(noteId) {
    setNotes((prev) =>
      prev.map((note) => (note.id === noteId ? { ...note, isPinned: !note.isPinned, updatedAt: new Date().toISOString() } : note))
    );
  }

  useEffect(() => {
    function loadNotesAndCategories() {
      const loadedNotes = loadNotes();
      if (loadedNotes) setNotes(loadedNotes);

      const loadedCategories = loadCategories();
      if (loadedCategories) setCategories(loadedCategories);
      else setCategories(DEFAULT_CATEGORIES);
    }
    loadNotesAndCategories();
  }, []);

  useEffect(() => {
    if (notes.length > 0) saveNotes(notes);
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

  const filteredNotes = useMemo(() => {
    let result = sortedNotes;
    if (selectedCategory !== "all") result = result.filter((note) => note.categoryId === selectedCategory);
    return result;
  }, [sortedNotes, selectedCategory]);

  return (
    <div className="app">
      <header>
        <h1>Notes App</h1>
        <button onClick={() => setIsFormOpen(true)}>Новая заметка</button>
      </header>
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
      {notes.length === 0 ? (
        <EmptyState icon="📝" message="Нет заметок. Создайте первую!" />
      ) : (
        <div className="notes-grid">
          {filteredNotes.map((note) => (
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

      <CategoryFilter
        categories={categories}
        notes={notes}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
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
