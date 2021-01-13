import React, {useContext,useState} from 'react'
import {AddScriptContext} from './addScriptContext'
import {AddScriptDevices} from './addScript/addScriptDevices'
import {CenterWindow} from '../modalWindow/centerWindow'
import {ActBlock} from '../moduls/programmBlock/actBlock'
import {GroupBlock} from '../moduls/programmBlock/groupBlock'

export const AddScriptBase = ()=>{
  const {addScript, hide} = useContext(AddScriptContext)
  const [device, setDevice]=useState()
  const [deviceBlock, setDeviceBlock]=useState(false)

  const close = ()=>{
    hide()
    setDeviceBlock(false)
  }

  const shoseDevice=(item)=>{
    console.log(item);
    if(typeof(addScript.OK)==="function")
      addScript.OK("deviceBlock",item)
    close()
  }

  const shoseBlock = async(t)=>{
    if(t==="deviceBlock"){
      setDeviceBlock(true)
      return
    }
    // await setBlock(t)
    if(typeof(addScript.OK)==="function")
      addScript.OK(t)
    close()
  }

  if(!addScript.visible){
    return null;
  }

  if(addScript.type==="typeBlock"){
    return (
      <CenterWindow hide={close}>
      {
        (!deviceBlock)?
        <ul className="shoseBlock">
          <li onClick={()=>shoseBlock("groupBlockAnd")}>
            <GroupBlock type={"and"}>
            </GroupBlock>
          </li>
          <li onClick={()=>shoseBlock("groupBlockOr")}>
            <GroupBlock type={"or"}>>
            </GroupBlock>
          </li>
          <li onClick={()=>shoseBlock("deviceBlock")} style={{gridColumnStart:"1", gridColumnEnd:"3"}}>
            <ActBlock/>
          </li>
        </ul>
        :
        <AddScriptDevices result={shoseDevice} type={"if"}/>
      }
      </CenterWindow>
    )
  }
  return null;
}