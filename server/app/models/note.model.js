import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    notebook: {
      type: String,
      default: "Personal",
      trim: true,
    },

    mood: {
      type: String,
      default: "Focused",
      trim: true,
    },

    color: {
      type: String,
      default: "#8B5CF6",
    },

    isPinned: {
      type: Boolean,
      default: false,
    },

    isFavourite: {
      type: Boolean,
      default: false,
    },

    reminder: {
      type: String,
      default: "No reminder",
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;