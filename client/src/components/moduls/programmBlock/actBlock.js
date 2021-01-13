import React,{useState,useEffect} from 'react'

export const ActBlock = ({device})=>{
  const [status, setStatus]=useState(["power"])
  const [result, setResult]=useState({

  })

  useEffect(()=>{
    if(!device)return;
    if(device.DeviceType==="light"){
      let mas = ["power"];
      if(device.DeviceConfig.dimmer)
        mas.push("dimmer")
      if(device.DeviceConfig.color)
        mas.push("color")
      if(device.DeviceConfig.mode)
        mas.push("mode")
      setStatus(mas)
    }
    if(device.DeviceType==="dimmer"){
      let mas = ["dimmer"];
      if(device.DeviceConfig.power)
        mas.push("power")
      setStatus(mas)
    }
    if(device.DeviceType==="switch"){
      let mas = ["power"];
      setStatus(mas)
    }
    if(device.DeviceType==="binarySensor"){
      let mas = ["value","battary"];
      setStatus(mas)
    }
    if(device.DeviceType==="sensor"){
      let mas = ["value","battary"];
      setStatus(mas)
    }
  },[device])

  return(
    <div className="actBlock">
      <div className="deviceBlock">
        <div className="nameBlock">
          {(device)?device.DeviceName:"Name"}
        </div>
        <div className="stateBlock">
          <select>
            {
              status.map((item)=>{
                return(
                  <option>{item}</option>
                )
              })
            }
          </select>
        </div>
      </div>
      <div className="operBlock">
        ==
      </div>
      <div className="valueBlock">
        4
      </div>
    </div>
  )
}
