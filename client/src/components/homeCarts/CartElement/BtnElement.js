import React from 'react'

export const BtnElement = ({className,children,name,onClick}) =>{

const changeHandler = (event)=>{
  if(typeof(onClick)==="function"){
    onClick(event)
  }
}

  return(
    <label className={`BtnElement ${className}`}>
      <input type="checkbox" name={name} onChange={changeHandler}/>
      <div className="icon-box">
        {children}
      </div>
    </label>
  )
}
