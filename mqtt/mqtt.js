var mqtt = require('mqtt')
const serverConfig = require('../serverConfig/config')

let client
const connect = ()=>{
  client = mqtt.connect(`mqtt://${serverConfig.mqttBroker}`,{username:serverConfig.loginMqttBroker,password:serverConfig.passwordMqttBroker})
  client.on('connect', function () {
    console.log("mqtt connected");
    return true;
  })
  subscribe('test')
  input()
}
module.exports.connect = connect

const subscribe = (topik)=>{
  client.subscribe(topik, function (err) {
    console.error(err);
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
