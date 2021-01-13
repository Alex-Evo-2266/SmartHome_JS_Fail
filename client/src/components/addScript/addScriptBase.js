import React, {useContext,useState} from 'react'
import {AddScriptContext} from './addScriptContext'
import {AddScriptDevices} from './addScript/addScriptDevices'
import {AddScriptState} from './addScript/addScriptState'
import {CenterWindow} from '../modalWindow/centerWindow'
import {ActBlock} from '../moduls/programmBlock/actBlock'


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
    if(item==="power")
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

  if(addScript.type==="typeBlock"){
    return (
      <CenterWindow hide={close}>
        <ul className="shoseBlock">
          <li>
            <div className="groupBlock">
              <div className="groupBlockTop">
                <p className="textBlock">start of block and</p>
              </div>
              <div className="groupBlockBottom">
                <p className="textBlock">end block</p>
              </div>
            </div>
          </li>
          <li>
            <div className="groupBlock">
              <div className="groupBlockTop">
                <p className="textBlock">start of block or</p>
              </div>
              <div className="groupBlockBottom">
                <p className="textBlock">end block</p>
              </div>
            </div>
          </li>
          <li>
            <ActBlock/>
          </li>
        </ul>
      </CenterWindow>
    )
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
