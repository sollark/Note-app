import { useEffect, useState } from 'react'
import { Note } from './cmps/Note'
import { Note as NoteModel } from './models/note'

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
    <div className='App'>
      {notes.map((note) => (
        <Note note={note} key={note._id} />
      ))}
    </div>
  )
}

export default App
