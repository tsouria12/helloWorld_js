const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const token = '7434320465:AAFoLd8vdBWF7GaSCjXkNaGbYVK9Jr0yDuQ';
const bot = new TelegramBot(token, { polling: true });
const app = express();
const port = 3000;

// Bot will respond to /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello, World!');
});

// Simple web server to display "Hello, World!" on visiting the URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
