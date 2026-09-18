import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

import "./tiptap.css";
import Toolbar from "./Toolbar";

const Editor = ({ onChange, value }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
    ],

    content: value || "",

    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <Toolbar editor={editor} />

      <EditorContent
        editor={editor}
        className="tiptap-editor mt-7 px-5 text-sm text-lilac-200 border border-violet-300/10"
      />
    </div>
  );
};
export default Editor;
