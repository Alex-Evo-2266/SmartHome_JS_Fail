import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {HomePage} from './Page/HomePage'
import {AuthPage} from './Page/AuthPage'
import {DevicesPage} from './Page/DevicesPage'
import {ProfilePage} from './Page/ProfilePage'
import {OptionsPage} from './Page/OptionsPage'
import {ScriptsPage} from './Page/ScriptsPage'
import {NewScriptsPage} from './Page/NewScriptsPage'

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
        <Route path="/scripts" exact>
          <ScriptsPage/>
        </Route>
        <Route path="/scripts/add" exact>
          <NewScriptsPage/>
        </Route>
        <Route path="/scripts/edit/:id">
          <NewScriptsPage edit={true}/>
        </Route>
        <Route path="/profile">
          <ProfilePage/>
        </Route>
        <Route path="/config">
          <OptionsPage/>
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
