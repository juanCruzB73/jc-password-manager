import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { JcPasswordMannagerApp } from './JcPasswordMannagerApp'
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <JcPasswordMannagerApp />
  </StrictMode>,
)
