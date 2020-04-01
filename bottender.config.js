module.exports = {
  session: {
    driver: 'mongo',
    stores: {
      memory: {
        maxSize: 500,
      },
      file: {
        dirname: '.sessions',
      },
      redis: {
        port: 6379,
        host: '127.0.0.1',
        password: 'auth',
        db: 0,
      },
      mongo: {
        url: process.env.MONGODB_URI || 'mongodb://localhost:27017/twitch-bot',
        collectionName: 'sessions',
      },
    },
  },
  initialState: {},
  channels: {
    line: {
      enabled: true,
      path: '/webhooks/line',
      accessToken: process.env.LINE_ACCESS_TOKEN,
      channelSecret: process.env.LINE_CHANNEL_SECRET,
    },
  },
};
