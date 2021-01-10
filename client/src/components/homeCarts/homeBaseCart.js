import React,{useContext,useEffect,useState} from 'react'
import {ModalWindow} from '../modalWindow/modalWindow'
import {BtnElement} from './CartElement/BtnElement'
import {EditModeContext} from '../../context/EditMode'
import {CartEditContext} from './EditCarts/CartEditContext'
import {AddControlContext} from './AddControl/AddControlContext'

export const HomebaseCart = ({hide,index,name,updata,data,edit=false,add}) =>{
  const {mode} = useContext(EditModeContext)
  const {target} = useContext(CartEditContext)
  const {show} = useContext(AddControlContext)
  const [btns, setbtns] = useState((data)?data.children||[]:[])
  useEffect(()=>{
    console.log("btns",btns)
  },[btns])
  return(
    <ModalWindow
     position="relative"
     hide={
       (mode)?()=>{
         hide(index)
       }:null
     }
     userBtn={
       (mode)?
       ()=>target("d",{...data,index},updata):null
     }
     z={3}
     top={0}
     left={0}
     title={name}
     moving={false}
     heightToolbar={20}>
      <ul className="elementConteiner">
      {
        btns.map((item,index)=>{
          return (
            <li key={index}>
            <BtnElement switchMode={false}>
              M
            </BtnElement>
            </li>
          )
        })
      }
      {
        (edit)?
        <li>
          <BtnElement switchMode={false} onClick={()=>show("AddButton",async(btn)=>{
            await setbtns((prev)=>{
              let mas = prev.slice();
              mas.push(btn)
              updata(index,{...data,children:mas})
              return mas;
            })
          })}>
            <i className="fas fa-plus"></i>
          </BtnElement>
        </li>
        :null
      }
      </ul>
    </ModalWindow>
  )
}
