import React,{useState} from 'react'

export const ScriptElement = ({script})=>{
  const [status, setStatus] = useState(script.ScriptStatus)

  return(
    <div className="scriptElement">
      <p>{script.ScriptName}</p>
      <div className="scriptStatus">
        <select value={status} onChange={(event)=>setStatus(event.target.value)}>
          <option value="automatic">automatic mode</option>
          <option value="manual">manual mode</option>
          <option value="trigger">trigger mode</option>
        </select>
        <p>{script.ScriptStatus}</p>
      </div>
    </div>
  )
}
