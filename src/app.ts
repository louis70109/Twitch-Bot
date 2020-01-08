import { platform, router, text } from 'bottender/router';
import userBinding from './controller/users/binding';
import userFollow from './controller/users/follow';
import topGames from './controller/twitches/top';
import searchGame from './controller/twitches/searchGame';
import helpMe from './controller/common/Help';
import mongoose from 'mongoose';

async function LineAction(): Promise<void> {
  return await router([
    text(/^綁定\s*(?<name>[\s\S]+)/, userBinding),
    text(/^([f|F]ollow)|追隨/, userFollow),
    text(/([t|T]op)|遊戲/, topGames),
    text(/^我[要|想]看\s*(?<topic>.+)$/, searchGame),
    text(/([h|H]elp)|(\/h)|(說明)/, helpMe),
  ]);
}

async function MessengerAction(): Promise<void> {
  return await router([
    text(/^綁定\s*(?<name>[\s\S]+)/, userBinding),
    text(/^([f|F]ollow)|追隨/, userFollow),
    text(/([t|T]op)|遊戲/, topGames),
    text(/^我[要|想]看\s*(?<topic>.+)$/, searchGame),
    text(/([h|H]elp)|(\/h)|(說明)/, helpMe),
  ]);
}

export default async function App(): Promise<void> {
  mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  mongoose.Promise = global.Promise;
  return await router([
    platform('line', LineAction),
    platform('messenger', MessengerAction),
    text(/^綁定\s*(?<name>[\s\S]+)/, userBinding),
    text(/^([f|F]ollow)|追隨/, userFollow),
    text(/([t|T]op)|遊戲/, topGames),
    text(/^我[要|想]看\s*(?<topic>.+)$/, searchGame),
    text(/([h|H]elp)|(\/h)|(說明)/, helpMe),
  ]);
}
