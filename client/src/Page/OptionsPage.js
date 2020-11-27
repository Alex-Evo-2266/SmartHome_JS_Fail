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
  });

  const styleHandler = async(event)=>{
    const data = await request(`/api/user/config/style/edit`, 'POST', {style:event.target.name},{Authorization: `Bearer ${auth.token}`})
  }

  const serverConfigHandler = async(event)=>{
    const data = await request(`/api/server/config/edit`, 'POST', serverconf,{Authorization: `Bearer ${auth.token}`})
  }

  const checkedHandler = event => {
    setServerconf({ ...serverconf, [event.target.name]: event.target.checked })
  }
  const fileHandler = async event =>{

    const file = event.target.files[0]
    var data = new FormData();
    data.append('photo',file)
    const data2 = await request(`/api/base/fonImage/set`, 'POST',
    data
    ,{
      Authorization: `Bearer ${auth.token}`
    },true)
  }

  useEffect(()=>console.log(serverconf),[serverconf])


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
                  <input onChange={checkedHandler} name="auteStyle" type="checkbox" value={serverconf.auteStyle}></input>
                  <span></span>
                  <i className="indicator"></i>
                </label>
              </div>
              <div className="configElement">
                <p className="switchText">static background</p>
                <label className="switch">
                  <input onChange={checkedHandler} name="staticBackground" type="checkbox" value={serverconf.staticBackground}></input>
                  <span></span>
                  <i className="indicator"></i>
                </label>
              </div>
              {
                (serverconf.staticBackground)?
                <div className="configElement img">
                  <h3>Background</h3>
                  <ImageInput title="day" name = "base" onChange={fileHandler} src = "http://localhost:5000/api/base/fonImage/base/base/day"/>
                </div>:
                <div className="configElement img">
                  <h3>Background</h3>
                  <ImageInput title="day2" name="day" onChange={fileHandler} src = "http://localhost:5000/api/base/fonImage/base/base/day"/>
                </div>
              }
              <button onClick={serverConfigHandler}>Save</button>
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
          </ul>
          </>
        }
        </div>
      </div>
  )
}
