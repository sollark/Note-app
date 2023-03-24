import mongoose from 'mongoose'
import noteModel, { Note } from '../../mongodb/models/note'

const query = async (userId: mongoose.Types.ObjectId) => {
  try {
    const notes = await noteModel.find({ createdBy: userId })
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

const updateNote = async (noteId: String, note: Note) => {
  try {
    const updatedNote = await noteModel.findByIdAndUpdate(noteId, note, {
      new: true,
    })
    return updatedNote
  } catch (error) {
    throw error
  }
}

const deleteNote = async (noteId: String) => {
  try {
    await noteModel.findByIdAndDelete(noteId)
  } catch (error) {
    throw error
  }
}

export const noteService = { query, addNote, getNote, updateNote, deleteNote }
