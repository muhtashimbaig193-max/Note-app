import {
  ArrowUpRight,
  FileText,
  Hash,
  MoreHorizontal,
  Pin,
  Plus,
  Search,
  Sparkles,
  Star,
  Tag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNoteStore } from "../../store/note.store";
import Button from "../../components/ui/Button"; // adjust this path to wherever your Button lives

const getTextFromTipTap = (node) => {
  if (!node) return "";

  if (node.type === "text") {
    return node.text || "";
  }

  return Array.isArray(node.content)
    ? node.content.map(getTextFromTipTap).filter(Boolean).join(" ")
    : "";
};

const hexToRgba = (hex, alpha = 1) => {
  const cleanHex = (hex || "#8B5CF6").replace("#", "");

  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((character) => character + character)
          .join("")
      : cleanHex;

  const numeric = Number.parseInt(fullHex, 16);

  return `rgba(${(numeric >> 16) & 255}, ${
    (numeric >> 8) & 255
  }, ${numeric & 255}, ${alpha})`;
};

const formatDate = (date) => {
  if (!date) return "Just now";

  return new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
};

const StatCard = ({ icon: Icon, label, value, accent }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition duration-300 hover:-translate-y-0.5 hover:border-violet-400/25 hover:bg-white/[0.04]">
      <div
        className="absolute -right-8 -top-8 size-24 rounded-full opacity-10 blur-3xl transition duration-500 group-hover:opacity-20"
        style={{ background: accent }}
      />

      <div className="relative flex items-center justify-between">
        <span
          className="grid size-10 place-items-center rounded-xl border"
          style={{
            color: accent,
            borderColor: hexToRgba(accent, 0.25),
            background: hexToRgba(accent, 0.08),
          }}
        >
          <Icon size={18} />
        </span>

        <p className="text-3xl font-bold tracking-tight text-white">
          {value}
        </p>
      </div>

      <p className="relative mt-4 text-sm font-medium text-lilac-300">
        {label}
      </p>
    </div>
  );
};

