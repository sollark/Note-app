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
