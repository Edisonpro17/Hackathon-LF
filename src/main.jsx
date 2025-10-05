import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import InicioAdmin from './inicio-admin.jsx'
import KpiAdmin from './kpi-admin.jsx'

function RootApp() {
  const [path, setPath] = useState(window.location.pathname || '/')

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    // expose navigate helper
    window.appNavigate = (to) => {
      if (window.location.pathname === to) return
      window.history.pushState({}, '', to)
      // trigger popstate so all listeners update
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  if (path === '/inicio-admin') return <InicioAdmin />
  if (path === '/kpis') return <KpiAdmin />
  return <App />
}

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
)
