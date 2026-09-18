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
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Editor from "../../components/TipTap/Editor";
import { updateNote } from "../../api/note.api";
import { useNoteStore } from "../../store/note.store";

const colorOptions = [
  { name: "Violet", colorCode: "#8B5CF6", accent: "bg-violet-500" },
  { name: "Fuchsia", colorCode: "#D946EF", accent: "bg-fuchsia-500" },
  { name: "Cyan", colorCode: "#06B6D4", accent: "bg-cyan-500" },
  { name: "Amber", colorCode: "#F59E0B", accent: "bg-amber-500" },
  { name: "Rose", colorCode: "#F43F5E", accent: "bg-rose-500" },
  { name: "Emerald", colorCode: "#10B981", accent: "bg-emerald-500" },
];

const getDescription = (description) => description || "";

const getInitialFormData = (note) => ({
  title: note?.title || "",
  description: getDescription(note?.description),
  tags: Array.isArray(note?.tags) ? note.tags.join(", ") : note?.tags || "",
  notebook: note?.notebook || "Personal",
  mood: note?.mood || "Focused",
  color: note?.color || "#8B5CF6",
  isPinned: Boolean(note?.isPinned),
  isFavourite: Boolean(note?.isFavourite),
  reminder: note?.reminder || "No reminder",
});

