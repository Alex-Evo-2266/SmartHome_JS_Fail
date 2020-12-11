import React, {useContext} from 'react'
import {TerminalContext} from './terminalContext'

export const Form = ()=>{
  const {terminal, hide} = useContext(TerminalContext)

  if(!terminal.visible){
    return null;
  }
  // const click = (event) =>{
  //   if(event.target.className === "backForm")
  //     hide();
  // }

  // return(
  //   <div>
  //   dsfgjh
  //   </div>
  // )

}
