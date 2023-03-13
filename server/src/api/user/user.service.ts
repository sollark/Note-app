import userModel, { User } from '../../mongodb/models/user'

const addUser = async (user: User) => {
  try {
    const newUser = await userModel.create(user)
    return newUser
  } catch (error) {
    throw error
  }
}

const getUserByUsername = async (userName: String) => {
  try {
    const existingUser = await userModel.findOne({ username: userName })
    return existingUser
  } catch (error) {
    throw error
  }
}

const getUserByEmail = async (email: String) => {
  try {
    const existingUser = await userModel.findOne({ email })
    return existingUser
  } catch (error) {
    throw error
  }
}

const updateUser = async (userId: String, user: User) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(userId, user, {
      new: true,
    })
    return updatedUser
  } catch (error) {
    throw error
  }
}

const deleteUser = async (userId: String) => {
  try {
    await userModel.findByIdAndDelete(userId)
  } catch (error) {
    throw error
  }
}

export const userService = {
  addUser,
  getUserByUsername,
  getUserByEmail,
  updateUser,
  deleteUser,
}
