import React, { useState } from 'react'
import './App.css'
import ReportForm from './components/ReportForm'
import ReportsStatus from './components/ReportsStatus'

function Fundacion({ user, onLogout }) {
  const [active, setActive] = useState('inicio')
  const [reports, setReports] = useState([])
  const [favoriteFoundation, setFavoriteFoundation] = useState('Fundación A')

  const handleAddReport = (report, targetFoundation) => {
    const withTarget = { ...report, sentTo: targetFoundation }
    setReports(prev => [withTarget, ...prev])
  }

  // Derivar la lista de fundaciones de la fundación favorita y de los reportes enviados
  const foundations = Array.from(new Set([favoriteFoundation, ...reports.map(r => r.sentTo).filter(Boolean)])).filter(Boolean)

  return (
    <div className="App" style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      
      {/* Sidebar */}
      <aside className="app-sidebar" style={{ width: 250, background: '#f5f5f5', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div className="profile">
            <h3>Fundación Favorita</h3>
            <div>{user?.name || 'Usuario'}</div>
          </div>

          <nav className="sidebar-nav" style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className={active === 'inicio' ? 'active' : ''} onClick={() => setActive('inicio')}>Inicio</button>
            <button className={active === 'reportes' ? 'active' : ''} onClick={() => setActive('reportes')}>Reportes</button>
            <button className={active === 'estado' ? 'active' : ''} onClick={() => setActive('estado')}>Estado de reportes</button>
          </nav>

          {/* favorite selection removed per request */}
        </div>

        <div style={{ marginTop: 16 }}>
          <button onClick={onLogout}>Cerrar sesión</button>
        </div>
      </aside>

      {/* Main */}
      <main className="app-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', padding: 24 }}>
        <header className="main-header">
          <h1>Panel de gestión</h1>
          <p>Aquí puedes crear, ver y enviar reportes.</p>
        </header>

        <section className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Inicio */}
          {active === '' && (
            <div className="inicio-section" style={{ textAlign: 'center' }}>
              <h2>Inicio</h2>
              <div className="inicio-card" style={{ background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                  <img src="/public/inicio.png" alt="Inicio" className="inicio-logo" />
                <h3>Nuestra Visión</h3>
                <p>Ser una organización referente en impacto social y comunitario.</p>
                <h3>Nuestra Misión</h3>
                <p>Promover el bienestar y desarrollo sostenible a través de programas integrales.</p>
              </div>
            </div>
          )}

          {/* Reportes */}
          {active === 'reportes' && (
            <div className="report-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h2>Crear reporte</h2>
              
              {/* Formulario */}
              <ReportForm
                onSubmit={(report) => handleAddReport(report, favoriteFoundation)}
                foundations={foundations}
                favorite={favoriteFoundation}
              />

              {/* CRUD */}
              {reports.length > 0 && (
                <div className="reports-crud" style={{ marginTop: 24 }}>
                  <h3>Reportes enviados</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#eee' }}>
                        <th>ID</th>
                        <th>Eje</th>
                        <th>Periodo</th>
                        <th>Departamento</th>
                        <th>Logros</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map(r => (
                        <tr key={r.id} style={{ borderBottom: '1px solid #ddd' }}>
                          <td>{r.id}</td>
                          <td>{r.eje}</td>
                          <td>{r.period}</td>
                          <td>{r.department}</td>
                          <td>{r.achievements}</td>
                          <td>{r.status}</td>
                          <td>
                            <button onClick={() => alert(JSON.stringify(r, null, 2))}>Ver</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Estado */}
          {active === 'estado' && (
            <div className="status-section">
              <h2>Estado de reportes</h2>
              <ReportsStatus reports={reports} />
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Fundacion
