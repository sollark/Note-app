import { Request, Response } from 'express'
import { userService } from '../api/user/user.service'

export async function requireAuth(req: Request, res: Response, next: Function) {
  try {
    if (!req.session.userId)
      return res.status(401).send({ success: false, message: 'Unauthorized' })

    const loggedInUser = await userService.getUserById(req.session.userId)

    if (!loggedInUser)
      return res.status(401).send({ success: false, message: 'Unauthorized' })

    next()
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: 'Could not authenticate user' })
  }
}
