import { config } from 'dotenv'
import mongoose from 'mongoose'

config()

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@sdn301m.a5pjj2z.mongodb.net/${process.env.DB_NAME}`
class DatabaseService {
  constructor() {
    this._connect()
  }
  async _connect() {
    try {
      await mongoose.connect(url, {})
      console.log('Database connected')
    } catch (err) {
      console.error('Database connection error', err)
    }
  }
 
}
const databaseService = new DatabaseService()
export default databaseService
