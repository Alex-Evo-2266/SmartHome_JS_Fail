const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const routerAuth = require('./routers/autorizationRouter')

const app = express();

const PORT = config.get('port') || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use('/api/auth',routerAuth);

try {
  app.listen(PORT, () => {
    console.log("Server started");
  });
} catch (e) {
  console.log("server error", e.message);
  //process.exit();
}
