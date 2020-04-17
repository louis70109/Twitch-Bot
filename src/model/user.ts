import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String },
  displayName: { type: String },
  twitchId: { type: String, index: true },
  createAt: { type: Date, default: Date.now },
  userId: { type: String, unique: true, index: true },
});
const UserModel = mongoose.model('user', UserSchema);

export { UserModel };

export type User = {
  name: string;
  displayName: string;
  twitchId: string;
  createAt: DateConstructor;
  userId: string;
};
