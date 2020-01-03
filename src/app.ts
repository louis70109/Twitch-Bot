import { platform, router, text } from 'bottender/router';
import userBinding from './controller/users/binding';
import userFollow from './controller/users/follow';
import topGames from './controller/twitches/top';
import mongoose from 'mongoose';

async function LineAction(context): Promise<void> {
  return await router([
    text(/^綁定\s*(?<name>[\s\S]+)/, userBinding),
    text(/^[f|F]ollow/, userFollow),
    text(/top\s\s*(?<game>[\s\S]+)/, topGames),
  ]);
}

async function MessengerAction(context): Promise<void> {
  return await router([
    text(/^綁定\s*(?<name>[\s\S]+)/, userBinding),
    text(/^[f|F]ollow/, userFollow),
    text(/top\s\s*(?<game>[\s\S]+)/, topGames),
  ]);
}

export default async function App(context): Promise<void> {
  mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  mongoose.Promise = global.Promise;
  return await router([
    platform('line', LineAction),
    platform('messenger', MessengerAction),
    text(/^綁定\s*(?<name>[\s\S]+)/, userBinding),
    text(/^[f|F]ollow/, userFollow),
    text(/top\s\s*(?<game>[\s\S]+)/, topGames),
  ]);
}
