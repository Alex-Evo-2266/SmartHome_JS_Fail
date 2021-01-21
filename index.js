const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const routerAuth = require('./routers/autorizationRouter')
const imageRouter = require('./routers/imageRouter')
const devicesRouter = require('./routers/devicesRouter')
const userRouter = require('./routers/userRouter')
const usersRouter = require('./routers/usersRouter')
const configRouter = require('./routers/configRouter')
const homeConfig = require('./routers/homeRouter')
const terminalRouter = require('./routers/terminalRouter')
const scriptRouter = require('./routers/scriptsRouter')
const socket = require('./socket/socket')
const mqtt = require('./mqtt/mqtt')
// const fon = require('./multerConfig/fon.js')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);



const PORT = config.get('port') || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(fon('fon-day'));

app.use(bodyParser.json());
app.use('/api/auth',routerAuth);
app.use('/api/base',imageRouter);
app.use('/api/devices',devicesRouter);
app.use('/api/user',userRouter);
app.use('/api/users',usersRouter);
app.use('/api/server',configRouter);
app.use('/api/homeConfig',homeConfig);
app.use('/api/terminal',terminalRouter);
app.use('/api/script',scriptRouter);
///api/base/fonImage/:type

try {
  server.listen(PORT, () => {
    console.log("Server started");
  });
  socket(server,io)
  mqtt.connect()
} catch (e) {
  console.log("server error linux test", e.message);
  //process.exit();
}
