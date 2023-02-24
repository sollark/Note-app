import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Note } from './cmps/Note'
import { Note as NoteModel } from './models/note'
import { noteService } from './services/note.service'
import styles from './styles/pages/NotePage.module.css'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  useEffect(() => {
    async function loadNotes() {
      try {
        const data = await noteService.query()
        setNotes(data)
      } catch (error) {
        console.log('Error fetching notes', error)
      }
    }

    async function createNote() {
      const newNote = await noteService.save({
        title: 'New Note',
        text: 'This is a new note',
      })
      if (newNote) setNotes((notes) => [newNote, ...notes])
    }

    // createNote()
    loadNotes()
  }, [])

  return (
    <Container>
      <Row xs={1} md={2} lg={3} className='g-4'>
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.card} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default App
