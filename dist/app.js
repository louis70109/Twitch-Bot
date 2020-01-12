'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var __importDefault =
  (this && this.__importDefault) ||
  function(mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var router_1 = require('bottender/router');
var bottender_1 = require('bottender');
var binding_1 = __importDefault(require('./controller/users/binding'));
var follow_1 = __importDefault(require('./controller/users/follow'));
var top_1 = __importDefault(require('./controller/twitches/top'));
var searchGame_1 = __importDefault(require('./controller/twitches/searchGame'));
var help_1 = __importDefault(require('./view/common/help'));
var author_1 = __importDefault(require('./view/common/author'));
var mongoose_1 = __importDefault(require('mongoose'));
function LineAction() {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          return [
            4 /*yield*/,
            router_1.router([
              router_1.text(/^綁定\s*(?<name>[\s\S]+)/, binding_1.default),
              router_1.text(/^([f|F]ollow)|追隨/, follow_1.default),
              router_1.text(/([t|T]op)|遊戲/, top_1.default),
              router_1.text(/^[f|F]ind\s*(?<topic>.*)$/, searchGame_1.default),
              router_1.text(/([h|H]elp)|(\/h)|(說明)/, help_1.default),
              router_1.text(/([a|A]uthor)|(作者)/, author_1.default),
            ]),
          ];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
}
function MessengerAction(context) {
  var _a, _b;
  return __awaiter(this, void 0, void 0, function() {
    var payload;
    return __generator(this, function(_c) {
      switch (_c.label) {
        case 0:
          payload =
            (_b =
              (_a = context.event) === null || _a === void 0
                ? void 0
                : _a.postback) === null || _b === void 0
              ? void 0
              : _b.payload;
          return [
            4 /*yield*/,
            router_1.router([
              router_1.text(/^綁定\s*(?<name>[\s\S]+)/, binding_1.default),
              router_1.text(/^([f|F]ollow)|追隨/, follow_1.default),
              router_1.text(/([t|T]op)|遊戲/, top_1.default),
              router_1.messenger.postback(
                bottender_1.withProps(searchGame_1.default, {
                  match: { groups: { topic: payload } },
                })
              ),
              router_1.text(/^[f|F]ind\s*(?<topic>.*)$/, searchGame_1.default),
              router_1.text(/([h|H]elp)|(\/h)|(說明)/, help_1.default),
              router_1.text(/([a|A]uthor)|(作者)/, author_1.default),
            ]),
          ];
        case 1:
          return [2 /*return*/, _c.sent()];
      }
    });
  });
}
function App() {
  return __awaiter(this, void 0, void 0, function() {
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          mongoose_1.default.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
          });
          mongoose_1.default.Promise = global.Promise;
          return [
            4 /*yield*/,
            router_1.router([
              router_1.platform('line', LineAction),
              router_1.platform('messenger', MessengerAction),
              router_1.text(/^綁定\s*(?<name>[\s\S]+)/, binding_1.default),
              router_1.text(/^([f|F]ollow)|追隨/, follow_1.default),
              router_1.text(/([t|T]op)|遊戲/, top_1.default),
              router_1.text(/^[f|F]ind\s*(?<topic>.+)$/, searchGame_1.default),
              router_1.text(/([h|H]elp)|(\/h)|(說明)/, help_1.default),
              router_1.text(/([a|A]uthor)|(作者)/, author_1.default),
            ]),
          ];
        case 1:
          return [2 /*return*/, _a.sent()];
      }
    });
  });
}
exports.default = App;
