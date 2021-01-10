import React, {useState} from 'react'
import {InputNumber} from '../../../moduls/inputNumber'

export const DimmerFunction = ({device,result})=>{

  const [dimmerValue, setDimmerValue] = useState("0");

    return(
      <div className="deviceFunctionConteiner">
        {
          (device.DeviceConfig&&device.DeviceConfig.pover)?
          <div className="deviceFunctionItem">
            <p>Pover</p>
            <input type="button" value="Ok" onClick={()=>result({type:"pover",address:device.DeviceConfig.pover,IdDevice:device.DeviceId,On:device.DeviceConfig.turnOnSignal,Off:device.DeviceConfig.turnOffSignal})}/>
          </div>:
          null
        }
        {
          (device.DeviceConfig&&device.DeviceConfig.dimmer)?
          <div className="deviceFunctionItem">
            <p>Dimmer</p>
            <InputNumber Xten={true} result={(v)=>setDimmerValue(v)} min={device.DeviceConfig.minDimmer} max={device.DeviceConfig.maxDimmer}/>
            <input type="button" value="Ok" onClick={()=>result({type:"dimmer",address:device.DeviceConfig.dimmer,IdDevice:device.DeviceId,value:dimmerValue})}/>
          </div>:null
        }
      </div>
    )
}
