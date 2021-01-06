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
    console.log("connect topic",topik);
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
    updataValueDevices(topic,message.toString())
  })
}

const updataValueDevices = async(topic,mes)=>{
  await devices.connect()
  const elements = await devices.lookForDeviceByTopic(topic)
  await devices.desconnect();
  for(let item of elements) {
    console.log("!",item);
    let value = 0;
    if(item.key==="pover"){
      if(mes==="0")
        value='0'
      else
        value='1'
    }
    else {
      value = mes
    }
    await devices.connect()
    await devices.setValue(item.deviceId,item.key,value)
    await devices.desconnect();
  }

}

const desconnect = ()=>{
  client.end()
  console.log("mqtt desconnect");
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
      if(devicesList[i].DeviceConfig.pover){
        subscribe(devicesList[i].DeviceConfig.pover)
      }
      if(devicesList[i].DeviceConfig.dimmer){
        subscribe(devicesList[i].DeviceConfig.dimmer)
      }
      if(devicesList[i].DeviceConfig.lavelLight){
        subscribe(devicesList[i].DeviceConfig.lavelLight)
      }
      if(devicesList[i].DeviceConfig.color){
        subscribe(devicesList[i].DeviceConfig.color)
      }
      if(devicesList[i].DeviceConfig.mode){
        subscribe(devicesList[i].DeviceConfig.mode)
      }
    }
  } catch (e) {
    console.error("error",e);
  }
}