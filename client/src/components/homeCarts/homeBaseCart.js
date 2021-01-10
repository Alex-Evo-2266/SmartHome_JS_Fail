import React,{useContext} from 'react'
import {ModalWindow} from '../modalWindow/modalWindow'
import {BtnElement} from './CartElement/BtnElement'
import {EditModeContext} from '../../context/EditMode'
import {CartEditContext} from './EditCarts/CartEditContext'
import {AddControlContext} from './AddControl/AddControlContext'

export const HomebaseCart = ({hide,index,name,updata,data,edit=false,add}) =>{
  const {mode} = useContext(EditModeContext)
  const {target} = useContext(CartEditContext)
  const {show} = useContext(AddControlContext)


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
        (data&&data.children)?
        data.children.map((item,indexbtn)=>{
          return (
            <li key={indexbtn}>
            <BtnElement
            index={indexbtn}
            data={item}
            switchMode={item.type==="pover"}
            deleteBtn={
              (edit)?async(index1)=>{
                let mas = data.children.slice();
                let newBtns = mas.filter((item, index2)=>index2!==index1)
                updata(index,{...data,children:newBtns})
              }:null
            }>
              {
                (item.type==="pover")?
                <i className="fas fa-power-off"></i>:
                (item.type==="dimmer")?
                <i className="fas fa-sun"></i>:
                (item.type==="color")?
                <i className="fas fa-palette"></i>:
                (item.type==="mode")?
                <i>M {item.value}</i>:
                <i>M</i>
              }
            </BtnElement>
            </li>
          )
        }):null
      }
      {
        (edit)?
        <li>
          <BtnElement switchMode={false} onClick={()=>show("AddButton",async(btn)=>{
              let mas = data.children.slice();
              mas.push(btn)
              updata(index,{...data,children:mas})
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
