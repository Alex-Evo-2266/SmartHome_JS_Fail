import React, {useState} from 'react'
import {HidingLi} from '../../../hidingLi.js'

export const SwitchMqttConf = ({next,back})=>{

  const [form, setForm] = useState({
    pover: '',
    poverStatus:'',
    turnOnSignal:'1',
    turnOffSignal:'0',
  });

  const nextpage = ()=>{
    next(form)
  }

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const errorbtn = ()=>{
    let input = document.getElementById("pover");
    input.style.background="red"
    input.style.boxShadow="inset 0 0 10px #000"
  }

  return(
    <div className = "pageForm hide">
      <div className = "formContent moreInput">
        <ul>
          <HidingLi title = "power" show = {true}>
          <label>
            <h5>Enter the topic by pover</h5>
            <input className = "textInput" placeholder="topic pover" id="pover" type="text" name="pover" value={form.pover} onChange={changeHandler} required/>
          </label>
          <label>
            <h5>Enter the topic by pover status</h5>
            <input className = "textInput" placeholder="topic pover status" id="poverStatus" type="text" name="poverStatus" value={form.poverStatus} onChange={changeHandler} required/>
          </label>
          <label>
            <h5>Enter the turn on signal</h5>
            <input className = "textInput" placeholder="turn On" id="turnOn" type="text" name="turnOnSignal" value={form.turnOnSignal} onChange={changeHandler} required/>
          </label>
          <label>
            <h5>Enter the turn off signal</h5>
            <input className = "textInput" placeholder="turn Off" id="turnOff" type="text" name="turnOffSignal" value={form.turnOffSignal} onChange={changeHandler} required/>
          </label>
          </HidingLi>
        </ul>
      </div>
      <div className="formFooter">
      {
        (!form.pover)?
        <button onClick={errorbtn} className ='FormControlBtn right disabled'>Next <i className="fas fa-arrow-right"></i></button>
        :
        <button onClick={nextpage} className ='FormControlBtn right' disabled = {!form.pover}>Next <i className="fas fa-arrow-right"></i></button>
      }
        <button onClick={back} className ="FormControlBtn left"><i className="fas fa-arrow-left"></i> Previous</button>
      </div>
    </div>
  )
}
