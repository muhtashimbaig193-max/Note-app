import Note from "../models/note.model.js";
import { AppError } from "../utils/error.js";

export async function createNote(
  title,
  description,
  tags,
  notebook,
  mood,
  color,
  isPinned,
  isFavourite,
  reminder,
) {
  if (!title || !description || !tags) {
    throw new Error("Invalid Request, All fields are required");
  }

  const note = await Note.create({
    title,
    description,
    tags,
    notebook,
    mood,
    color,
    isPinned,
    isFavourite,
    reminder,
  });

  return note;
}

export async function fetchAllNotes() {
  const notes = await Note.find();

  if (!notes) {
    throw new AppError(404, "Notes Not Founded");
  }

  return notes;
}

export async function fetchNoteById(noteId) {
  if (!noteId) {
    throw new AppError(400, "Note Id not found");
  }

  const note = await Note.findById(noteId);

  if (!note) {
    throw new AppError(404, "No Note Found");
  }

  return note;
}


export async function deleteALlNotes() {}


export async function deleteNoteById(noteId) {
  if(!noteId){
    throw new AppError(404, "Note Id not found");
  }

  const note = await Note.findByIdAndDelete(noteId);

  if(!note){
    throw new AppError(404, "Note Not Found")
  }

  return note;
}

export async function updateNoteById(noteId, updates) {
  if (!noteId) {
    throw new AppError(400, "Note Id not found");
  }

  const note = await Note.findByIdAndUpdate(noteId, updates, {
    new: true,
    runValidators: true,
  });

  if (!note) {
    throw new AppError(404, "Note Not Found");
  }

  return note;
}
