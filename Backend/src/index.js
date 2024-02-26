import express from 'express'
import mongoose from 'mongoose';
import databaseService from './services/database.services.js'
import categoriesRouter from './routes/categories.router.js';
import notificationRouter from './routes/notification.router.js';

const app = express()
const PORT = 1000
app.use(express.json())

app.use('/categories', categoriesRouter);
app.use('/notifications', notificationRouter);

mongoose.connect("mongodb+srv://datltse160245:letiendat2002@sdn301m.a5pjj2z.mongodb.net/njs", {useMongoClient:true});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
databaseService._connect()
