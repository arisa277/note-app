import { NoteItem } from "../types/note"

interface ListItemProps {
  data: NoteItem[],
  activateNote: (id: number) => void
}

const ListItem = ({ data, activateNote }: ListItemProps) => {
  return (
    <>
      {data.map(note => {
        const updatedAt = new Date(note.updated_at);
        return (
          <div key={note.id}
            className="grid auto-rows-fr text-lg border rounded p-5 border-b-gray-400 my-3 "
            onClick={() => activateNote(note.id)}>
            <p className="font-bold">{note.title.length > 30 ? note.title.substring(0, 30) + "..." : note.title}</p>
            <p className="justify-self-end self-end text-sm">{updatedAt.toLocaleDateString()} {updatedAt.toLocaleTimeString()}</p>
          </div>
        );
      })}
    </>
  )
}

export default ListItem;
