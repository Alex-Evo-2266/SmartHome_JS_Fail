import React, {useContext,useEffect,useState,useCallback} from 'react'
import {NavLink,useLocation} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext.js'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {Loader} from '../components/Loader'
import {ImageInput} from '../components/moduls/imageInput'

export const OptionsPage = () => {
  const auth = useContext(AuthContext)
  const {message} = useMessage();
  const {loading, request, error, clearError} = useHttp();
  const location = useLocation();

  const [serverconf , setServerconf] = useState({
    auteStyle:false,
    staticBackground:false,
    mqttBroker:''
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
    window.location.reload();
  }

  const checkedHandler = event => {
    setServerconf({ ...serverconf, [event.target.name]: event.target.checked })
  }
  const changeHandler = event => {
    setServerconf({ ...serverconf, [event.target.name]: event.target.value })
  }

  const updataConf = useCallback(async()=>{
    const data = await request(`/api/server/config`, 'GET', null,{Authorization: `Bearer ${auth.token}`})
    setServerconf({
      auteStyle:data.server.auteStyle,
      staticBackground:data.server.staticBackground,
      mqttBroker:data.server.mqttBroker||""
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
                <button className="choice" name="night" onClick={styleHandler}></button>
                <button className="choice" name="gibrid" onClick={styleHandler}></button>
                <button className="choice" name="light" onClick={styleHandler}></button>
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
                <p className="text">Mqtt broker</p>
                <label className="text">
                  <input placeholder="IP Mqtt broker" onChange={changeHandler} name="mqttBroker" type="text" value={serverconf.mqttBroker}></input>
                  <span></span>
                  <i className="indicator"></i>
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
