import express from 'express';

import {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
} from '../controllers/notification.controller.js';

const router = express.Router();

router.get('/notifications', getAllNotifications);
router.get('/notifications/:notificationId', getNotificationById);
router.post('/notifications', createNotification);
router.put('/notifications/:notificationId', updateNotification);
router.delete('/notifications/:notificationId', deleteNotification);

export default router;