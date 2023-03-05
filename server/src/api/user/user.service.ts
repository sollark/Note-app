import userModel, { User } from '../../mongodb/models/user'

const addUser = async (user: User) => {
  try {
    const newUser = await userModel.create(user)
    return newUser
  } catch (error) {
    throw error
  }
}

const getUser = async (userName: String) => {
  try {
    const user = await userModel.findOne({ username: userName })
    return user
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

export const userService = { addUser, getUser, updateUser, deleteUser }
