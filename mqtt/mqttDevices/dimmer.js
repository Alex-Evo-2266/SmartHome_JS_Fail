const mqtt = require('../../mqtt/mqtt')

module.exports = async function (device,action,atrebut) {
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
      if(y > device.DeviceConfig.maxDimmer){
        mqtt.public(device.DeviceConfig.dimmer,String(device.DeviceConfig.maxDimmer))
        return true
      }
      if(y < device.DeviceConfig.minDimmer){
        mqtt.public(device.DeviceConfig.dimmer,String(device.DeviceConfig.minDimmer))
        return true
      }
      mqtt.public(device.DeviceConfig.dimmer,String(y))
      return true;
    }
  } catch (e) {
    console.error(e);
  }
}
