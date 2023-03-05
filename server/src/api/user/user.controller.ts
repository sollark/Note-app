import { Request, Response } from 'express'
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

export async function signUp(req: Request, res: Response) {
  const user: UserSignup = req.body

  try {
    const addedUser = await userService.addUser(user)
    res.status(200).send({ success: true, data: addedUser })
  } catch (error) {
    res.status(400).send({ success: false, message: 'Could not add user' })
  }
}

export async function login(req: Request, res: Response) {
  const user: UserLogin = req.body

  try {
    const loggedInUser = await userService.getUser(user.username)

    if (!loggedInUser) {
      res.status(401).send({ success: false, message: 'Wrong username' })
    } else if (loggedInUser.password !== user.password) {
      res.status(401).send({ success: false, message: 'Wrong password' })
    } else res.status(200).send({ success: true, data: loggedInUser })
  } catch (error) {
    res.status(400).send({ success: false, message: 'Could not login' })
  }
}
