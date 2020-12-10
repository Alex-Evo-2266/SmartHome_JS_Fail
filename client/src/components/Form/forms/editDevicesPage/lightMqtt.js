import React, {useState,useEffect,useContext} from 'react'
import {HidingLi} from '../../../hidingLi.js'
import {useHttp} from '../../../../hooks/http.hook'
import {useMessage} from '../../../../hooks/message.hook'
import {AuthContext} from '../../../../context/AuthContext.js'

export const LightMqttEdit = ({deviceData,hide})=>{
  const auth = useContext(AuthContext)
  const {message} = useMessage();
  const {request, error, clearError} = useHttp();

  useEffect(()=>{
    message(error,"error")
    return ()=>{
      clearError();
    }
  },[error,message, clearError])

  const [device, setDevice] = useState({
    DeviceId:deviceData.DeviceId,
    DeviceInformation:deviceData.DeviceInformation,
    DeviceName:deviceData.DeviceName,
    DeviceType:deviceData.DeviceType,
    DeviceTypeConnect:deviceData.DeviceTypeConnect,
    RoomId:deviceData.RoomId,
    pover:deviceData.DeviceConfig.pover,
    poverStatus:deviceData.DeviceConfig.poverStatus,
    turnOnSignal:deviceData.DeviceConfig.turnOnSignal,
    turnOffSignal:deviceData.DeviceConfig.turnOffSignal,
    lavelLight:deviceData.DeviceConfig.lavelLight,
    lavelLightStatus:deviceData.DeviceConfig.lavelLightStatus,
    maxLight:deviceData.DeviceConfig.maxLight,
    minLight:deviceData.DeviceConfig.minLight,
    color:deviceData.DeviceConfig.color,
    colorStatus:deviceData.DeviceConfig.colorStatus,
    maxColor:deviceData.DeviceConfig.maxColor,
    minColor:deviceData.DeviceConfig.minColor,
    mode:deviceData.DeviceConfig.mode,
    modeStatus:deviceData.DeviceConfig.modeStatus,
    countMode: deviceData.DeviceConfig.countMode
  })

  const changeHandler = event => {
    setDevice({ ...device, [event.target.name]: event.target.value })
  }
  const outHandler = async ()=>{
    let dataout = {DeviceConfig:{}}
    for(let key in device){
      if(key.indexOf("Device")!==0&&key!=="RoomId"){
        dataout.DeviceConfig[key] = device[key]
      }
      else{
        dataout[key] = device[key]
      }
    }
    await request(`/api/devices/edit`, 'POST', {...dataout},{Authorization: `Bearer ${auth.token}`})
    hide();
  }

  const deleteHandler = async () =>{
    await request(`/api/devices/delete`, 'POST', {DeviceId:device.DeviceId},{Authorization: `Bearer ${auth.token}`})
    hide();
  }

  return (
    <ul>
      <li>
        <label>
          <h5>{`Type - ${device.DeviceType}`}</h5>
          <h5>{`Type connect - ${device.DeviceTypeConnect}`}</h5>
        </label>
      </li>
      <li>
        <label>
          <h5>Name</h5>
          <input className = "textInput" placeholder="name" id="DeviceName" type="text" name="DeviceName" value={device.DeviceName} onChange={changeHandler} required/>
        </label>
      </li>
      <li>
        <label>
          <h5>information</h5>
          <input className = "textInput" placeholder="information" id="DeviceInformation" type="text" name="DeviceInformation" value={device.DeviceInformation} onChange={changeHandler} required/>
        </label>
      </li>
      <HidingLi title = "Pover config">
        <label>
          <h5>pover topic</h5>
          <input className = "textInput" placeholder="pover" id="pover" type="text" name="pover" value={device.pover} onChange={changeHandler} required/>
        </label>
        <label>
          <h5>pover status topic</h5>
          <input className = "textInput" placeholder="poverStatus" id="poverStatus" type="text" name="poverStatus" value={device.poverStatus} onChange={changeHandler} required/>
        </label>
        <label>
          <h5>turn on signal</h5>
          <input className = "textInput" placeholder="turnOnSignal" id="turnOnSignal" type="text" name="turnOnSignal" value={device.turnOnSignal} onChange={changeHandler} required/>
        </label>
        <label>
          <h5>turn off signal</h5>
          <input className = "textInput" placeholder="turnOffSignal" id="turnOffSignal" type="text" name="turnOffSignal" value={device.turnOffSignal} onChange={changeHandler} required/>
        </label>
      </HidingLi>
      <HidingLi title = "Dimmer">
      <label>
        <h5>lavel light topic</h5>
        <input className = "textInput" placeholder="lavelLight" id="lavelLight" type="text" name="lavelLight" value={device.lavelLight} onChange={changeHandler} required/>
      </label>
      <label>
        <h5>lavel light status</h5>
        <input className = "textInput" placeholder="lavelLightStatus" id="lavelLightStatus" type="text" name="lavelLightStatus" value={device.lavelLightStatus} onChange={changeHandler} required/>
      </label>
      <label>
        <h5>max light</h5>
        <input className = "textInput" placeholder="maxLight" id="maxLight" type="text" name="maxLight" value={device.maxLight} onChange={changeHandler} required/>
      </label>
      <label>
        <h5>min light</h5>
        <input className = "textInput" placeholder="minLight" id="minLight" type="text" name="minLight" value={device.minLight} onChange={changeHandler} required/>
      </label>
      </HidingLi>
      <HidingLi title = "Color">
      <label>
        <h5>color topic</h5>
        <input className = "textInput" placeholder="color" id="color" type="text" name="color" value={device.color} onChange={changeHandler} required/>
      </label>
      <label>
        <h5>color status topic</h5>
        <input className = "textInput" placeholder="colorStatus" id="colorStatus" type="text" name="colorStatus" value={device.colorStatus} onChange={changeHandler} required/>
      </label>
      <label>
        <h5>max color</h5>
        <input className = "textInput" placeholder="max color" id="maxColor" type="text" name="maxColor" value={device.maxColor} onChange={changeHandler} required/>
      </label>
      <label>
        <h5>min color</h5>
        <input className = "textInput" placeholder="min color" id="minColor" type="text" name="minColor" value={device.minColor} onChange={changeHandler} required/>
      </label>
      </HidingLi>
      <HidingLi title = "Mode">
      <label>
        <h5>mode topic</h5>
        <input className = "textInput" placeholder="mode" id="mode" type="text" name="mode" value={device.mode} onChange={changeHandler} required/>
      </label>
      <label>
        <h5>mode status topic</h5>
        <input className = "textInput" placeholder="modeStatus" id="modeStatus" type="text" name="modeStatus" value={device.modeStatus} onChange={changeHandler} required/>
      </label>
      <label>
        <h5>count mode</h5>
        <input className = "textInput" placeholder="countMode" id="countMode" type="text" name="countMode" value={device.countMode} onChange={changeHandler} required/>
      </label>
      </HidingLi>
      <div className="controlForm" >
        <button className="formEditBtn Delete" onClick={deleteHandler}>Delete</button>
        <button className="formEditBtn" onClick={outHandler}>Save</button>
      </div>
    </ul>
  )

}
