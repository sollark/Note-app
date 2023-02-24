import { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Note } from './cmps/Note'
import { Note as NoteModel } from './models/note'
import styles from './styles/pages/NotePage.module.css'

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([])

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch('http://localhost:3030/api/note', {
          method: 'GET',
        })
        const data = await response.json()
        setNotes(data)
      } catch (error) {
        console.log('Error fetching notes', error)
      }
    }

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
