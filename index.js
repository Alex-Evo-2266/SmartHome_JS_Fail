const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const routerAuth = require('./routers/autorizationRouter')
const imageRouter = require('./routers/imageRouter')
const devicesRouter = require('./routers/devicesRouter')
const userRouter = require('./routers/userRouter')
const configRouter = require('./routers/configRouter')
// const fon = require('./multerConfig/fon.js')

const app = express();

const PORT = config.get('port') || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(fon('fon-day'));

app.use(bodyParser.json());
app.use('/api/auth',routerAuth);
app.use('/api/base',imageRouter);
app.use('/api/devices',devicesRouter);
app.use('/api/user',userRouter);
app.use('/api/server',configRouter);
///api/base/fonImage/:type

try {
  app.listen(PORT, () => {
    console.log("Server started");
  });
} catch (e) {
  console.log("server error linux test", e.message);
  //process.exit();
}
