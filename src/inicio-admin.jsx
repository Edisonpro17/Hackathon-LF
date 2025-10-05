import React, { useState } from 'react'
import './styles.css'

const NAV_ITEMS = [
	'Inicio',
	'Propuestas',
	'Propuestas aceptadas',
	'Propuestas rechazadas',
	'Propuestas por modificar',
	"KPI's aprobados",
	'Reportes',
    'Proyectos',
	'Proyectos reportados',
	'Proyectos aprobados',
	'Proyectos finalizados',
	'Donaciones',
	'Presupuestos asignados',
]

export default function InicioAdmin({ initialValue = 20000.0, projectsMonth3 = 3 }) {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [propuestasOpen, setPropuestasOpen] = useState(false)
    const [proyectosOpen, setProyectosOpen] = useState(false)

	function formatCurrency(n) {
		try {
			return n.toLocaleString('es-CO', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
		} catch {
			return Number(n).toFixed(2)
		}
	}

	return (
		<div className="app">
			<aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} id="sidebar">
				<div className="brand">
					<span className="dot" />
					Fundación La Favorita
				</div>
				<nav>
					<ul>
						<li className="active">
							<a href="/inicio-admin" onClick={(e) => { e.preventDefault(); window.appNavigate('/inicio-admin') }}>Inicio</a>
						</li>
						 <li>
							<button
								className="nav-toggle"
								onClick={(e) => {
									e.preventDefault()
									setPropuestasOpen((s) => !s)
								}}
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
						<li>Reportes</li>
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
                                <li>Proyectos presentados</li>
								<li>Proyectos aceptados</li>
							</ul>
						</li>
						<li>Donaciones</li>
						<li>Presupuestos asignados</li>
					</ul>
				</nav>
				
			</aside>

			<main className="main">
				<div className="topbar">
					<div className="title">Inicio</div>
					<div>
						<button
							className="hamburger"
							id="btnToggle"
							onClick={() => setSidebarOpen((s) => !s)}
							aria-label="Toggle navigation"
						>
							☰
						</button>
					</div>
				</div>

				<div className="grid">
					<section className="card">
						<h3>Valor disponible</h3>
						<div className="big" id="initialValue">
							${formatCurrency(initialValue)}
						</div>
						<div className="muted">Valor base para cálculos financieros</div>
					</section>

					<section className="card">
						<h3>Proyectos reportados (mes 3)</h3>
						<div className="big" id="projectsMonth3">
							{projectsMonth3}
						</div>
						<div className="muted">Cantidad de proyectos reportados en marzo (mes 3)</div>
					</section>

					<section className="card">
						<h3>Resumen rápido</h3>
						<div className="muted">Estado del repositorio: clonado desde GitHub</div>
					</section>
				</div>

				<section style={{ marginTop: 18 }} className="card">
					<h3>Acciones</h3>
					<p className="muted">
						Puedes editar los valores en el código o integrar una API para traer datos reales.
					</p>
				</section>
			</main>
		</div>
	)
}
