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

  const [eje, setEje] = useState(Object.keys(EJES)[0])
  const [kpiOption, setKpiOption] = useState(EJES[eje][0])
  const [period, setPeriod] = useState('')
  const [department, setDepartment] = useState('')
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
    setDepartment('')
    setActivities('')
    setAchievements('')
    setHours('')
    setResources('')
    setFiles([])
    setErrors([])
    setKpiOption(EJES[eje][0])
  }

  const handlePrint = () => {
    const payload = {
      eje,
      kpiOption,
      period,
      department,
      activities,
      achievements,
      hours,
      resources,
      files,
      createdAt: new Date().toISOString()
    }

    const html = `
      <html>
        <head>
          <title>Reporte</title>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #333 }
            .header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px }
            h1 { margin: 0; color: #e53935 }
            .label { font-weight: bold; margin-top: 16px }
            .value { margin-bottom: 8px }
            .box { border: 1px solid #ccc; padding: 16px; margin-top: 12px; border-radius: 6px }
            ul { padding-left: 20px }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Reporte de Actividades</h1>
          </div>

          <div class="label">Fecha de generación:</div>
          <div class="value">${new Date(payload.createdAt).toLocaleString()}</div>

          <div class="label">KPI:</div>
          <div class="value">${payload.eje}</div>

          <div class="label">Opción específica:</div>
          <div class="value">${payload.kpiOption}</div>

          <div class="label">Periodo:</div>
          <div class="value">${payload.period}</div>

          <div class="label">Departamento / Proyecto:</div>
          <div class="value">${payload.department}</div>

          <div class="box">
            <div class="label">Actividades comprendidas:</div>
            <div>${(payload.activities || '—').replace(/\n/g, '<br/>')}</div>
          </div>

          <div class="box">
            <div class="label">Logros:</div>
            <div>${(payload.achievements || '—').replace(/\n/g, '<br/>')}</div>
          </div>

          <div class="label">Horas invertidas:</div>
          <div class="value">${payload.hours || '—'}</div>

          <div class="label">Recursos invertidos:</div>
          <div class="value">${payload.resources || '—'}</div>

          <div class="label">Evidencias adjuntadas:</div>
          <div class="value">
            ${files.length > 0
              ? `<ul>${files.map(f => `<li>${f.name} (${Math.round(f.size / 1024)} KB)</li>`).join('')}</ul>`
              : '—'}
          </div>

          <script>
            window.onload = function() {
              window.print();
            }
          </script>
        </body>
      </html>
    `

    const win = window.open('', '_blank')
    if (win) {
      win.document.open()
      win.document.write(html)
      win.document.close()
      win.focus()
    } else {
      alert('No se pudo abrir la ventana para imprimir. Permite popups en el navegador.')
    }
  }

  return (
    <div className="report-form-container">
      {onClose && <button className="close-btn" onClick={onClose}>Cerrar</button>}
      <form onSubmit={handleSubmit} className="report-form">
        <h2>Crear nuevo reporte</h2>

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
          <label>Departamento / Proyecto</label>
          <input
            type="text"
            value={department}
            onChange={e => setDepartment(e.target.value)}
            className="input"
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
