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
      console.log(data);
      socket.emit('terminal ret message',{
        message:"ret server"
      })
    })

  });
}



module.exports = socket
