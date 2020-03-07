import bodyParser from 'body-parser';
import express from 'express';
import { NotifyController } from './controller/notifiesController';
import { bottender } from 'bottender';
import mongoose from 'mongoose';

const app = bottender({
  dev: process.env.NODE_ENV !== 'production',
});

const port = Number(process.env.PORT) || 5000;

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
      clientId: process.env.CLIENT_ID,
      redirectUri: process.env.REDIRECT_URI,
      liffId: process.env.LIFF_ID,
    });
  });

  // delegate other requests to bottender
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => (mongoose.Promise = global.Promise));

    if (err) {
      mongoose.connection.close();
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
