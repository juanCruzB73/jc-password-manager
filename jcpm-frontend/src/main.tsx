import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { JcPasswordMannagerApp } from './JcPasswordMannagerApp'
import { BrowserRouter } from 'react-router'
import { store } from "./store/store"
import { Provider } from 'react-redux'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <JcPasswordMannagerApp />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
