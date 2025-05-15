import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.tsx'
import { AuthProvider, DataProvider } from './context/context.tsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <DataProvider>
      <Toaster />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataProvider>
  </AuthProvider>,
)
