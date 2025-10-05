import React, { useState } from "react";
import "./styles.css";
import MenuAdmin from './components/MenuAdmin'

const DEFAULT_KPIS = {
  Nutrición: [
    "DCI (Desnutrición Crónica Infantil)",
    "Alimentos entregados",
    "Raciones de alimentos",
    "Beneficiarios con alimentos",
  ],
  Educación: [
    "Escuelas apoyadas",
    "Asistencia a la escuela",
    "Capacitaciones en habilidades blandas y duras",
  ],
  Emprendimiento: ["Emprendedores apoyados", "Formación en emprendimiento"],
  Ambiente: ["Conciencia ambiental"],
  "Equidad de Género": [
    "Formación en habilidades para la disminución de la brecha de género",
    "Formación en habilidades digitales",
    "Mujeres beneficiarias de todos los programas",
  ],
};

export default function KpiAdmin() {
  const [kpis, setKpis] = useState(DEFAULT_KPIS);
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("Nutrición");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [propuestasOpen, setPropuestasOpen] = useState(false);
  const [proyectosOpen, setProyectosOpen] = useState(false);
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "/";

  function addKpi(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setKpis((prev) => {
      const next = { ...prev };
      if (!next[newCategory]) next[newCategory] = [];
      next[newCategory] = [...next[newCategory], newName.trim()];
      return next;
    });
    setNewName("");
    setNewCategory("Nutrición");
    setShowForm(false);
  }

  return (
    <div className="app">
      <MenuAdmin currentPath={currentPath} />

      <main className="main">
        <div className="topbar">
          <div className="title">KPI's</div>
          
        </div>
        <div className="card kpi-card">
          <div className="kpi-table">
            {Object.keys(kpis).map((cat) => (
              <div className="kpi-section" key={cat}>
                <h3>{cat}</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Indicador</th>
                      <th style={{ width: 180 }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kpis[cat].map((k, i) => (
                      <tr key={k + i}>
                        <td>{k}</td>
                        <td>
                          <button className="btn small">Editar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>

          <div className="kpi-footer">
            <button
              className="floating-plus"
              onClick={() => setShowForm((s) => !s)}
            >
              +
            </button>
          </div>

          {showForm && (
            <div className="kpi-form-overlay">
              <form className="kpi-form" onSubmit={addKpi}>
                <h3>Agregar KPI</h3>
                <label>
                  Nombre
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </label>
                <label>
                  Categoría
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    {Object.keys(kpis).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="form-actions">
                  <button className="btn" type="submit">
                    Agregar
                  </button>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => setShowForm(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
