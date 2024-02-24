import Notification from '../model/schema/notification.schema.js';
import { signToken } from '../utils/jwt.js';
import mongoose from 'mongoose';

class NotificationService {
  
  signAccessToken({ userId }) {
    return signToken({
      payload: { userId, tokenType: 'Access Token' },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN,
      options: { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN },
    });
  }

  signRefreshToken({ userId }) {
    return signToken({
      payload: { userId, tokenType: 'Refresh Token' },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN,
      options: { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN },
    });
  }

  async signAccessAndRefreshToken({ userId }) {
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.signAccessToken({ userId }),
        this.signRefreshToken({ userId }),
      ]);
      return { accessToken, refreshToken };
    } catch (error) {
      throw new Error('Error signing tokens: ' + error.message);
    }
  }

  async createNotification(notificationData) {
    try {
      // Create a new notification
      const newNotification = await Notification.create(notificationData);
      return newNotification;
    } catch (error) {
      throw new Error('Error creating notification: ' + error.message);
    }
  }

  async fetchNotifications(userId) {
    try {
      const notifications = await Notification.find({ user_id: userId });
      return notifications;
    } catch (error) {
      throw new Error('Error fetching notifications: ' + error.message);
    }
  }

  async deleteNotification(notificationId) {
    try {
      const deletedNotification = await Notification.findByIdAndDelete(
        notificationId
      );
      return deletedNotification;
    } catch (error) {
      throw new Error('Error deleting notification: ' + error.message);
    }
  }
}

const notificationService = new NotificationService();
export default notificationService;
