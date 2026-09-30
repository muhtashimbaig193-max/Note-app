import { useState } from "react";

import {
  BellRing,
  Hash,
  MoreHorizontal,
  Pencil,
  Pin,
  Sparkles,
  Star,
  Trash2,
} from "lucide-react";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { useNoteStore } from "../../store/note.store";
import { deleteNoteById } from "../../api/note.api";

const hexToRgba = (hex, alpha = 1) => {
  if (!hex) {
    return `rgba(139, 92, 246, ${alpha})`;
  }

  const cleanHex = hex.replace("#", "");

  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((char) => char + char)
          .join("")
      : cleanHex;

  const numeric = Number.parseInt(fullHex, 16);

  const r = (numeric >> 16) & 255;
  const g = (numeric >> 8) & 255;
  const b = numeric & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getTextFromTipTap = (node) => {
  if (!node) { 
    return "";
  }

  if (node.type === "text") {
    return node.text || "";
  }

  if (Array.isArray(node.content)) {
    return node.content.map(getTextFromTipTap).filter(Boolean).join(" ");
  }

  return "";
};

const SelectedNote = ({ selectedNote = null }) => {
  const navigate = useNavigate();
  const deleteNote = useNoteStore((state) => state.deleteNote);

  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!selectedNote) {
    return null;
  }

  const color = selectedNote?.color || "#8B5CF6";

  /*
    MongoDB uses _id.

    If your frontend transforms _id -> id, this also supports id.
  */
  const noteId = selectedNote?._id || selectedNote?.id;

  /*
    Your backend uses tags as an array.
  */
  const tags = Array.isArray(selectedNote?.tags) ? selectedNote.tags : [];

  /*
    Your note description is TipTap JSON.
  */
  const descriptionText = getTextFromTipTap(selectedNote?.description);

  /*
    Delete note
  */
  const handleDeleteNote = async () => {
    if (!noteId) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Note ID was not found.",
      });

      return;
    }

    /*
      Ask user for confirmation first.
    */
    const confirmation = await Swal.fire({
      icon: "warning",
      title: "Delete this note?",
      text: "This action cannot be undone.",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) {
      return;
    }

    try {
      setIsDeleting(true);

      const response = await deleteNoteById(noteId);

      /*
        Update Zustand only after backend deletion succeeds.
      */
      deleteNote(noteId);

      setIsActionsOpen(false);

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: response?.message || "Note deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete note error:", error);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while deleting the note.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article
      className="rounded-3xl border p-6 shadow-[0_0_32px_rgba(127,48,183,0.09)] sm:p-8"
      style={{
        borderColor: hexToRgba(color, 0.45),
        background: `linear-gradient(
          135deg,
          ${hexToRgba(color, 0.15)},
          rgba(17, 24, 39, 0.92)
        )`,
      }}
    >
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 border-b border-violet-300/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>   
          {/* Category / Status */}
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
              {selectedNote?.category || "Note"} 
            </p>

            {selectedNote?.isPinned ? (
              <span
                className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.18em]"
                style={{
                  borderColor: hexToRgba(color, 0.4),
                  background: hexToRgba(color, 0.12),
                  color,
                }}
              >
                <Pin size={10} className="rotate-45" />
                pinned
              </span>
            ) : null}
  
            {selectedNote?.isFavourite ? (
              <span
                className="inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.18em]"
                style={{
                  borderColor: hexToRgba(color, 0.4),
                  background: hexToRgba(color, 0.12),
                  color,
                }}
              >
                <Star size={10} fill="currentColor" />
                favorite
              </span>
            ) : null}
          </div>

          {/* Title */}
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-white">
            {selectedNote?.title || "Untitled Note"}
          </h2>
        </div>

        {/* Actions */}
        <div className="relative flex items-center gap-2 text-[11px] text-lilac-500">
          <span>
            {selectedNote?.createdAt
              ? new Date(selectedNote.createdAt).toLocaleDateString()
              : "Just now"}
          </span>

          <button
            type="button"
            aria-label="Toggle note actions"
            aria-expanded={isActionsOpen}
            onClick={() => setIsActionsOpen((isOpen) => !isOpen)}
            className="rounded-lg p-1.5 text-lilac-400 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-300/50"
          >
            <MoreHorizontal size={17} />
          </button>

          {isActionsOpen ? (
            <div className="absolute right-0 top-9 z-10 min-w-36 rounded-xl border border-violet-300/20 bg-[#171329] p-1.5 shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
              {/* Edit */}
              <button
                type="button"
                onClick={() => {
                  setIsActionsOpen(false);
                  navigate(`/notes/edit-note/${noteId}`, {
                    state: { note: selectedNote },
                  });
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-lilac-200 transition hover:bg-violet-400/10 hover:text-white"
              >
                <Pencil size={14} />
                Edit note
              </button>

              {/* Delete */}
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDeleteNote}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-rose-300 transition hover:bg-rose-400/10 hover:text-rose-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 size={14} />

                {isDeleting ? "Deleting..." : "Delete note"}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Metadata */}
      <div className="mb-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-lilac-400">
        <span className="rounded-full border border-violet-300/15 bg-violet-400/5 px-2.5 py-1.5">
          {selectedNote?.notebook || "Personal"}
        </span>

        <span className="rounded-full border border-violet-300/15 bg-violet-400/5 px-2.5 py-1.5">
          {selectedNote?.mood || "Focused"}
        </span>

        <span className="rounded-full border border-violet-300/15 bg-violet-400/5 px-2.5 py-1.5">
          {selectedNote?.status || "Open"}
        </span>
      </div>

      {/* Description */}
      <div className="space-y-5 text-sm leading-7 text-lilac-200">
        {descriptionText ? (
          descriptionText
            .split(/\n+/)
            .filter(Boolean)
            .map((paragraph, index) => <p key={index}>{paragraph}</p>)
        ) : (
          <p className="text-lilac-500">No description available.</p>
        )}
      </div>

      {/* Statistics */}
      <div className="mt-8 grid gap-3 border-t border-violet-300/10 pt-5 sm:grid-cols-3">
        {/* Words */}
        <div className="rounded-2xl border border-violet-300/10 bg-violet-500/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-lilac-600">
            Words
          </p>

          <p className="mt-2 text-lg font-bold text-white">
            {selectedNote?.wordCount ?? 0}
          </p>
        </div>

        {/* Colour */}
        <div className="rounded-2xl border border-violet-300/10 bg-violet-500/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-lilac-600">
            Colour
          </p>

          <div className="mt-2 flex items-center gap-2">
            <span
              className="h-4 w-4 rounded-full border border-white/20"
              style={{
                backgroundColor: color,
              }}
            />

            <p className="text-lg font-bold capitalize text-white">
              {selectedNote?.color || "violet"}
            </p>
          </div>
        </div>

        {/* Reminder */}
        <div className="rounded-2xl border border-violet-300/10 bg-violet-500/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.18em] text-lilac-600">
            Reminder
          </p>

          <p className="mt-2 text-sm font-semibold text-white">
            {selectedNote?.reminder || "No reminder"}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-8 border-t border-violet-300/10 pt-5">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-lilac-600">
          <Hash size={12} className="text-violet-300" />
          Tags
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.length > 0 ? (
            tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className="rounded-full border border-violet-300/15 bg-violet-500/5 px-2.5 py-1 text-[11px] text-violet-200"
              >
                #{tag}
              </span>
            ))
          ) : (
            <span className="text-xs text-lilac-600">No tags</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-violet-300/10 pt-4 text-[10px] uppercase tracking-[0.18em] text-lilac-500">
        <span className="inline-flex items-center gap-2">
          <BellRing size={12} className="text-violet-300" />
          {selectedNote.reminder || ""}
        </span>

        <span className="inline-flex items-center gap-2">
          <Sparkles size={12} className="text-violet-300" />
          theme
        </span>
      </div>
    </article>
  );
};

export default SelectedNote;
