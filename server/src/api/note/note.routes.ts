import express from 'express'
import { requireAuth } from '../../middleware/requireAuth.middleware'
import {
  getNotes,
  addNote,
  getNote,
  updateNote,
  deleteNote,
} from './note.controller'

const router = express.Router()

router.get('/', getNotes)
router.get('/:id', getNote)
router.post('/', addNote)
router.put('/:id', updateNote)
router.delete('/:id', deleteNote)

export { router as noteRoutes }
