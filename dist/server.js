"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var notifiesController_1 = require("./controller/notifiesController");
var bottender_1 = require("bottender");
var mongoose_1 = __importDefault(require("mongoose"));
var app = bottender_1.bottender({
    dev: process.env.NODE_ENV !== 'production',
});
var port = Number(process.env.PORT) || 5000;
var handle = app.getRequestHandler();
app.prepare().then(function () {
    var server = express_1.default();
    server.set('view engine', 'ejs');
    server.use(body_parser_1.default.json({
        verify: function (req, _, buf) {
            req.rawBody = buf.toString();
        },
    }));
    server.get('/notify/confirm', notifiesController_1.NotifyController.confirmNotify);
    server.get('/notify', function (req, res) {
        res.render('notify', {
            client_id: process.env.CLIENT_ID,
            redirect_uri: process.env.REDIRECT_URI,
        });
    });
    // delegate other requests to bottender
    server.all('*', function (req, res) {
        return handle(req, res);
    });
    server.listen(port, function (err) {
        mongoose_1.default.set('useNewUrlParser', true);
        mongoose_1.default.set('useFindAndModify', false);
        mongoose_1.default.set('useCreateIndex', true);
        mongoose_1.default.set('useUnifiedTopology', true);
        mongoose_1.default.connect(process.env.MONGODB_URI);
        mongoose_1.default.Promise = global.Promise;
        if (err) {
            mongoose_1.default.connection.close();
            throw err;
        }
        console.log("> Ready on http://localhost:" + port);
    });
});
