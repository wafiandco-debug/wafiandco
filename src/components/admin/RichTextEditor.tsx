"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { useEffect } from "react";
import { FontSize } from "./FontSizeExtension";

const FONT_FAMILIES = [
  { label: "Default", value: "" },
  { label: "Serif", value: "Georgia, serif" },
  { label: "Sans-serif", value: "Arial, Helvetica, sans-serif" },
  { label: "Monospace", value: "'Courier New', monospace" },
];

const FONT_SIZES = [
  { label: "Default", value: "" },
  { label: "Small", value: "14px" },
  { label: "Normal", value: "16px" },
  { label: "Large", value: "20px" },
  { label: "X-Large", value: "24px" },
  { label: "XX-Large", value: "32px" },
];

const COLORS = [
  "#16171b",
  "#ee741e",
  "#cf9a3f",
  "#1d4ed8",
  "#15803d",
  "#b91c1c",
  "#7c3aed",
];

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm font-medium transition-colors ${
        active ? "bg-navy text-white" : "text-navy/70 hover:bg-navy/10"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-lg border border-b-0 border-navy/20 bg-navy/[0.03] p-2">
      <select
        title="Font family"
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => {
          const value = e.target.value;
          if (value) editor.chain().focus().setFontFamily(value).run();
          else editor.chain().focus().unsetFontFamily().run();
        }}
        className="h-8 rounded-md border border-navy/20 bg-white px-1.5 text-xs text-navy outline-none"
        defaultValue=""
      >
        {FONT_FAMILIES.map((f) => (
          <option key={f.label} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>

      <select
        title="Font size"
        onMouseDown={(e) => e.stopPropagation()}
        onChange={(e) => {
          const value = e.target.value;
          if (value) editor.chain().focus().setFontSize(value).run();
          else editor.chain().focus().unsetFontSize().run();
        }}
        className="h-8 rounded-md border border-navy/20 bg-white px-1.5 text-xs text-navy outline-none"
        defaultValue=""
      >
        {FONT_SIZES.map((f) => (
          <option key={f.label} value={f.value}>
            {f.label}
          </option>
        ))}
      </select>

      <div className="mx-1 h-6 w-px bg-navy/15" />

      <ToolbarButton
        title="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton
        title="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <em>I</em>
      </ToolbarButton>
      <ToolbarButton
        title="Underline"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <span className="underline">U</span>
      </ToolbarButton>

      <div className="mx-1 h-6 w-px bg-navy/15" />

      <div className="flex items-center gap-1">
        {COLORS.map((color) => (
          <button
            key={color}
            type="button"
            title={`Text color ${color}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => editor.chain().focus().setColor(color).run()}
            style={{ backgroundColor: color }}
            className="h-5 w-5 rounded-full border border-navy/20"
          />
        ))}
        <button
          type="button"
          title="Reset color"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => editor.chain().focus().unsetColor().run()}
          className="flex h-5 w-5 items-center justify-center rounded-full border border-navy/20 bg-white text-[10px] text-navy/60"
        >
          ×
        </button>
      </div>

      <div className="mx-1 h-6 w-px bg-navy/15" />

      <ToolbarButton
        title="Align left"
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        ⬅
      </ToolbarButton>
      <ToolbarButton
        title="Align center"
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        ⬌
      </ToolbarButton>
      <ToolbarButton
        title="Align right"
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        ➡
      </ToolbarButton>
      <ToolbarButton
        title="Justify"
        active={editor.isActive({ textAlign: "justify" })}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        ☰
      </ToolbarButton>

      <div className="mx-1 h-6 w-px bg-navy/15" />

      <ToolbarButton
        title="Heading"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        title="Subheading"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        H3
      </ToolbarButton>
      <ToolbarButton
        title="Bullet list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        •≡
      </ToolbarButton>
      <ToolbarButton
        title="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1≡
      </ToolbarButton>

      <div className="mx-1 h-6 w-px bg-navy/15" />

      <ToolbarButton
        title="Insert table"
        onClick={() =>
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
        }
      >
        ⊞
      </ToolbarButton>
      <ToolbarButton
        title="Add column"
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      >
        +Col
      </ToolbarButton>
      <ToolbarButton title="Add row" onClick={() => editor.chain().focus().addRowAfter().run()}>
        +Row
      </ToolbarButton>
      <ToolbarButton
        title="Delete table"
        onClick={() => editor.chain().focus().deleteTable().run()}
      >
        ⊟
      </ToolbarButton>

      <div className="mx-1 h-6 w-px bg-navy/15" />

      <ToolbarButton
        title="Link"
        active={editor.isActive("link")}
        onClick={() => {
          const url = window.prompt("Link URL (e.g. /contact or https://...)");
          if (url) editor.chain().focus().setLink({ href: url }).run();
          else editor.chain().focus().unsetLink().run();
        }}
      >
        🔗
      </ToolbarButton>
      <ToolbarButton
        title="Clear formatting"
        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
      >
        ⟲
      </ToolbarButton>
    </div>
  );
}

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose-editor min-h-[300px] rounded-b-lg border border-navy/20 bg-white px-4 py-3 text-navy outline-none focus:border-saffron",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // Keep the editor's content in sync if `value` changes externally
  // (e.g. loading an existing article after the editor already mounted).
  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) {
    return (
      <div className="min-h-[336px] rounded-lg border border-navy/20 bg-navy/[0.02]" />
    );
  }

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
