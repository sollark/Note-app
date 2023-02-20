import { noteService } from './note.service'
import { Request, Response } from 'express'

export async function getNotes(req: Request, res: Response) {
  const filterBy = req.query
  console.log('getNotes')

  try {
    const notes = await noteService.query()
    res.json(notes)
  } catch (error) {
    res.status(400).send({ err: 'Failed to get stays' })
  }
}

export async function addNote(req: Request, res: Response) {
  const newNote = req.body
  try {
    const addNote = await noteService.addNote(newNote)
    res.status(200).send({ success: true, data: addNote })
  } catch (error) {
    res.status(400).send({ success: false, message: 'Could not add note' })
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
