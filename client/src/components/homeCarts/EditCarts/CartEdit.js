import React,{useContext,useState,useEffect} from 'react'
import {ModalWindow} from '../../modalWindow/modalWindow'
import {EditModeContext} from '../../../context/EditMode'
import {CartEditContext} from './CartEditContext'

export const CartEdit = () =>{
  const {cartEdit, hide} = useContext(CartEditContext)
  const [cart ,setCart] = useState({
    name:"",
    type:"base",
    children:[]
  })

  useEffect(()=>{
    if(cartEdit.cart)
      setCart({
        name:cartEdit.cart.name,
        type:cartEdit.cart.type,
        children:cartEdit.cart.children
      })
  },[cartEdit])

  const changeHandler = event => {
    setCart({ ...cart, [event.target.name]: event.target.value })
  }

  const outHandler = ()=>{
    if(typeof(cartEdit.OK)!=="function")
      return;
    cartEdit.OK(cartEdit.cart.index,cart)
  }

  if(!cartEdit.visible){
    return null;
  }

  return(
    <ModalWindow hide={hide} title="Edit Cart" moving={true} width="400" height="300">
      <div className="editcatr-conteiner">
        <p>сontainer ID: {cartEdit.cart.id}</p>
        <div className="editcatr-element">
          <p>сontainer name</p>
          <input type="text" value={cart.name} name="name" onChange={changeHandler}/>
        </div>
        <button onClick = {outHandler}>Ок</button>
      </div>
    </ModalWindow>
  )
}
