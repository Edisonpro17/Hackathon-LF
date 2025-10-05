import React from 'react'

export default function ReportsStatus({ reports = [] }) {
  if (!reports || reports.length === 0) return <p>No hay informes aún.</p>

  return (
    <div className="reports-status">
      <h3>Estado de los informes</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Eje</th>
            <th>Periodo</th>
            <th>Departamento / Proyecto</th>
            <th>Actividades</th>
            <th>Logros</th>
            <th>Horas</th>
            <th>Recursos</th>
            <th>Evidencias</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{new Date(r.createdAt).toLocaleString()}</td>
              <td>{r.eje || '—'}</td>
              <td>{r.period || '—'}</td>
              <td>{r.department || '—'}</td>
              <td style={{ maxWidth: 240 }}>{r.activities || '—'}</td>
              <td style={{ maxWidth: 200 }}>{r.achievements || '—'}</td>
              <td>{r.hours || '—'}</td>
              <td>{r.resources || '—'}</td>
              <td>
                {r.files && r.files.length > 0 ? (
                  <ul>
                    {r.files.map((f, i) => <li key={i}>{f.name}</li>) }
                  </ul>
                ) : '—'}
              </td>
              <td>{r.status} {r.sentTo ? `(Enviado a: ${r.sentTo})` : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
