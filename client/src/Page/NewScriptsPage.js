import React,{useState,useContext,useCallback,useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext.js'
import {AddScriptBase} from '../components/addScript/addScriptBase'
import {GroupBlock} from '../components/moduls/programmBlock/groupBlock'
import {ActBlock} from '../components/moduls/programmBlock/actBlock'
import {DeviceStatusContext} from '../context/DeviceStatusContext'
import {AddScriptContext} from '../components/addScript/addScriptContext'
import {groupIfClass,actClass} from '../myClass.js'

export const NewScriptsPage = () => {
  const auth = useContext(AuthContext)
  const {show} = useContext(AddScriptContext)
  const {message} = useMessage();
  const {request, error, clearError} = useHttp();
  const[devices, setDevices]=useState([])
  const[cost, setCost]=useState(true)
  const[script, setScript]=useState({
    name:"",
    if:new groupIfClass("and"),
    then:[],
    else:[]
  })

  const changeHandler = (event)=>{
    setScript({...script,[event.target.name]:event.target.value})
  }

  const outHandler = async()=>{
    try {
      const data = await request('/api/script/add', 'POST', {...script},{Authorization: `Bearer ${auth.token}`})
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(()=>{
    message(error,"error")
    return ()=>{
      clearError();
    }
  },[error,message, clearError])

  const updata = useCallback(async(data,index,reboot)=>{
    console.log("9",data);
    if(reboot)
      await setCost(false)
    let e = new groupIfClass("and")
    e.updata(data)
    await setScript({...script,if:e})
    await setCost(true)
  },[script])

  const updataDevice = useCallback(async()=>{
    const data = await request('/api/devices/all', 'GET', null,{Authorization: `Bearer ${auth.token}`})
    setDevices(data);
  },[request,auth.token])

  const updataDev = useCallback(async(item,index1,block1)=>{
    console.log(item,index1,block1);
    let s = script[block1];
    s[index1]=item
    console.log("s",s);
    setScript({...script,[block1]:s})
  },[script])

  const addEl = (block="then")=>{
    show("deviceBlock",(none,dataDev)=>{
      if(!dataDev||!dataDev.DeviceId)
        return
      let mas = script;
      mas[block].push(new actClass(dataDev.DeviceId,"",null))
      setScript(mas)
    })
  }

  const deleteEl = async(index1,block1)=>{
    let ar = script[block1];
    let newar = ar.filter((item, index2)=>index2!==index1)
    await setCost(false)
    await setScript({...script,[block1]:newar})
    await setCost(true)
  }

  useEffect(()=>{
    updataDevice()
  },[updataDevice])

  useEffect(()=>{
    console.log("script",script);
  },[script])

  return(
    <DeviceStatusContext.Provider value={{devices:devices, updateDevice:updataDevice}}>
      <AddScriptBase/>
      <div className = "NewScripConteiner">
      <h2>Create new script</h2>
        <div className="NewScripPage">
          <div className="scriptOut">
            <p>Script name</p>
            <input type="text" name="name" value={script.name} onChange={changeHandler}/>
            <button onClick={outHandler}>Send</button>
          </div>
          <h3>If</h3>
          <div className="progammzon">
            <div className="baseBlock">
              <div className="textBlock">
                <p>if</p>
              </div>
            </div>
            {
              (script.if.ifElement&&cost)?
                <GroupBlock index = {"1"} type={script.if.oper} requpdata={updata} elements={script.if}/>
              :null
            }
            <div className="baseBlock">
              <div className="textBlock">
                <p>then</p>
              </div>
              <div className="addBlock" onClick={()=>addEl("then")}>
                <i className="fas fa-plus"></i>
              </div>
            </div>
            <div className="groupBlockConteiner">
            {
              (cost)?
              script.then.map((item,index)=>{
                return <ActBlock deleteEl={deleteEl} key={index} el={item} index={index} updata={updataDev} block="then" deviceId={item.deviceId}/>
              }):null
            }
            </div>
            <div className="baseBlock">
              <div className="textBlock">
                <p>else</p>
              </div>
              <div className="addBlock" onClick={()=>addEl("else")}>
                <i className="fas fa-plus"></i>
              </div>
            </div>
            <div className="groupBlockConteiner">
            {
              (cost)?
              script.else.map((item,index)=>{
                return <ActBlock deleteEl={deleteEl} key={index} el={item} index={index} updata={updataDev} block="else" deviceId={item.deviceId}/>
              }):
              null
            }
            </div>
          </div>
        </div>
      </div>
    </DeviceStatusContext.Provider>
  )
}
