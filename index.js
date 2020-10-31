const express = require('express');
const config = require('config');

const app = express();

const PORT = config.get('port') || 5000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

async function start() {
  try {
    app.listen(PORT, () => {
      console.log("Server started");
    });
  } catch (e) {
    console.log("server error", e.message);
    process.exit();
  }
}

app.listen(PORT, ()=>console.log(`server started. port: ${PORT}...`))
