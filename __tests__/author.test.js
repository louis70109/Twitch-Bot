const crypto = require('crypto');

const nock = require('nock');
const request = require('supertest');
const { initializeServer } = require('bottender');
const mongoose = require('mongoose');

nock.disableNetConnect();
nock.enableNetConnect('127.0.0.1');

let scope;

// Bottender 會去查 User Profile
beforeEach(() => {
  nock('https://api.line.me')
    .persist()
    .get('/v2/bot/profile/U00000000000000000000000000000001')
    .reply(200, {
      displayName: 'LINE taro',
      userId: 'U4af4980629...',
      pictureUrl: 'https://obs.line-apps.com/...',
      statusMessage: 'Hello, LINE!',
    });
});

afterEach(() => {
  afterEach(() => {
    nock.cleanAll();
  });
});

it('should reply Author context', async () => {
  let replyBody;

  scope = nock('https://api.line.me')
    .persist()
    .post('/v2/bot/message/reply')
    .reply(200, (_, requestBody) => {
      replyBody = requestBody;
      return {};
    });

  const server = initializeServer({
    config: {
      session: {
        driver: 'memory',
      },
      channels: {
        line: {
          sync: true,
        },
      },
    },
  });

  const body = {
    destination: 'Uaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    events: [
      {
        replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
        type: 'message',
        timestamp: 1462629479859,
        source: {
          type: 'user',
          userId: 'U00000000000000000000000000000001',
        },
        message: {
          id: '325708',
          type: 'text',
          text: 'author',
        },
      },
    ],
  };

  // 需要有 Signature 才能防偽造
  const signature = crypto
    .createHmac('sha256', process.env.LINE_CHANNEL_SECRET)
    .update(JSON.stringify(body), 'utf8')
    .digest()
    .toString('base64');

  const res = await request(server)
    .post('/webhooks/line')
    .set('X-Line-Signature', signature)
    .send(body);
  mongoose.connection.close();
  expect(res.status).toEqual(200);
  expect(replyBody).toEqual({
    replyToken: 'nHuyWiB7yP5Zw52FIkcQobQuGDXCTA',
    messages: [
      {
        type: 'text',
        text:
          '🦈【NiJia Lin】🦈\n✏️ 部落格:\nhttps://nijialin.com/\n\n🐙 Github:\nhttps://github.com/louis70109',
      },
    ],
  });
});
