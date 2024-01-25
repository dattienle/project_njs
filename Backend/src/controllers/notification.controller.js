import Notification from "../services/notification.services.js"

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNotificationById = async (req, res) => {
  const { notificationId } = req.params;
  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNotification = async (req, res) => {
  const { user_id, content, type, date } = req.body;
  try {
    const newNotification = new Notification({ user_id, content, type, date });
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateNotification = async (req, res) => {
  const { notificationId } = req.params;
  const { user_id, content, type, date } = req.body;
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      { user_id, content, type, date },
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json(updatedNotification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  const { notificationId } = req.params;
  try {
    const deletedNotification = await Notification.findByIdAndDelete(notificationId);
    if (!deletedNotification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    res.json(deletedNotification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};