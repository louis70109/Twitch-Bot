import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotifySchema = new Schema({
  token: { type: String },
  userId: { type: String, unique: true },
});

const NotifyModel = mongoose.model('notify', NotifySchema);

export { NotifyModel };
