import path from 'path'
import cors from 'cors'
import express from 'express'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import { connectMongo } from './mongodb/connect'

// import routes
import { noteRoutes } from './api/note/note.routes'
import { userRoutes } from './api/user/user.routes'

// Environment variables
import * as dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 3030
const NODE_ENV = process.env.NODE_ENV || 'development'
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret'
const MONGO_URI = process.env.MONGO_URI

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
  res.send('Server is up')
})

// Middleware
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // maxAge: 1000 * 60, // for testing purposes
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
    }),
  })
)

// got request
app.use(function (req, res, next) {
  console.log('Request received at ' + Date.now())
  next()
})

// Routes
app.use('/api/note', noteRoutes)
app.use('/api/user', userRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('404')
  next()
})

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
