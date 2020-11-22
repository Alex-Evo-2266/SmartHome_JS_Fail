import React, {useContext} from 'react'
import {FormContext} from './formContext'
import {AddDevicesForm} from './forms/addDevicesForm'

export const Form = ()=>{
  const {form, hide} = useContext(FormContext)

  if(!form.visible){
    return null;
  }
  const click = (event) =>{
    if(event.target.className === "backForm")
      hide();
  }

  if(form.type === "AddDevices"){
    return (
      <div className = "backForm" onClick = {click}>
        <AddDevicesForm hide = {hide}/>
      </div>
    )
  }
}
