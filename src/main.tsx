import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/global.scss";
import "@/styles/_fonts.scss";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
