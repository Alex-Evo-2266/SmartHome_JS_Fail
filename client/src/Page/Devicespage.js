import React, {useContext,useEffect,useState,useCallback} from 'react'
import {Title} from '../components/title/titlePage.js'
import {FormContext} from '../components/Form/formContext'
import {Loader} from '../components/Loader'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext.js'
import {DeviceElement} from '../components/moduls/deviceElement'

export const DevicesPage = () => {
  const form = useContext(FormContext)
  const auth = useContext(AuthContext)
  const {message} = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const [devices, setDevices] = useState([]);


  useEffect(()=>{
    message(error,"error")
    return ()=>{
      clearError();
    }
  },[error,message, clearError])

  const updataDevice = useCallback(async()=>{
    const data = await request('/api/devices/all', 'GET', null,{Authorization: `Bearer ${auth.token}`})
    console.log(data);
    setDevices(data);
  },[request,auth.token])

  useEffect(()=>{
    updataDevice()
  },[updataDevice])

  return(
    <>
      <div className = "conteiner">
        <Title>
          <h1>All Delices</h1>
          <button className="titleButtonAdd"><i onClick={()=>{form.show("AddDevices",updataDevice)}} className="fas fa-plus"></i></button>
        </Title>
        <div className = "Devices">
          {
            (loading)?
            <Loader/>:
            (!devices||devices.length === 0)?
            <h2>Not elements</h2>:
            <div className = "CardConteiner">
              {
                devices.map((item,index)=>{
                  return(
                    <DeviceElement
                      key = {index}
                      DeviceName = {item.DeviceName}
                      DeviceTypeConnect = {item.DeviceTypeConnect}
                      DeviceInformation={item.DeviceInformation}
                    />
                  )
                })
              }
            </div>
          }
        </div>
      </div>
    </>
  )
}
