import { config } from 'dotenv'
import mongoose from 'mongoose'

config()

const url = `mongodb+srv://datltse160245:letiendat2002@sdn301m.a5pjj2z.mongodb.net/njs`
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
