import React, { useEffect, useState } from 'react'
import './styles.css'
import PpxButton from './components/PpxButton'
import { data } from './configuration/ppx.data'
import MenuAdmin from './components/MenuAdmin'

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
      <MenuAdmin currentPath={currentPath} />

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
