const NOTES_KEY = "notes-app-notes";
const CATEGORIES_KEY = "notes-app-categories";

export function saveNotes(notes) {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes:", error);
  }
}

export function loadNotes() {
  try {
    const arrOfNotes = localStorage.getItem(NOTES_KEY);
    return arrOfNotes ? JSON.parse(arrOfNotes) : [];
  } catch (error) {
    console.error("Error saving notes:", error);
    return [];
  }
}

export function saveCategories(categories) {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error("Error saving categories:", error);
  }
}

export function loadCategories() {
  try {
    const arrOfCategories = localStorage.getItem(CATEGORIES_KEY);
    return arrOfCategories ? JSON.parse(arrOfCategories) : [];
  } catch (error) {
    console.error("Error saving categories:", error);
    return [];
  }
}
