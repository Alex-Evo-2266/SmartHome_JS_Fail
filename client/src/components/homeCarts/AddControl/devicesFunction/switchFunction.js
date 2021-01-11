import React from 'react'
import {InputNumber} from '../../../moduls/inputNumber'

export const SwitchFunction = ({type,device,result})=>{

  const out = ()=>{
    result({
      item:type,
      type:"pover",
      order:"0",
      IdDevice:device.DeviceId,
      address:device.DeviceConfig.pover,
      On:device.DeviceConfig.turnOnSignal,
      Off:device.DeviceConfig.turnOffSignal
    })
  }

    return(
      <div className="deviceFunctionConteiner">
      {
        (device.DeviceConfig&&device.DeviceConfig.pover&&type==="button")?
        <div className="deviceFunctionItem">
          <p>Pover</p>
          <input type="button" value="Ok" onClick={()=>out()}/>
        </div>
        :null
      }
      </div>
    )
}
