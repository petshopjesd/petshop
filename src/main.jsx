import { createRoot } from 'react-dom/client'
import { Cinicio } from './components/cinicio.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Cinicio />
  </BrowserRouter>,
)
