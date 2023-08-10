import mongoose from 'mongoose';

const NotificationSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  administratorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Administrator' },
  message: { type: String },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean },
});

NotificationSchema.virtual('user', {
  ref: 'User',
  localField: 'userID',
  foreignField: '_id',
  justOne: false,
});

NotificationSchema.virtual('administrator', {
  ref: 'Administrator',
  localField: 'administratorID',
  foreignField: '_id',
  justOne: true,
});

export const NotificationModel = mongoose.model('Notification', NotificationSchema);
export const getNotifications = () => NotificationModel.find().populate('user administrator');
export const getNotificationById = (id: string) => NotificationModel.findById(id).populate('user administrator');
export const createNotification = (values: Record<string, any>) => new NotificationModel(values).save().then((notification) => notification.toObject());
export const deleteNotificationById = (id: string) => NotificationModel.findOneAndDelete({ _id: id });
export const updateNotificationById = (id: string, values: Record<string, any>) => NotificationModel.findByIdAndUpdate(id, values);
