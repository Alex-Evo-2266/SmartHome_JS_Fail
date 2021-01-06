const mqtt = require('../../mqtt/mqtt')

module.exports = async function (device,action,atrebut,socket) {
  try {
    console.log(device,action,atrebut);
    if(action === "send"){
      mqtt.public(device.DeviceConfig.command,atrebut)
      return true;
    }
  } catch (e) {
    console.error(e);
  }
}
