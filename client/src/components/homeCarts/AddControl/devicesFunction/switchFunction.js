import React from 'react'
import {InputNumber} from '../../../moduls/inputNumber'

export const SwitchFunction = ({device,result})=>{


    return(
      <div className="deviceFunctionConteiner">
        <div className="deviceFunctionItem">
          <p>Pover</p>
          <input type="button" value="Ok" onClick={()=>result({type:"pover",address:device.DeviceConfig.pover,IdDevice:device.DeviceId,On:device.DeviceConfig.turnOnSignal,Off:device.DeviceConfig.turnOffSignal})}/>
        </div>
      </div>
    )
}
