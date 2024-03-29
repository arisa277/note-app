import { useState, useEffect } from "react"
import { NoteItem } from "../types/note"

type NoteItemProps = {
  activeNote: NoteItem | undefined
  updateNote: (id: number, title: string, content: string) => void
  handleDelete: (id: number) => void
  handleAddNote: () => void
}

const Note = ({ activeNote, updateNote, handleDelete, handleAddNote }: NoteItemProps) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    setTitle(activeNote?.title || "");
    setContent(activeNote?.content || "");
  }, [activeNote]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split("\n");
    setTitle(lines[0] || "");
    setContent(lines.slice(1).join("\n"));

    if (!activeNote) {
      handleAddNote()
    }
  };

  const handleBlur = () => {
    if (activeNote && (activeNote.title !== title || activeNote.content !== content)) {
      updateNote(activeNote.id, title, content);
    }
  };

  const handleDeleteClick = () => {
    if (activeNote && activeNote.id) {
      handleDelete(activeNote.id);
      setTitle("")
      setContent("")
    }
  };

  return (
    <>
      <div className="flex flex-col w-6/12 h-full border rounded">
        <button
          className="self-start px-2 py-1 text-sm text-white bg-red-500 rounded m-2 w-16"
          onClick={handleDeleteClick}
        >Delete</button>
        <textarea
          className="w-full flex-1 p-2 resize-none border-t"
          value={`${title}\n${content}`}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </>
  )
}

export default Note