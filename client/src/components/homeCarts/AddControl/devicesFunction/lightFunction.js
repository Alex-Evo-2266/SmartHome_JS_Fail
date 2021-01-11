import React, {useState} from 'react'
import {InputNumber} from '../../../moduls/inputNumber'

export const LightFunction = ({type, device,result})=>{

  const [dimmerValue, setDimmerValue] = useState("0");
  const [colorValue, setColorValue] = useState("0");
  const [modeValue, setModeValue] = useState("0");


    return(
      <div className="deviceFunctionConteiner">
        {
          (device.DeviceConfig&&device.DeviceConfig.pover&&type==="button")?
          <div className="deviceFunctionItem">
            <p>Pover</p>
            <input type="button" value="Ok" onClick={()=>result({item:type,type:"pover",address:device.DeviceConfig.pover,IdDevice:device.DeviceId,On:device.DeviceConfig.turnOnSignal,Off:device.DeviceConfig.turnOffSignal})}/>
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
            <input type="button" value="Ok" onClick={()=>result({item:type,type:"dimmer",address:device.DeviceConfig.dimmer,IdDevice:device.DeviceId,value:(type!=="slider")?dimmerValue:null})}/>
          </div>:null
        }
        {
          (device.DeviceConfig&&device.DeviceConfig.color&&(type==="button"||type==="slider"))?
          <div className="deviceFunctionItem">
            <p>Color</p>
            {
              (type!=="slider")?
              <InputNumber Xten={true} result={(v)=>setDimmerValue(v)} min={device.DeviceConfig.minColor} max={device.DeviceConfig.maxColor}/>
              :null
            }
            <input type="button" value="Ok" onClick={()=>result({item:type,type:"color",address:device.DeviceConfig.color,IdDevice:device.DeviceId,value:(type!=="slider")?colorValue:null})}/>
          </div>:null
        }
        {
          (device.DeviceConfig&&device.DeviceConfig.mode&&type==="button")?
          <div className="deviceFunctionItem">
            <p>Mode</p>
            <p>on mode</p>
            <InputNumber Xten={true} result={(v)=>setModeValue(v)} min={0} max={device.DeviceConfig.countMode-1}/>
            <input type="button" value="Ok" onClick={()=>result({item:type,type:"mode",address:device.DeviceConfig.mode,IdDevice:device.DeviceId,value:modeValue})}/>
            <p>to switch mode</p>
            <input type="button" value="Ok" onClick={()=>result({item:type,type:"switch mode",address:device.DeviceConfig.mode,IdDevice:device.DeviceId,value:device.DeviceConfig.countMode})}/>
          </div>:null
        }
      </div>
    )
}
