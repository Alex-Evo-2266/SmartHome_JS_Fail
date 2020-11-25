import React, {useState,useEffect,useCallback, useContext} from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {useMessage} from '../../../hooks/message.hook'
import {AuthContext} from '../../../context/AuthContext.js'

export const AddDevicesForm = (props)=>{
  const [showPage, setShowPage] = useState(0);
  const [result, setResult] = useState("");
  const [form, setForm] = useState({
    typeConnect: '',
    typeDevice: '',
    name: '',
    tokenOrTopic:'',
    IP: ''
  });
  const {message, clearMessage} = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const auth = useContext(AuthContext)

  const next = ()=>{
    setShowPage(showPage + 1);
  }
  const back = ()=>{
    setShowPage(showPage - 1);
  }

  const updatePage = useCallback(() =>{
    const pages = document.body.getElementsByClassName('pageForm');
    for (var i = 0; i < pages.length; i++) {
      if(i<showPage){
        pages[i].className = "pageForm close"
      }
      else if(i===showPage){
        pages[i].className = "pageForm show"
      }
      else if(i>showPage){
        pages[i].className = "pageForm hide"
      }
    }
  },[showPage])

  useEffect(()=>{
    updatePage();
  },[showPage,updatePage])

  useEffect(()=>{
    message(error,"error")
    return ()=>{
      clearError();
    }
  },[error,message, clearError])

  const changeHandlerImageBtn = event => {
    if(event.target.className.split(' ')[0]!=="choiceElem"&&event.target.className!=="textInput"){
      setForm({ ...form, [event.target.offsetParent.name]: event.target.offsetParent.value })
      return
    }
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const outHandler = async () => {
    try {
      clearMessage();
      const data = await request('/api/devices/add', 'POST', {...form},{Authorization: `Bearer ${auth.token}`})
      console.log(data);
      setResult(data.message);
      next();
    } catch (e) {

    }
  }

  return (
    <>
    <div className = "form">
        <div className = "pageForm show">
          <div id = "formContent" className = "formContent">
            <h2>Create Device</h2>
            <p>
              Hello. this is the menu for creating a new device, click start to continue.
            </p>
          </div>
          <div className="formFooter">
            <button onClick={next} className ="FormControlBtn right">Start <i className="fas fa-arrow-right"></i></button>
          </div>
        </div>
        <div className = "pageForm hide">
          <div className = "formContent">
            <h2>Select communication protocol</h2>
            <div className = "choice flex">
              <button content = "miio" name = "typeConnect" className ={`choiceElem circle ${(form&&form.typeConnect==="miio")?"active":""}`} value = "miio" onClick = {changeHandler}>
                Miio
              </button>
              <button content = "mqtt" name = "typeConnect" className ={`choiceElem circle ${(form&&form.typeConnect==="mqtt")?"active":""}`} value = "mqtt" onClick = {changeHandler}>
                Mqtt
              </button>
              <button content = "other" name="typeConnect" className={`choiceElem circle ${(form&&form.typeConnect!=="miio"&&form.typeConnect!=="mqtt"&&form.typeConnect!=="")?"active":""}`} value = " " onClick = {changeHandler}>
                <h4>Other</h4>
              </button>
            </div>
          </div>
          <div className="formFooter">
            <button onClick={next} className ="FormControlBtn right" disabled = {!form.typeConnect}>Next <i className="fas fa-arrow-right"></i></button>
            <button onClick={back} className ="FormControlBtn left"><i className="fas fa-arrow-left"></i> Previous</button>
          </div>
        </div>
        {
          (form.typeConnect !== "mqtt")?
          <div className = "pageForm hide">
            <div className = "formContent">
              <h2>Select device type</h2>
              <div className = "choice flex">
                <button name = "typeDevice" className ={`choiceElem square ${(form&&form.typeDevice&&form.typeDevice==="lamp")?"active":""}`} value = "lamp" onClick = {changeHandlerImageBtn}>
                  <i className="far fa-lightbulb"></i>
                </button>
                <button name = "typeDevice" className ={`choiceElem square ${(form&&form.typeDevice&&form.typeDevice==="switch")?"active":""}`} value = "switch" onClick = {changeHandlerImageBtn}>
                  <i className="fas fa-toggle-on"></i>
                </button>
                <button name = "typeDevice" className ={`choiceElem square ${(form&&form.typeDevice&&form.typeDevice==="switch")?"active":""}`} value = "switch" onClick = {changeHandlerImageBtn}>
                  <i className="fas fa-toggle-on"></i>
                </button>
                <button name="typeDevice" className={`choiceElem square ${(form&&form.typeDevice&&form.typeDevice!=="lamp"&&form.typeConnect!=="switch")?"active":""}`} value = " " onClick = {changeHandlerImageBtn}>
                  <h4>Other</h4>
                </button>
              </div>
            </div>
            <div className="formFooter">
              <button onClick={next} className ='FormControlBtn right' disabled = {!form.typeDevice}>Next <i className="fas fa-arrow-right"></i></button>
              <button onClick={back} className ="FormControlBtn left"><i className="fas fa-arrow-left"></i> Previous</button>
            </div>
          </div>:
          null
        }
        <div className = "pageForm hide">
          <div className = "formContent">
            {
              (form.typeConnect === "mqtt")?
              <h2>Enter connection name</h2>:
              <h2>Enter the device name</h2>
            }
            <input className = "textInput" placeholder="name" id="name" type="text" name="name" value={form.name} onChange={changeHandler} required/>
          </div>
          <div className="formFooter">
            <button onClick={next} className ='FormControlBtn right' disabled = {!form.name}>Next <i className="fas fa-arrow-right"></i></button>
            <button onClick={back} className ="FormControlBtn left"><i className="fas fa-arrow-left"></i> Previous</button>
          </div>
        </div>
        <div className = "pageForm hide">
          <div className = "formContent">
          {
            (form.typeConnect === "mqtt")?
            <h2>Enter topic</h2>:
            <h2>Enter token</h2>
          }
          <input className = "textInput" placeholder={(form.typeConnect === "mqtt")?"Enter topic":"Enter token"} id="token" type="text" name="tokenOrTopic" value={form.tokenOrTopic} onChange={changeHandler} required/>
          </div>
          <div className="formFooter">
            <button onClick={outHandler} className ='FormControlBtn right' disabled = {!form.tokenOrTopic}>Create</button>
            <button onClick={back} className ="FormControlBtn left"> <i className="fas fa-arrow-left"></i> Previous</button>
          </div>
        </div>
        <div className = "pageForm hide">
          <div className = "formContent">
            {
              (loading)?
              <h2>loading...</h2>:
              <h2>{result}</h2>
            }
          </div>
          <div className="formFooter">
            <button onClick={props.hide} className ='FormControlBtn right' disabled = {loading}>Finish</button>
          </div>
        </div>
    </div>
    <div className= "progressForm">
    </div>
    </>
  )
}