import React,{useState,useContext,useCallback,useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext.js'
import {AddScriptBase} from '../components/addScript/addScriptBase'
import {GroupBlock} from '../components/moduls/programmBlock/groupBlock'
import {DeviceStatusContext} from '../context/DeviceStatusContext'
import {groupIfClass} from '../myClass.js'

export const NewScriptsPage = () => {
  const auth = useContext(AuthContext)
  const {message} = useMessage();
  const {request, error, clearError} = useHttp();
  const[devices, setDevices]=useState([])
  const[script, setScript]=useState({
    if:new groupIfClass("and"),
    act:[]
  })

  useEffect(()=>{
    message(error,"error")
    return ()=>{
      clearError();
    }
  },[error,message, clearError])

  const updata = (data)=>{
    setScript({...script,if:data})
  }

  const updataDevice = useCallback(async()=>{
    const data = await request('/api/devices/all', 'GET', null,{Authorization: `Bearer ${auth.token}`})
    setDevices(data);
  },[request,auth.token])

  useEffect(()=>{
    updataDevice()
  },[updataDevice])

  useEffect(()=>{
  },[script])

  return(
    <DeviceStatusContext.Provider value={{devices:devices, updateDevice:updataDevice}}>
      <AddScriptBase/>
      <div className = "NewScripConteiner">
      <h2>Create new script</h2>
        <div className="NewScripPage">
          <h3>If</h3>
          <div className="progammzon">
          <button onClick={()=>console.log("script",script)}>test</button>

            <div className="baseBlock">
            <div className="textBlock">
              <p>if</p>
            </div>
            </div>
            {
              (script.if.ifElement)?
                <GroupBlock index = "1" type={script.if.oper} requpdata={updata} elements={script.if}/>
              :null
            }
          </div>
        </div>
      </div>
    </DeviceStatusContext.Provider>
  )
}
