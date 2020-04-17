import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotifySchema = new Schema({
  token: { type: String },
  userId: { type: String, unique: true, index: true },
});

const StreamNotifySchema = new Schema(
  {
    name: { type: String, index: true },
    userId: { type: String, index: true },
    isPublish: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'createdAt' } }
);

StreamNotifySchema.index({ name: 1, userId: 1 }, { unique: true });
const NotifyModel = mongoose.model('notify', NotifySchema);
const StreamNotifyModel = mongoose.model('stream_notify', StreamNotifySchema);

export { NotifyModel, StreamNotifyModel };

export type Notify = {
  name: string;
  isPublish: boolean;
  createAt: DateConstructor;
  userId: string;
};
