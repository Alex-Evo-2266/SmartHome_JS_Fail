import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import {MenuContext} from './menuContext'
import {AuthContext} from '../../context/AuthContext.js'

export const Menu = ()=>{
  const menu = useContext(MenuContext)
  const auth = useContext(AuthContext)
  return(
    <>
    <div className = "topMenu">
      <div className="menuTogle" onClick={()=>menu.togle()}>
        <span className = "icon"><i className="fas fa-bars"></i></span>
      </div>
    </div>
    <div className="navigation">
      <nav className={(menu.menu.visible)?"active":""} >
        <ul onClick = {()=>(menu.menu.visible)?menu.togle():null}>
          <li>
            <NavLink to = "/">
              <span className = "icon"><i className="fas fa-home"></i></span>
              <span className = "title">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to = "/devices">
              <span className = "icon"><i className="fas fa-plug"></i></span>
              <span className = "title">Devices</span>
            </NavLink>
          </li>
          <li>
            <NavLink to = "#">
              <span className = "icon"><i className="fas fa-user-circle"></i></span>
              <span className = "title">Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink to = "#">
              <span className = "icon"><i className="fas fa-cog"></i></span>
              <span className = "title">Options</span>
            </NavLink>
          </li>
          <li>
            <NavLink to = "#">
              <span className = "icon"><i className="fas fa-chevron-circle-down"></i></span>
              <span className = "title">Other</span>
            </NavLink>
            <ul>
              <li>
                <NavLink to = "#">
                  <span className = "icon"><i className="fas fa-cog"></i></span>
                  <span className = "title">Options</span>
                </NavLink>
              </li>
              <li>
                <NavLink to = "#">
                  <span className = "icon"><i className="fas fa-plug"></i></span>
                  <span className = "title">Devices</span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to = "#" onClick={auth.logout}>
              <span className = "icon"><i className="fas fa-sign-out-alt"></i></span>
              <span className = "title">Logout</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
    </>
  )
}
