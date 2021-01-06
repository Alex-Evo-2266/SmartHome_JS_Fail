const mqtt = require('../../mqtt/mqtt')
const devices = require('../../mySQL/Devices');

module.exports = async function (device,action,atrebut,socket) {
  console.log(device,action);
  if(action === "poverOn"||(action === "poverTogle"&&device.DeviceValue.pover===device.DeviceConfig.turnOffSignal)){
    mqtt.public(device.DeviceConfig.pover,device.DeviceConfig.turnOnSignal)
    let value = device.DeviceValue;
    value.pover = device.DeviceConfig.turnOnSignal;
    await devices.connect()
    await devices.setValue(device.DeviceId,value)
    await devices.desconnect();
    return true;
  }
  if(action === "poverOff"||(action === "poverTogle"&&device.DeviceValue.pover===device.DeviceConfig.turnOnSignal)){
    mqtt.public(device.DeviceConfig.pover,device.DeviceConfig.turnOffSignal)
    let value = device.DeviceValue;
    value.pover = device.DeviceConfig.turnOffSignal;
    await devices.connect()
    await devices.setValue(device.DeviceId,value)
    await devices.desconnect();
    return true;
  }
  if(action === "dimmer"){
    if(!atrebut||!device.DeviceConfig.lavelLight)
      return false
    if(atrebut >= device.DeviceConfig.maxLight||atrebut <= device.DeviceConfig.minLight)
      return false
    mqtt.public(device.DeviceConfig.lavelLight,atrebut)
    let value = device.DeviceValue;
    value.dimmer = atrebut;
    await devices.connect()
    await devices.setValue(device.DeviceId,value)
    await devices.desconnect();
    return true;
  }
}
