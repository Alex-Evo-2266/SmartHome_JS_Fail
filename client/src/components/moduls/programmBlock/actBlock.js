import React,{useState,useEffect,useContext,useCallback} from 'react'
import {DeviceStatusContext} from '../../../context/DeviceStatusContext'
import {ifClass} from '../../../myClass.js'

export const ActBlock = ({deviceId,updata,index,el})=>{
  const [status, setStatus]=useState(["power"])
  const [device, setDevice]=useState({})
  const {devices} = useContext(DeviceStatusContext)
  const [result, setResult]=useState(el||new ifClass("0","","==","4"))
  // {
  //   DeviseId:deviceId,
  //   property:"",
  //   oper:"==",
  //   value:""
  // }

  const lookForDeviceById = useCallback((id)=>{
    let condidat = devices.filter((item)=>item.DeviceId===id)
    return condidat[0];
  },[])

  const changeResult = (key,value)=>{
    if(typeof(result.changeHandler)!=="function")
      return
    let el2 = result
    el2.changeHandler(key,value)
    setResult(el2)
    updata(el2,index)
  }

  const changeHandler = event => {
    changeResult(event.target.name,event.target.value)
  }

  useEffect(()=>{
    setDevice(lookForDeviceById(result.DeviseId))
  },[deviceId,lookForDeviceById,result])

  useEffect(()=>{
    if(!device)return;
    if(device.DeviceType==="light"){
      changeResult("property","power")
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
      changeResult("property","dimmer")
      let mas = ["dimmer"];
      if(device.DeviceConfig.power)
        mas.push("power")
      setStatus(mas)
    }
    if(device.DeviceType==="switch"){
      changeResult("property","power")
      let mas = ["power"];
      setStatus(mas)
    }
    if(device.DeviceType==="binarySensor"){
      setStatus(["value","battery"])
      changeResult("property","value")
    }
    if(device.DeviceType==="sensor"){
      setStatus(["value","battery"])
      changeResult("property","value")
    }
  },[device])

  return(
    <div className="actBlock">
      <div className="deviceBlock">
        <div className="nameBlock">
          {(device)?device.DeviceName:"Name"}
        </div>
        <div className="stateBlock">
          <select value={result.property} onChange={changeHandler} name="property">
            {
              status.map((item,index)=>{
                return(
                  <option key={index} value={item}>{item}</option>
                )
              })
            }
          </select>
        </div>
      </div>
      <div className="operBlock">
        <select value={result.oper} name="oper" onChange={changeHandler}>
          <option value={"=="}>{"=="}</option>
          <option value={"!="}>!=</option>
          {
            (result.property!=="power")?
            <>
              <option value={">="}>{">="}</option>
              <option value={"<="}>{"<="}</option>
              <option value={">"}>{">"}</option>
              <option value={"<"}>{"<"}</option>
            </>
            :null
          }
        </select>
      </div>
      <div className="valueBlock">
        <div className="typeBlock">
        {
          (result.property==="power")?
          "status: ":"value: "
        }
        </div>
        <div className="inputValueBlock">
        {
          (result.property==="power")?
          <select value={result.value} name="value" onChange={changeHandler}>
            <option value={"1"}>On</option>
            <option value={"0"}>Off</option>
          </select>:
          (result.oper==="=="||result.oper==="!=")?
          <input type="text" value={result.value} name="value" onChange={changeHandler}/>:
          <input type="number" value={Number(result.value)} name="value" onChange={changeHandler}/>
        }
        </div>
      </div>
    </div>
  )
}
