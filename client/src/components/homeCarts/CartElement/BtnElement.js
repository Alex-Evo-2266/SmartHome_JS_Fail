import React,{useState,useContext,useEffect,useCallback} from 'react'
import {SocketContext} from '../../../hooks/socket.hook'
import {DeviceStatusContext} from '../../../context/DeviceStatusContext'
import {CartEditContext} from '../EditCarts/CartEditContext'

export const BtnElement = ({data,className,index,children,name,onClick,disabled=false,editBtn,firstValue=false,switchMode=true,deleteBtn}) =>{
  const socket = useContext(SocketContext)
  const {devices, updateDevice} = useContext(DeviceStatusContext)
  const [value, setValue]=useState(firstValue)
  const [device, setDevice] = useState({})
  const {target} = useContext(CartEditContext)

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
      if(!/\D/.test(device.DeviceValue.pover)&&!/\D/.test(device.DeviceConfig.turnOffSignal)&&!/\D/.test(device.DeviceConfig.turnOnSignal)){
        let poz = Number(device.DeviceValue.pover)
        let min = Number(device.DeviceConfig.turnOffSignal)
        let max = Number(device.DeviceConfig.turnOnSignal)
        if(poz>min&&poz<=max)
          setValue(true)
        else
          setValue(false)
      }
      if(device.DeviceValue.pover===device.DeviceConfig.turnOffSignal)
        setValue(false)
      if(device.DeviceValue.pover===device.DeviceConfig.turnOnSignal)
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
  setValue((prev)=>!prev)
  if(!switchMode){
    setTimeout(()=>setValue(false),250)
  }
  if(typeof(onClick)==="function"){
    onClick(event, value,setValue)
  }

  if(!data||!device)
    return
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
  if(data.type==="ir")
      socket.terminalMessage(`device ${device.DeviceSystemName} send ${data.value}`)
  // socket.terminalMessage()
  setTimeout(()=>updateDevice(),500)
}

  const deletebtn = ()=>{
    if(typeof(deleteBtn)==="function"){
      deleteBtn(index)
    }
  }

  const editbtn = ()=>{
    if(typeof(editBtn)==="function"){
      target("button",{...data,index},editBtn)
    }
  }

  return(
    <label className={`BtnElement ${className}`}>
      <input type="checkbox" checked={value} name={name} onChange={changeHandler} disabled={disabled}/>
      <div className="icon-box">
        <div>
        {
          (deleteBtn)?
          <button className="deleteBtn" onClick={deletebtn}>&times;</button>:
          null
        }
        {
          (editBtn)?
          <button className="editBtn" onClick={editbtn}>
            <i className="fas fa-list i-cost"></i>
          </button>:
          null
        }
        </div>
        {children}
      </div>

    </label>
  )
}
