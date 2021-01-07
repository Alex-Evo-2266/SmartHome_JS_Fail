import React,{useContext} from 'react'
import {BtnElement} from './CartElement/BtnElement'
import {EditModeContext} from '../../context/EditMode'

export const EditToolbar = ({show=false}) => {
  const {setMode} = useContext(EditModeContext)
  return(
    <div className={`toolbar ${(show)?"active":""}`}>
      <ul className="elementConteiner top" style={{width:"calc(100% - 200px)"}}>
        <li>
          <BtnElement onClick={(e)=>{
            setTimeout(()=>e.target.checked = "",250)
          }}>
            <i className="far fa-window-restore"></i>
          </BtnElement>
        </li>
        <li>
          <BtnElement onClick={(e)=>{
            setTimeout(()=>e.target.checked = "",250)
            setMode(false)
          }}>
            <i className="fas fa-check"></i>
          </BtnElement>
        </li>
      </ul>
    </div>
  )
}
