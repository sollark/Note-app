import path from 'path'
// import { fileURLToPath, pathToFileURL } from 'url'
import cors from 'cors'
import express from 'express'
import { connectMongo } from './mongodb/connect'

// Routes
import { noteRoutes } from './api/note/note.routes'

// Environment variables
import * as dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 3030
const NODE_ENV = process.env.NODE_ENV || 'development'

// Path compatible with CommonJS ( I dont know why it is working, it takes __dirname from somewhere )
console.log('__dirname:', __dirname)
// const __dirname = path.dirname(pathToFileURL(__filename).toString())
// const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(express.json())

// CORS
if (NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    // origin: true,
    credentials: true,
  }
  app.use(cors(corsOptions))
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/note', noteRoutes)

const startServer = async () => {
  try {
    await connectMongo()
  } catch (err) {
    console.log('Could not connect to MongoDB')
    console.error(err)
  }

  app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
  })
}

startServer()
