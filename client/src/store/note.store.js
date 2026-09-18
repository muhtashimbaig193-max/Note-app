import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useNoteStore = create()(
  persist((set) => ({
    notes: [],

    addNote: (note) => set((state) => ({
      notes: [...state.notes, note],
    })),

    updateNote: (updatedNote) => set((state) => ({
      notes: state.notes.map((note) =>
        (note._id || note.id) === (updatedNote._id || updatedNote.id)
          ? { ...note, ...updatedNote }
          : note,
      ),
    })),

    deleteNote: (id) => set((state) => ({
      notes: state.notes?.filter((note) => note.id !== id),
    })),

    clearNotes: () => set({ notes: [] })

  }), {
    name: "note-storage"
  }),
);
