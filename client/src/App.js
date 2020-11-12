import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Alert} from './alert/alert.js'
import {AlertState} from './alert/alertState'
import {useRoutes} from './routes.js'
import {useAuth} from './hooks/auth.hook.js'
import {AuthContext} from './context/AuthContext'
import setStyle from './timeStyle.js'
import './css/style-auth.css'
import './icon/css/all.min.css'
import './css/style-alert.css'

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
    <BrowserRouter>
      <div className="App">
        <Alert/>
        {routes}
      </div>
    </BrowserRouter>
    </AlertState>
    </AuthContext.Provider>
  );
}

export default App;
