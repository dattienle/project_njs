import { Router } from 'express'
import { loginController, signupController } from '../controllers/users.controller.js'

const usersRouter = Router()

usersRouter.post('/login', loginController)

usersRouter.post('/register', signupController)

export default usersRouter
