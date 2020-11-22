import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Alert} from './components/alert/alert.js'
import {Menu} from './components/verticalMenu/menu.js'
import {Form} from './components/Form/form'
import {AlertState} from './components/alert/alertState'
import {MenuState} from './components/verticalMenu/menuState'
import {FormState} from './components/Form/formState'
import {useRoutes} from './routes.js'
import {useAuth} from './hooks/auth.hook.js'
import {AuthContext} from './context/AuthContext'
import setStyle from './timeStyle.js'
import './css/style-auth.css'
import './icon/css/all.min.css'
import './css/style-alert.css'
import './css/style-components.css'

function App() {
  setStyle();
  const {token, login, logout, userId, userLevel,ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return(
      <h1>Loding</h1>
    )
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, userLevel, isAuthenticated
    }}>
    <AlertState>
    <MenuState>
    <FormState>

    <BrowserRouter>
      <div className="App">
        <Alert/>
        <Form/>
        {(isAuthenticated)?<Menu/>:null}
        {routes}
      </div>
    </BrowserRouter>

    </FormState>
    </MenuState>
    </AlertState>
    </AuthContext.Provider>
  );
}

export default App;
