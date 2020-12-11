import React, {useState} from 'react'
import {HidingLi} from '../../../hidingLi.js'

export const LightMqttConf = ({next,back})=>{

  const [form, setForm] = useState({
    pover: '',
    poverStatus:'',
    turnOnSignal:'1',
    turnOffSignal:'0',
    lavelLight:'',
    lavelLightStatus:'',
    minLight:0,
    maxLight:255,
    color:'',
    colorStatus:'',
    minColor:0,
    maxColor:255,
    mode:'',
    modeStatus:'',
    countMode:2,
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
          <HidingLi title = "power">
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
          <HidingLi title = "lavel light">
          <label>
            <h5>Enter the topic by lavel light</h5>
            <input className = "textInput" placeholder="topic lavel light" id="lavelLight" type="text" name="lavelLight" value={form.lavelLight} onChange={changeHandler} required/>
          </label>
          <label>
            <h5>Enter the topic by lavel light status</h5>
            <input className = "textInput" placeholder="topic lavel light status" id="lavelLightStatus" type="text" name="lavelLightStatus" value={form.pover} onChange={changeHandler} required/>
          </label>
          <label>
            <h5>Enter the min light</h5>
            <input className = "textInput" placeholder="min light" id="minLight" type="number" name="minLight" value={form.minLight} onChange={changeHandler} required/>
          </label>
          <label>
            <h5>Enter the max light</h5>
            <input className = "textInput" placeholder="max light" id="maxLight" type="number" name="maxLight" value={form.maxLight} onChange={changeHandler} required/>
          </label>
          </HidingLi>
          <HidingLi title = "color">
          <label>
            <h5>Enter the topic by color</h5>
            <input className = "textInput" placeholder="topic color" id="color" type="text" name="color" value={form.color} onChange={changeHandler} required/>
          </label>
          <label>
            <h5>Enter the topic by color status</h5>
            <input className = "textInput" placeholder="topic color status" id="colorStatus" type="text" name="colorStatus" value={form.colorStatus} onChange={changeHandler} required/>
          </label>
          <label>
            <h5>Enter the min color</h5>
            <input className = "textInput" placeholder="min color" id="minColor" type="number" name="minColor" value={form.minColor} onChange={changeHandler} required/>
          </label>
          <label>
            <h5>Enter the max color</h5>
            <input className = "textInput" placeholder="max color" id="maxColor" type="number" name="maxColor" value={form.maxColor} onChange={changeHandler} required/>
          </label>
          </HidingLi>
          <HidingLi title = "mode">
          <label>
            <h5>Enter the topic by mode</h5>
            <input className = "textInput" placeholder="topic mode" id="mode" type="text" name="mode" value={form.mode} onChange={changeHandler} required/>
          </label>
          <label>
            <h5>Enter the topic by mode status</h5>
            <input className = "textInput" placeholder="topic mode status" id="modeStatus" type="text" name="modeStatus" value={form.modeStatus} onChange={changeHandler} required/>
          </label>
          <label>
            <h5>Enter the count mode</h5>
            <input className = "textInput" placeholder="count mode" id="countMode" type="number" name="countMode" value={form.countMode} onChange={changeHandler} required/>
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
