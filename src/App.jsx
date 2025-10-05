import "./App.css";
import PpxButton from "./components/PpxButton";
import { data } from "./configuration/ppx.data";
import React, { useState } from 'react'
import Login from './Login.jsx'

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi Tienda con PagoPlux</h1>
        <p>Realiza tu pago de forma segura</p>
        {/* Botón de Pago PagoPlux */}
        <PpxButton data={data} />
      </header>
    </div>
  );
}

export default App;