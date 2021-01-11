import React, {useState} from 'react'
import {InputNumber} from '../../../moduls/inputNumber'

export const DimmerFunction = ({type,device,result})=>{

  const [dimmerValue, setDimmerValue] = useState("0");

    return(
      <div className="deviceFunctionConteiner">
        {
          (device.DeviceConfig&&device.DeviceConfig.pover&&type==="button")?
          <div className="deviceFunctionItem">
            <p>Pover</p>
            <input type="button" value="Ok" onClick={()=>result({item:type,type:"pover",order:"0",address:device.DeviceConfig.pover,IdDevice:device.DeviceId,On:device.DeviceConfig.turnOnSignal,Off:device.DeviceConfig.turnOffSignal})}/>
          </div>:
          null
        }
        {
          (device.DeviceConfig&&device.DeviceConfig.dimmer&&(type==="button"||type==="slider"))?
          <div className="deviceFunctionItem">
            <p>Dimmer</p>
            {
              (type!=="slider")?
              <InputNumber Xten={true} result={(v)=>setDimmerValue(v)} min={device.DeviceConfig.minDimmer} max={device.DeviceConfig.maxDimmer}/>
              :null
            }
            <input type="button" value="Ok" onClick={()=>result({item:type,type:"dimmer",order:"0",address:device.DeviceConfig.dimmer,IdDevice:device.DeviceId,value:(type!=="slider")?dimmerValue:null})}/>
          </div>:null
        }
      </div>
    )
}
