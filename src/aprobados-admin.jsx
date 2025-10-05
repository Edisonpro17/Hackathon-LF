import React, { useEffect, useState } from 'react'
import './styles.css'
import PpxButton from './components/PpxButton'
import { data } from './configuration/ppx.data'

function loadApproved() {
  try {
    const raw = localStorage.getItem('approved_projects')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function AprobadosAdmin() {
  const [approved, setApproved] = useState(loadApproved)
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
  const [propuestasOpen, setPropuestasOpen] = useState(false)
  const [proyectosOpen, setProyectosOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('approved_projects', JSON.stringify(approved))
  }, [approved])

  function handlePay(id) {
    alert(`Iniciando flujo de pago para ${id} (simulado)`)
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><span className="dot"/> Fundación La Favorita</div>
        <nav>
          <ul>
            <li className={currentPath === "/inicio-admin" ? "active" : ""}>
              <a
                href="/inicio-admin"
                onClick={(e) => {
                  e.preventDefault();
                  window.appNavigate("/inicio-admin");
                }}
              >
                Inicio
              </a>
            </li>
            <li>
              <button
                className="nav-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  setPropuestasOpen((s) => !s);
                }}
              >
                Propuestas
                <span className={`chev ${propuestasOpen ? "open" : ""}`}>
                  ▾
                </span>
              </button>
              <ul className={`nested ${propuestasOpen ? "open" : ""}`}>
                <li>Propuestas presentadas</li>
                <li>Propuestas aceptadas</li>
                <li>Propuestas rechazadas</li>
                <li>Propuestas por modificar</li>
              </ul>
            </li>
            <li className={currentPath === "/kpis" ? "active" : ""}>
              <a
                href="/kpis"
                onClick={(e) => {
                  e.preventDefault();
                  window.appNavigate("/kpis");
                }}
              >
                KPI's aprobados
              </a>
            </li>
            <li>
              <a
                href="https://app.powerbi.com/view?r=eyJrIjoiNTNkYjIxMjAtNTAxYy00NTdlLTg3MzktY2U0MDljNDgzMWEwIiwidCI6ImQ4MmUyZTBkLTk4ZTEtNGNlZS1hZjQ0LTZjN2I2MTcwNjZlNyIsImMiOjR9&pageName=5f816036bbbaa2127d99"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reportes
              </a>
            </li>
            <li>
              <button
                className="nav-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  setProyectosOpen((s) => !s);
                }}
              >
                Proyectos
                <span className={`chev ${proyectosOpen ? "open" : ""}`}>▾</span>
              </button>
              <ul className={`nested ${proyectosOpen ? "open" : ""}`}>
                <li>
                  <a
                    href="/presentados-admin"
                    onClick={(e) => {
                      e.preventDefault();
                      window.appNavigate("/presentados-admin");
                    }}
                  >
                    Proyectos presentados
                  </a>
                </li>
                <li>
                  <a
                    href="/aprobados-admin"
                    onClick={(e) => {
                      e.preventDefault();
                      window.appNavigate("/aprobados-admin");
                    }}
                  >
                    Proyectos aprobados
                  </a>
                </li>
              </ul>
            </li>
            <li>Donaciones</li>
            <li>Presupuestos asignados</li>
          </ul>
        </nav>
      </aside>

      <main className="main">
        <div className="topbar"><div className="title">Proyectos Aprobados</div></div>

        <div className="card">
          <h3>Proyectos aprobados</h3>
          <table>
            <thead>
              <tr><th>ID</th><th>Título</th><th>Fundación</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {approved.length === 0 && (
                <tr><td colSpan={4} className="muted">No hay proyectos aprobados</td></tr>
              )}
              {approved.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.title}</td>
                  <td>{p.foundation}</td>
<td>
  <PpxButton data={data} />
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
