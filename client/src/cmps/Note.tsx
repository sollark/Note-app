import { Card } from 'react-bootstrap'
import { Note as NoteModel } from '../models/note'

interface INote {
  note: NoteModel
}

export function Note({ note }: INote) {
  const { title, text, createdAt } = note
  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Card.Text>{new Date(createdAt).toLocaleDateString()}</Card.Text>
      </Card.Body>
    </Card>
  )
}
