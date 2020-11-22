import React, {useContext} from 'react'
import {Title} from '../components/title/titlePage.js'
import {FormContext} from '../components/Form/formContext'

export const DevicesPage = () => {
  const form = useContext(FormContext)

  return(
    <>
      <div className = "conteiner">
        <Title>
          <h1>All Delices</h1>
          <button className="titleButtonAdd"><i onClick={()=>{form.show("AddDevices")}} className="fas fa-plus"></i></button>
        </Title>
        <div className = "test">
        </div>
      </div>
    </>
  )
}
