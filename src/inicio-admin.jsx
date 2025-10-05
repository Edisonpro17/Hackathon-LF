import React, { useState } from 'react'
import './styles.css'
import MenuAdmin from './components/MenuAdmin'

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
	const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'
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
				<MenuAdmin currentPath={currentPath} />

			<main className="main">
				<div className="topbar">
					<div className="title">Inicio</div>
					
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
