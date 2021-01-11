import React from 'react'
import {InputNumber} from '../../../moduls/inputNumber'

export const SwitchFunction = ({type,device,result})=>{


    return(
      <div className="deviceFunctionConteiner">
      {
        (device.DeviceConfig&&device.DeviceConfig.pover&&type==="button")?
        <div className="deviceFunctionItem">
          <p>Pover</p>
          <input type="button" value="Ok" onClick={()=>result({item:type,type:"pover",order:"0",address:device.DeviceConfig.pover,IdDevice:device.DeviceId,On:device.DeviceConfig.turnOnSignal,Off:device.DeviceConfig.turnOffSignal})}/>
        </div>
        :null
      }
      </div>
    )
}
