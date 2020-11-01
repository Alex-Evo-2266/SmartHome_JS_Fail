import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {HomePage} from './Page/Homepage'
import {AuthPage} from './Page/Authpage'

export const useRoutes = isAuthenticated=>{
  if(isAuthenticated){
    return(
      <Switch>
        <Route path="/" exact>
          <HomePage/>
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
