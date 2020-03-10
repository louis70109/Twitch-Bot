import axios from 'axios';
import querystring from 'querystring';
import { NotifyModel } from '../model/notify';
class NotifyController {
  static confirmNotify(req, res): void {
    const query = req.query['liff.state'].split('?')[1].split('&');
    const notifyPayload = { code: null, state: null };
    query.forEach(el => {
      const queryObj = el.split('=');
      if (queryObj[0] in notifyPayload)
        notifyPayload[queryObj[0]] = queryObj[1];
    });
    const code = notifyPayload.code;
    const userId = notifyPayload.state;
    const client = {
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.REDIRECT_URI,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    axios
      .post(
        'https://notify-bot.line.me/oauth/token',
        querystring.encode(client),
        { headers }
      )
      .then(response => {
        NotifyModel.findOne({ userId: userId }, (err, isAlive) => {
          const $notify: any = new NotifyModel();
          $notify.token = response.data.access_token;
          $notify.userId = userId;
          if (!isAlive) {
            $notify.save(err => {
              if (err) throw err;
            });
          } else {
            const userObj = {
              token: response.data.access_token,
              userId: userId,
            };
            NotifyModel.findOneAndUpdate(
              { userId: userId },
              userObj,
              (err, _) => {
                if (err) console.log(err);
              }
            );
          }
        });
        res.render('notify_confirm', {
          message: response.data,
          liffId: process.env.LIFF_ID_CALLBACK,
        });
      })
      .catch(err => {
        res.render('notify_confirm', {
          message: err.message,
          liffId: process.env.LIFF_ID_CALLBACK,
        });
      });
  }
}

export { NotifyController };
