import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {HomePage} from './Page/Homepage'
import {AuthPage} from './Page/Authpage'
import {DevicesPage} from './Page/Devicespage'

export const useRoutes = isAuthenticated=>{
  if(isAuthenticated){
    return(
      <Switch>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        <Route path="/devices" exact>
          <DevicesPage/>
        </Route>
        <Redirect to="/"/>
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
