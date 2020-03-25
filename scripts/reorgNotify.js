const mongoose = require('mongoose');
const moment = require('moment');
const { StreamNotifyModel } = require('../dist/model/notify.js');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/TwitchBot';
mongoose.connect(URI).then(() => (mongoose.Promise = global.Promise));

(async function run() {
  const now = moment(),
    hour = now.hours(),
    min = now.minutes();

  if ((hour === 8 || hour === 20) && min >= 0)
    await StreamNotifyModel.updateMany({}, { $set: { isPublish: false } });
  await mongoose.connection.close();
})()
