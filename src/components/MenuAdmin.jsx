import React, { useEffect, useState } from 'react'
import '../styles.css'

export default function MenuAdmin({ currentPath = '/' }) {
  const [propuestasOpen, setPropuestasOpen] = useState(false)
  const [proyectosOpen, setProyectosOpen] = useState(false)

  // Open related submenus when the current path matches
  useEffect(() => {
    if (currentPath.startsWith('/presentados-admin')) {
      setPropuestasOpen(true)
      setProyectosOpen(true)
    } else if (currentPath.startsWith('/aprobados-admin')) {
      setProyectosOpen(true)
    }
  }, [currentPath])

  const go = (to) => {
    if (typeof window !== 'undefined') {
      window.appNavigate ? window.appNavigate(to) : (window.location.href = to)
    }
  }

  return (
    <aside className="sidebar" id="sidebar">
      <div className="brand">
        <span className="dot" />
        Fundación La Favorita
      </div>

      <nav>
        <ul className="nav-list">
          <li>
            <a className={`nav-link ${currentPath === '/inicio-admin' ? 'active' : ''}`} href="/inicio-admin" onClick={(e)=>{e.preventDefault(); go('/inicio-admin')}}>Inicio</a>
          </li>

          <li>
            <button className="nav-toggle" onClick={(e)=>{e.preventDefault(); setPropuestasOpen(s=>!s)}}>
              Propuestas <span className={`chev ${propuestasOpen ? 'open' : ''}`}>▾</span>
            </button>
            <ul className={`nested ${propuestasOpen ? 'open' : ''}`}>
              <li>
                <a className="nav-link" href="#">Propuestas presentadas</a>
              </li>
              <li>
                <a className="nav-link" href="#">Propuestas aceptadas</a>
              </li>
              <li>
                <a className="nav-link" href="#">Propuestas rechazadas</a>
              </li>
              <li>
                <a className="nav-link" href="#">Propuestas por modificar</a>
              </li>
            </ul>
          </li>

          <li>
            <a className={`nav-link ${currentPath === '/kpis' ? 'active' : ''}`} href="/kpis" onClick={(e)=>{e.preventDefault(); go('/kpis')}}>KPI's aprobados</a>
          </li>

          <li>
            <a className="nav-link" href="https://app.powerbi.com/view?r=eyJrIjoiODViODZhYjgtYTkzMS00MGQ0LTk2M2UtMGI0MzZiYjI3ZGY5IiwidCI6ImQ4MmUyZTBkLTk4ZTEtNGNlZS1hZjQ0LTZjN2I2MTcwNjZlNyIsImMiOjR9" target="_blank" rel="noopener noreferrer">Reportes</a>
          </li>

          <li>
            <button className="nav-toggle" onClick={(e)=>{e.preventDefault(); setProyectosOpen(s=>!s)}}>
              Proyectos <span className={`chev ${proyectosOpen ? 'open' : ''}`}>▾</span>
            </button>
            <ul className={`nested ${proyectosOpen ? 'open' : ''}`}>
              <li>
                <a className={`nav-link ${currentPath === '/presentados-admin' ? 'active' : ''}`} href="/presentados-admin" onClick={(e)=>{e.preventDefault(); go('/presentados-admin')}}>Proyectos presentados</a>
              </li>
              <li>
                <a className={`nav-link ${currentPath === '/aprobados-admin' ? 'active' : ''}`} href="/aprobados-admin" onClick={(e)=>{e.preventDefault(); go('/aprobados-admin')}}>Proyectos aprobados</a>
              </li>
            </ul>
          </li>

          <li>
            <a className="nav-link" href="#">Donaciones</a>
          </li>
          <li>
            <a className="nav-link" href="#">Presupuestos asignados</a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
