import React,{useState} from 'react'

export const BtnElement = ({className,children,name,onClick,disabled=false,firstValue=false,switchMode=true}) =>{

  const [value, setValue]=useState(firstValue)

const changeHandler = (event)=>{
  setValue((prev)=>!prev)
  if(!switchMode){
    setTimeout(()=>setValue(false),250)
  }
  if(typeof(onClick)==="function"){
    onClick(event, value,setValue)
  }
}

  return(
    <label className={`BtnElement ${className}`}>
      <input type="checkbox" checked={value} name={name} onChange={changeHandler} disabled={disabled}/>
      <div className="icon-box">
        {children}
      </div>
    </label>
  )
}
