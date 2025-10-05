import React, { useState } from 'react'
import './ReportForm.css'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'application/pdf', 'image/jpg']

export default function ReportForm({ onSubmit, onClose }) {
  const EJES = {
    'Nutrición': ['Alimentos entregados', 'Raciones de alimentos', 'Beneficiarios con alimentos'],
    'Educación': ['Escuelas apoyadas', 'Asistencia a la escuela', 'Capacitaciones en habilidades blandas y duras'],
    'Emprendimiento': ['Emprendedores apoyados', 'Formación en emprendimiento'],
    'Ambiente': ['Conciencia ambiental'],
    'Equidad de Género': [
      'Formación en habilidades para la disminución de la brecha de género',
      'Formación en habilidades digitales',
      'Mujeres beneficiarias de todos los programas'
    ]
  }

  // Lista de proyectos para seleccionar en Departamento / Proyecto
  const PROYECTOS = [
    'Proyecto Alpha',
    'Proyecto Beta',
    'Proyecto Gamma',
    'Proyecto Delta',
    'Proyecto Epsilon'
  ]

  const [eje, setEje] = useState(Object.keys(EJES)[0])
  const [kpiOption, setKpiOption] = useState(EJES[eje][0])
  const [period, setPeriod] = useState('')
  const [department, setDepartment] = useState(PROYECTOS[0]) // valor inicial
  const [activities, setActivities] = useState('')
  const [achievements, setAchievements] = useState('')
  const [hours, setHours] = useState('')
  const [resources, setResources] = useState('')
  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState([])

  const validateFiles = (fileList) => {
    const arr = Array.from(fileList)
    const errs = []
    arr.forEach(f => {
      if (!ALLOWED_TYPES.includes(f.type)) errs.push(`${f.name}: tipo no permitido (${f.type})`)
      if (f.size > MAX_FILE_SIZE) errs.push(`${f.name}: excede el tamaño máximo de 5 MB`)
    })
    return { validFiles: arr.filter(f => ALLOWED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE), errs }
  }

  const handleFiles = (e) => {
    const { validFiles, errs } = validateFiles(e.target.files)
    setFiles(validFiles)
    setErrors(errs)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (errors.length > 0) return

    let hoursDecimal = null
    if (hours.includes(':')) {
      const [hh, mm] = hours.split(':').map(Number)
      if (!isNaN(hh) && !isNaN(mm)) {
        hoursDecimal = hh + mm / 60
      }
    }

    const report = {
      id: Date.now(),
      period,
      department,
      activities,
      achievements,
      hours,
      hoursDecimal,
      resources,
      files: files.map(f => ({ name: f.name, size: f.size, type: f.type })),
      status: 'Enviado',
      eje,
      kpiOption,
      createdAt: new Date().toISOString()
    }

    onSubmit(report)

    // Limpiar campos
    setPeriod('')
    setDepartment(PROYECTOS[0])
    setActivities('')
    setAchievements('')
    setHours('')
    setResources('')
    setFiles([])
    setErrors([])
    setKpiOption(EJES[eje][0])
  }

  const handlePrint = () => {
    // mismo código para imprimir, no cambia
  }

  return (
    <div className="report-form-container">
      {onClose && <button className="close-btn" onClick={onClose}>Cerrar</button>}
      <form onSubmit={handleSubmit} className="report-form">
        <h2>Crear nuevo reporte</h2>

        {/* Departamento / Proyecto primero */}
        <div className="field">
          <label>Departamento / Proyecto</label>
          <select
            value={department}
            onChange={e => setDepartment(e.target.value)}
            className="select"
            required
          >
            {PROYECTOS.map(proj => (
              <option key={proj} value={proj}>{proj}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Eje </label>
          <select
            value={eje}
            onChange={e => {
              const selected = e.target.value
              setEje(selected)
              setKpiOption(EJES[selected][0])
            }}
            className="select"
          >
            {Object.keys(EJES).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Opción específica Eje</label>
          <select
            value={kpiOption}
            onChange={e => setKpiOption(e.target.value)}
            className="select"
          >
            {EJES[eje].map((opt, i) => (
              <option key={i} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label>Periodo comprendido</label>
          <input
            type="text"
            value={period}
            onChange={e => setPeriod(e.target.value)}
            placeholder="Ej: 01/2025 - 03/2025"
            className="input"
            required
          />
        </div>

        <div className="field">
          <label>Horas invertidas</label>
          <input
            type="time"
            value={hours}
            onChange={e => setHours(e.target.value)}
            className="input"
          />
        </div>

        <div className="field">
          <label>Actividades comprendidas</label>
          <textarea
            value={activities}
            onChange={e => setActivities(e.target.value)}
            rows={3}
            className="textarea"
          />
        </div>

        <div className="field">
          <label>Logros</label>
          <textarea
            value={achievements}
            onChange={e => setAchievements(e.target.value)}
            rows={3}
            className="textarea"
          />
        </div>

        <div className="field">
          <label>Recursos invertidos</label>
          <input
            type="text"
            value={resources}
            onChange={e => setResources(e.target.value)}
            className="input"
          />
        </div>

        <div className="field">
          <label>Adjuntar archivos (PDF, JPG, PNG) máx 5MB</label>
          <input type="file" multiple onChange={handleFiles} />
          {errors.length > 0 && (
            <ul className="errors">
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn primary">Enviar informe</button>
          <button type="button" className="btn secondary" onClick={handlePrint}>Descargar formulario (PDF)</button>
        </div>
      </form>
    </div>
  )
}