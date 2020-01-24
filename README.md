# Twitch Bot

此專案目前支援 `Messenger` 以及 `LINE message API`.

目前能透過指令`綁定帳號`、`查詢追隨`、`最多人看的遊戲`以及`查詢特定遊戲`之直播。

# 加入好友

## LINE

<img height="200" border="0" alt="QRcode" src="https://i.imgur.com/kRcEhBN.png">

<a href="https://line.me/R/ti/p/%40eae1476b"><img height="50" border="0" alt="加入好友" src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"></a>

## Messenger

<img height="200" border="0" alt="QRcode" src="https://i.imgur.com/93yxeiy.png">

# 指令

- 綁定帳號: `綁定 TWITCH_ACCOUNT`
  - ex: 綁定 relaxing234
- 查詢追隨: `follow` / `追隨`
  - 須先綁定帳號才可查詢
- 最多人看的遊戲: `top` / `遊戲`
- 查詢特定遊戲: `find League of Legends`

### [截圖](https://github.com/louis70109/Twitch-Bot/tree/master/public)

# 主力套件

- [Bottender](https://github.com/Yoctol/bottender)
- [Mongo](https://www.mongodb.com/)
  - [mongoose](https://mongoosejs.com/)
- [twitch API](https://d-fischer.github.io/twitch/docs/basic-usage/getting-started.html)

# 支援平台

- [x] LINE
- [x] Messenger
- [ ] Slack

# 試玩

## 建立 `.env`

把 `.env.sample` 改成 `.env` 並把對應的 key 放入。

> Messenger 相關步驟可以參考 [這篇文章](https://ithelp.ithome.com.tw/articles/10218682)。

## Messenger

- 有個粉絲頁
- 加入以下網址於白名單中
  - `https://twitch.tv`
  - `https://static-cdn.jtvnw.net/ttv-boxart`
  - 部署機器的 url (我使用 `Heroku`)

![](https://i.imgur.com/dtj3zKO.png)
![](https://i.imgur.com/KEtSop6.png)

### 測試

在使用 `npx bottender dev` 後緊接著使用 `npx bottender messenger webhook set` 將 webhook 設定至 Messenger 上，這邊可能需要等個一兩分鐘讓它生效。

## LINE

- Secret key
  ![](https://i.imgur.com/mwLCBIe.png)

- Access token
  ![](https://i.imgur.com/7hVHm3c.png)

## 啟動

- 先用 `yarn install` 或 `npm install` 來安裝相依套件
- 開啟另一個視窗執行 `tsc -w`，它會幫忙編譯並且即時監聽。
- `npx bottender dev`: 執行程式，或是加上 `--console` 讓你可以在`終端機`上直接測試行為。

到這裡要看到 bottender 已經幫你啟動 `Messenger` 以及 `LINE` 的 webhook URL 了。
![](https://i.imgur.com/p3z2fCp.png)

然後將 `LINE` webhook url 複製到你的機器人開發者頁面中。
![](https://i.imgur.com/KEpPgxK.png)

👾👾👾 現在你可以好好的去試玩 Twitch Bot 了 🎉🎉🎉

# LICENSE

MIT
