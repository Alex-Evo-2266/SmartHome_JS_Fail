import React,{useState,useContext,useEffect,useCallback} from 'react'
import {SocketContext} from '../../../hooks/socket.hook'
import {DeviceStatusContext} from '../../../context/DeviceStatusContext'

export const BtnElement = ({data,className,index,children,name,onClick,disabled=false,firstValue=false,switchMode=true,deleteBtn}) =>{
  const socket = useContext(SocketContext)
  const {devices, updateDevice} = useContext(DeviceStatusContext)
  const [value, setValue]=useState(firstValue)
  const [device, setDevice] = useState({})

  const lookForDeviceById = useCallback((id)=>{
    if(!devices||!devices[0])
      return false
    let condidat = devices.filter((item)=>item.DeviceId===id)
    return condidat[0]
  },[devices])

  useEffect(()=>{
    if(!data||!data.IdDevice||typeof(onClick)==="function")
      return
    setDevice(lookForDeviceById(data.IdDevice))
  },[devices,data,onClick,lookForDeviceById])

  useEffect(()=>{
    if(typeof(onClick)==="function")return
    if(device&&data&&data.type==="pover"&&device.DeviceValue&&device.DeviceValue.pover){
      if(device.DeviceValue.pover==="0")
        setValue(false)
      if(device.DeviceValue.pover==="1")
        setValue(true)
    }
    if(device&&data&&data.type==="mode"&&device.DeviceValue&&device.DeviceValue.mode){
      if(data.value===device.DeviceValue.mode){
        setValue(true)
      }
      else {
        setValue(false)
      }
    }
  },[device,onClick,data])

const changeHandler = (event)=>{
  if(!device){
    // updataDevice(data.IdDevice)
  }
  setValue((prev)=>!prev)
  if(!switchMode){
    setTimeout(()=>setValue(false),250)
  }
  if(typeof(onClick)==="function"){
    onClick(event, value,setValue)
  }

  if(!data||!device)
    return
  console.log(data.type);
  if(data.type==="pover")
      socket.terminalMessage(`device ${device.DeviceSystemName} poverTogle`)
  if(data.type==="dimmer")
      socket.terminalMessage(`device ${device.DeviceSystemName} dimmer ${data.value}`)
  if(data.type==="color")
      socket.terminalMessage(`device ${device.DeviceSystemName} color ${data.value}`)
  if(data.type==="mode")
      socket.terminalMessage(`device ${device.DeviceSystemName} mode ${data.value}`)
  if(data.type==="switch mode")
      socket.terminalMessage(`device ${device.DeviceSystemName} mode`)
  // socket.terminalMessage()
  setTimeout(()=>updateDevice(),500)

}

  return(
    <label className={`BtnElement ${className}`}>
      <input type="checkbox" checked={value} name={name} onChange={changeHandler} disabled={disabled}/>
      <div className="icon-box">
        <div>
        {
          (deleteBtn)?<button className="deleteBtn" onClick={()=>{
            if(typeof(deleteBtn)==="function"){
              deleteBtn(index)
            }
          }}>&times;</button>:null
        }
        </div>
        {children}
      </div>

    </label>
  )
}