const Home = () => {
  const storedNotes = useNoteStore((state) => state?.notes);
  const notes = Array.isArray(storedNotes) ? storedNotes : [];

  const recentNotes = [...notes]
    .sort(
      (first, second) =>
        new Date(second.updatedAt || second.createdAt || 0) -
        new Date(first.updatedAt || first.createdAt || 0)
    )
    .slice(0, 6);

  const pinnedNote = notes.find((note) => note.isPinned) || recentNotes[0];

  const favouriteCount = notes.filter((note) => note.isFavourite).length;
  const pinnedCount = notes.filter((note) => note.isPinned).length;

  const tagCounts = notes
    .flatMap((note) => note.tags || [])
    .reduce((counts, tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
      return counts;
    }, {});

  const popularTags = Object.entries(tagCounts)
    .sort(([, first], [, second]) => second - first)
    .slice(0, 6)
    .map(([tag]) => tag);

  const maxTagCount = Math.max(1, ...Object.values(tagCounts));

  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden bg-ink font-sans text-lilac-50">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 size-125 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 size-125 rounded-full bg-fuchsia-600/[0.06] blur-[120px]" />

        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(173,96,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(173,96,255,0.025) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <section className="relative mx-auto max-w-[1320px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* HERO */}
        <header className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-gradient-to-br from-violet-500/[0.10] via-white/[0.025] to-transparent p-6 sm:p-8 lg:p-10">
          <div className="absolute right-0 top-0 size-80 rounded-full bg-violet-500/[0.08] blur-[100px]" />

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/10 bg-violet-400/[0.06] px-3 py-1.5 text-xs font-semibold text-violet-300">
                <Sparkles size={13} />
                Your workspace
              </div>

              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                Make room for{" "}
                <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">
                  better thoughts.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-lilac-400 sm:text-base">
                A calm, structured home for the ideas you do not want to
                lose.
              </p>
            </div>

            <Button asChild size="lg" className="w-fit gap-2">
              <Link to="/notes/create-note">
                <Plus size={16} />
                New note
              </Link>
            </Button>
          </div>
        </header>

        {/* STATS */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <StatCard
            icon={FileText}
            label="Notes in your library"
            value={notes.length}
            accent="#8B5CF6"
          />

          <StatCard
            icon={Pin}
            label="Pinned for later"
            value={pinnedCount}
            accent="#D946EF"
          />

          <StatCard
            icon={Star}
            label="Marked as favorites"
            value={favouriteCount}
            accent="#F59E0B"
          />
        </div>

        {/* RECENT NOTES HEADER */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Recent notes
          </h2>

          <div className="flex items-center gap-3">
            <Link
              to="/notes/view-notes"
              className="hidden items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-lilac-500 transition hover:border-white/[0.14] hover:text-lilac-300 sm:flex"
            >
              <Search size={14} />
              Search your notes
            </Link>

            <Button asChild variant="ghost" size="sm" className="gap-1.5">
              <Link to="/notes/view-notes">
                View all
                <ArrowUpRight size={14} />
              </Link>
            </Button>
          </div>
        </div>

        {/* NOTE GRID */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recentNotes.length ? (
            recentNotes.map((note, index) => {
              const color = note.color || "#8B5CF6";

              const preview =
                getTextFromTipTap(note.description) ||
                note.preview ||
                "No preview available yet.";

              return (
                <Link
                  key={note._id || note.id || note.title || index}
                  to="/notes/view-notes"
                  className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#100c19]/80 p-5 transition duration-300 hover:-translate-y-1 hover:border-white/[0.14] hover:bg-[#15101f]"
                  style={{ boxShadow: `inset 2px 0 ${color}` }}
                >
                  <div
                    className="absolute -right-12 -top-12 size-32 rounded-full opacity-10 blur-3xl transition duration-500 group-hover:opacity-20"
                    style={{ background: color }}
                  />

                  <div className="relative flex items-start justify-between">
                    <span
                      className="grid size-10 place-items-center rounded-xl border"
                      style={{
                        color,
                        borderColor: hexToRgba(color, 0.3),
                        background: hexToRgba(color, 0.08),
                      }}
                    >
                      <FileText size={17} />
                    </span>

                    {note.isPinned ? (
                      <Pin size={16} className="rotate-45" style={{ color }} />
                    ) : (
                      <MoreHorizontal size={17} className="text-lilac-600" />
                    )}
                  </div>

                  <div className="relative mt-6 flex-1">
                    <div className="flex items-center gap-2 text-[11px] text-lilac-600">
                      <span>{note.notebook || "Personal"}</span>
                      <span className="size-1 rounded-full bg-lilac-700" />
                      <span>{formatDate(note.updatedAt)}</span>
                    </div>

                    <h3 className="mt-2 line-clamp-1 text-lg font-bold tracking-tight text-white transition group-hover:text-violet-200">
                      {note.title || "Untitled note"}
                    </h3>

                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-lilac-500">
                      {preview}
                    </p>
                  </div>

                  <div className="relative mt-5 flex items-center gap-2 border-t border-white/[0.06] pt-4 text-[11px] text-lilac-600">
                    <Tag size={12} />
                    {(note.tags || []).length
                      ? `${note.tags.length} tags`
                      : "No tags yet"}

                    <ArrowUpRight
                      size={13}
                      className="ml-auto opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                      style={{ color }}
                    />
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-violet-300/15 bg-violet-950/[0.12] px-6 py-16 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-violet-300/10 bg-violet-400/[0.06]">
                <FileText size={25} className="text-violet-300/70" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">
                Your library is waiting
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-lilac-500">
                Create your first note and start building your personal
                archive.
              </p>

              <Button asChild variant="secondary" size="sm" className="mt-6 gap-2">
                <Link to="/notes/create-note">
                  <Plus size={14} />
                  Create a note
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* FEATURED + TAGS */}
        <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
          {/* FEATURED NOTE */}
          {pinnedNote ? (
            <article className="group relative overflow-hidden rounded-2xl border border-violet-300/10 bg-gradient-to-br from-violet-950/40 via-[#100c19] to-[#100c19] p-6 sm:p-8">
              <div className="absolute -right-20 -top-20 size-72 rounded-full bg-violet-500/[0.08] blur-[90px]" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/10 bg-violet-400/[0.06] px-3 py-1.5 text-xs font-semibold text-violet-300">
                    <Pin size={12} className="rotate-45" />
                    {pinnedNote.isPinned ? "Pinned note" : "Latest note"}
                  </div>

                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontal size={18} />
                  </Button>
                </div>

                <p className="mt-4 text-xs text-lilac-600">
                  Updated {formatDate(pinnedNote.updatedAt)} &middot;{" "}
                  {pinnedNote.notebook || "Personal"}
                </p>

                <h2 className="mt-3 max-w-2xl text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {pinnedNote.title || "Untitled note"}
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-lilac-300">
                  {getTextFromTipTap(pinnedNote.description) ||
                    pinnedNote.preview ||
                    "This note is waiting for its first words."}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-5">
                  {(pinnedNote.tags || []).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-violet-300/10 bg-violet-400/[0.06] px-2.5 py-1.5 text-[11px] text-violet-200"
                    >
                      <Hash size={12} />
                      {tag}
                    </span>
                  ))}

                  <Button asChild variant="outline" size="sm" className="ml-auto gap-1.5">
                    <Link to="/notes/view-notes">
                      Open note
                      <ArrowUpRight size={13} />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ) : (
            <div className="flex flex-col items-start rounded-2xl border border-violet-300/10 bg-violet-950/20 p-7">
              <div className="grid size-10 place-items-center rounded-xl bg-violet-400/10 text-violet-300">
                <Pin size={17} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-white">
                Pin a thought worth returning to.
              </h2>

              <p className="mt-3 text-sm leading-6 text-lilac-500">
                Your featured note will live here.
              </p>

              <Button asChild variant="secondary" size="sm" className="mt-5 gap-2">
                <Link to="/notes/create-note">
                  <Plus size={14} />
                  Write your first note
                </Link>
              </Button>
            </div>
          )}

          {/* POPULAR TAGS */}
          <aside className="rounded-2xl border border-white/[0.07] bg-[#100c19]/70 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Popular tags</h2>

              <span className="grid size-9 place-items-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-lilac-600">
                <Tag size={16} />
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              {popularTags.length ? (
                popularTags.map((tag) => (
                  <a
                    key={tag}
                    href={`#${tag}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-sm text-lilac-300 transition hover:border-violet-300/25 hover:bg-violet-400/10 hover:text-white"
                  >
                    <span className="text-violet-400"># </span>
                    <span className="flex-1 truncate">{tag}</span>

                    <span className="h-1 w-10 overflow-hidden rounded-full bg-white/[0.06]">
                      <span
                        className="block h-full rounded-full bg-violet-400 transition-all"
                        style={{
                          width: `${
                            (tagCounts[tag] / maxTagCount) * 100
                          }%`,
                        }}
                      />
                    </span>
                  </a>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-white/[0.07] p-4 text-xs text-lilac-600">
                  Tags will appear as you write.
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Home;