const EditNote = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const note = state?.note;
  const updateStoredNote = useNoteStore((store) => store.updateNote);
  const [formData, setFormData] = useState(() => getInitialFormData(note));
  const [isSaving, setIsSaving] = useState(false);

  const setField = (field, value) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const response = await updateNote(id, {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      const updatedNote = response?.note || {
        ...note,
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      };

      updateStoredNote(updatedNote);
      await Swal.fire({
        icon: "success",
        title: "Note updated",
        text: response?.message || "Your note has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/notes/view-notes");
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Update failed",
        text: error?.response?.data?.message || error?.message || "Unable to update this note.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-ink font-sans text-lilac-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(122,38,255,0.16),transparent_36%),linear-gradient(rgba(173,96,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(173,96,255,0.035)_1px,transparent_1px)] bg-size-[auto,56px_56px,56px_56px]" />
      <div className="relative mx-auto max-w-300 px-5 py-7 sm:px-8 sm:py-10 lg:px-12">
        <div className="mb-9 flex items-center justify-between gap-4">
          <Link className="inline-flex items-center gap-2 text-xs font-bold text-lilac-400 transition hover:text-white" to="/notes/view-notes">
            <ArrowLeft size={16} /> Back to notes
          </Link>
          <span className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-lilac-600 sm:flex">
            <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#c774ff]" /> Editing note
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_250px]">
            <section className="border border-violet-300/15 bg-violet-950/25 shadow-[0_0_42px_rgba(127,48,183,0.1)]">
              <div className="border-b border-violet-300/10 px-5 py-4 sm:px-8">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                  <FileText size={14} /> Edit note
                </div>
              </div>
              <div className="px-5 py-7 sm:px-10 sm:py-10">
                <input
                  className="w-full bg-transparent text-3xl font-extrabold tracking-tighter text-white outline-none placeholder:text-lilac-600 sm:text-4xl"
                  placeholder="Give your note a title"
                  aria-label="Note title"
                  value={formData.title}
                  onChange={(event) => setField("title", event.target.value)}
                  required
                  autoFocus
                />
                <div className="mt-8 flex flex-wrap items-center gap-1 border-y border-violet-300/10 py-2 text-lilac-500">
                  <span className="mx-2 h-5 w-px bg-violet-300/10" />
                  <span className="text-[10px] text-lilac-600">Markdown supported</span>
                </div>
                <Editor value={formData.description} onChange={(value) => setField("description", value)} />
              </div>
              <div className="flex border-t border-violet-300/10 px-5 py-4 text-[10px] text-lilac-600 sm:px-8">
                <span className="flex items-center gap-1.5"><Sparkles size={12} className="text-violet-300" /> Changes are saved when submitted</span>
              </div>
            </section>

            <aside className="space-y-4">
              <div className="border border-violet-300/15 bg-violet-950/25 p-5">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-lilac-600">Organize</p>

                <label className="text-xs text-lilac-400" htmlFor="notebook">Notebook</label>
                <div className="relative mt-2">
                  <select id="notebook" value={formData.notebook} onChange={(event) => setField("notebook", event.target.value)} className="h-11 w-full appearance-none border border-violet-300/15 bg-ink-900 px-3 text-xs text-lilac-200 outline-none focus:border-violet-400/60">
                    <option>Personal</option><option>Work</option><option>Reading list</option><option>Travel</option><option>Ideas</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3 text-lilac-500" size={15} />
                </div>

                <label className="mt-4 block text-xs text-lilac-400" htmlFor="mood">Mood</label>
                <div className="relative mt-2">
                  <select id="mood" value={formData.mood} onChange={(event) => setField("mood", event.target.value)} className="h-11 w-full appearance-none border border-violet-300/15 bg-ink-900 px-3 text-xs text-lilac-200 outline-none focus:border-violet-400/60">
                    <option>Focused</option><option>Creative</option><option>Reflective</option><option>Calm</option><option>Inspired</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-3 text-lilac-500" size={15} />
                </div>

                <label className="mt-4 block text-xs text-lilac-400" htmlFor="color">Color</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {colorOptions.map((option) => (
                    <button key={option.colorCode} type="button" aria-label={`Select ${option.name} note color`} onClick={() => setField("color", option.colorCode)} className={`h-7 w-7 rounded-full border-2 transition ${formData.color === option.colorCode ? "scale-110 border-white" : "border-transparent"} ${option.accent}`} />
                  ))}
                </div>

                <label className="mt-6 block text-xs text-lilac-400" htmlFor="tags">Tags</label>
                <div className="relative mt-2">
                  <Hash className="absolute left-3 top-3 text-lilac-600" size={14} />
                  <input id="tags" className="h-11 w-full border border-violet-300/15 bg-ink-900 pl-9 pr-3 text-xs text-lilac-200 outline-none placeholder:text-lilac-600 focus:border-violet-400/60" placeholder="ideas, work, plans" value={formData.tags} onChange={(event) => setField("tags", event.target.value)} />
                </div>

                <label className="mt-4 block text-xs text-lilac-400" htmlFor="reminder">Reminder</label>
                <input id="reminder" className="mt-2 h-11 w-full border border-violet-300/15 bg-ink-900 px-3 text-xs text-lilac-200 outline-none placeholder:text-lilac-600 focus:border-violet-400/60" placeholder="No reminder" value={formData.reminder} onChange={(event) => setField("reminder", event.target.value)} />

                <div className="mt-4 space-y-2">
                  <button type="button" onClick={() => setField("isPinned", !formData.isPinned)} className={`flex w-full items-center gap-3 border px-3 py-3 text-xs transition ${formData.isPinned ? "border-violet-400/50 bg-violet-400/10 text-violet-200" : "border-violet-300/15 bg-ink-900 text-lilac-300"}`}>
                    <Pin size={15} className="rotate-45" /> Pinned to top
                  </button>
                  <button type="button" onClick={() => setField("isFavourite", !formData.isFavourite)} className={`flex w-full items-center gap-3 border px-3 py-3 text-xs transition ${formData.isFavourite ? "border-violet-400/50 bg-violet-400/10 text-violet-200" : "border-violet-300/15 bg-ink-900 text-lilac-300"}`}>
                    <Star size={15} fill={formData.isFavourite ? "currentColor" : "none"} /> Favorite note
                  </button>
                </div>
              </div>

              <button disabled={isSaving} className="flex w-full items-center justify-center gap-2 border border-violet-400/50 bg-violet-400/10 px-3 py-3 text-xs font-bold uppercase tracking-[0.18em] text-violet-200 transition hover:bg-violet-400/20" type="submit">
                <Check size={16} /> {isSaving ? "Saving..." : "Save changes"}
              </button>
              <Link className="block text-center text-xs text-lilac-600 transition hover:text-lilac-300" to="/notes/view-notes">Cancel and return</Link>
            </aside>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditNote;