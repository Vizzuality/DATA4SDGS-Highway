const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();
const port = process.env.PORT || 5000;
const indexPath = path.join(process.cwd(), 'dist/index.html');

app.use(serveStatic(__dirname + '/dist'));
app.get('*', (req, res) => {
  res.sendFile(indexPath);
});
app.listen(port);

console.log('Server started '+ port);
