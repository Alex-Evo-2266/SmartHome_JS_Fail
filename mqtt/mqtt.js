var mqtt = require('mqtt')
const serverConfig = require('../serverConfig/config')
const devices = require('../mySQL/Devices');


let client
const connect = ()=>{
  client = mqtt.connect(`mqtt://${serverConfig.mqttBroker}`,{username:serverConfig.loginMqttBroker,password:serverConfig.passwordMqttBroker})
  client.on('connect', function () {
    console.log("mqtt connected");
    return true;
  })
  client.on('error',function (er) {
    console.log("error",er);
  })
  client.on('reconnect',function (er) {
    console.log("reconnect",er);
  })
  subscribe('test')
  input()
  subscribeDevicesStatus()
}
module.exports.connect = connect

const subscribe = (topik)=>{
  client.subscribe(topik, function () {
    console.log(topik);
  })
}
module.exports.subscribe = subscribe

const public = (topic, mes)=>{
  client.publish(topic, mes)
}
module.exports.public = public

const input = (ret)=>{
  client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString(),topic)
  })
}

const desconnect = ()=>{
  client.end()
}
module.exports.desconnect = desconnect

const subscribeDevicesStatus = async()=>{
  try {
    await devices.connect()
    const devicesList = await devices.Devices()
    await devices.desconnect();

    for (let i = 0; i < devicesList.length; i++) {
      if (devicesList[i].DeviceConfig.status) {
        subscribe(devicesList[i].DeviceConfig.status)
      }
      if(devicesList[i].DeviceConfig.poverStatus){
        subscribe(devicesList[i].DeviceConfig.poverStatus)
      }
      if(devicesList[i].DeviceConfig.lavelLightStatus){
        subscribe(devicesList[i].DeviceConfig.lavelLightStatus)
      }
      if(devicesList[i].DeviceConfig.colorStatus){
        subscribe(devicesList[i].DeviceConfig.colorStatus)
      }
      if(devicesList[i].DeviceConfig.modeStatus){
        subscribe(devicesList[i].DeviceConfig.modeStatus)
      }
    }
  } catch (e) {
    console.error("error",e);
  }
}
