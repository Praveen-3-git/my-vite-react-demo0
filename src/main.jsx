import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import MiniDrawer from './components/sidebar'
//import './index.css'
import './demo.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/*<App />*/}
    <MiniDrawer/>
  </React.StrictMode>,
)
