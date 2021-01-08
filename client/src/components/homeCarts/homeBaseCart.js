import React,{useContext} from 'react'
import {ModalWindow} from '../modalWindow/modalWindow'
import {BtnElement} from './CartElement/BtnElement'
import {EditModeContext} from '../../context/EditMode'
import {CartEditContext} from './EditCarts/CartEditContext'

export const HomebaseCart = ({hide,index,name,updata,data}) =>{
  const {mode} = useContext(EditModeContext)
  const {target,cartEdit} = useContext(CartEditContext)
  return(
    <ModalWindow
     position="relative"
     hide={
       (mode)?()=>{
         hide(index)
       }:null
     }
     userBtn={
       (mode)?()=>{
         target("base",{...data,index},updata)
       }:null
     }
     z={3}
     top={0}
     left={0}
     title={name}
     moving={false}
     heightToolbar={20}>

    </ModalWindow>
  )
}
