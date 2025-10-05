import React, { useState } from 'react'
import './ReportForm.css'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'application/pdf', 'image/jpg']

export default function ReportForm({ onSubmit, foundations = [], favorite, onClose }) {
  const [period, setPeriod] = useState('')
  const [department, setDepartment] = useState('')
  const [activities, setActivities] = useState('')
  const [achievements, setAchievements] = useState('')
  const [hours, setHours] = useState('')
  const [resources, setResources] = useState('')
  const [files, setFiles] = useState([])
  const [errors, setErrors] = useState([])
  const EJES = {
    'Nutrición': ['Alimentos entregados', 'Raciones de alimentos', 'Beneficiarios con alimentos'],
    'Educación': ['Escuelas apoyadas', 'Asistencia a la escuela', 'Capacitaciones en habilidades'],
    'Emprendimiento': ['Emprendedores apoyados', 'Formación en emprendimiento'],
    'Ambiente': ['Conciencia ambiental'],
    'Equidad de Género': ['Formación en habilidades', 'Formación en habilidades digitales', 'Mujeres beneficiarias']
  }
  const [eje, setEje] = useState(Object.keys(EJES)[0])
  const [selectedOptions, setSelectedOptions] = useState([])

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

    // convert hours (HH:MM) to decimal hours if possible
    let hoursDecimal = null
    if (hours && typeof hours === 'string' && hours.includes(':')) {
      const [hh, mm] = hours.split(':').map(p => parseInt(p || '0', 10))
      if (!Number.isNaN(hh) && !Number.isNaN(mm)) {
        hoursDecimal = hh + (mm / 60)
      }
    } else if (hours && !isNaN(Number(hours))) {
      hoursDecimal = Number(hours)
    }

    const report = {
      id: Date.now(),
      period,
      department,
      activities,
      achievements,
      hours, // original string (HH:MM)
      hoursDecimal, // numeric hours (e.g. 1.5)
      resources,
      files: files.map(f => ({ name: f.name, size: f.size, type: f.type })),
      status: 'Enviado',
      eje,
      options: selectedOptions,
      createdAt: new Date().toISOString(),
    }

    onSubmit(report)
    // Limpiar campos
    setPeriod(''); setDepartment(''); setActivities(''); setAchievements('')
    setHours(''); setResources(''); setFiles([]); setErrors([])
    e.target.reset()
  }

  return (
    <div className="report-form-container" role="region" aria-label="Formulario de reportes">
      {onClose && <button className="close-btn" type="button" onClick={onClose}>Cerrar</button>}
      <form onSubmit={handleSubmit} className="report-form report-form-inner" aria-label="Formulario de reportes">
      <div>
        <label>Eje</label>
        <select value={eje} onChange={e => { setEje(e.target.value); setSelectedOptions([]) }} className="select">
          {Object.keys(EJES).map(k => <option key={k} value={k}>{k}</option>)}
        </select>
      </div>

      <div>
        <label>Periodo comprendido</label>
        <input value={period} onChange={e => setPeriod(e.target.value)} placeholder="Ej: 01/2025 - 03/2025" required className="input" />
      </div>

      <div>
        <label>Departamento / Proyecto</label>
        <input value={department} onChange={e => setDepartment(e.target.value)} placeholder="Nombre del departamento o proyecto" className="input" />
      </div>

      <div>
        <label>Actividades comprendidas</label>
        <textarea value={activities} onChange={e => setActivities(e.target.value)} rows={3} className="textarea" />
      </div>

      <div>
        <label>Logros</label>
        <textarea value={achievements} onChange={e => setAchievements(e.target.value)} rows={2} className="textarea" />
      </div>

      <div>
        <label>Horas invertidas</label>
        <input type="time" value={hours} onChange={e => setHours(e.target.value)} className="input" />
      </div>

      <div>
        <label>Recursos invertidos</label>
        <input value={resources} onChange={e => setResources(e.target.value)} placeholder="Monto o descripción" className="input" />
      </div>

      <div>
        <label>Adjuntar evidencias (png, jpg, jpeg, pdf) — máximo 5MB por archivo</label>
  <input type="file" multiple onChange={handleFiles} className="file-input" />

        {errors.length > 0 && (
          <div className="file-errors" role="alert">
            <ul>
              {errors.map((err, i) => <li key={i} style={{ color: '#b71c1c' }}>{err}</li>)}
            </ul>
          </div>
        )}

        {files.length > 0 && (
          <ul>
            {files.map((f, i) => <li key={i}>{f.name} ({Math.round(f.size / 1024)} KB)</li>)}
          </ul>
        )}
      </div>

      <div className="actions">
        <button type="submit" disabled={errors.length > 0} className="btn primary">Enviar informe</button>

        <button type="button" onClick={() => {
          if (!favorite) return alert('No hay fundación favorita seleccionada')
          // quick-send should also include decimal hours
          let quickHoursDecimal = null
          if (hours && typeof hours === 'string' && hours.includes(':')) {
            const [hh, mm] = hours.split(':').map(p => parseInt(p || '0', 10))
            if (!Number.isNaN(hh) && !Number.isNaN(mm)) quickHoursDecimal = hh + (mm / 60)
          } else if (hours && !isNaN(Number(hours))) {
            quickHoursDecimal = Number(hours)
          }

          const quickReport = { id: Date.now(), period, department, activities, achievements, hours, hoursDecimal: quickHoursDecimal, resources, files: files.map(f => ({ name: f.name, size: f.size, type: f.type })), status: 'Enviado (rápido)', createdAt: new Date().toISOString() }
          onSubmit(quickReport, favorite)
          setPeriod(''); setDepartment(''); setActivities(''); setAchievements('')
          setHours(''); setResources(''); setFiles([]); setErrors([])
        }} className="btn secondary">Enviar a fundación favorita</button>

        <button type="button" onClick={() => {
          const payload = { eje, period, department, activities, achievements, hours, resources, files: files.map(f => ({ name: f.name, size: f.size, type: f.type })), createdAt: new Date().toISOString() }
          const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `reporte_${Date.now()}.json`
          a.click()
          URL.revokeObjectURL(url)
        }} className="btn success">Descargar formulario</button>
      </div>
      </form>
    </div>
  )
}
