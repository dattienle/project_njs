import { Router } from 'express';
import { validateMiddleware } from '../middlewares/validate.middlewares.js';
import { accessTokenValidator, refreshTokenValidator } from '../middlewares/notification.middleware.js';
import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
} from '../controllers/notification.controller.js';

const notificationRouter = Router();

notificationRouter.get('/Getnotifications', accessTokenValidator, refreshTokenValidator, validateMiddleware, getAllNotifications);
notificationRouter.get('/Getnotifications/:notificationId', accessTokenValidator, refreshTokenValidator, validateMiddleware, getNotificationById);
notificationRouter.post('/Addnotifications', accessTokenValidator, refreshTokenValidator, validateMiddleware, createNotification);
notificationRouter.put('/Updatenotifications/:notificationId', accessTokenValidator, refreshTokenValidator, validateMiddleware, updateNotification);
notificationRouter.delete('/Deletenotifications/:notificationId', accessTokenValidator, refreshTokenValidator, validateMiddleware, deleteNotification);

export default notificationRouter;
