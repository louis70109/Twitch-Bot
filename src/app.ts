import { router, text } from 'bottender/router';
import userBinding from './controller/users/binding';
import userFollow from './controller/users/follow';

export default async function App(context: any): Promise<void> {
  return router([
    text(/^綁定(?<name>[\s\S]+)/, userBinding),
    text('follow', userFollow),
    // text('*', debug),
  ]);
}
