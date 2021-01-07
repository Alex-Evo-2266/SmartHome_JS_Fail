import React,{useState} from 'react'
import {HomeControlCart} from '../components/homeCarts/homeControlCart'
import {EditToolbar} from '../components/homeCarts/EditToolbar'
import {EditModeContext} from '../context/EditMode'

export const HomePage = () => {

const [editMode, setEditMode] = useState(false);

  return(
    <EditModeContext.Provider value={{setMode:setEditMode, mode:editMode}}>
      <EditToolbar show={editMode}/>
      <div className = {`conteiner home ${(editMode)?"editMode":""}`}>
        <HomeControlCart/>
      </div>
    </EditModeContext.Provider>
  )
}
