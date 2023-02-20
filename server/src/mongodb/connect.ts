import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()
const MONGO_URI = process.env.MONGO_URI
if (!MONGO_URI) {
  throw new Error('Database url environment variable not set')
}

export const connectMongo = async () => {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(MONGO_URI)
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }
}
