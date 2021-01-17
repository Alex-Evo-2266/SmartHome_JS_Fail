const mqtt = require('../mqtt/mqtt')
const scripts = require('../mySQL/Scripts');

const giveScripts = ()=>{
  try {
    await scripts.connect();
    // res.status(201).json(await scripts.Scripts())
    await scripts.desconnect();
  } catch (e) {
    console.error("AutoScript Error",e);
  }
}

module.exports = name;
