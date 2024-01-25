import Notification from '../model/schema/notification.schema.js';

class NotificationService {
  async getAllNotifications() {
    try {
      const notifications = await Notification.find();
      return notifications;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getNotificationById(notificationId) {
    try {
      const notification = await Notification.findById(notificationId);
      if (!notification) {
        throw new Error('Notification not found');
      }
      return notification;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createNotification(user_id, content, type, date) {
    try {
      const newNotification = new Notification({ user_id, content, type, date });
      const savedNotification = await newNotification.save();
      return savedNotification;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateNotification(notificationId, user_id, content, type, date) {
    try {
      const updatedNotification = await Notification.findByIdAndUpdate(
        notificationId,
        { user_id, content, type, date },
        { new: true }
      );
      if (!updatedNotification) {
        throw new Error('Notification not found');
      }
      return updatedNotification;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteNotification(notificationId) {
    try {
      const deletedNotification = await Notification.findByIdAndDelete(notificationId);
      if (!deletedNotification) {
        throw new Error('Notification not found');
      }
      return deletedNotification;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

const notificationService = new NotificationService();
export default notificationService;