import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotifySchema = new Schema({
  token: { type: String },
  userId: { type: String, unique: true },
});

const StreamNotifySchema = new Schema({
  name: { type: String },
  userId: { type: String },
});
const NotifyModel = mongoose.model('notify', NotifySchema);
const StreamNotifyModel = mongoose.model('stream_notify', StreamNotifySchema);

export { NotifyModel, StreamNotifyModel };
