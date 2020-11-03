const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const routerAuth = require('./routers/autorizationRouter')
const imageRouter = require('./routers/imageRouter')

const app = express();

const PORT = config.get('port') || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use('/api/auth',routerAuth);
app.use('/api/base',imageRouter);
///api/base/fonImage/:type

try {
  app.listen(PORT, () => {
    console.log("Server started");
  });
} catch (e) {
  console.log("server error", e.message);
  //process.exit();
}
