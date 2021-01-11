import React,{useState,useContext,useEffect,useCallback} from 'react'
import {SocketContext} from '../../../hooks/socket.hook'
import {DeviceStatusContext} from '../../../context/DeviceStatusContext'

export const SliderElement = ({index,data,min=0,max=100,firstValue=0,deleteBtn=false,onClick}) =>{
  const socket = useContext(SocketContext)
  const {devices, updateDevice} = useContext(DeviceStatusContext)
  const [value , setValue] = useState(firstValue)
  const [device, setDevice] = useState({})
  const [minstate, setMin] = useState(0)
  const [maxstate, setMax] = useState(100)

  const lookForDeviceById = useCallback((id)=>{
    if(!devices||!devices[0]||!data)
      return false
    console.log(devices);
    let condidat = devices.filter((item)=>item.DeviceId===id)
    if(data.type==="dimmer"){
      setMin(condidat[0].DeviceConfig.minDimmer)
      setMax(condidat[0].DeviceConfig.maxDimmer)
    }
    if(data.type==="color"){
      setMin(condidat[0].DeviceConfig.minColor)
      setMax(condidat[0].DeviceConfig.maxColor)
    }
    return condidat[0]
  },[devices])

  useEffect(()=>{
    if(!data||!data.IdDevice||typeof(onClick)==="function"){
      setMin(min)
      setMax(max)
      return
    }
    setDevice(lookForDeviceById(data.IdDevice))
  },[devices,data,onClick,lookForDeviceById])

  useEffect(()=>{
    if(typeof(onClick)==="function")return
    if(device&&data&&data.type==="dimmer"&&device.DeviceValue&&device.DeviceValue.dimmer){
      if(!/\D/.test(device.DeviceValue.dimmer)){
        let poz = Number(device.DeviceValue.dimmer)
        setValue(poz)
      }
    }
    if(device&&data&&data.type==="color"&&device.DeviceValue&&device.DeviceValue.color){
      if(!/\D/.test(device.DeviceValue.color)){
        let poz = Number(device.DeviceValue.color)
        setValue(poz)
      }
    }
  },[device,onClick,data])

  const changeHandler = (event)=>{
    setValue(event.target.value);
  }

  const mouseUp = (event)=>{
    if(typeof(onClick)==="function"){
      onClick(event, value,setValue)
    }

    if(!data||!device)
      return
    if(data.type==="dimmer")
        socket.terminalMessage(`device ${device.DeviceSystemName} dimmer ${value}`)
    if(data.type==="color")
        socket.terminalMessage(`device ${device.DeviceSystemName} color ${value}`)
    // socket.terminalMessage()
    setTimeout(()=>updateDevice(),500)
  }

  // let step = (maxstate-minstate)*0.25
  // style={{
  //   boxShadow:`inset 0 0 4px rgba(0, 0, 0, 0.2)${(value>minstate)?",0 0 10px #3498db":""}${(value>minstate+step)?",0 0 15px #3498db":""}${(value>minstate+step*2)?",0 0 20px #3498db":""}${(value>minstate+step*3)?",0 0 25px #3498db":""}${(value==maxstate)?",0 0 30px #3498db":""}`
  // }}
return(
  <div className="slider-box">
    <div className="slider">
      <input
      type="range"
      min={minstate}
      max={maxstate}
      value={value}
      onChange={changeHandler}
      onMouseUp={mouseUp}
      />
    </div>
    <div className="value">{value}</div>
    <div className="delete-box">
    {
      (deleteBtn)?<button className="deleteBtn" onClick={()=>{
        if(typeof(deleteBtn)==="function"){
          deleteBtn(index)
        }
      }}>&times;</button>:null
    }
    </div>
  </div>
)
}
