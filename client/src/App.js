import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from './routes.js'
import setStyle from './timeStyle.js'
import './css/style-auth.css'
import './icon/css/all.min.css'

function App() {
  setStyle();
  const routes = useRoutes(false);
  return (
    <BrowserRouter>
      <div className="App">
        {routes}
      </div>
    </BrowserRouter>
  );
}

export default App;
