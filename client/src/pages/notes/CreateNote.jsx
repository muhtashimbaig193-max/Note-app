import { useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  FileText,
  Hash,
  Pin,
  Sparkles,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import Editor from "../../components/TipTap/Editor";
import { createNote } from "../../api/note.api";
import Swal from "sweetalert2";
import { useNoteStore } from "../../store/note.store";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

const colorOptions = [
  {
    name: "Violet",
    value: "violet",
    colorCode: "#8B5CF6",
    accent: "bg-violet-500",
  },
  {
    name: "Fuchsia",
    value: "fuchsia",
    colorCode: "#D946EF",
    accent: "bg-fuchsia-500",
  },
  {
    name: "Cyan",
    value: "cyan",
    colorCode: "#06B6D4",
    accent: "bg-cyan-500",
  },
  {
    name: "Amber",
    value: "amber",
    colorCode: "#F59E0B",
    accent: "bg-amber-500",
  },
  {
    name: "Rose",
    value: "rose",
    colorCode: "#F43F5E",
    accent: "bg-rose-500",
  },
  {
    name: "Emerald",
    value: "emerald",
    colorCode: "#10B981",
    accent: "bg-emerald-500",
  },
];

const CreateNote = () => {
  const addNote = useNoteStore((state) => state?.addNote);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    notebook: "Personal",
    mood: "Focused",
    color: "violet",
    isPinned: false,
    isFavourite: false,
    reminder: "No reminder",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createNote({
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      Swal.fire({
        icon: "success",
        title: "Note Created!",
        text: response?.message || "Your note has been created successfully.",
        showConfirmButton: true,
        confirmButtonText: "View Note",
        timer: 2000,
        timerProgressBar: true,
      });

      // Store the complete note returned by MongoDB
      addNote({
        ...response.note,
        id: response.note._id,
      });

      setFormData({
        title: "",
        description: "",
        tags: "",
        notebook: "Personal",
        mood: "Focused",
        color: "violet",
        isPinned: false,
        isFavourite: false,
        reminder: "No reminder",
      });

      navigate("/notes/view-notes");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Create Note",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again.",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-ink font-sans text-lilac-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(122,38,255,0.16),transparent_36%),linear-gradient(rgba(173,96,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(173,96,255,0.035)_1px,transparent_1px)] bg-size-[auto,56px_56px,56px_56px]" />
      <div className="relative mx-auto max-w-300 px-5 py-7 sm:px-8 sm:py-10 lg:px-12">
        <div className="mb-9 flex items-center justify-between gap-4">
          <Link
            className="inline-flex items-center gap-2 text-xs font-bold text-lilac-400 transition hover:text-white"
            to="/"
          >
            <ArrowLeft size={16} /> Back to notes
          </Link>
          <span className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-lilac-600 sm:flex">
            <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#c774ff]" />
            Draft in progress
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_250px]">
            <section className="border border-violet-300/15 bg-violet-950/25 shadow-[0_0_42px_rgba(127,48,183,0.1)]">
              <div className="border-b border-violet-300/10 px-5 py-4 sm:px-8">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                  <FileText size={14} /> New note
                </div>
              </div>
              <div className="px-5 py-7 sm:px-10 sm:py-10">
                <input
                  className="w-full bg-transparent text-3xl font-extrabold tracking-[-0.04em] text-white outline-none placeholder:text-lilac-600 sm:text-4xl"
                  placeholder="Give your note a title"
                  aria-label="Note title"
                  value={formData?.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  autoFocus
                />
                <div className="mt-8 flex flex-wrap items-center gap-1 border-y border-violet-300/10 py-2 text-lilac-500">
                  <span className="mx-2 h-5 w-px bg-violet-300/10" />
                  <span className="text-[10px] text-lilac-600">
                    Markdown supported
                  </span>
                </div>
                <Editor
                  value={formData.description}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-3 border-t border-violet-300/10 px-5 py-4 text-[10px] text-lilac-600 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <Button variant="secondary" link="/notes/view-notes">View Notes</Button>
                <span className="flex items-center gap-1.5">
                  <Sparkles size={12} className="text-violet-300" /> Autosave is
                  on
                </span>
              </div>
            </section>

            <aside className="space-y-4">
              <div className="border border-violet-300/15 bg-violet-950/25 p-5">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-lilac-600">
                  Organize
                </p>

                <label className="text-xs text-lilac-400" htmlFor="notebook">
                  Notebook
                </label>
                <div className="relative mt-2">
                  <select
                    className="h-11 w-full appearance-none border border-violet-300/15 bg-ink-900 px-3 text-xs text-lilac-200 outline-none focus:border-violet-400/60"
                    id="notebook"
                    value={formData.notebook}
                    onChange={(e) =>
                      setFormData({ ...formData, notebook: e.target.value })
                    }
                  >
                    <option>Personal</option>
                    <option>Work</option>
                    <option>Reading list</option>
                    <option>Travel</option>
                    <option>Ideas</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-3 text-lilac-500"
                    size={15}
                  />
                </div>

                <label
                  className="mt-4 block text-xs text-lilac-400"
                  htmlFor="mood"
                >
                  Mood
                </label>
                <div className="relative mt-2">
                  <select
                    className="h-11 w-full appearance-none border border-violet-300/15 bg-ink-900 px-3 text-xs text-lilac-200 outline-none focus:border-violet-400/60"
                    id="mood"
                    value={formData.mood}
                    onChange={(e) =>
                      setFormData({ ...formData, mood: e.target.value })
                    }
                  >
                    <option>Focused</option>
                    <option>Creative</option>
                    <option>Reflective</option>
                    <option>Calm</option>
                    <option>Inspired</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-3 text-lilac-500"
                    size={15}
                  />
                </div>

                <label
                  className="mt-4 block text-xs text-lilac-400"
                  htmlFor="color"
                >
                  Color
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      aria-label={`Select ${option.name} note color`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          color: option.colorCode,
                        }))
                      }
                      className={`h-7 w-7 rounded-full border-2 transition ${
                        formData.color === option.colorCode
                          ? "border-white scale-110"
                          : "border-transparent"
                      } ${option.accent}`}
                    />
                  ))}
                </div>

                <label
                  className="mt-6 block text-xs text-lilac-400"
                  htmlFor="tags"
                >
                  Tags
                </label>
                <div className="relative mt-2">
                  <Hash
                    className="absolute left-3 top-3 text-lilac-600"
                    size={14}
                  />
                  <input
                    className="h-11 w-full border border-violet-300/15 bg-ink-900 pl-9 pr-3 text-xs text-lilac-200 outline-none placeholder:text-lilac-600 focus:border-violet-400/60"
                    id="tags"
                    placeholder="ideas, work, plans"
                    value={formData?.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                  />
                </div>

                <label
                  className="mt-4 block text-xs text-lilac-400"
                  htmlFor="reminder"
                >
                  Reminder
                </label>
                <div className="relative mt-2">
                  <input
                    className="h-11 w-full border border-violet-300/15 bg-ink-900 px-3 text-xs text-lilac-200 outline-none placeholder:text-lilac-600 focus:border-violet-400/60"
                    id="reminder"
                    placeholder="No reminder"
                    value={formData.reminder}
                    onChange={(e) =>
                      setFormData({ ...formData, reminder: e.target.value })
                    }
                  />
                </div>

                <div className="mt-4 space-y-2">
                  <button
                    className={`flex w-full items-center justify-between gap-3 border px-3 py-3 text-xs transition ${
                      formData.isPinned
                        ? "border-violet-400/50 bg-violet-400/10 text-violet-200"
                        : "border-violet-300/15 bg-ink-900 text-lilac-300"
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        isPinned: !prev.isPinned,
                      }))
                    }
                    type="button"
                  >
                    <span className="flex items-center gap-2">
                      <Pin size={15} className="rotate-45" /> Pinned to top
                    </span>
                  </button>

                  <button
                    className={`flex w-full items-center justify-between gap-3 border px-3 py-3 text-xs transition ${
                      formData.isFavourite
                        ? "border-violet-400/50 bg-violet-400/10 text-violet-200"
                        : "border-violet-300/15 bg-ink-900 text-lilac-300"
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        isFavourite: !prev.isFavourite,
                      }))
                    }
                    type="button"
                  >
                    <span className="flex items-center gap-2">
                      <Star
                        size={15}
                        fill={formData.isFavourite ? "currentColor" : "none"}
                      />
                      Favorite note
                    </span>
                  </button>
                </div>
              </div>

              <button
                className="flex w-full items-center justify-center gap-2 border border-violet-400/50 bg-violet-400/10 px-3 py-3 text-xs font-bold uppercase tracking-[0.18em] text-violet-200 transition hover:bg-violet-400/20"
                type="submit"
              >
                <Check size={16} /> Save note
              </button>

              <Link
                className="block text-center text-xs text-lilac-600 transition hover:text-lilac-300"
                to="/"
              >
                Discard and return
              </Link>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateNote;
