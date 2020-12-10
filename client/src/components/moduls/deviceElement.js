import React, {useContext} from 'react'
import {FormContext} from '../Form/formContext'


export const DeviceElement = (props) =>{
  const form = useContext(FormContext)

  return(
    <div className = "CardElement">
      <div className = "CardHeader">
        <h3>{props.DeviceName||"NuN"}</h3>
        <div className = {`typeConnect ${props.DeviceTypeConnect||"other"}`}>
          <p>{props.DeviceTypeConnect||"other"}</p>
        </div>
      </div>
      <div className = "CardBody">
        <p>{`Type device - ${props.DeviceType||""}`}</p>
        {
          (props.DeviceTypeConnect==="mqtt"&&(props.DeviceType==="light"||props.DeviceType==="switch"))?
          <p>{`Pover topic - ${props.PoverTopic||""}`}</p>:
          (props.DeviceTypeConnect==="mqtt"&&(props.DeviceType==="sensor"||props.DeviceType==="binarySensor"))?
          <p>{`Status topic - ${props.PoverTopic||""}`}</p>:
          null
        }
        <p>{`Information - ${props.DeviceInformation||""}`}</p>
        <div className = "CardControl">
          <button className="cardControlBtn" onClick={()=>{form.show("EditDevices",props.updataDevice,props.DeviceId)}}>edit</button>
        </div>
      </div>
    </div>
  )
}
