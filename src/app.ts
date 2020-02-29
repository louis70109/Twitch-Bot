import { platform, router, text, messenger } from 'bottender/router';
import { withProps } from 'bottender';
import userBinding from './controller/users/binding';
import userFollow from './controller/users/follow';
import topGames from './controller/twitches/top';
import notifyBinding from './controller/twitches/binding';
import searchGame from './controller/twitches/searchGame';
import helpMe from './templates/common/help';
import author from './templates/common/author';

async function LineAction(context): Promise<void> {
  return await router([
    text(/^綁定\s*(?<name>[\s\S]+)/, userBinding),
    text(/^推播\s*(?<name>[\s\S]+)/, notifyBinding),
    text(/^([f|F]ollow)|追隨/, userFollow),
    text(/([t|T]op)|遊戲/, topGames),
    text(/^[f|F]ind\s*(?<topic>.*)$/, searchGame),
    text(/([a|A]uthor)|(作者)/, author),
    text('*', helpMe),
  ]);
}

async function MessengerAction(context): Promise<void> {
  const payload = context.event?.postback?.payload;
  return await router([
    text(/^綁定\s*(?<name>[\s\S]+)/, userBinding),
    text(/^([f|F]ollow)|追隨/, userFollow),
    text(/([t|T]op)|遊戲/, topGames),
    messenger.postback(
      withProps(searchGame, { match: { groups: { topic: payload } } })
    ),
    text(/^[f|F]ind\s*(?<topic>.*)$/, searchGame),
    text(/([a|A]uthor)|(作者)/, author),
    text('*', helpMe),
  ]);
}

export default async function App(): Promise<void> {
  return await router([
    platform('line', LineAction),
    platform('messenger', MessengerAction),
    text(/^綁定\s*(?<name>[\s\S]+)/, userBinding),
    text(/^推播\s*(?<name>[\s\S]+)/, notifyBinding),
    text(/^([f|F]ollow)|追隨/, userFollow),
    text(/([t|T]op)|遊戲/, topGames),
    text(/^[f|F]ind\s*(?<topic>.+)$/, searchGame),
    text(/([a|A]uthor)|(作者)/, author),
    text('*', helpMe),
  ]);
}
