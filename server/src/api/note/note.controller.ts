import { noteService } from './note.service'
import { Request, Response } from 'express'
import { Note } from '../../mongodb/models/note'

export async function getNotes(req: Request, res: Response) {
  const filterBy = req.query
  console.log('filterBy:', filterBy)
  console.log('getNotes')

  try {
    const notes = await noteService.query()
    res.json(notes)
  } catch (error) {
    res.status(400).send({ err: 'Failed to get stays' })
  }
}

export async function addNote(req: Request, res: Response) {
  console.log('adding a note')
  const newNote: Note = req.body
  try {
    // add new note
    const addNote = await noteService.addNote(newNote)
    res.status(200).send({ success: true, data: addNote })
  } catch (error) {
    res.status(400).send({ success: false, message: 'Could not add note' })
  }
}

export async function updateNote(req: Request, res: Response) {
  const note: Note = req.body
  const noteId = req.params.id
  try {
    const updatedNote = await noteService.updateNote(noteId, note)
    res.status(200).send({ success: true, data: updatedNote })
  } catch (error) {
    res.status(400).send({ success: false, message: 'Could not update note' })
  }
}

export async function getNote(req: Request, res: Response) {
  const noteId = req.params.id
  try {
    const note = await noteService.getNote(noteId)
    res.status(200).send({ success: true, data: note })
  } catch (error) {
    res.status(400).send({ success: false, message: 'Could not get note' })
  }
}

export async function deleteNote(req: Request, res: Response) {
  const noteId = req.params.id
  try {
    await noteService.deleteNote(noteId)
    res.status(200).send({ success: true, message: 'Note deleted' })
  } catch (error) {
    res.status(400).send({ success: false, message: 'Could not delete note' })
  }
}
