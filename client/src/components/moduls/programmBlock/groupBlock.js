import React,{useContext,useState,useEffect} from 'react'
import {ActBlock} from './actBlock'
import {AddScriptContext} from '../../addScript/addScriptContext'
import {ifClass,groupIfClass} from '../../../myClass.js'

export const GroupBlock = ({index,type,children,elements,requpdata})=>{
const {show} = useContext(AddScriptContext)
const [data, setData] = useState(elements)

const addEl = ()=>{
  show("typeBlock",(type,device)=>{
    if(typeof(data.addif)!=="function")
      return
    let el = data;
    let newEl;
    if(type==="groupBlockAnd")
      newEl = new groupIfClass("and")
    if(type==="groupBlockOr")
      newEl = new groupIfClass("or")
    if(type==="deviceBlock"&&device)
      newEl = new ifClass(device.DeviceId,"","==","1")
    el.addif(newEl)
    setData(el)
    // let obj = script
    // obj.if.addif(newEl)
    // setScript(obj)
  })
}


const reqUpdata = (data1,index1)=>{
  if(typeof(data.updataif)!=="function")
    return
  let el = data;
  el.updataif(data1,index1)
  setData(el)
  if(typeof(requpdata)!=="function")
    return
  requpdata(el,index)
}

// useEffect(()=>{
//   if(typeof(requpdata)!=="function")
//     return
//   requpdata(data,index)
// },[data])

  return(
    <div className="groupBlock">
      <div className="groupBlockTop">
        <p className="textBlock">{`start of block ${type}`}</p>
        <div className="addBlock" onClick={addEl}>
          <i className="fas fa-plus"></i>
        </div>
      </div>
      <div className="groupBlockConteiner">
      {
        (data)?
          data.ifElement.map((item,index1)=>{
            if(typeof(item.subif.addif)==="function"){
              return <GroupBlock index={index1} requpdata={reqUpdata} key={index1} type={item.subif.oper} elements={item.subif}/>
            }
            return <ActBlock key={index1} el={item.subif} index={index1} updata={reqUpdata} deviceId={item.subif.deviceId}/>
          })
        :null
      }
      </div>
      <div className="groupBlockBottom">
        <p className="textBlock">end block</p>
      </div>
    </div>
  )
}
