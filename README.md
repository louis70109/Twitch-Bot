# Twitch Bot

This project is cross `Messenger` and `LINE message API`.

It can find your following Stream channels and show top Games.

# 加入好友

<img height="200" border="0" alt="QRcode" src="https://i.imgur.com/u4Tvugn.png">

<a href="https://line.me/R/ti/p/%40880anerr"><img height="50" border="0" alt="加入好友" src="https://scdn.line-apps.com/n/line_add_friends/btn/zh-Hant.png"></a>

# Support platform

- [x] LINE
- [x] Messenger
- [ ] Telegram

# Main packages

- [Bottender](https://github.com/Yoctol/bottender)
- [Mongo](https://www.mongodb.com/)
  - [mongoose](https://mongoosejs.com/)
- [twitch API](https://d-fischer.github.io/twitch/docs/basic-usage/getting-started.html)

# Try it

## Create `.env`

Replace `.env.sample` to `.env` and add relate information in here.

- Messenger relate key can follow [this article](https://ithelp.ithome.com.tw/articles/10218682) step by step to sign your bot.

## Messenger

- a fans page.
- add `https://twitch.tv` in `white list`.

![](https://i.imgur.com/dtj3zKO.png)
![](https://i.imgur.com/TzlwiP5.png)

- `npx bottender messenger webhook set`: set messenger webhook.

## LINE

### Secret key

![](https://i.imgur.com/mwLCBIe.png)

### Access token

![](https://i.imgur.com/7hVHm3c.png)

## Run

- `yarn install` or `npm install`: install package
- `tsc -w`: Compile typescript and watch mode
- `npx bottender dev`: run project, or add `--console` to test bot in Command.

You will see these information
![](https://i.imgur.com/p3z2fCp.png)

And `LINE` webhook need to copy and paste in your developer page.
![](https://i.imgur.com/KEpPgxK.png)

Now you can test Messenger and LINE bot 🎉🎉🎉

# LICENSE

MIT
