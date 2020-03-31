"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var notifiesController_1 = require("./controller/notifiesController");
var bottender_1 = require("bottender");
var mongoose_1 = __importDefault(require("mongoose"));
var Sentry = __importStar(require("@sentry/node"));
Sentry.init({ dsn: 'https://a45bc6ebf8e848a1b3a48cf2575a046d@sentry.io/5180784' });
var _a = process.env, CLIENT_ID = _a.CLIENT_ID, REDIRECT_URI = _a.REDIRECT_URI, LIFF_ID = _a.LIFF_ID, MONGODB_URI = _a.MONGODB_URI, NODE_ENV = _a.NODE_ENV, PORT = _a.PORT;
var app = bottender_1.bottender({
    dev: NODE_ENV !== 'production',
});
var handle = app.getRequestHandler();
app.prepare().then(function () {
    var server = express_1.default();
    server.set('view engine', 'ejs');
    server.use(body_parser_1.default.json({
        verify: function (req, _, buf) {
            req.rawBody = buf.toString();
        },
    }));
    if (NODE_ENV === 'production') {
        server.use(Sentry.Handlers.requestHandler());
        server.use(Sentry.Handlers.errorHandler());
        // Optional fallthrough error handler
        server.use(function onError(err, req, res, next) {
            // The error id is attached to `res.sentry` to be returned
            // and optionally displayed to the user for support.
            res.statusCode = 500;
            res.end(res.sentry + "\n");
        });
    }
    server.get('/notify/confirm', notifiesController_1.NotifyController.confirmNotify);
    server.get('/notify', function (req, res) {
        res.render('notify', {
            clientId: CLIENT_ID,
            redirectUri: REDIRECT_URI,
            liffId: LIFF_ID,
        });
    });
    server.all('*', function (req, res) {
        return handle(req, res);
    });
    var port = Number(PORT) || 5000;
    server.listen(port, function (err) {
        mongoose_1.default
            .connect(MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 10000,
        })
            .then(function () { return (mongoose_1.default.Promise = global.Promise); });
        if (err) {
            mongoose_1.default.connection.close();
            throw Error("Mongo error: " + err);
        }
        console.log("> Ready on http://localhost:" + port);
    });
});
