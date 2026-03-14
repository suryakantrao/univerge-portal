import { useState } from 'react'
import styles from './LoginPage.module.css'
import { BLUE, ORANGE } from '../utils/constants'

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('alex@univerge.com')
  const [password, setPassword] = useState('password')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setError('')
    setLoading(true)
    setTimeout(() => { setLoading(false); onLogin() }, 1000)
  }

  return (
    <div className={styles.page}>
      {/* Background blobs */}
      <div className={styles.blobA} />
      <div className={styles.blobB} />

      <div className={`${styles.container} animate-fadeUp`}>
        {/* Logo */}
        <div className={styles.logoArea}>
          <div className={styles.logoBox}>
            <span className={styles.logoLetter}>U</span>
          </div>
          <div>
            <h1 className={styles.logoName}>Univerge</h1>
            <p className={styles.logoSub}>Content Approval Portal</p>
          </div>
        </div>

        {/* Card */}
        <div className={styles.card}>
          <h2 className={styles.heading}>Welcome back</h2>
          <p className={styles.subheading}>Sign in to your team account</p>

          {error && <div className={styles.errorBanner}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.input}
                placeholder="you@univerge.com"
                autoComplete="email"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={styles.input}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          <p className={styles.demoNote}>
            <span>Demo: </span>alex@univerge.com / password
          </p>
        </div>

        <p className={styles.footer}>
          © 2024 Univerge · <a href="https://univerge.com" className={styles.footerLink}>univerge.com</a>
        </p>
      </div>
    </div>
  )
}
