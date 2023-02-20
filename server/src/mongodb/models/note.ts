import { InferSchemaType, Schema, model } from 'mongoose'

const noteSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String },
  createdAt: { type: Number, default: Date.now() },
})

// Create a type for the schema
export type Note = InferSchemaType<typeof noteSchema>

const noteModel = model<Note>('Note', noteSchema)

export default noteModel
