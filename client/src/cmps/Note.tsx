import styles from '../styles/cmps/Note.module.css'
import { Card } from 'react-bootstrap'
import { Note as NoteModel } from '../models/note'
import { formatDate, formatTime } from '../utils/formatDate'
import { MdDelete } from 'react-icons/md'

interface INote {
  note: NoteModel
  className?: string
  onDeleteNote: (note: NoteModel) => void
}

export function Note({ note, className, onDeleteNote }: INote) {
  const { title, text, createdAt } = note
  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className='flex align-center'>
          {title}
          <MdDelete
            className='text-muted ms-auto'
            onClick={(e) => {
              e.stopPropagation()
              onDeleteNote(note)
            }}
          />
        </Card.Title>
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
