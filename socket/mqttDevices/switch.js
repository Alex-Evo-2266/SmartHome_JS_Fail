const mqtt = require('../../mqtt/mqtt')
const devices = require('../../mySQL/Devices');

module.exports = async function (device,action,atrebut,socket) {
  try {
    console.log(device,action,atrebut);
    if(action === "poverOn"||(action === "poverTogle"&&device.DeviceValue.pover===device.DeviceConfig.turnOffSignal)){
      mqtt.public(device.DeviceConfig.pover,device.DeviceConfig.turnOnSignal)
      return true;
    }
    if(action === "poverOff"||(action === "poverTogle"&&device.DeviceValue.pover===device.DeviceConfig.turnOnSignal)){
      mqtt.public(device.DeviceConfig.pover,device.DeviceConfig.turnOffSignal)
      return true;
    }
  } catch (e) {
    console.error(e);
  }
}
