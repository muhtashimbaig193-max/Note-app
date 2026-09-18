import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  ListTodo,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  Minus,
  Undo2,
  Redo2,
  Strikethrough,
} from "lucide-react";

const Toolbar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const buttons = [
    {
      label: "Bold",
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },

    {
      label: "Italic",
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },

    {
      label: "Underline",
      icon: UnderlineIcon,
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
    },

    {
      label: "Strike",
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
    },

    {
      label: "Heading 1",
      icon: Heading1,
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      active: editor.isActive("heading", { level: 1 }),
    },

    {
      label: "Heading 2",
      icon: Heading2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
    },

    {
      label: "Heading 3",
      icon: Heading3,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: editor.isActive("heading", { level: 3 }),
    },

    {
      label: "Bulleted list",
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },

    {
      label: "Numbered list",
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-1 border-y border-violet-300/10 py-2 text-lilac-500">
      {/* Formatting */}
      {buttons.slice(0, 4).map(({ label, icon: Icon, action, active }) => (
        <button
          key={label}
          type="button"
          onClick={action}
          aria-label={label}
          title={label}
          className={`grid size-8 place-items-center transition ${
            active
              ? "bg-violet-400/20 text-violet-300"
              : "hover:bg-violet-400/10 hover:text-white"
          }`}
        >
          <Icon size={15} />
        </button>
      ))}

      <span className="mx-2 h-5 w-px bg-violet-300/10" />

      {/* Headings */}
      {buttons.slice(4, 7).map(({ label, icon: Icon, action, active }) => (
        <button
          key={label}
          type="button"
          onClick={action}
          aria-label={label}
          title={label}
          className={`grid size-8 place-items-center transition ${
            active
              ? "bg-violet-400/20 text-violet-300"
              : "hover:bg-violet-400/10 hover:text-white"
          }`}
        >
          <Icon size={15} />
        </button>
      ))}

      <span className="mx-2 h-5 w-px bg-violet-300/10" />

      {/* Lists */}
      {buttons.slice(7, 10).map(({ label, icon: Icon, action, active }) => (
        <button
          key={label}
          type="button"
          onClick={action}
          aria-label={label}
          title={label}
          className={`grid size-8 place-items-center transition ${
            active
              ? "bg-violet-400/20 text-violet-300"
              : "hover:bg-violet-400/10 hover:text-white"
          }`}
        >
          <Icon size={15} />
        </button>
      ))}

      <span className="mx-2 h-5 w-px bg-violet-300/10" />

      {/* Undo */}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        aria-label="Undo"
        title="Undo"
        className="grid size-8 place-items-center transition hover:bg-violet-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Undo2 size={15} />
      </button>

      {/* Redo */}
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        aria-label="Redo"
        title="Redo"
        className="grid size-8 place-items-center transition hover:bg-violet-400/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        <Redo2 size={15} />
      </button>

      <span className="mx-2 h-5 w-px bg-violet-300/10" />

      <span className="text-[10px] text-lilac-600">Rich text</span>
    </div>
  );
};

export default Toolbar;
