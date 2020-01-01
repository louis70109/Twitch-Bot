# Twitch Bot

This project is base on [Bottender](https://github.com/Yoctol/bottender).

# Platform

- [ ] LINE
- [ ] Messager
- [ ] Telegram

# Main packages

- bottender
- Mongo
- mongoose
- [twitch API](https://d-fischer.github.io/twitch/docs/basic-usage/getting-started.html)

# Create `.env`

Replace `.env.sample` name to `.env` and add relate information in here.

# Try this project

- `tsc -w` to Compile
- `yarn install` or `npm install`
- `npx bottender dev` to test platform bot, or add `--console` to test bot in CLI.

# Try it

## Messenger

- a fans page.
- add `https://twitch.tv` in `white list`.

![](https://i.imgur.com/dtj3zKO.png)
![](https://i.imgur.com/TzlwiP5.png)

- `npx bottender dev`: run project.
- `npx bottender messenger webhook set`: set messenger webhook.
