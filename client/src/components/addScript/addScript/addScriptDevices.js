import React, {useContext,useState,useEffect,useCallback} from 'react'
import {AddScriptContext} from '../addScriptContext'
import {useHttp} from '../../../hooks/http.hook'
import {useMessage} from '../../../hooks/message.hook'
import {AuthContext} from '../../../context/AuthContext.js'
import imgLight from '../../../img/lightDevices.jpg';
import imgDimmer from '../../../img/dimmerDevices.jpg';
import imgIr from '../../../img/IR.jpg';
import imgSensor from '../../../img/sensorDevices.jpg';
import imgSwitch from '../../../img/switchDevices.jpg';
import imgBinarySensor from '../../../img/binarySensorDevices.jpg';
import imgUndefined from '../../../img/icon-sensor.png';

export const AddScriptDevices = ({result})=>{
  const {addScript, hide} = useContext(AddScriptContext)
  const auth = useContext(AuthContext)
  const {message} = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const[devices, setDevices]=useState([])

  useEffect(()=>{
    message(error,"error")
    return ()=>{
      clearError();
    }
  },[error,message, clearError])

  const updataDevice = useCallback(async()=>{
    const data = await request('/api/devices/all', 'GET', null,{Authorization: `Bearer ${auth.token}`})
    setDevices(data);
  },[request,auth.token])

  useEffect(()=>{
    updataDevice()
  },[updataDevice])

  const out=(item)=>{
    if(typeof(result)==="function")
      result(item)
  }

  return(
    <ul className="IfdeviceList">
      <li className="deviceElement"></li>
      <li className="deviceElement"></li>
      <li className="deviceElement"></li>
      {
        devices.map((item,index)=>{
          return(
            <li key={index} className="deviceElement" onClick={()=>out(item)}>
              <div className="imageConteiner">
                <img src={
                  (item.DeviceType==="light")?imgLight:
                  (item.DeviceType==="switch")?imgSwitch:
                  (item.DeviceType==="sensor")?imgSensor:
                  (item.DeviceType==="binarySensor")?imgBinarySensor:
                  (item.DeviceType==="dimmer")?imgDimmer:
                  (item.DeviceType==="ir")?imgIr:
                  imgUndefined
                }/>
              </div>
              <p>{item.DeviceName}</p>
            </li>
          )
        })
      }
    </ul>
  )

}
