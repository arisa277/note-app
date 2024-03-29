

type NewNoteProps = {
  handleAddNote: () => void
  setSearch: (searchTerm: string) => void
  value: string
}

const Navbar = ({ handleAddNote, setSearch, value }: NewNoteProps) => {
  return (
    <>
      <input
        type="text"
        className="w-10/12 rounded-s-md border border-bg-gray-400 py-1 pl-2"
        value={value}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="ml-10 bg-blue-500 self-start px-2 py-1 text-sm text-white rounded m-2 w-16" onClick={handleAddNote}>Add</button>
    </>
  )

}

export default Navbar