import { Request, Response } from 'express'
import { Note } from '../../mongodb/models/note'
import { noteService } from './note.service'

export async function getNotes(req: Request, res: Response) {
  // const filterBy = req.query
  try {
    const userId = req.session.userId!
    const notes = await noteService.query(userId)
    res.json(notes)
  } catch (error) {
    res.status(400).send({ err: 'Failed to get stays' })
  }
}

export async function addNote(req: Request, res: Response) {
  const newNote: Note = { ...req.body, createdBy: req.session.userId }

  try {
    const addedNote = await noteService.addNote(newNote)
    res.status(200).send({ success: true, data: addedNote })
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
