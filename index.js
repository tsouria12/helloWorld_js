const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN || '7434320465:AAFoLd8vdBWF7GaSCjXkNaGbYVK9Jr0yDuQ';
const bot = new TelegramBot(token);
const app = express();
const port = process.env.PORT || 3000;

// Log webhook errors
bot.on("webhook_error", console.log);

// Webhook route setup
app.use(express.json());
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Set webhook
const domain = process.env.DOMAIN || 'helloworld-js-8v0w.onrender.com';
bot.setWebHook(`https://${domain}/bot${token}`);

// Simple web server to display "Hello, World!" on visiting the URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running and listening on port ${port}`);
});
