import React, {useContext,useState} from 'react'
import {AddControlContext} from './AddControlContext'
import {BackForm} from '../../moduls/backForm'
import {ModalWindow} from '../../modalWindow/modalWindow'
import {SwitchDevice} from './devicesControl/SwitchDevice'
import {LightFunction} from './devicesFunction/lightFunction'
import {SwitchFunction} from './devicesFunction/switchFunction'

export const AddControl = ()=>{
  const {addControl, hide} = useContext(AddControlContext)
  const [buttonChild, setButtonChild] = useState(false);
  const [scriptsChild, setScriptsChild] = useState(false);
  const [sliderChild, setSliderChild] = useState(false);
  const [lightFunctionVisible,setLightFunctionVisible] = useState(false);
  const [switchFunctionVisible,setSwitchFunctionVisible] = useState(false);
  const [device, setDevice] = useState({});

  const close = ()=>{
    hide()
    setButtonChild(false)
    setScriptsChild(false)
    setSliderChild(false)
    setLightFunctionVisible(false)
    setSwitchFunctionVisible(false)
  }

  const deviceFunction = (device)=>{
    setButtonChild(false);
    setScriptsChild(false);
    setSliderChild(false)
    if(device.DeviceType==="light")
      setLightFunctionVisible(true)
    if(device.DeviceType==="switch")
      setSwitchFunctionVisible(true)
    setDevice(device)
  }

  const addButton = (t)=>{
    if(addControl.OK){
      addControl.OK(t)
    }
    close()
  }

  if(!addControl.visible){
    return null;
  }

  if(addControl.type === "AddButton"){
    return (
      <BackForm onClick = {close}>
      <ModalWindow
        hide={close}
        title="Add button"
        moving={false}
        backForm={true}
        style={{width:"400px",left:"50%",transform: "translateX(-50%)", top:"100px",maxHeight:"calc(100% - 200px)"}}
        styleContent={{minHeight:"300px"}}
      >
      <div className="editcart-conteiner childrenList active">
        <p>сontainer children</p>
        <div className="buttonGrid">
          <button onClick={()=>setButtonChild(true)}>button activate</button>
          <button>activate scripts</button>
          <button>slider</button>
          <button>button</button>
        </div>
      </div>
      <div className={`editcart-conteiner childrenList ${(buttonChild)?"active":""}`}>
        <SwitchDevice result={deviceFunction}/>
      </div>
      <div className={`editcart-conteiner childrenList ${(lightFunctionVisible)?"active":""}`}>
        <LightFunction device={device} result={addButton}/>
      </div>
      <div className={`editcart-conteiner childrenList ${(switchFunctionVisible)?"active":""}`}>
        <SwitchFunction device={device} result={addButton}/>
      </div>
      </ModalWindow>
      </BackForm>
    )
  }
}
