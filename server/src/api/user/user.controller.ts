import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../../mongodb/models/user'
import { userService } from './user.service'

interface UserSignup {
  username: string
  password: string
  email: string
}
interface UserLogin {
  username: string
  password: string
}

export async function signup(req: Request, res: Response) {
  const user: UserSignup = req.body

  if (!user.username || !user.password || !user.email)
    return res
      .status(400)
      .send({ success: false, message: 'Missing parameters.' })

  try {
    const existingUsername = await userService.getUserByUsername(user.username)
    if (existingUsername)
      return res
        .status(400)
        .send({ success: false, message: 'Username has been taken.' })

    const existingEmail = await userService.getUserByEmail(user.email)
    if (existingEmail)
      return res
        .status(400)
        .send({ success: false, message: 'Email has been taken.' })

    // Hash password
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser: User = { ...user, password: hashedPassword }

    const addedUser = await userService.addUser(newUser)

    req.session.userId = addedUser._id

    res.status(200).send({ success: true, data: addedUser })
  } catch (error) {
    res.status(400).send({ success: false, message: 'Could not add user' })
  }
}

export async function login(req: Request, res: Response) {
  const user: UserLogin = req.body

  if (!user.username || !user.password)
    return res
      .status(400)
      .send({ success: false, message: 'Missing parameters.' })

  try {
    const loggedInUser = await userService.getUserWithPassword(user.username)
    if (!loggedInUser) {
      return res
        .status(401)
        .send({ success: false, message: 'Invalid credentials' })
    }

    const passwordMatch = await bcrypt.compare(
      user.password,
      loggedInUser.password
    )
    if (!passwordMatch) {
      return res
        .status(401)
        .send({ success: false, message: 'Invalid credentials' })
    }

    req.session.userId = loggedInUser._id

    res
      .status(200)
      .send({ success: true, data: { username: loggedInUser.username } })
  } catch (error) {
    res.status(400).send({ success: false, message: 'Could not login' })
  }
}

export async function logout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      return res
        .status(400)
        .send({ success: false, message: 'Could not logout' })
    }

    res.clearCookie('connect.sid')
    res.status(200).send({ success: true, message: 'Logged out' })
  })
}
