import React, {useContext} from 'react'
import {FormContext} from './formContext'
import {AddDevicesForm} from './forms/addDevicesForm'
import {EditDevicesForm} from './forms/editDevicesForm'

export const Form = ()=>{
  const {form, hide} = useContext(FormContext)

  if(!form.visible){
    return null;
  }
  const click = (event) =>{
    if(event.target.className === "backForm")
      hide();
  }
  const hideAndApdata = () =>{
    hide();
    if(form.OK){
      form.OK()
    }
  }

  if(form.type === "AddDevices"){
    return (
      <div className = "backForm" onClick = {click}>
        <AddDevicesForm hide = {hideAndApdata}/>
      </div>
    )
  }
  if(form.type === "EditDevices"){
    return (
      <div className = "backForm" onClick = {click}>
        <EditDevicesForm hide = {hideAndApdata} id = {form.id}/>
      </div>
    )
  }
}
