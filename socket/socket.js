const mqtt = require('../mqtt/mqtt')
const devices = require('../mySQL/Devices');
const lightMqtt = require("./mqttDevices/light")
const switchMqtt = require('./mqttDevices/switch');
const ir = require('./mqttDevices/ir');
const dimmer = require('./mqttDevices/dimmer');

 const socket = function (http, io,cb) {
   // setInterval(function () {
   //   await devices.connect()
   //   const devicedata = await devices.Devices()
   //   await devices.desconnect();
   //   io.emit("new Data Devices",devicedata)
   // }, 3000);
  io.on('connection', socket => {
    console.log("io connect");
    if(typeof(cb) === "function"){
      cb(io,socket)
    }
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('terminal message',async (data,cb)=>{
      let {message} = data
      let messageElements = message.split(" ")
      let [type, address, action, mes] = messageElements
      console.log(type, address, action, mes);

      if(type==="mqtt"){
        if(action==="send"){
          mqtt.public(address,mes)
          return ;
        }
      }else if(type==="device"){
        if(!address){
          socket.emit('terminal ret message',{
            message:"'type' 'address' 'action' ['atrebut']"
          })
          return
        }
        try {
          await devices.connect()
          const device = await devices.lookForDeviceBySystemName(address)
          await devices.desconnect();
          if(device[0].DeviceType==="light"){
            if(!action){
              socket.emit('terminal ret message',{
                message:"light action: powerOn, powerOff, powerTogle,modeTogle, mode [number],dimmer number, color number"
              })
              return
            }else{
              if(await lightMqtt(device[0] , action, mes, socket)){
                socket.emit('terminal ret message',{
                  message:"ok",
                })
                return
              }
            }
          }
          if(device[0].DeviceType==="switch"){
            if(!action){
              socket.emit('terminal ret message',{
                message:"switch action: powerOn, powerOff, powerTogle"
              })
              return
            }else{
              if(await switchMqtt(device[0] , action, mes, socket)){
                socket.emit('terminal ret message',{
                  message:"ok",
                })
                return
              }
            }
          }
          if(device[0].DeviceType==="ir"){
            if(!action){
              socket.emit('terminal ret message',{
                message:"switch action: send command"
              })
              return
            }else{
              if(await ir(device[0] , action, mes, socket)){
                socket.emit('terminal ret message',{
                  message:"ok",
                })
                return
              }
            }
          }
          if(device[0].DeviceType==="dimmer"){
            if(!action){
              socket.emit('terminal ret message',{
                message:"switch action: powerOn, powerOff, powerTogle, dimmer number"
              })
              return
            }else{
              if(await dimmer(device[0] , action, mes, socket)){
                socket.emit('terminal ret message',{
                  message:"ok",
                })
                return
              }
            }
          }
          console.log(device[0].DeviceType);
        } catch (e) {
          console.error(e);
        }
      }
//devices-door1-gh
//mqtt-send-test1:hi
      socket.emit('terminal ret message',{
        message:"command undefined"
      })
    })

  });
}



module.exports = socket
