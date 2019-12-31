import App from './app';
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;

// const db = mongoose.connection;
export default App;
