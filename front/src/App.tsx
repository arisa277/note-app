import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Note from "./components/Note"
import ListItem from "./components/ListItem"

import { NoteItem } from "./types/note"

function App() {
  const [notes, setNotes] = useState<NoteItem[]>([])
  const [activeNote, setActiveNote] = useState<NoteItem>()
  const [searchTerm, setSearchTerm] = useState("")
  const filteredNotes = searchTerm
    ? notes.filter(note =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : notes

  useEffect(() => {
    fetch('http://localhost:3000/note')
      .then(response => response.json())
      .then(data => {
        setNotes(data.notes);
        setActiveNote(data.notes[0]);
      })
      .catch(error => console.error("There was an error!", error));
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      setActiveNote(notes[0]);
    } else {
      setActiveNote(undefined)
    }
  }, [notes]);

  const activateNote = (id: number) => {
    const note = notes.find(note => note.id === id);
    if (note) {
      setActiveNote(note);
    }
  }

  const handleAddNote = () => {
    const newNote = {
      title: "",
      content: "",
    };

    fetch('http://localhost:3000/note', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then(response => response.json())
      .then(data => {
        setNotes(prevNotes => [data.createdNote, ...prevNotes]);
        setActiveNote(data.createdNote);
      })
      .catch(error => console.error("There was an error!", error));
  };

  const updateNote = (id: number, title: string, content: string) => {
    fetch(`http://localhost:3000/note/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
      .then(response => response.json())
      .then(() => {
        setNotes(prevNotes => {
          // ノートの更新
          const updatedNotes = prevNotes.map(note =>
            note.id === id ? { ...note, title, content, updated_at: new Date() } : note
          );
          // 更新されたノートを更新日時でソート
          const sortedNotes = updatedNotes.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
          return sortedNotes;
        });
      })
      .then(() => {
        setNotes((currentNotes) => {
          if (currentNotes.length > 0) {
            setActiveNote(currentNotes[0]);
          } else {
            setActiveNote(undefined);
          }
          return currentNotes;
        });
      })
      .catch(error => console.error("Error updating note:", error));
  };



  const handleDelete = (id: number) => {
    fetch(`http://localhost:3000/note/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setNotes(currentNotes => currentNotes.filter(note => note.id !== id));
      })
      .catch(error => console.error("Error deleting note:", error));
  }

  return (
    <>
      <main className="py-10 h-screen">
        <h1 className="font-bold text-3xl text-center">Note</h1>
        <div className="h-4/6 flex justify-center gap-5 mx-20 my-10">
          <div className="w-6/12 border rounded p-1 overflow-auto">
            <Navbar
              handleAddNote={handleAddNote}
              value={searchTerm} setSearch={setSearchTerm}
            />
            <ListItem
              data={filteredNotes}
              activateNote={activateNote} />
          </div>
          <Note
            activeNote={activeNote}
            updateNote={updateNote}
            handleDelete={handleDelete}
            handleAddNote={handleAddNote} />
        </div>
      </main>
    </>
  )
}

export default App
