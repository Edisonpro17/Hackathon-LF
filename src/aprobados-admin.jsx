import React, { useEffect, useState } from 'react'
import './styles.css'

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
            <li><a href="/inicio-admin" onClick={(e)=>{e.preventDefault(); window.appNavigate('/inicio-admin')}}>Inicio</a></li>
            <li><a href="/presentados-admin" onClick={(e)=>{e.preventDefault(); window.appNavigate('/presentados-admin')}}>Proyectos presentados</a></li>
            <li><a href="/aprobados-admin" onClick={(e)=>{e.preventDefault(); window.appNavigate('/aprobados-admin')}} className="active">Proyectos aprobados</a></li>
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
                  <td><button className="btn small" onClick={() => handlePay(p.id)}>Pago</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
