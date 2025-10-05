import React, { useState } from 'react';

function PagoForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    id: '',
    fecha: '',
    monto: '',
    origen: '',
    observaciones: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.id || !formData.fecha || !formData.monto || !formData.origen) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    onSubmit(formData);

    setFormData({
      id: '',
      fecha: '',
      monto: '',
      origen: '',
      observaciones: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input type="text" name="id" value={formData.id} onChange={handleChange} placeholder="ID del pago" required />
      <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} required />
      <input type="number" name="monto" value={formData.monto} onChange={handleChange} placeholder="Monto" required />
      <input type="text" name="origen" value={formData.origen} onChange={handleChange} placeholder="Origen del pago" required />
      <input type="text" name="observaciones" value={formData.observaciones} onChange={handleChange} placeholder="Observaciones" />

      <button type="submit" style={{ background: '#000', color: '#fff', padding: 8, border: 'none', borderRadius: 4 }}>
        Registrar pago
      </button>
    </form>
  );
}

export default PagoForm;