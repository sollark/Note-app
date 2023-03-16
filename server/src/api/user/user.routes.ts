import express from 'express'
import { signup, login, logout } from './user.controller'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.put('/logout', logout)

export { router as userRoutes }
