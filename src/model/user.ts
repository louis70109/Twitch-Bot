import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String },
  displayName: { type: String, index: true },
  twitchId: { type: String, unique: true },
  createAt: { type: Date, default: Date.now },
  lineId: { type: String, unique: true },
});
const UserModel = mongoose.model('user', User);

export { UserModel };
