export interface Note {
  _id: string
  title: string
  text?: string
  createdAt: number
}

export interface NewNote {
  title: string
  text?: string
}

export function isNote(obj: any): obj is Note {
  return '_id' in obj && 'title' in obj
}

export function isNewNote(obj: any): obj is NewNote {
  return 'title' in obj
}
