import {
  createNote,
  delAllNotes,
  deleteNoteById,
  fetchAllNotes,
  fetchNoteById,
  updateNoteById,
} from "../services/note.service.js";
import catchAsync from "../utils/catchAsync.js";

export const createNotes = catchAsync(async (req, res) => {
  const {
    title,
    description,
    tags,
    notebook,
    mood,
    color,
    isPinned,
    isFavourite,
    reminder,
  } = req.body;

  const note = await createNote(
    title,
    description,
    tags,
    notebook,
    mood,
    color,
    isPinned,
    isFavourite,
    reminder,
  );

  return res.status(201).json({ message: "Note Created Successfully", note });
});

export const getAllNotes = catchAsync(async (req, res) => {
  const notes = await fetchAllNotes();
  return res
    .status(200)
    .json({ message: "All notes are fetched successfully", notes });
});

export const getNoteById = catchAsync(async (req, res) => {
  const { id } = req.body;

  const note = await fetchNoteById(id);
  return res.status(200).json({ message: "Note Fetched Successfully", note });
});

export const deleteNoteByID = catchAsync(async(req, res) => {
  const { noteId } = req.params;

  console.log(noteId, "----PARAMS ID-----");
  

  const note = await deleteNoteById(noteId);

  return res.status(200).json({ message: "Note Deleted Successfully", note });

})

export const updateNote = catchAsync(async (req, res) => {
  const { noteId } = req.params;
  const {
    title,
    description,
    tags,
    notebook,
    mood,
    color,
    isPinned,
    isFavourite,
    reminder,
  } = req.body;

  const note = await updateNoteById(noteId, {
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

  return res.status(200).json({ message: "Note Updated Successfully", note });
});

export const deleteAllNotes = catchAsync(async (req, res) => {
  const notes = await delAllNotes();
  return notes
})