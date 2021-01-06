const mqtt = require('../mqtt/mqtt')
const devices = require('../mySQL/Devices');
const lightMqtt = require("./mqttDevices/light")

 const socket = function (http, io,cb) {
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
                message:"light action: poverOn, poverOff, poverTogle,modeTogle, mode [number],dimmer [0-255], color [number or color or hex]"
              })
              return
            }else{
              if(await lightMqtt(device[0] , action, mes, socket)){
                socket.emit('terminal ret message',{
                  message:"ok",
                })
                await devices.connect()
                if(typeof(cb) === "function")
                  cb(await devices.lookForDeviceBySystemName(address))
                await devices.desconnect();
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
