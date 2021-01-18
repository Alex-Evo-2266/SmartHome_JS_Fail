const mqtt = require('../mqtt/mqtt')
const scripts = require('../mySQL/Scripts');
const runScript = require('./runScript')

const giveScripts = async(idDevise)=>{
  try {
    await scripts.connect();
    let triggerScripts = await scripts.lookForScriptByStatus("trigger")
    await scripts.desconnect();
    for (var item of triggerScripts) {
      for (var item2 of item.ScriptTrigger) {
        if(item2.type==="device"&&item2.DeviseId===idDevise){
          runScript(item)
          break;
        }
      }
    }
  } catch (e) {
    console.error("AutoScript Error",e);
  }
}

module.exports.trigger = giveScripts;
