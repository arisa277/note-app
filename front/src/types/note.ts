export interface NoteItem {
  id: number
  title: string
  content: string
  created_at: Date,
  updated_at: Date
}

export interface UpdatedNoteItem {
  id: number
  title: string
  content: string
  updated_at: Date
}