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
            <th>KPI</th>
            <th>Opciones</th>
            <th>Indicadores</th>
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
              <td>{r.options && r.options.length > 0 ? r.options.join(', ') : '—'}</td>
              <td>
                <div>Ind1: {r.indicator1}</div>
                <div>Ind2: {r.indicator2}</div>
              </td>
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
