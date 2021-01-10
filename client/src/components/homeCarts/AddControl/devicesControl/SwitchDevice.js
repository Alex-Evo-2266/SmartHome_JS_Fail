import React, {useContext,useState,useCallback,useEffect} from 'react'
import {AuthContext} from '../../../../context/AuthContext.js'
import {useHttp} from '../../../../hooks/http.hook'
import {useMessage} from '../../../../hooks/message.hook'

export const SwitchDevice = ({result})=>{
  const [devices, setDevices] = useState([]);
  const {message} = useMessage();
  const auth = useContext(AuthContext)
  const {request, error, clearError} = useHttp();

  const updataDevice = useCallback(async()=>{
    const data = await request('/api/devices/all', 'GET', null,{Authorization: `Bearer ${auth.token}`})
    console.log(data);
    setDevices(data.filter((item)=>(item.DeviceType==='light')||(item.DeviceType==='switch')||(item.DeviceType==='dimmer')||(item.DeviceType==='ir')));
  },[request,auth.token])

  useEffect(()=>{
    updataDevice()
  },[updataDevice])

  useEffect(()=>{
    message(error,"error")
    return ()=>{
      clearError();
    }
  },[error,message, clearError])

  return devices.map((item,index)=>{
    return(
      <div className="deviceItem" key={index} onClick={()=>result(item)}>
        <p>{item.DeviceName}</p>
      </div>
    )
  })
}
