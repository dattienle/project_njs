import express from 'express'
import databaseService from './services/database.services.js'
import usersRouter from './routes/user.router.js'
import artworkRouter from "./routes/artwork.router.js"
const app = express()
const port = 1000
app.use(express.json())

app.use('/users', usersRouter)
app.use('/artworks', artworkRouter)
app.listen(port, () => console.log(`Server running on port ${port}`))
databaseService._connect()
