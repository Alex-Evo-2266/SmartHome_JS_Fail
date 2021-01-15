import React,{useState,useEffect,useContext,useCallback} from 'react'
import {DeviceStatusContext} from '../../../context/DeviceStatusContext'
import {actClass} from '../../../myClass.js'

export const ActBlock = ({deviceId,type,updata,index,el,block,deleteEl})=>{
  const [status, setStatus]=useState(["power"])
  const [device, setDevice]=useState({})
  const {devices} = useContext(DeviceStatusContext)
  const [result, setResult]=useState(el)
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
    updata(el2,index,block)
  }

  const changeHandler = event => {
    changeResult(event.target.name,event.target.value)
  }

  useEffect(()=>{
    console.log(el);
  },[])

  useEffect(()=>{
    setDevice(lookForDeviceById(result.DeviseId))
  },[lookForDeviceById,result])

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
        mas.push("mode","togleMode")
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
    if(device.DeviceType==="ir"){
      changeResult("property","command")
      setStatus(["command"])
    }
    if(device.DeviceType==="variable"){
      // if(result.propert==="power")
       changeResult("property","value")
      setStatus(["value"])
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
      <div className="valueBlock">
        <div className="typeBlock">
          {"Set in: "}
        </div>
        <div className="inputValueBlock">
        {
          (result.property==="power")?
          <select value={result.value} name="value" onChange={changeHandler}>
            <option value={"powerOn"}>On</option>
            <option value={"powerOff"}>Off</option>
            <option value={"powerTogle"}>Togle</option>
          </select>:
          (result.property==="command"||device.DeviceType==="variable")?
          <input type="text" value={result.value} name="value" onChange={changeHandler}/>:
          (result.property==="togleMode")?
          <p> following</p>:
          <input type="number" value={Number(result.value)} name="value" onChange={changeHandler}/>
        }
        </div>
      </div>
      <div className="deleteBlock" onClick={()=>{deleteEl(index,block)}}>
        <i className="fas fa-trash"></i>
      </div>
    </div>
  )
}
