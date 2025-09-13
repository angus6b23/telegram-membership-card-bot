<div align = center>
  <img src="https://raw.githubusercontent.com/angus6b23/telegram-membership-card-bot/master/assets/logo.png" width="450" height="450" alt="tg-mb-card-bot-logo">
</div>

# Telegram Membership Card Bot

<div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; margin-left: -0.5rem">
<img alt="GitHub License" src="https://img.shields.io/github/license/angus6b23/telegram-membership-card-bot">
<img alt="Liberapay receiving" src="https://img.shields.io/liberapay/receives/12a.app">
</div>

A telegram bot allows you to save and share membership cards and gift cards with your family or friends
[Demo](https://t.me/mb_card_demo_bot)

## Screenshots

<div style="display: flex; gap: 1rem; width: 100%; overflow-x: auto">
<img src="https://raw.githubusercontent.com/angus6b23/telegram-membership-card-bot/master/assets/screenshots/screenshot-1.png" height="512px"/>
<img src="https://raw.githubusercontent.com/angus6b23/telegram-membership-card-bot/master/assets/screenshots/screenshot-2.png" height="512px"/>
<img src="https://raw.githubusercontent.com/angus6b23/telegram-membership-card-bot/master/assets/screenshots/screenshot-3.png" height="512px"/>
<img src="https://raw.githubusercontent.com/angus6b23/telegram-membership-card-bot/master/assets/screenshots/screenshot-4.png" height="512px"/>
<img src="https://raw.githubusercontent.com/angus6b23/telegram-membership-card-bot/master/assets/screenshots/screenshot-5.png" height="512px"/>
<img src="https://raw.githubusercontent.com/angus6b23/telegram-membership-card-bot/master/assets/screenshots/screenshot-6.png" height="512px"/>
</div>

## Features

- Save and access your membership card and gift cards anywhere
- All codes are saved on your own instance
- Support common type of barcodes and qr codes
- Get code quickly by just typing the name of the code
- Role base access - Allow control which user is allowed to access membership cards and gift cards
- Keep track of the amount of remaining balance of your gift cards
- Large code generated easy for scanning at check-out machine

## Prerequisites

- A Telegram account for creating and interacting with the bot
- [Node.js](https://nodejs.org/) +/- [docker](https://www.docker.com/) installed on your machine

## Install / Deploying

1. Clone the git repository

   `git clone https://codeberg.org/angus6b23/telegram-membership-card-bot.git`

2. Create your own telegram bot with [BotFather](https://telegram.me/BotFather) and save the token

   - For details: See <https://core.telegram.org/bots>

3. Get the user id for your own telegram account with [Userinfo Bot](https://telegram.me/userinfobot)

4. Copy and Edit the environment variables required

   `cp example.env .env`

   then edit the .env file with your favorite editor (Set the bot token and user id you obtained on previous steps)

   `nano .env`
   `vim .env`

### With Node.js

5. Install dependencies using package manager

   Using yarn
   `yarn`

   Using npm
   `npm install`

6. Start the program

   Using yarn
   `yarn start`

   Using npm
   `npm run start`

### With docker (compose)

5. Build the application with package manager

   Using yarn
   `yarn build:docker`

   Using npm
   `npm run build:docker`

6. Start with the built image with docker compose

   `docker compose up -d`

## License

![img](https://www.gnu.org/graphics/gplv3-or-later.png)

This app is provided under GPL v3.0 or later. For details, please visit <https://www.gnu.org/licenses/gpl-3.0.en.html>
