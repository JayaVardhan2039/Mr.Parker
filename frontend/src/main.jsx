import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './Context/UserContext.jsx'
import MrParkerContext from './Context/MrParkerContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MrParkerContext>
      
    <UserContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContext> 
    </MrParkerContext> 
  </StrictMode>,
)
