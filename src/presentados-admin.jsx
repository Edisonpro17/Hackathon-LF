import React, { useState } from 'react'
import './styles.css'

const SAMPLE = [
  { id: 'P-001', title: 'Huertas comunitarias', foundation: 'Fundación La Favorita', status: 'En revisión', description: 'Proyecto para instalar huertas en comunidades vulnerables.' },
  { id: 'P-002', title: 'Programa Nutrición Escolar', foundation: 'Fundación Amanecer', status: 'Pendiente', description: 'Entrega de raciones y seguimiento nutricional en escuelas.' },
  { id: 'P-003', title: 'Capacitación Emprendedora', foundation: 'Fundación Crecer', status: 'En revisión', description: 'Capacitaciones para emprendimientos locales liderados por mujeres.' },
]

export default function PresentadosAdmin() {
  const [projects, setProjects] = useState(SAMPLE)
  const [detail, setDetail] = useState(null)
  const [propuestasOpen, setPropuestasOpen] = useState(false)
  const [proyectosOpen, setProyectosOpen] = useState(false)
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'

  function markCorrections(id) {
    setProjects((prev) => prev.map(p => p.id === id ? { ...p, status: 'En corrección' } : p))
  }

  function markApproved(id) {
    // move project to approved list (persisted in localStorage) and remove from presented list
    setProjects((prev) => prev.filter(p => p.id !== id))
    try {
      const raw = localStorage.getItem('approved_projects')
      const approved = raw ? JSON.parse(raw) : []
      const toAdd = projects.find(p => p.id === id)
      if (toAdd) {
        const next = [...approved, { ...toAdd, status: 'Aprobado' }]
        localStorage.setItem('approved_projects', JSON.stringify(next))
      }
    } catch (e) {
      console.error('Error persisting approved project', e)
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><span className="dot"/> Fundación La Favorita</div>
        <nav>
          <ul>
            <li>
              <a href="/inicio-admin" onClick={(e) => { e.preventDefault(); window.appNavigate('/inicio-admin') }}>Inicio</a>
            </li>
            <li>
              <button
                className="nav-toggle"
                onClick={(e) => { e.preventDefault(); setPropuestasOpen((s) => !s) }}
              >
                Propuestas
                <span className={`chev ${propuestasOpen ? 'open' : ''}`}>▾</span>
              </button>
              <ul className={`nested ${propuestasOpen ? 'open' : ''}`}>
                <li>Propuestas presentadas</li>
                <li>Propuestas aceptadas</li>
                <li>Propuestas rechazadas</li>
                <li>Propuestas por modificar</li>
              </ul>
            </li>
            <li>
              <a href="/kpis" onClick={(e) => { e.preventDefault(); window.appNavigate('/kpis') }}>KPI's aprobados</a>
            </li>
            <li>
              <a href="https://app.powerbi.com/view?r=eyJrIjoiNTNkYjIxMjAtNTAxYy00NTdlLTg3MzktY2U0MDljNDgzMWEwIiwidCI6ImQ4MmUyZTBkLTk4ZTEtNGNlZS1hZjQ0LTZjN2I2MTcwNjZlNyIsImMiOjR9&pageName=5f816036bbbaa2127d99" target="_blank" rel="noopener noreferrer">Reportes</a>
            </li>
            <li>
							<button
								className="nav-toggle"
								onClick={(e) => {
									e.preventDefault()
									setProyectosOpen((s) => !s)
								}}
							>
								Proyectos
								<span className={`chev ${proyectosOpen ? 'open' : ''}`}>▾</span>
							</button>
							<ul className={`nested ${proyectosOpen ? 'open' : ''}`}>
                                <li>
                                  Proyectos presentados
                                </li>
								<li>
																	<a href="/aprobados-admin" onClick={(e)=>{e.preventDefault(); window.appNavigate('/aprobados-admin')}}>Proyectos aprobados</a>
																</li>
							</ul>
						</li>
            <li>Donaciones</li>
            <li>Presupuestos asignados</li>
          </ul>
        </nav>
      </aside>

      <main className="main">
        <div className="topbar">
          <div className="title">Proyectos Presentados</div>
        </div>

        <div className="card">
          <h3>Listado de proyectos (ejemplos)</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Fundación</th>
                <th>Estado</th>
                <th style={{ width: 240 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.title}</td>
                  <td>{p.foundation}</td>
                  <td>{p.status}</td>
                  <td>
                    <button className="btn small" onClick={() => setDetail(p)}>Ver detalle</button>
                    <button className="btn small" onClick={() => markCorrections(p.id)} style={{ marginLeft: 8 }}>Correcciones</button>
                    <button className="btn small" onClick={() => markApproved(p.id)} style={{ marginLeft: 8 }}>Aprobado</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {detail && (
          <div className="kpi-form-overlay" onClick={() => setDetail(null)}>
            <div className="kpi-form" onClick={(e)=>e.stopPropagation()}>
              <h3>Detalle: {detail.title}</h3>
              <p><strong>ID:</strong> {detail.id}</p>
              <p><strong>Fundación:</strong> {detail.foundation}</p>
              <p>{detail.description}</p>
              <div className="form-actions">
                <button className="btn" onClick={() => setDetail(null)}>Cerrar</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
