import React, {useContext} from 'react'
import {AlertContext} from './alertContext'

export const Alert = ()=>{
  const {alert, hide} = useContext(AlertContext)

  if(!alert.visible){
    return null;
  }

  if(alert.type==="info"||alert.type==="information"){
    return (
    <div className={`alert alert-${alert.type}`}>
      <div className="div-alert-container">
        <strong>Information</strong>
        <p>{alert.text}</p>
        <button onClick={hide} type="button" className="close" aria-label="Close">
          <span aria-hidden='true'>
            &times;
          </span>
        </button>
      </div>
    </div>
  )
  }

  return (
    <div className={`alert alert-${alert.type || 'warning'}`}>
      <div className="div-alert-container">
        <strong>Attention!</strong>
        <p>{alert.text}</p>
        <button onClick={hide} type="button" className="close" aria-label="Close">
          <span aria-hidden='true'>
            &times;
          </span>
        </button>
      </div>
    </div>
  )
}
