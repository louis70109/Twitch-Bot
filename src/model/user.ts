import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String },
  displayName: { type: String, index: true },
  twitchId: { type: String, unique: true },
  createAt: { type: Date, default: Date.now },
  userId: { type: String },
});
const UserModel = mongoose.model('user', User);

export { UserModel };
