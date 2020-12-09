import React, {useContext} from 'react'
import {NavLink,Link} from 'react-router-dom'
import {MenuContext} from './menuContext'
import {AuthContext} from '../../context/AuthContext.js'
import {AlertContext} from '../alert/alertContext.js'

export const Menu = ()=>{
  const menu = useContext(MenuContext)
  const auth = useContext(AuthContext)
  const {hide} = useContext(AlertContext)
  // const location = useLocation();

  return(
    <>
    <div className = "topMenu">
      <div className="menuTogle" onClick={()=>menu.togle()}>
        <span className = "icon"><i className="fas fa-bars"></i></span>
      </div>
    </div>
    <div className="navigation">
      <nav className={(menu.menu.visible)?"active":""} onClick = {hide}>
        <ul onClick = {()=>(menu.menu.visible)?menu.togle():null}>
          <li>
            <NavLink to = "/home" exact>
              <span className = "icon"><i className="fas fa-home"></i></span>
              <span className = "title">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to = "/devices" exact>
              <span className = "icon"><i className="fas fa-plug"></i></span>
              <span className = "title">Devices</span>
            </NavLink>
          </li>
          <li>
            <NavLink to = "/profile">
              <span className = "icon"><i className="fas fa-user-circle"></i></span>
              <span className = "title">Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink to = "/config">
              <span className = "icon"><i className="fas fa-cog"></i></span>
              <span className = "title">Options</span>
            </NavLink>
          </li>
          <li>
            <Link to = "#" onClick={auth.logout}>
              <span className = "icon"><i className="fas fa-sign-out-alt"></i></span>
              <span className = "title">Logout</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    </>
  )
}
