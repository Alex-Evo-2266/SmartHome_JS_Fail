import React, {useState} from 'react'
import {InputNumber} from '../../../moduls/inputNumber'

export const DimmerFunction = ({type,device,result})=>{

  const [dimmerValue, setDimmerValue] = useState("0");

  const out = (t)=>{
    let base = {
      item:type,
      type:t,
      order:"0",
      IdDevice:device.DeviceId
    }
    if(t==="pover"){
      return result({
        ...base,
        address:device.DeviceConfig.pover,
        On:device.DeviceConfig.turnOnSignal,
        Off:device.DeviceConfig.turnOffSignal
      })
    }
    if(t==="dimmer"){
      return result({
        ...base,
        address:device.DeviceConfig.dimmer,
        value:(type!=="slider")?dimmerValue:null
      })
    }
  }

    return(
      <div className="deviceFunctionConteiner">
        {
          (device.DeviceConfig&&device.DeviceConfig.pover&&type==="button")?
          <div className="deviceFunctionItem">
            <p>Pover</p>
            <input type="button" value="Ok" onClick={()=>out("pover")}/>
          </div>:
          null
        }
        {
          (device.DeviceConfig&&device.DeviceConfig.dimmer&&(type==="button"||type==="slider"))?
          <div className="deviceFunctionItem">
            <p>Dimmer</p>
            {
              (type!=="slider")?
              <InputNumber
              Xten={true}
              result={(v)=>setDimmerValue(v)}
              min={device.DeviceConfig.minDimmer}
              max={device.DeviceConfig.maxDimmer}
              />
              :null
            }
            <input type="button" value="Ok" onClick={()=>out("dimmer")}/>
          </div>:null
        }
      </div>
    )
}
