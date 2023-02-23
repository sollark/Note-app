import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Note } from './models/note'

function App() {
  const [notes, setNotes] = useState<Note[]>([])

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

  return <div className='App'>{JSON.stringify(notes)}</div>
}

export default App
