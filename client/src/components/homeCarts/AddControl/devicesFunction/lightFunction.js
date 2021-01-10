import React, {useState} from 'react'
import {InputNumber} from '../../../moduls/inputNumber'

export const LightFunction = ({device,result})=>{

  const [dimmerValue, setDimmerValue] = useState("0");
  const [colorValue, setColorValue] = useState("0");
  const [modeValue, setModeValue] = useState("0");


    return(
      <div className="deviceFunctionConteiner">
        <div className="deviceFunctionItem">
          <p>Pover</p>
          <input type="button" value="Ok" onClick={()=>result({type:"pover",address:device.DeviceConfig.pover,IdDevice:device.DeviceId,On:device.DeviceConfig.turnOnSignal,Off:device.DeviceConfig.turnOffSignal})}/>
        </div>
        {
          (device.DeviceConfig&&device.DeviceConfig.dimmer)?
          <div className="deviceFunctionItem">
            <p>Dimmer</p>
            <InputNumber Xten={true} result={(v)=>setDimmerValue(v)} min={device.DeviceConfig.minDimmer} max={device.DeviceConfig.maxDimmer}/>
            <input type="button" value="Ok" onClick={()=>result({type:"dimmer",address:device.DeviceConfig.dimmer,IdDevice:device.DeviceId,value:dimmerValue})}/>
          </div>:null
        }
        {
          (device.DeviceConfig&&device.DeviceConfig.color)?
          <div className="deviceFunctionItem">
            <p>Color</p>
            <InputNumber Xten={true} result={(v)=>setColorValue(v)} min={device.DeviceConfig.minColor} max={device.DeviceConfig.maxColor}/>
            <input type="button" value="Ok" onClick={()=>result({type:"color",address:device.DeviceConfig.color,IdDevice:device.DeviceId,value:colorValue})}/>
          </div>:null
        }
        {
          (device.DeviceConfig&&device.DeviceConfig.mode)?
          <div className="deviceFunctionItem">
            <p>Mode</p>
            <p>on mode</p>
            <InputNumber Xten={true} result={(v)=>setModeValue(v)} min={0} max={device.DeviceConfig.countMode-1}/>
            <input type="button" value="Ok" onClick={()=>result({type:"mode",address:device.DeviceConfig.mode,IdDevice:device.DeviceId,value:modeValue})}/>
            <p>to switch mode</p>
            <input type="button" value="Ok" onClick={()=>result({type:"switch mode",address:device.DeviceConfig.mode,IdDevice:device.DeviceId,value:device.DeviceConfig.countMode})}/>
          </div>:null
        }
      </div>
    )
}
