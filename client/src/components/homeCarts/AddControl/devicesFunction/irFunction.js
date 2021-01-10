import React, {useState} from 'react'

export const IrFunction = ({device,result})=>{

  const [value, setValue] = useState("");

  const out=()=>{
    if(!value){
      let el = document.getElementById('command')
      el.style="background:red;"
      return
    }
    result({type:"ir",address:device.DeviceConfig.command,IdDevice:device.DeviceId,value:value})
  }

    return(
      <div className="deviceFunctionConteiner">
        <div className="deviceFunctionItem">
          <p>Pover</p>
          <input id="command" type="text" className="command" value={value} onChange={(event)=>setValue(event.target.value)}/>
          <input type="button" value="Ok" onClick={out}/>
        </div>
      </div>
    )
}
