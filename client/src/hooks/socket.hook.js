import React,{createContext,useEffect,useContext, useState,useRef,useCallback} from 'react'
import {AuthContext} from '../context/AuthContext.js'
import io from 'socket.io-client';


export const SocketContext = createContext()


export const SocketState = ({children})=>{
  const {socket,userId} = useContext(AuthContext)
  const [newMessage, setNewMessage] = useState({})

  function saveMessage(msg) {
    if(newMessage!==msg){
      setNewMessage(msg)
    }
  }

  const terminalMessage = (message)=>{
    console.log(message);
    socket.emit('terminal message',{message})
  }
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
