import { useState } from 'react'
import './login.css'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [imgVisible, setImgVisible] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()

    // demo credentials
    if (username === 'admin' && password === '1234') {
      onLogin({ name: username, role: 'admin' })
      // redirect admin to inicio-admin (use appNavigate helper if available)
      if (typeof window !== 'undefined') {
        if (typeof window.appNavigate === 'function') {
          window.appNavigate('/inicio-admin')
        } else {
          window.location.href = '/inicio-admin'
        }
      }
      return
    }

    if (username === 'favorita' && password === 'abcd') {
      onLogin({ name: username, role: 'fundacion' })
      return
    }

    setError('Usuario o contraseña incorrectos')
  }

  return (
    <div className="form_wrapper">
      <form className="form_main" onSubmit={handleSubmit} aria-label="Formulario de inicio de sesión">
        <div className="brand">
          <img
            src="/logo.png"
            alt="Fundación Favorita"
            className="brandImg"
            onError={() => setImgVisible(false)}
            onLoad={() => setImgVisible(true)}
          />

          {!imgVisible && <div className="logo">FF</div>}

          <div className="brandText">
            <div className="brandTitle">Fundación Favorita</div>
            <div className="brandSubtitle">Acción y apoyo comunitario</div>
          </div>
        </div>

        <h2 className="heading">Iniciar sesión</h2>

        <div className="inputContainer">
          <span className="inputIcon" aria-hidden>👤</span>
          <input
            className="inputField"
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            aria-label="Usuario"
            required
          />
        </div>

        <div className="inputContainer">
          <span className="inputIcon" aria-hidden>🔒</span>
          <input
            className="inputField"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            aria-label="Contraseña"
            required
          />
        </div>

        <button id="button" type="submit">Entrar</button>

        {error && <p className="errorText" role="alert">{error}</p>}

        <a className="forgotLink" href="#">¿Olvidaste la contraseña?</a>

        <p className="demoNote">
          
        </p>
      </form>
    </div>
  )
}

export default Login

//Credenciales demo — Admin: admin / 1234 · Fundación: favorita / abcd