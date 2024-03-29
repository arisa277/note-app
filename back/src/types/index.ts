export interface Note {
  id: number
  title: string
  content: string
  created_at: Date
  updated_at: Date
}

declare module "knex/types/tables" {
  interface Tables {
    note: Note
  }
}