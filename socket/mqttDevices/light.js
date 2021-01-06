const mqtt = require('../../mqtt/mqtt')

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
    if(action === "dimmer"){
      let y = Number(atrebut)
      if(!y||!device.DeviceConfig.dimmer)
        return false
      if(y > Number(device.DeviceConfig.maxDimmer)||y < Number(device.DeviceConfig.minDimmer))
        return false
      mqtt.public(device.DeviceConfig.dimmer,String(y))
      return true;
    }
    if(action === "color"){
      let y = Number(atrebut)
      if(!y||!device.DeviceConfig.color)
        return false
      if(y > device.DeviceConfig.maxcolor||y < device.DeviceConfig.mincolor)
        return false
      mqtt.public(device.DeviceConfig.color,String(y))
      return true;
    }
    if(action === "mode"){
      let y = Number(atrebut)
      if(!device.DeviceConfig.mode)
        return false
      if(atrebut){
        if(atrebut > device.DeviceConfig.countMode-1||atrebut < 0)
          return false
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