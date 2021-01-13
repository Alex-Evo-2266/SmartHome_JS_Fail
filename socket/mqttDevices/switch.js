const mqtt = require('../../mqtt/mqtt')

module.exports = async function (device,action,atrebut,socket) {
  try {
    console.log(device,action,atrebut);
    if(action === "powerOn"||(action === "powerTogle"&&device.DeviceValue.power===device.DeviceConfig.turnOffSignal)){
      mqtt.public(device.DeviceConfig.power,device.DeviceConfig.turnOnSignal)
      return true;
    }
    if(action === "powerOff"||(action === "powerTogle"&&device.DeviceValue.power===device.DeviceConfig.turnOnSignal)){
      mqtt.public(device.DeviceConfig.power,device.DeviceConfig.turnOffSignal)
      return true;
    }
    if(action === "powerTogle"){
      mqtt.public(device.DeviceConfig.power,device.DeviceConfig.turnOffSignal)
      return true;
    }
  } catch (e) {
    console.error(e);
  }
}
