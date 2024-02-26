import express from 'express';
import { validateMiddleware } from '../middlewares/validate.middlewares.js';
import { accessTokenValidator, refreshTokenValidator } from '../middlewares/notification.middleware.js';
import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
} from '../controllers/notification.controller.js';

const router =  express.Router();

router.get('/Getnotifications', accessTokenValidator, refreshTokenValidator, validateMiddleware, getAllNotifications);
router.get('/Getnotifications/:notificationId', accessTokenValidator, refreshTokenValidator, validateMiddleware, getNotificationById);
router.post('/Addnotifications', accessTokenValidator, refreshTokenValidator, validateMiddleware, createNotification);
router.put('/Updatenotifications/:notificationId', accessTokenValidator, refreshTokenValidator, validateMiddleware, updateNotification);
router.delete('/Deletenotifications/:notificationId', accessTokenValidator, refreshTokenValidator, validateMiddleware, deleteNotification);

export default router;
