import noteModel, { Note } from '../../mongodb/models/note'

const query = async () => {
  try {
    const notes = await noteModel.find({})
    return notes
  } catch (error) {
    throw error
  }
}

const addNote = async (note: Note) => {
  try {
    const newNote = await noteModel.create(note)
    return newNote
  } catch (error) {
    throw error
  }
}

const getNote = async (noteId: String) => {
  try {
    const note = await noteModel.findById(noteId)
    return note
  } catch (error) {
    throw error
  }
}

export const noteService = { query, addNote, getNote }
