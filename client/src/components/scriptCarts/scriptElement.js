import React,{useState} from 'react'

export const ScriptElement = ({script})=>{
  const [status, setStatus] = useState(script.ScriptStatus)

  return(
    <div className="scriptElement">
      <p>{script.ScriptName}</p>
      <div className="scriptStatus">
        <p>{script.ScriptStatus}</p>
      </div>
    </div>
  )
}
