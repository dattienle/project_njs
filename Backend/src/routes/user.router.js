import { Router } from 'express'
import {deleteUserProfileController, getUserProfileController, loginController, logoutController, registerController, updateMeController} from '../controllers/users.controller.js'
import { accesTokenValidator, loginValidator, refreshTokenValidator, registerValidator, updateMeValidator } from '../middlewares/user.middleware.js';
import { validateMiddleware } from '../middlewares/validate.middlewares.js';


const usersRouter = Router()

usersRouter.post('/login', loginValidator,validateMiddleware, loginController)

usersRouter.post('/register',registerValidator ,validateMiddleware, registerController);

usersRouter.post('/logout',accesTokenValidator, refreshTokenValidator,validateMiddleware,logoutController);

usersRouter.get('/me',accesTokenValidator,validateMiddleware, getUserProfileController)
usersRouter.delete('/admin/:userId',accesTokenValidator,validateMiddleware, deleteUserProfileController)
usersRouter.patch('/me',accesTokenValidator,updateMeValidator,validateMiddleware, updateMeController)
export default usersRouter
