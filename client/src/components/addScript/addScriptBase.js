import React, {useContext,useState} from 'react'
import {AddScriptContext} from './addScriptContext'
import {AddScriptDevices} from './addScript/addScriptDevices'
import {AddScriptState} from './addScript/addScriptState'
import {CenterWindow} from '../modalWindow/centerWindow'


export const AddScriptBase = ()=>{
  const {addScript, hide} = useContext(AddScriptContext)
  const [page, setPage] = useState(0)
  const [device , setDevice] = useState({})
  const [status , setStatus] = useState({})
  const [oper , setOper] = useState({})

  const giveDevice = (dev)=>{
    setPage(1);
    setDevice(dev)
    console.log(dev);
  }
  const giveState = (item)=>{
    if(item==="pover")
      setPage(3);
    else
      setPage(2);
    setStatus(item)
    console.log(item);
  }
  const giveOper = (item)=>{
    setPage(3);
    setOper(item)
    console.log(item);
  }


  const close = ()=>{
    setPage(0)
    hide()
  }

  if(!addScript.visible){
    return null;
  }

  if(addScript.type==="devices"){
    return(
      <CenterWindow hide={close}>
      {
        (page===0)?
          <AddScriptDevices result={giveDevice}/>:
        (page===1)?
          <AddScriptState device={device} result={giveState}/>:
        (page===2)?
          <ul className="IfdeviceList">
            <li className = "stateElement" onClick={()=>giveOper("==")}>
              <p>{"=="}</p>
            </li>
            <li className = "stateElement" onClick={()=>giveOper(">=")}>
              <p>{">="}</p>
            </li>
            <li className = "stateElement" onClick={()=>giveOper("<=")}>
              <p>{"<="}</p>
            </li>
            <li className = "stateElement" onClick={()=>giveOper("!=")}>
              <p>{"!="}</p>
            </li>
            <li className = "stateElement" onClick={()=>giveOper("<")}>
              <p>{"<"}</p>
            </li>
            <li className = "stateElement" onClick={()=>giveOper(">")}>
              <p>{">"}</p>
            </li>
          </ul>:
        null
      }
      </CenterWindow>
    )
  }
  return null;
}
