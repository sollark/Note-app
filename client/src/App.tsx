import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { AddNoteDialog } from './cmps/AddNoteDialog'
import { Note } from './cmps/Note'
import { Note as NoteModel } from './models/note'
import { noteService } from './services/note.service'
import styles from './styles/pages/NotePage.module.css'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)

  useEffect(() => {
    async function loadNotes() {
      try {
        const data = await noteService.query()
        setNotes(data)
      } catch (error) {
        console.log('Error fetching notes', error)
      }
    }

    loadNotes()
  }, [])

  return (
    <Container>
      <Button className='mb-4' onClick={() => setShowAddNoteDialog(true)}>
        Add Note
      </Button>
      <Row xs={1} md={2} lg={3} className='g-4'>
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.card} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSave={(newNote) => {
            setShowAddNoteDialog(false)
            setNotes([newNote, ...notes])
          }}
        />
      )}
    </Container>
  )
}

export default App
