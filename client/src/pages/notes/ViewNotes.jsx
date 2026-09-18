import { useState } from "react";
import { ArrowLeft, BookOpen, Search, Sparkles, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import NoteCard from "../../components/ui/NoteCard";
import SelectedNote from "../../components/ui/SelectedNote";
import { useNoteStore } from "../../store/note.store";
import Swal from "sweetalert2";

const ViewNotes = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("all");
  const fetchNotes = useNoteStore((state) => state?.notes);
  const allNotes = Array.isArray(fetchNotes) ? fetchNotes : [];
  const displayNotes = allNotes.filter((note) => {
    if (activeFilter === "pinned") return note.isPinned === true;
    if (activeFilter === "favourites") return note.isFavourite === true;
    return true;
  });
  const selectedNote = displayNotes[selectedIndex] || displayNotes[0];
  const deleteAllNotes = useNoteStore((state) => state?.clearNotes);

  const handleDeleteAllNotes = async () => {
    try {
      const result = await Swal.fire({
        icon: "warning",
        title: "Delete all notes?",
        text: "All your notes will be permanently deleted. This action cannot be undone.",
        showCancelButton: true,
        confirmButtonText: "Yes, delete all",
        cancelButtonText: "Cancel",
        reverseButtons: true,
        focusCancel: true,
      });

      // User clicked Cancel
      if (!result.isConfirmed) {
        return;
      }

      // Delete all notes from Zustand
      await deleteAllNotes();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "All notes have been deleted successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete all notes error:", error);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong while deleting all notes.",
      });
    }
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setSelectedIndex(0);
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-ink font-sans text-lilac-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(122,38,255,0.16),transparent_32%),linear-gradient(rgba(173,96,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(173,96,255,0.035)_1px,transparent_1px)] bg-size-[auto,56px_56px,56px_56px]" />

      <div className="relative mx-auto max-w-360 px-4 py-6 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-lilac-400 transition hover:text-white"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>

          <Link
            to="/notes/create-note"
            className="inline-flex w-fit items-center gap-2 border border-violet-300 bg-violet-400 px-4 py-2.5 text-xs font-extrabold text-violet-950 shadow-[0_0_24px_rgba(199,116,255,0.18)] transition hover:bg-violet-300"
          >
            <Sparkles size={15} /> New note
          </Link>
        </div>

        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
              Library
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tighter text-white sm:text-4xl">
              View notes
            </h1>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-violet-300/15 bg-violet-950/40 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-lilac-500 sm:flex">
            <BookOpen size={12} className="text-violet-300" />
            {allNotes.length} saved
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-violet-300/15 bg-violet-950/30 px-3 py-3 shadow-[0_0_28px_rgba(127,48,183,0.06)]">
          <Search size={16} className="text-lilac-500" />
          <input
            disabled
            value="Search notes, tags, or content"
            className="w-full bg-transparent text-sm text-lilac-100 placeholder:text-lilac-600 focus:outline-none"
            aria-label="Search notes"
          />
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-lilac-400">
          {/* All Notes */}
          <button
            type="button"
            onClick={() => handleFilterChange("all")}
            className={`rounded-full border px-3 py-1.5 transition hover:border-violet-300/40 hover:bg-violet-400/15 ${
              activeFilter === "all"
                ? "border-violet-300/40 bg-violet-400/15 text-white"
                : "border-violet-300/20 bg-violet-400/10"
            }`}
          >
            All Notes{" "}
            <span className="text-violet-400">({allNotes.length})</span>
          </button>

          {/* Pinned */}
          <button
            type="button"
            onClick={() => handleFilterChange("pinned")}
            className={`rounded-full border px-3 py-1.5 transition hover:border-violet-300/30 hover:bg-violet-400/10 ${
              activeFilter === "pinned"
                ? "border-violet-300/40 bg-violet-400/15 text-white"
                : "border-violet-300/15 bg-violet-400/5"
            }`}
          >
            Pinned{" "}
            <span className="text-violet-400">
              ({allNotes.filter((note) => note.isPinned === true).length})
            </span>
          </button>

          {/* Favorites */}
          <button
            type="button"
            onClick={() => handleFilterChange("favourites")}
            className={`rounded-full border px-3 py-1.5 transition hover:border-violet-300/30 hover:bg-violet-400/10 ${
              activeFilter === "favourites"
                ? "border-violet-300/40 bg-violet-400/15 text-white"
                : "border-violet-300/15 bg-violet-400/5"
            }`}
          >
            Favorites{" "}
            <span>
              ({allNotes.filter((note) => note.isFavourite === true).length})
            </span>
          </button>

          {/* Delete All */}

          {allNotes.length > 0 ? (
            <button
              type="button"
              onClick={handleDeleteAllNotes}
              className="ml-auto flex items-center gap-2 rounded-full border border-red-300/20 bg-red-400/5 px-3 py-1.5 text-red-400 transition hover:border-red-300/40 hover:bg-red-400/10 hover:text-red-300"
            >
              <Trash size={14} />
              Delete All Notes
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="grid gap-6 xl:grid-cols-[minmax(300px,0.8fr)_minmax(0,1.2fr)]">
          <NoteCard
            notes={displayNotes}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
          <SelectedNote selectedNote={selectedNote} />
        </div>
      </div>
    </main>
  );
};

export default ViewNotes;
