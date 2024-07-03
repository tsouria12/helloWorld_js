const express = require('express');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_FALLBACK_TOKEN';
const bot = new TelegramBot(token);
const app = express();
const port = process.env.PORT || 3000;

// Webhook route setup
app.use(express.json());
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Set webhook
const domain = process.env.DOMAIN || 'yourdomain.com'; // Replace with your Render domain
bot.setWebHook(`https://${domain}/bot${token}`);

// Simple web server to display "Hello, World!" on visiting the URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
