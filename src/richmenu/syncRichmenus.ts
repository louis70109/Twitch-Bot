// https://github.com/Yoctol/bottender/blob/master/packages/bottender/src/cli/providers/line/menu.js
import fs from 'fs';

import { LineClient } from 'messaging-api-line';

import bottenderConfig from '../bottender.config';

const client = LineClient.connect(bottenderConfig.channels.line);

(async () => {
  const createdRichMenus = await client.getRichMenuList();

  for (let i = 0; i < createdRichMenus.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    await client.deleteRichMenu(createdRichMenus[i].richMenuId);
  }

  import richmenu from './richmenu';

  const { richMenuId: bMenuId } = await client.createRichMenu(
    richmenu
  );

  await client.uploadRichMenuImage(
    bMenuId,
    fs.readFileSync(richmenuB.meta.image.path)
  );

  console.log({ bMenuId });

  // TODO: diff, migrate
})();
