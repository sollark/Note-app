import express from 'express'
import { getNotes, addNote, getNote } from './note.controller'

const router = express.Router()

router.get('/', getNotes)
router.get('/:id', getNote)
router.post('/', addNote)

export { router as noteRoutes }
