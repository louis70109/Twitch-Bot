const mongoose = require('mongoose');
const querystring = require('querystring');
const axios = require('axios').default;
const TwitchClient = require('twitch').default;
const { NotifyModel, StreamNotifyModel } = require('../dist/model/notify.js');
const { UserModel } = require('../dist/model/user.js');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/TwitchBot';
mongoose.connect(URI).then(() => (mongoose.Promise = global.Promise));

async function sendNotify(token, message) {
  const url = 'https://notify-api.line.me/api/notify';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${token}`,
  };
  const formData = {
    message,
  };
  return await axios.post(url, querystring.encode(formData), { headers });
}

async function publishMessage(streams, notifyToken, userInfo) {
  for (index = 0; index < streams.length; index++) {
    const element = streams[index];
    const ch = element.channel;
    if (ch.name === userInfo.name && userInfo.isPublish === false) {
      await sendNotify(
        notifyToken.token,
        `\n【${ch.displayName}】\n已經開台囉！\n\n手機用戶: twitch://stream/${ch.name}\n\n電腦用戶: https://twitch.tv/${ch.name}`
      );
      await StreamNotifyModel.updateOne(
        { _id: userInfo._id },
        { $set: { isPublish: true } }
      );
    }
  }
}
async function run() {
  const notify = await NotifyModel.find();
  const stream = await StreamNotifyModel.find();

  const client = await TwitchClient.withCredentials(
    process.env.TWITCH_CLIENT_ID,
    process.env.TWITCH_ACCESS_TOKEN
  );
  for (let i = 0; i < notify.length; i++) {
    for (let j = 0; j < stream.length; j++) {
      const userId = stream[j].userId;
      if (notify[i].userId === userId) {
        const currentUser = await UserModel.findOne({ userId: userId });

        const follow = await client.kraken.users.getFollowedChannels(
          currentUser.twitchId
        );
        const channel = [];
        follow.forEach(element => channel.push(element.channel.id));
        const twitches = await client.kraken.streams.getStreams(channel);
        await publishMessage(twitches, notify[i], stream[j]);
      }
    }
  }
  await mongoose.connection.close();
}
run();
