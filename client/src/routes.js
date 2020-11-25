import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {HomePage} from './Page/Homepage'
import {AuthPage} from './Page/Authpage'
import {DevicesPage} from './Page/Devicespage'
import {ProfilePage} from './Page/ProfilePage'

export const useRoutes = isAuthenticated=>{
  if(isAuthenticated){
    return(
      <Switch>
        <Route path="/home" exact>
          <HomePage/>
        </Route>
        <Route path="/devices" exact>
          <DevicesPage/>
        </Route>
        <Route path="/profile" exact>
          <ProfilePage/>
        </Route>
        <Redirect to="/home"/>
      </Switch>
    )
  }
  return(
    <Switch>
      <Route path="/" exact>
        <AuthPage/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}
