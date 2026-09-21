import express from "express";
import {
  createNotes,
  deleteAllNotes,
  deleteNoteByID,
  getAllNotes,
  getNoteById,
  updateNote,
} from "../controller/note.controller.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();

router.post("/create", authenticate, createNotes);
router.get("/get-all-notes", getAllNotes);
router.get("/get-note-by-id", getNoteById);
router.delete("/delete/:noteId", deleteNoteByID);
router.patch("/update/:noteId", authenticate, updateNote);
router.delete("/delete", deleteAllNotes)

export default router;
