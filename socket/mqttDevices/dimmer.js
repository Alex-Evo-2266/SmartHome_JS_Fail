const mqtt = require('../../mqtt/mqtt')

module.exports = async function (device,action,atrebut,socket) {
  try {
    console.log(device,action,atrebut);
    if(device.DeviceConfig.power&&(action === "powerOn"||(action === "powerTogle"&&device.DeviceValue.power===device.DeviceConfig.turnOffSignal))){
      mqtt.public(device.DeviceConfig.power,device.DeviceConfig.turnOnSignal)
      return true;
    }
    if(device.DeviceConfig.power&&(action === "powerOff"||(action === "powerTogle"&&device.DeviceValue.power===device.DeviceConfig.turnOnSignal))){
      mqtt.public(device.DeviceConfig.power,device.DeviceConfig.turnOffSignal)
      return true;
    }
    if(device.DeviceConfig.power&&action === "powerTogle"){
      mqtt.public(device.DeviceConfig.power,device.DeviceConfig.turnOffSignal)
      return true;
    }
    if(action === "dimmer"){
      let y = Number(atrebut)
      if(y===null||y===undefined||!device.DeviceConfig.dimmer)
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
