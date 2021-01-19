import React, {useContext,useEffect,useState,useCallback} from 'react'
import {NavLink,useLocation} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext.js'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {Loader} from '../components/Loader'
import {ImageInput} from '../components/moduls/imageInput'
import {InputNumber} from '../components/moduls/inputNumber'
import lightStyle from '../img/lightstyle.png'
import nightStyle from '../img/nightstyle.png'
import gibridStyle from '../img/gibridstyle.png'

export const OptionsPage = () => {
  const auth = useContext(AuthContext)
  const {message} = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const location = useLocation();

  const [serverconf , setServerconf] = useState({
    auteStyle:false,
    staticBackground:false,
    updateFrequency: "2",
    mqttBroker:'none',
    loginMqttBroker:'',
    passwordMqttBroker:''
  });

  useEffect(()=>{
    message(error,"error")
    return ()=>{
      clearError();
    }
  },[error,message, clearError])

  const styleHandler = async(event)=>{
    await request(`/api/user/config/style/edit`, 'POST', {style:event.target.name},{Authorization: `Bearer ${auth.token}`})
    window.location.reload();
  }

  const serverConfigHandler = async(event)=>{
    await request(`/api/server/config/edit`, 'POST', serverconf,{Authorization: `Bearer ${auth.token}`})
    setTimeout(()=>{
      window.location.reload();
    },2000)
  }

  const checkedHandler = event => {
    setServerconf({ ...serverconf, [event.target.name]: event.target.checked })
  }
  const changeHandler = event => {
    setServerconf({ ...serverconf, [event.target.name]: event.target.value })
  }
  const changeNumberHandler = (Number,key) => {
    setServerconf({ ...serverconf, [key]: Number })
  }

  const updataConf = useCallback(async()=>{
    const data = await request(`/api/server/config`, 'GET', null,{Authorization: `Bearer ${auth.token}`})
    if(!data)return;
    setServerconf({
      auteStyle:data.server.auteStyle,
      staticBackground:data.server.staticBackground,
      updateFrequency:data.server.updateFrequency,
      mqttBroker:data.server.mqttBroker||"",
      loginMqttBroker:data.server.loginMqttBroker||"",
      passwordMqttBroker:data.server.passwordMqttBroker||""
    })
  },[request,auth.token])

  useEffect(()=>{
    updataConf()
  },[updataConf])


  return(
    <div className = "conteiner">
        <div className = "pages">
        {
          (loading)?
          <Loader/>:
          <>
          <div className = {`page ${(location.pathname==="/config")?"active":""}`}>
            <div className = "pagecontent">
              <div className="configElement choice">
                <h2>Style</h2>
                <img src={nightStyle} className="choice" name="night" onClick={styleHandler}/>
                <img src={gibridStyle} className="choice" name="gibrid" onClick={styleHandler}/>
                <img src={lightStyle} className="choice" name="light" onClick={styleHandler}/>
              </div>
            </div>
          </div>
          <div className = {`page ${(location.pathname==="/config/server")?"active":""}`}>
            <div className = "pagecontent">
              <div className="configElement">
                <p className="switchText">changing style when changing time of day</p>
                <label className="switch">
                  <input onChange={checkedHandler} name="auteStyle" type="checkbox" checked={serverconf.auteStyle}></input>
                  <span></span>
                  <i className="indicator"></i>
                </label>
              </div>
              <div className="configElement">
                <p className="switchText">static background</p>
                <label className="switch">
                  <input onChange={checkedHandler} name="staticBackground" type="checkbox" checked={serverconf.staticBackground}></input>
                  <span></span>
                  <i className="indicator"></i>
                </label>
              </div>
              <div className="configElement">
                <p className="switchText">update frequency (s)</p>
                <label className="number">
                  <InputNumber min={1} max={600} Xten={true} result={(v)=>changeNumberHandler(v,"updateFrequency")} Value={serverconf.updateFrequency}/>
                </label>
              </div>
              <div className="configElement">
                <p className="text">Mqtt broker</p>
                <label className="text">
                  <input placeholder="IP Mqtt broker" onChange={changeHandler} name="mqttBroker" type="text" value={serverconf.mqttBroker} disabled = {(serverconf.mqttBroker==="none")}></input>
                </label>
                <p className="text">Mqtt login</p>
                <label className="text">
                  <input placeholder="login Mqtt broker" onChange={changeHandler} name="loginMqttBroker" type="text" value={serverconf.loginMqttBroker} disabled = {(serverconf.mqttBroker==="none")}></input>
                </label>
                <p className="text">Mqtt password</p>
                <label className="text">
                  <input placeholder="password Mqtt broker" onChange={changeHandler} name="passwordMqttBroker" type="text" value={serverconf.passwordMqttBroker} disabled = {(serverconf.mqttBroker==="none")}></input>
                </label>
              </div>
              <button onClick={serverConfigHandler}>Save</button>
            </div>
          </div>
          <div className = {`page ${(location.pathname==="/config/image")?"active":""}`}>
            <div className="configElement img">
              <h3>Background</h3>
              <ImageInput id="1" title="Base" name = "fon-base" src = "http://localhost:5000/api/base/fonImage/base"/>
              <ImageInput id="2" title="Sunrise" name="fon-sunrise" src = "http://localhost:5000/api/base/fonImage/sunrise"/>
              <ImageInput id="3" title="Day" name="fon-day" src = "http://localhost:5000/api/base/fonImage/day"/>
              <ImageInput id="4" title="Twilight" name="fon-twilight" src = "http://localhost:5000/api/base/fonImage/twilight"/>
              <ImageInput id="5" title="Night" name="fon-night" src = "http://localhost:5000/api/base/fonImage/night"/>
            </div>
          </div>
          <ul className = "page-nav">
            <li className = {(location.pathname==="/config")?"active":""}>
              <NavLink to = "/config" exact >
                <i className="fas fa-user"></i>
              </NavLink>
            </li>
            <li className = {(location.pathname==="/config/server")?"active":""}>
              <NavLink to = "/config/server" >
                <i className="fas fa-server"></i>
              </NavLink>
            </li>
            <li className = {(location.pathname==="/config/image")?"active":""}>
              <NavLink to = "/config/image" >
                <i className="fas fa-image"></i>
              </NavLink>
            </li>
          </ul>
          </>
        }
        </div>
      </div>
  )
}
