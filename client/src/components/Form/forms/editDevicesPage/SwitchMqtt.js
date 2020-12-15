import React, {useState,useEffect,useContext} from 'react'
import {HidingLi} from '../../../hidingLi.js'
import {useHttp} from '../../../../hooks/http.hook'
import {useMessage} from '../../../../hooks/message.hook'
import {AuthContext} from '../../../../context/AuthContext.js'
import {useChecked} from '../../../../hooks/checked.hook'


export const SwitchMqttEdit = ({deviceData,hide})=>{
  const auth = useContext(AuthContext)
  const {USText} = useChecked()
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
    DeviceSystemName:deviceData.DeviceSystemName,
    DeviceName:deviceData.DeviceName,
    DeviceType:deviceData.DeviceType,
    DeviceTypeConnect:deviceData.DeviceTypeConnect,
    RoomId:deviceData.RoomId,
    pover:deviceData.DeviceConfig.pover,
    poverStatus:deviceData.DeviceConfig.poverStatus,
    turnOnSignal:deviceData.DeviceConfig.turnOnSignal,
    turnOffSignal:deviceData.DeviceConfig.turnOffSignal
  })

  const changeHandler = event => {
    setDevice({ ...device, [event.target.name]: event.target.value })
  }
  const changeHandlerTest = event=>{
    if(USText(event.target.value)){
      changeHandler(event)
      return ;
    }
    message("forbidden symbols","error")
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
          <h5>System name</h5>
          <input className = "textInput" placeholder="system name" id="DeviceSystemName" type="text" name="DeviceSystemName" value={device.DeviceSystemName} onChange={changeHandlerTest} required/>
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
      <div className="controlForm" >
        <button className="formEditBtn Delete" onClick={deleteHandler}>Delete</button>
        <button className="formEditBtn" onClick={outHandler}>Save</button>
      </div>
    </ul>
  )

}
