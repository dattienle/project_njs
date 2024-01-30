import express from 'express';

import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
} from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/Getnotifications', getAllNotifications);
router.get('/Getnotifications/:notificationId', getNotificationById);
router.post('/Addnotifications', createNotification);
router.put('/Updatenotifications/:notificationId', updateNotification);
router.delete('/Deletenotifications/:notificationId', deleteNotification);

export default router;