import { platform, router, text } from 'bottender/router';
import userBinding from './controller/users/binding';
import userFollow from './controller/users/follow';
async function LineAction(context) {
  return await router([
    text(/^綁定(?<name>[\s\S]+)/, userBinding),
    text('follow', userFollow),
  ]);
}

async function MessengerAction(context) {
  return await router([
    text(/^綁定(?<name>[\s\S]+)/, userBinding),
    text('follow', userFollow),
  ]);
}

export default function Platform(context) {
  return router([
    platform('line', LineAction),
    platform('messenger', MessengerAction),
  ]);
}
