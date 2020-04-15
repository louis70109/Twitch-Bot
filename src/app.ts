import { Action, LineContext } from 'bottender';
import { platform, router, text } from 'bottender/router';
import userBinding from './controller/users/binding';
import userFollow from './controller/users/follow';
import topGames from './controller/twitches/top';
import notifyBinding from './controller/twitches/binding';
import notifyCancelBinding from './controller/twitches/cancelBinging';
import searchGame from './controller/twitches/searchGame';
import helpMe from './templates/common/help';
import author from './templates/common/author';

async function connectLineNotify(context): Promise<void> {
  await context.sendText(`https://liff.line.me/${process.env.LIFF_ID}`);
}
async function LineAction(): Promise<Action<LineContext>> {
  return router<LineContext>([
    text('連結 LINE Notify', connectLineNotify),
    text(/^綁定推播\s*(?<name>[\s\S]+)/, notifyBinding),
    text(/^解除\s*(?<name>[\s\S]+)/, notifyCancelBinding),
    text(/^綁定\s*(?<name>[\s\S]+)/, userBinding),
    text(/^([f|F]ollow)|追隨/, userFollow),
    text(/([t|T]op)|遊戲/, topGames),
    text(/^[f|F]ind\s*(?<topic>.*)$/, searchGame),
    text(/([a|A]uthor)|(作者)/, author),
    text('*', helpMe),
  ]);
}

export default async function App(): Promise<Action<LineContext>> {
  return router<LineContext>([
    platform('line', LineAction),
    text('連結 LINE Notify', connectLineNotify),
    text(/^綁定推播\s*(?<name>[\s\S]+)/, notifyBinding),
    text(/^解除\s*(?<name>[\s\S]+)/, notifyCancelBinding),
    text(/^綁定\s*(?<name>[\s\S]+)/, userBinding),
    text(/^([f|F]ollow)|追隨/, userFollow),
    text(/([t|T]op)|遊戲/, topGames),
    text(/^[f|F]ind\s*(?<topic>.+)$/, searchGame),
    text(/([a|A]uthor)|(作者)/, author),
    text('*', helpMe),
  ]);
}
