import styles from '../styles/cmps/Note.module.css'
import { Card } from 'react-bootstrap'
import { Note as NoteModel } from '../models/note'
import { formatDate, formatTime } from '../utils/formatDate'

interface INote {
  note: NoteModel
  className?: string
}

export function Note({ note, className }: INote) {
  const { title, text, createdAt } = note
  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={`limited-text ${styles.noteText}`}>
          {text}
        </Card.Text>
      </Card.Body>
      <Card.Footer className={`flex space-between ${styles.noteDate}`}>
        <span> {`Created at: ${formatDate(createdAt)}`}</span>
        <span>{formatTime(createdAt)}</span>
      </Card.Footer>
    </Card>
  )
}
