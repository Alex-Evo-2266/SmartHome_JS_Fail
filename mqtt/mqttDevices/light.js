const mqtt = require('../../mqtt/mqtt')

module.exports = async function (device,action,atrebut) {
  try {
    console.log(device.DeviceValue.power,device.DeviceConfig.turnOffSignal);
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
    if(action === "color"){
      let y = Number(atrebut)
      if(y===null||y===undefined||!device.DeviceConfig.color)
        return false
      if(y > device.DeviceConfig.maxcolor){
        mqtt.public(device.DeviceConfig.color,String(device.DeviceConfig.maxcolor))
        return true
      }
      if(y < device.DeviceConfig.mincolor){
        mqtt.public(device.DeviceConfig.color,String(device.DeviceConfig.mincolor))
        return true
      }
      mqtt.public(device.DeviceConfig.color,String(y))
      return true;
    }
    if(action === "mode"){
      let y = Number(atrebut)
      if(!device.DeviceConfig.mode)
        return false
      if(atrebut){
        if(atrebut > device.DeviceConfig.countMode-1){
          mqtt.public(device.DeviceConfig.color,String(device.DeviceConfig.countMode-1))
          return true
        }
        if(atrebut < 0){
          mqtt.public(device.DeviceConfig.color,String(0))
          return true
        }
        mqtt.public(device.DeviceConfig.mode,atrebut)
        return true;
      }
      if(device.DeviceValue.mode == device.DeviceConfig.countMode-1||!device.DeviceValue.mode)
        mqtt.public(device.DeviceConfig.mode,"0")
      else{
        let i = Number(device.DeviceValue.mode)
        i++
        mqtt.public(device.DeviceConfig.mode,String(i))
      }
      return true;
    }
  } catch (e) {
    console.error(e);
  }

}
