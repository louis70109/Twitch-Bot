"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var querystring_1 = __importDefault(require("querystring"));
var notify_1 = require("../model/notify");
var NotifyController = /** @class */ (function () {
    function NotifyController() {
    }
    NotifyController.confirmNotify = function (req, res) {
        var query = req.query['liff.state'].split('?')[1].split('&');
        var notifyPayload = { code: null, state: null };
        query.forEach(function (el) {
            var queryObj = el.split('=');
            if (queryObj[0] in notifyPayload)
                notifyPayload[queryObj[0]] = queryObj[1];
        });
        var code = notifyPayload.code;
        var userId = notifyPayload.state;
        var client = {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.REDIRECT_URI,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
        };
        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        axios_1.default
            .post('https://notify-bot.line.me/oauth/token', querystring_1.default.encode(client), { headers: headers })
            .then(function (response) {
            notify_1.NotifyModel.findOne({ userId: userId }, function (err, isAlive) {
                var $notify = new notify_1.NotifyModel();
                $notify.token = response.data.access_token;
                $notify.userId = userId;
                if (!isAlive) {
                    $notify.save(function (err) {
                        if (err)
                            throw err;
                    });
                }
                else {
                    var userObj = {
                        token: response.data.access_token,
                        userId: userId,
                    };
                    notify_1.NotifyModel.findOneAndUpdate({ userId: userId }, userObj, function (err, _) {
                        if (err)
                            console.log(err);
                    });
                }
            });
            res.render('notify_confirm', {
                message: response.data,
                liffId: process.env.LIFF_ID_CALLBACK,
            });
        })
            .catch(function (err) {
            res.render('notify_confirm', {
                message: err.message,
                liffId: process.env.LIFF_ID_CALLBACK,
            });
        });
    };
    return NotifyController;
}());
exports.NotifyController = NotifyController;
