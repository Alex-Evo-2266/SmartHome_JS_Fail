import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Alert} from './alert/alert.js'
import {AlertState} from './alert/alertState'
import {useRoutes} from './routes.js'
import setStyle from './timeStyle.js'
import './css/style-auth.css'
import './icon/css/all.min.css'
import './css/style-alert.css'

function App() {
  setStyle();
  const routes = useRoutes(false);
  return (
    <AlertState>
    <BrowserRouter>
      <div className="App">
        <Alert/>
        {routes}
      </div>
    </BrowserRouter>
    </AlertState>
  );
}

export default App;
