import React,{useContext} from 'react'
import {ModalWindow} from '../modalWindow/modalWindow'
import {BtnElement} from './CartElement/BtnElement'
import {EditModeContext} from '../../context/EditMode'

export const HomeControlCart = () =>{
  const {setMode} = useContext(EditModeContext)
  return(
    <ModalWindow position = "absolute" z={3} top={10} left={65} width={"auto"} height={"auto"} title="controlPanel" moving={false}>
      <ul className="elementConteiner" style={{width:"300px"}}>
        <li>
          <BtnElement onClick={(e)=>{
            setTimeout(()=>e.target.checked = "",250)
            setMode(true)
          }}>
            <i className="fas fa-cog"></i>
          </BtnElement>
        </li>
      </ul>
    </ModalWindow>
  )
}
