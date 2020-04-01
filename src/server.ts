import bodyParser from 'body-parser';
import express from 'express';
import { NotifyController } from './controller/notifiesController';
import { bottender } from 'bottender';
import mongoose from 'mongoose';

const {
  CLIENT_ID,
  REDIRECT_URI,
  LIFF_ID,
  MONGODB_URI,
  NODE_ENV,
  PORT
} = process.env;


const app = bottender({
  dev: NODE_ENV !== 'production',
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.set('view engine', 'ejs');

  server.use(
    bodyParser.json({
      verify: (req, _, buf) => {
        req.rawBody = buf.toString();
      },
    })
  );

  server.get('/notify/confirm', NotifyController.confirmNotify);

  server.get('/notify', (req, res) => {
    res.render('notify', {
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      liffId: LIFF_ID,
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = Number(PORT) || 5000;
  server.listen(port, err => {
    mongoose
      .connect(MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE, // retry forever
        reconnectInterval: 10000, // wait for 10 seconds before retry
      })
      .then(() => (mongoose.Promise = global.Promise));

    if (err) {
      mongoose.connection.close();
      throw Error(`Mongo error: ${err}`);
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
