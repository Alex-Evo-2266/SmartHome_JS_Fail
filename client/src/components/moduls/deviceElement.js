import React from 'react'

export const DeviceElement = (props) =>{
  return(
    <div className = "CardElement">
      <div className = "CardHeader">
        <h3>{props.DeviceName||"NuN"}</h3>
        <div className = {`typeConnect ${props.DeviceTypeConnect||"other"}`}>
          <p>{props.DeviceTypeConnect||"other"}</p>
        </div>
      </div>
      <div className = "CardBody">
        <p>{props.DeviceInformation||""}</p>
        <div className = "CardControl">
        </div>
      </div>
    </div>
  )
}
