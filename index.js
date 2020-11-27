const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const routerAuth = require('./routers/autorizationRouter')
const imageRouter = require('./routers/imageRouter')
const devicesRouter = require('./routers/devicesRouter')
const userRouter = require('./routers/userRouter')
const configRouter = require('./routers/configRouter')
var multer = require ('multer')

var storage = multer.diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
            switch (file.mimetype) {
                case 'image/jpeg':
                    ext = '.jpeg';
                    break;
                case 'image/png':
                    ext = '.png';
                    break;
            }
            cb(null, file.originalname + ext);
        }
    });

var upload = multer({storage: storage});

const app = express();

const PORT = config.get('port') || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(upload.single('photo'));
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
  console.log("server error", e.message);
  //process.exit();
}
