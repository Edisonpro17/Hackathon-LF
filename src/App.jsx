import "./App.css";
import PpxButton from "./components/PpxButton";
import { data } from "./configuration/ppx.data";
import React, { useState } from 'react'
import Login from './login.jsx'
import Fundacion from './Fundacion'

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  // Si el usuario es de tipo 'fundacion', mostrar la página de Fundación
  if (user.role === 'fundacion') {
    return <Fundacion user={user} onLogout={handleLogout} />
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi Tienda con PagoPlux</h1>
        <p>Realiza tu pago de forma segura</p>
        {/* Botón de Pago PagoPlux */}
        <PpxButton data={data} />
        <div style={{ marginTop: 16 }}>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </header>
    </div>
  );
}

export default App;