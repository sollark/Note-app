import { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import { Note } from '../cmps/Note'
import { Note as NoteModel } from '../models/note'
import { LoginDialog } from '../cmps/LoginDialog'
import { NoteDialog } from '../cmps/NoteDialog'
import { SignUpDialog } from '../cmps/SignUpDialog'
import { noteService } from '../services/note.service'
import styles from '../styles/pages/NotePage.module.css'

export default function NotePage() {
  const [notes, setNotes] = useState<NoteModel[]>([])
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null)
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function loadNotes() {
      try {
        setError(false)
        setLoading(true)

        const data = await noteService.query()
        setNotes(data)
      } catch (error) {
        console.log('Error fetching notes', error)
        setError(true)
      } finally {
        setLoading(false)
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

  const notesGrid = (
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
  )
  return (
    <Container>
      <Button className='mb-4' onClick={() => setShowAddNoteDialog(true)}>
        <FaPlus />
        <span> Add Note</span>
      </Button>

      {/* Loading spinner  */}
      {loading && (
        <div
          style={{ height: '100%', width: '100%' }}
          className='place-items-center'>
          <Spinner animation='border' variant='primary' />
        </div>
      )}
      {/* Error message  */}
      {error && <p>Something went wrong</p>}

      {/* Notes  */}
      {!loading && !error && notes.length ? notesGrid : <p>No notes</p>}

      {/* Modal to create a new note */}
      {showAddNoteDialog && (
        <NoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSave={(newNote) => {
            setShowAddNoteDialog(false)
            setNotes([newNote, ...notes])
          }}
        />
      )}

      {/* Modal to edit an existing note */}
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
      {false && (
        <SignUpDialog onDismiss={() => {}} onSignUpSuccessful={() => {}} />
      )}

      {false && (
        <LoginDialog onDismiss={() => {}} onLoginSuccessful={() => {}} />
      )}
    </Container>
  )
}
