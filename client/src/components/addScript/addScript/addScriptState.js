import React, {useContext,useState,useEffect,useCallback} from 'react'
import {AddScriptContext} from '../addScriptContext'

export const AddScriptState = ({device,result})=>{
  const {addScript, hide} = useContext(AddScriptContext)
  const[devices, setDevices]=useState([])


  const out=(item)=>{
    if(typeof(result)==="function")
      result(item)
  }

  if(device&&device.DeviceType==="light"){
    return(
      <ul className="IfdeviceList">
        <li className = "stateElement" onClick={()=>out("power")}>
          <p>power</p>
        </li>
      </ul>
    )
  }
  if(device&&device.DeviceType==="dimmer"){
    return(
      <ul className="IfdeviceList">
        <li className = "stateElement" onClick={()=>out("dimmer")}>
          <p>Dimmer</p>
        </li>
        {
          (device.DeviceConfig.power)?
          <li className = "stateElement" onClick={()=>out("dimmer")}>
            <p>Dimmer</p>
          </li>:
          null
        }
      </ul>
    )
  }

  return null

}
