const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const ejs = require('ejs');

const { bottender } = require('bottender');
const mongoose = require('mongoose');

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

  server.get('/notify/confirm', (req, res) => {
    code = req.query.code;
    userId = req.query.state;
    res.render('notify_confirm');
  });

  server.get('/notify', (req, res) => {
    res.render('notify', {
      client_id: process.env.CLIENT_ID,
      redirect_uri: process.env.REDIRECT_URI,
    });
  });

  // delegate other requests to bottender
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    mongoose.Promise = global.Promise;
    if (err) {
      mongoose.connection.close();
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
