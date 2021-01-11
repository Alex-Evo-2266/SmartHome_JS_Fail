import React,{useContext} from 'react'
import {ModalWindow} from '../modalWindow/modalWindow'
import {BtnElement} from './CartElement/BtnElement'
import {EditModeContext} from '../../context/EditMode'
import {CartEditContext} from './EditCarts/CartEditContext'
import {SliderElement} from './CartElement/SliderElement'
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
       ()=>target("base",{...data,index},updata):null
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
            <li key={indexbtn} style={{order:`${item.order||"0"}`}}>
            {
              (item.item==="button")?
              <BtnElement
              index={indexbtn}
              disabled={edit}
              data={item}
              switchMode={item.type==="pover"}
              deleteBtn={
                (edit)?async(index1)=>{
                  let mas = data.children.slice();
                  let newBtns = mas.filter((item, index2)=>index2!==index1)
                  updata(index,{...data,children:newBtns})
                }:null
              }
              editBtn={
                (edit)?async(index1,data1)=>{
                  if(!data1||!data1.order)
                    return
                  let mas = data.children.slice();
                  mas[index1].order=data1.order
                  updata(index,{...data,children:mas})
                }:null
              }
              >
                {
                  (item.type==="pover")?
                  <i className="fas fa-power-off"></i>:
                  (item.type==="dimmer")?
                  <i className="fas fa-sun"></i>:
                  (item.type==="color")?
                  <i className="fas fa-palette"></i>:
                  (item.type==="mode")?
                  <i>M {item.value}</i>:
                  (item.type==="ir")?
                  <i className="fas fa-tv"></i>:
                  <i>M</i>
                }
              </BtnElement>:
              (item.item==="slider")?
              <SliderElement
              index={indexbtn}
              data={item}
              deleteBtn={
                (edit)?async(index1)=>{
                  let mas = data.children.slice();
                  let newBtns = mas.filter((item, index2)=>index2!==index1)
                  updata(index,{...data,children:newBtns})
                }:null
              }
              editBtn={
                (edit)?async(index1,data1)=>{
                  if(!data1||!data1.order)
                    return
                  let mas = data.children.slice();
                  mas[index1].order=data1.order
                  updata(index,{...data,children:mas})
                }:null
              }
              />:
              null
            }
            </li>
          )
        }):null
      }
      {
        (edit)?
        <li style={{order:`501`}}>
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
