import { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { NoteDialog } from './cmps/NoteDialog'
import { Note } from './cmps/Note'
import { Note as NoteModel } from './models/note'
import { noteService } from './services/note.service'
import { FaPlus } from 'react-icons/fa'
import styles from './styles/pages/NotePage.module.css'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)
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

  async function deleteNote(noteToDelete: NoteModel) {
    try {
      await noteService.remove(noteToDelete._id)
      setNotes(notes.filter((note) => note._id !== noteToDelete._id))
    } catch (error) {
      console.log('Error deleting note', error)
    }
  }

  return (
    <Container>
      <Button className='mb-4' onClick={() => setShowAddNoteDialog(true)}>
        <FaPlus />
        <span> Add Note</span>
      </Button>
      <Row xs={1} md={2} lg={3} className='g-4'>
        {notes.map((note) => (
          <Col key={note._id}>
            <Note
              note={note}
              className={styles.card}
              onDeleteNote={deleteNote}
              onNoteClick={setNoteToEdit}
            />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <NoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSave={(newNote) => {
            setShowAddNoteDialog(false)
            setNotes([newNote, ...notes])
          }}
        />
      )}
      {noteToEdit && (
        <NoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSave={(updatedNote) => {
            setNoteToEdit(null)
            setNotes(
              notes.map((note) =>
                note._id === updatedNote._id ? updatedNote : note
              )
            )
          }}
        />
      )}
    </Container>
  )
}

export default App
