const mqtt = require('../../mqtt/mqtt')

module.exports = async function (device,action,atrebut) {
  try {
    console.log(device,action,atrebut);
    if(action === "send"&&device.DeviceConfig.command){
      mqtt.public(device.DeviceConfig.command,atrebut)
      return true;
    }
  } catch (e) {
    console.error(e);
  }
}
