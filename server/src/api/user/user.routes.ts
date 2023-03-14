import express from 'express'
import { signup, login } from './user.controller'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)

export { router as userRoutes }