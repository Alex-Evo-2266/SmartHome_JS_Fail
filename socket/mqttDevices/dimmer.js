const mqtt = require('../../mqtt/mqtt')

module.exports = async function (device,action,atrebut,socket) {
  try {
    console.log(device,action,atrebut);
    if(device.DeviceConfig.pover&&(action === "poverOn"||(action === "poverTogle"&&device.DeviceValue.pover===device.DeviceConfig.turnOffSignal))){
      mqtt.public(device.DeviceConfig.pover,device.DeviceConfig.turnOnSignal)
      return true;
    }
    if(device.DeviceConfig.pover&&(action === "poverOff"||(action === "poverTogle"&&device.DeviceValue.pover===device.DeviceConfig.turnOnSignal))){
      mqtt.public(device.DeviceConfig.pover,device.DeviceConfig.turnOffSignal)
      return true;
    }
    if(action === "dimmer"){
      let y = Number(atrebut)
      if(!y||!device.DeviceConfig.dimmer)
        return false
      if(y > Number(device.DeviceConfig.maxDimmer)||y < Number(device.DeviceConfig.minDimmer))
        return false
      mqtt.public(device.DeviceConfig.dimmer,String(y))
      return true;
    }
  } catch (e) {
    console.error(e);
  }
}
