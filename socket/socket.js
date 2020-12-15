const mqtt = require('../mqtt/mqtt')


 const socket = function (http, io,cb) {
  io.on('connection', socket => {
    console.log("io connect");
    if(typeof(cb) === "function"){
      cb(io,socket)
    }
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('terminal message',data=>{
      let {message} = data
      let mes = message.split(":")
      let configComponents = mes[0].replace(" ",'').split('-')
      let mesBody = mes[1]
      console.log(configComponents , mesBody);
      if(configComponents.length===3&&configComponents[0]==="mqtt"){
        if(configComponents[1]==="send"){
          mqtt.public(configComponents[2],mesBody)
        }
      }
//mqtt-send-test1:hi
      socket.emit('terminal ret message',{
        message:"ok"
      })
    })

  });
}



module.exports = socket
