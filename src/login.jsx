import { useState } from 'react'


function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === '1234') {
      onLogin(username)
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br />
      <button type="submit">Entrar</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  )
}

export default Login