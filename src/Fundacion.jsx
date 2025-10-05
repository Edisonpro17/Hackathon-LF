import React, { useState, useEffect } from 'react';
import './App.css';
import ReportForm from './components/ReportForm';
import PagoForm from './components/PagoForm';
import ReportsStatus from './components/ReportsStatus';

function Fundacion({ user, onLogout }) {
  const [active, setActive] = useState('inicio');
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [iframeHeight, setIframeHeight] = useState(window.innerHeight - 200);

  const handleAddReport = (report) => {
    setReports(prev => [report, ...prev]);
  };

  const handleAddPago = (pago) => {
    setPagos(prev => [pago, ...prev]);
  };

  useEffect(() => {
    function handleResize() {
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
          background: '#dfb7b7ff',
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
            <button className={active === 'reportes' ? 'active' : ''} onClick={() => setActive('reportes')}>Nuevo Reporte</button>
            <button className={active === 'enviados' ? 'active' : ''} onClick={() => setActive('enviados')}>Reportes enviados</button>
            <button className={active === 'pagos' ? 'active' : ''} onClick={() => setActive('pagos')}>Pagos recibidos</button>
            <button className={active === 'estado' ? 'active' : ''} onClick={() => setActive('estado')}>Estado de reportes</button>

            {/* Menú Propuestas */}
            <div>
              <button
                className={active.startsWith('propuestas') ? 'active' : ''}
                onClick={() => setSubmenuOpen(!submenuOpen)}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                Propuestas
                <span>{submenuOpen ? '▲' : '▼'}</span>
              </button>

              {submenuOpen && (
                <div style={{ marginLeft: 12, marginTop: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <button
                    className={active === 'propuestas/enviadas' ? 'active' : ''}
                    onClick={() => setActive('propuestas/enviadas')}
                  >
                    Enviadas
                  </button>
                  <button
                    className={active === 'propuestas/aceptadas' ? 'active' : ''}
                    onClick={() => setActive('propuestas/aceptadas')}
                  >
                    Aceptadas
                  </button>
                  <button
                    className={active === 'propuestas/rechazadas' ? 'active' : ''}
                    onClick={() => setActive('propuestas/rechazadas')}
                  >
                    Rechazadas
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>

        <button
          onClick={onLogout}
          style={{
            marginTop: 16,
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            padding: '8px 12px',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          Cerrar sesión
        </button>
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
            borderBottom: '2px solid #080808ff',
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
                <img src="/public/inicio.png" alt="Inicio" style={{ maxWidth: 600, marginBottom: 25 }} />
                <h3>Nuestra Visión</h3>
                <p>Ser una organización de referencia nacional e internacional, reconocida por su liderazgo en la generación de impacto social significativo y sostenible en las comunidades.</p>
                <h3>Nuestra Misión</h3>
                <p>Fomentar el bienestar y el desarrollo sostenible mediante la implementación de programas integrales que promuevan el progreso social y comunitario.</p>
              </div>
            </div>
          )}

          {/* Nuevo Reporte */}
          {active === 'reportes' && (
            <div className="report-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ReportForm onSubmit={handleAddReport} />
            </div>
          )}

          {/* Reportes Enviados */}
          {active === 'enviados' && (
            <div className="reportes-enviados-section" style={{ flex: 1 }}>
              <h2>Reportes enviados</h2>
              {reports.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#000', color: '#fff' }}>
                      <th>ID</th>
                      <th>Eje</th>
                      <th>Periodo</th>
                      <th>Departamento</th>
                      <th>Logros</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((r) => (
                      <tr key={r.id} style={{ borderBottom: '1px solid #ddd' }}>
                        <td>{r.id}</td>
                        <td>{r.kpi}</td>
                        <td>{r.period}</td>
                        <td>{r.department}</td>
                        <td>{r.achievements}</td>
                        <td>{r.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No hay reportes enviados aún.</p>
              )}
            </div>
          )}

          {/* Pagos Recibidos */}
          {active === 'pagos' && (
            <div className="pagos-section" style={{ flex: 1 }}>
              <h2>Pagos recibidos</h2>
              <PagoForm onSubmit={handleAddPago} />
              {pagos.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
                  <thead>
                    <tr style={{ background: '#000', color: '#fff' }}>
                      <th>ID</th>
                      <th>Fecha</th>
                      <th>Monto</th>
                      <th>Origen</th>
                      <th>Observaciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagos.map((p) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #ddd' }}>
                        <td>{p.id}</td>
                        <td>{p.fecha}</td>
                        <td>${p.monto}</td>
                        <td>{p.origen}</td>
                        <td>{p.observaciones}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No se han registrado pagos aún.</p>
              )}
            </div>
          )}

          {/* Estado de reportes */}
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

          {/* Propuestas Enviadas */}
          {active === 'propuestas/enviadas' && (
            <div className="propuestas-enviadas-section" style={{ flex: 1 }}>
              <h2>Propuestas Enviadas</h2>
              <p>Aquí se mostrarán las propuestas que han sido enviadas.</p>
            </div>
          )}

          {/* Propuestas Aceptadas */}
          {active === 'propuestas/aceptadas' && (
            <div className="propuestas-aceptadas-section" style={{ flex: 1 }}>
              <h2>Propuestas Aceptadas</h2>
              <p>Aquí se mostrarán las propuestas aceptadas.</p>
            </div>
          )}

          {/* Propuestas Rechazadas */}
          {active === 'propuestas/rechazadas' && (
            <div className="propuestas-rechazadas-section" style={{ flex: 1 }}>
              <h2>Propuestas Rechazadas</h2>
              <p>Aquí se mostrarán las propuestas rechazadas.</p>
            </div>
          )}

        </section>
      </main>
    </div>
  );
}

export default Fundacion;