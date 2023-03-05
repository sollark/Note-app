import { InferSchemaType, model, Schema } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
  email: { type: String, required: true, select: false },
})

export type User = InferSchemaType<typeof userSchema>

const userModel = model<User>('User', userSchema)
export default userModel
