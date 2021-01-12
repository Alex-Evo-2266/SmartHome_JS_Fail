import React,{useState,useContext,useCallback,useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext.js'
import {AddScriptBase} from '../components/addScript/addScriptBase'
import {AddScriptContext} from '../components/addScript/addScriptContext'

class ifClass {
  constructor(deviceId,property,oper,value) {
    this.deviceId=deviceId;
    this.property=property
    this.oper=oper
    this.value=value
  }
}

class groupIfClass {
  constructor(oper) {
    if(oper!=="&"&&oper!=="|"&&oper!=="||")
      oper="&"
    if(oper!=="||")
      oper="|"
    this.oper=oper
    this.ifElement=[]
  }
  addif(subif){
    if(subif instanceof ifClass){
      this.ifElement.push({subif,type:"ifClass"})
      return
    }
    if(subif instanceof groupIfClass){
      this.ifElement.push({subif,type:"groupIfClass"})
      return
    }
    return
  }
}

export const NewScriptsPage = () => {
  const {show} = useContext(AddScriptContext)
  const auth = useContext(AuthContext)
  const {message} = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const[page, setPage]=useState(0)
  const[devices, setDevices]=useState([])
  const[script, setScript]=useState({
    if:new groupIfClass("&"),
    act:[]
  })

  // useEffect(()=>{
  //   message(error,"error")
  //   return ()=>{
  //     clearError();
  //   }
  // },[error,message, clearError])
  //
  // const updataDevice = useCallback(async()=>{
  //   const data = await request('/api/devices/all', 'GET', null,{Authorization: `Bearer ${auth.token}`})
  //   setDevices(data);
  // },[request,auth.token])
  //
  // useEffect(()=>{
  //   updataDevice()
  // },[updataDevice])

  // useEffect(()=>{
  //   let grup1 = new groupIfClass("|")
  //   let grup2 = new groupIfClass("&")
  //   let el1 = new ifClass("2","dimmer",">=","50")
  //   let el2 = new ifClass("2","pover","==","1")
  //   let el3 = new ifClass("3","value",">=","10")
  //   grup1.addif(el1)
  //   grup1.addif(grup2)
  //   grup2.addif(el2)
  //   grup2.addif(el3)
  //   console.log("grup1",grup1);
  // },[])

  useEffect(()=>{
    console.log(script);
  },[script])

  return(
    <>
      <AddScriptBase/>
      <div className = "NewScripConteiner">
      <h2>Create new script</h2>
      {
        (page===0)?
        <div className="NewScripPage">
          <h3>If</h3>
          <div className="progammzon">
            <div className="baseBlock">
            <div className="textBlock">
              <p>if</p>
            </div>
              <div className="addBlock" onClick={()=>show("devices")}>
                <i className="fas fa-plus"></i>
              </div>
            </div>
          </div>
          <div className = "If">

          </div>
        </div>
        :null
      }
      </div>
    </>
  )
}
