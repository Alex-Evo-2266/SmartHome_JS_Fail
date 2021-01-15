import React, {useContext,useState,useEffect,useCallback} from 'react'
import {AuthContext} from '../../../context/AuthContext.js'
import {DeviceStatusContext} from '../../../context/DeviceStatusContext'
import imgLight from '../../../img/lightDevices.jpg';
import imgDimmer from '../../../img/dimmerDevices.jpg';
import imgIr from '../../../img/IR.jpg';
import imgSensor from '../../../img/sensorDevices.jpg';
import imgSwitch from '../../../img/switchDevices.jpg';
import imgBinarySensor from '../../../img/binarySensorDevices.jpg';
import imgUndefined from '../../../img/icon-sensor.png';

export const AddScriptDevices = ({result,type})=>{
  const auth = useContext(AuthContext)
  const {devices} = useContext(DeviceStatusContext)
  const [filteredDevices,setFilteredDevices] = useState([])

  const out=(item)=>{
    if(typeof(result)==="function")
      result(item)
  }

  const filtered = useCallback((typeDev)=>{
    let condidat
    if(typeDev==="statusDev")
      condidat = devices.filter((item)=>item.DeviceType!=="ir")
    if(typeDev==="actDev")
      condidat = devices.filter((item)=>(item.DeviceType!=="sensor"&&item.DeviceType!=="binarySensor"))
    return condidat;
  },[])

  useEffect(()=>{
    if(type==="if")
      return setFilteredDevices(filtered("statusDev"))
    if(type==="act")
      return setFilteredDevices(filtered("actDev"))
    return setFilteredDevices(devices);
  },[])

  return(
    <ul className="IfdeviceList">
      <li className="deviceElement"></li>
      <li className="deviceElement"></li>
      <li className="deviceElement"></li>
      {
        filteredDevices.map((item,index)=>{
          return(
            <li key={index} className="deviceElement" onClick={()=>out(item)}>
              <div className="imageConteiner">
                <img alt={"type icon"} src={
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
