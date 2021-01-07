import React,{createContext,useEffect,useContext, useState} from 'react'
import {AuthContext} from '../context/AuthContext.js'



export const SocketContext = createContext()


export const SocketState = ({children})=>{
  const {socket,userId} = useContext(AuthContext)
  const [newMessage, setNewMessage] = useState({})

  function saveMessage(msg) {
    if(newMessage!==msg){
      setNewMessage(msg)
    }
  }

  const terminalMessage = (message,cb)=>{
    console.log(message);
    socket.emit('terminal message',{message},data=>{
      console.log(data);
      if(typeof(cb)==="function"&&data)
        cb(data)
    })
  }
  // socket.on('server',(data)=>{
  //   if(data&&data.message==="started"){
  //     window.location.reload();
  //   }
  // })
  socket.on('terminal ret message',(data)=>{
    saveMessage(data)
  })
  const joined = (room)=>{
    socket.emit('user Joined',{userId},data=>{
      console.log(data);
    })
  }

  useEffect(()=>{
    console.log(newMessage);
  },[newMessage])

  return(
    <SocketContext.Provider value={{terminalMessage, message:newMessage,joined}}>
      {children}
    </SocketContext.Provider>
  )
}
