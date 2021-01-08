import React,{useContext} from 'react'
import {BtnElement} from './CartElement/BtnElement'
import {EditModeContext} from '../../context/EditMode'

export const EditToolbar = ({show=false,save=null}) => {
  const {setMode,add} = useContext(EditModeContext)

  return(
    <div className={`toolbar ${(show)?"active":""}`}>
      <ul className="elementConteiner top">
        <li>
          <BtnElement onClick={(e)=>{
            setTimeout(()=>e.target.checked = "",250)
            add()
          }}>
            <i className="far fa-window-restore"></i>
          </BtnElement>
        </li>
        <li>
          <BtnElement onClick={(e)=>{
            if(typeof(save)==="function")
              save()
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
