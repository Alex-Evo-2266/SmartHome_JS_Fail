import React,{useState,useEffect,useContext,useCallback} from 'react'
import {HomeControlCart} from '../components/homeCarts/homeControlCart'
import {EditToolbar} from '../components/homeCarts/EditToolbar'
import {HomebaseCart} from '../components/homeCarts/homeBaseCart'
import {EditModeContext} from '../context/EditMode'
import {CartEditState} from '../components/homeCarts/EditCarts/CartEditState'
import {AddControlState} from '../components/homeCarts/AddControl/AddControlState'
import {AddControl} from '../components/homeCarts/AddControl/AddControl'
import {CartEdit} from '../components/homeCarts/EditCarts/CartEdit'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext.js'

export const HomePage = () => {

const heightElement = 80

const [editMode, setEditMode] = useState(false);
const [carts, setCarts] = useState([])
const auth = useContext(AuthContext)
const {message} = useMessage();
const {request, error, clearError} = useHttp();

useEffect(()=>{
  console.log("carts",carts);
},[carts])

const addCart = async(type="base")=>{
  let newCart = {
    id:carts.length,
    name:"",
    type:type,
    children:[]
  }
  await setCarts((prev)=>{
    let mas = prev.slice();
    mas.push(newCart)
    return mas;
  })
}

const removeCart = async(index)=>{
  await setCarts((prev)=>{
    let mas = prev.slice();
    return mas.filter((item, index2)=>index2!==index)
  })
}

const updataCart = async(index,cart)=>{
  console.log("updata",cart);
  await setCarts((prev)=>{
    let mas = prev.slice();
    mas[index] = cart
    return mas
  })
}

const saveCarts = async()=>{
  try {
    const data = await request('/api/homeConfig/config/edit', 'POST', {carts},{Authorization: `Bearer ${auth.token}`})
    console.log(data);
  } catch (e) {
    console.error(e);
  }
}

const importCarts = useCallback(async()=>{
  try {
    const data = await request('/api/homeConfig/config', 'GET', null,{Authorization: `Bearer ${auth.token}`})
    console.log(data.homePage);
    setCarts(data.homePage.carts)
  } catch (e) {
    console.error(e);
  }
},[request,auth.token])

useEffect(()=>{
  message(error,"error")
  return ()=>{
    clearError();
  }
},[error,message, clearError])

useEffect(()=>{
  importCarts()
},[importCarts])

useEffect(()=>{
  let elements = document.getElementsByClassName('gridElement')
  for (var item of elements) {
    if(item.firstChild.offsetHeight>heightElement){
      let poz = Math.floor(item.firstChild.offsetTop/heightElement)+1
      let size = Math.floor(item.firstChild.offsetHeight/heightElement)+1
      item.style = `grid-row-start:${poz}; grid-row-end:${poz+size};`
    }
  }
})

  return(
    <EditModeContext.Provider value={{setMode:setEditMode, mode:editMode,add:addCart}}>
    <CartEditState>
    <AddControlState>
      <CartEdit/>
      <AddControl/>
      <EditToolbar show={editMode} save={saveCarts}/>
      <div className = {`conteiner home ${(editMode)?"editMode":""}`}>
        <div className = "conteinerHome HomeGrid" id="homeGrid">
          <div className = "gridElement">
            <HomeControlCart/>
          </div>
          {
            carts.map((item,index)=>{
                if(item.type==="base"){
                  return(
                    <div className = "gridElement" key={index}>
                      <HomebaseCart edit={editMode} hide={(i)=>removeCart(i)} updata={updataCart} index={index} data = {item} name={item.name}/>
                    </div>
                  )
                }
                return null
            })
          }
        </div>
      </div>
    </AddControlState>
    </CartEditState>
    </EditModeContext.Provider>
  )
}
