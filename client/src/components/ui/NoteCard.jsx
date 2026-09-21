import { FileText, FolderOpen, Pin, Star, Tag } from "lucide-react";

const getTextFromTipTap = (node) => {
  if (!node) return "";

  if (node.type === "text") {
    return node.text || "";
  }

  if (node.content) {
    return node.content.map(getTextFromTipTap).join(" ");
  }

  return "";
};

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

  // Invalid hex value
  if (Number.isNaN(numeric)) {
    return `rgba(139, 92, 246, ${alpha})`;
  }

  const r = (numeric >> 16) & 255;
  const g = (numeric >> 8) & 255;
  const b = numeric & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const NoteCard = ({
  notes = [],
  selectedIndex = 0,
  onSelect,
}) => {
  const noteList = Array.isArray(notes) ? notes : [];

  const sortedNotes = [...noteList].sort((a, b) => {
    return (
      Number(b?.isPinned === true) -
      Number(a?.isPinned === true)
    );
  });

  return (
    <aside className="space-y-4">
      {sortedNotes.length > 0 ? (
        sortedNotes.map((note) => {
          const descriptionText = getTextFromTipTap(
            note?.description
          );

          // Find the original index before sorting
          const originalIndex = noteList.findIndex(
            (item) => item?._id === note?._id
          );

          const isSelected = originalIndex === selectedIndex;

          const color = note?.color || "#8B5CF6";

          return (
            <div
              key={note?._id || originalIndex}
              onClick={() => onSelect?.(originalIndex)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  onSelect?.(originalIndex);
                }
              }}
              className={`w-full rounded-2xl border p-4 text-left transition-all duration-200 ${
                isSelected
                  ? "shadow-[0_0_28px_rgba(127,48,183,0.14)]"
                  : "hover:-translate-y-1.25"
              }`}
              style={{
                cursor: "pointer",
                borderColor: color,
                background: `linear-gradient(
                  135deg,
                  ${hexToRgba(
                    color,
                    isSelected ? 0.2 : 0.16
                  )},
                  rgba(13, 18, 33, 0.92)
                )`,
                boxShadow: isSelected
                  ? `0 0 0 1px ${hexToRgba(color, 0.4)}`
                  : "none",
              }}
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between gap-3">
                <div
                  className="rounded-xl border px-2 py-1.5"
                  style={{
                    borderColor: hexToRgba(color, 0.5),
                    background: hexToRgba(color, 0.12),
                    color,
                  }}
                >
                  <FileText size={16} />
                </div>

                <div className="flex items-center gap-2">
                  {note?.isFavourite && (
                    <span
                      className="rounded-full border p-1"
                      style={{
                        borderColor: hexToRgba(color, 0.5),
                        background: hexToRgba(color, 0.12),
                        color,
                      }}
                    >
                      <Star
                        size={12}
                        fill="currentColor"
                      />
                    </span>
                  )}

                  {note?.isPinned ? (
                    <Pin
                      size={15}
                      className="rotate-45"
                      style={{ color }}
                    />
                  ) : (
                    <span className="text-[10px] uppercase tracking-[0.18em] text-lilac-600">
                      {note?.category || "Note"}
                    </span>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="mb-3 flex items-center justify-between gap-2">
                <span
                  className="rounded-full border px-2 py-1 text-[10px] uppercase tracking-[0.16em]"
                  style={{
                    borderColor: hexToRgba(color, 0.5),
                    background: hexToRgba(color, 0.08),
                    color,
                  }}
                >
                  {note?.status || "Open"}
                </span>

                <span className="text-[10px] uppercase tracking-[0.18em] text-lilac-500">
                  {note?.mood || "Focused"}
                </span>
              </div>

              {/* Title */}
              <h2 className="line-clamp-2 text-lg font-bold text-white">
                {note?.title || "Untitled Note"}
              </h2>

              {/* Description */}
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-lilac-400">
                {descriptionText ||
                  note?.preview ||
                  "No description"}
              </p>

              {/* Date / Tags */}
              <div className="mt-4 flex items-center justify-between text-[10px] text-lilac-600">
                <span>
                  {note?.createdAt
                    ? new Date(
                        note.createdAt
                      ).toLocaleDateString()
                    : "Just now"}
                </span>

                <span className="flex items-center gap-1">
                  <Tag size={12} />
                  {Array.isArray(note?.tags)
                    ? note.tags.length
                    : 0}
                </span>
              </div>

              {/* Notebook / Word Count */}
              <div className="mt-4 flex items-center justify-between border-t border-violet-300/10 pt-3 text-[10px] text-lilac-500">
                <span className="flex items-center gap-1.5">
                  <FolderOpen size={12} />
                  {note?.notebook || "General"}
                </span>

                <span>
                  {note?.wordCount || 0} words
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="py-10 text-center text-sm text-lilac-500">
          No Notes Yet
        </div>
      )}
    </aside>
  );
};

export default NoteCard;