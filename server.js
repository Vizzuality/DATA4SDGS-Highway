require('dotenv').config();
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const Twitter = require('twitter');

const app = express();
const port = process.env.PORT || 5000;
const indexPath = path.join(process.cwd(), 'dist/index.html');

app.use(serveStatic(__dirname + '/dist'));

const twitter = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

app.get('/api/twitter', (req, res) => {
  const urlPath = 'search/tweets';
  const params = { q: '#DataRevolution #GlobalGoals filter:safe', count: 10 };
  twitter.get(urlPath, params, (err, timeline) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(timeline);
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

app.listen(port);

console.log('Server started '+ port);
