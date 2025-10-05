import React, { useState, useEffect } from 'react';
import './App.css';
import ReportForm from './components/ReportForm';
import ReportsStatus from './components/ReportsStatus';

function Fundacion({ user, onLogout }) {
  const [active, setActive] = useState('inicio');
  const [reports, setReports] = useState([]);
  const [iframeHeight, setIframeHeight] = useState(window.innerHeight - 200); // Altura inicial estimada

  const handleAddReport = (report) => {
    setReports(prev => [report, ...prev]);
  };

  // Ajustar la altura del iframe cuando cambia el tamaño de la ventana
  useEffect(() => {
    function handleResize() {
      // Resta 200 para considerar márgenes, header y paddings
      setIframeHeight(window.innerHeight - 200);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App" style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      
      {/* Sidebar */}
      <aside
        className="app-sidebar"
        style={{
          width: 250,
          background: '#ff0202',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <div className="profile">
            <h3>Fundación Favorita</h3>
            <div>{user?.name || 'Usuario'}</div>
          </div>

          <nav
            className="sidebar-nav"
            style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}
          >
            <button className={active === 'inicio' ? 'active' : ''} onClick={() => setActive('inicio')}>Inicio</button>
            <button className={active === 'reportes' ? 'active' : ''} onClick={() => setActive('reportes')}>Reportes</button>
            <button className={active === 'estado' ? 'active' : ''} onClick={() => setActive('estado')}>Estado de reportes</button>
          </nav>
        </div>

        <button onClick={onLogout} style={{ marginTop: 16 }}>Cerrar sesión</button>
      </aside>

      {/* Main */}
      <main
        className="app-main"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto', padding: 24 }}
      >
        <header
          className="main-header"
          style={{
            textAlign: 'center',
            padding: '16px 0',
            borderBottom: '2px solid #ff0202',
            marginBottom: 24
          }}
        >
          <h1 style={{ margin: 0, fontSize: '2rem', color: '#333' }}>Panel de gestión</h1>
        </header>

        <section
          className="main-content"
          style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}
        >

          {/* Inicio */}
          {active === 'inicio' && (
            <div className="inicio-section" style={{ textAlign: 'center' }}>
            
              <div
                className="inicio-card"
                style={{
                  background: '#fff',
                  padding: 24,
                  borderRadius: 12,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <img src="/public/inicio.png" alt="Inicio" style={{maxWidth: 600, marginBottom: 25}} />
                <h3>Nuestra Visión</h3>
                <p>Ser una organización de referencia nacional e internacional, reconocida por su liderazgo en la generación de impacto social significativo y sostenible en las comunidades.</p>
                <h3>Nuestra Misión</h3>
                <p>Fomentar el bienestar y el desarrollo sostenible mediante la implementación de programas integrales que promuevan el progreso social y comunitario.</p>
              </div>
            </div>
          )}

          {/* Reportes */}
          {active === 'reportes' && (
            <div className="report-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ReportForm onSubmit={handleAddReport} />

              {reports.length > 0 && (
                <div className="reports-crud" style={{ marginTop: 24 }}>
                  <h3>Reportes enviados</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#000', color: '#fff' }}>
                        <th>ID</th>
                        <th>Eje </th>
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
                          <td>{r.kpi}</td>
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
            <div className="status-section" style={{ flex: 1 }}>
              <h2>Estado de reportes</h2>
              
              <div style={{ flex: 1, height: iframeHeight, border: '1px solid #ccc', borderRadius: 8, overflow: 'hidden' }}>
                <iframe
                  title="Estado de reportes - Power BI"
                  width="100%"
                  height={iframeHeight}
                  src="https://app.powerbi.com/view?r=eyJrIjoiNGM0Y2ExNzItOWFhMi00NDQzLWFmMmYtMGE4MDMzY2U0ZWZhIiwidCI6ImQ4MmUyZTBkLTk4ZTEtNGNlZS1hZjQ0LTZjN2I2MTcwNjZlNyIsImMiOjR9&embedImagePlaceholder=true"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Fundacion;
