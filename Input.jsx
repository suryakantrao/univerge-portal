import styles from './Input.module.css'
import { clsx } from 'clsx'

export function Input({ label, error, hint, className = '', style = {}, ...props }) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={clsx(styles.input, error && styles.hasError, className)}
        style={style}
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
    </div>
  )
}

export function Textarea({ label, error, hint, className = '', style = {}, ...props }) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={clsx(styles.input, styles.textarea, error && styles.hasError, className)}
        style={style}
        {...props}
      />
      {error && <p className={styles.error}>{error}</p>}
      {hint && !error && <p className={styles.hint}>{hint}</p>}
    </div>
  )
}

export function Select({ label, error, children, className = '', style = {}, ...props }) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <select className={clsx(styles.input, styles.select, error && styles.hasError, className)} style={style} {...props}>
        {children}
      </select>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export function Toggle({ label, sublabel, checked, onChange }) {
  return (
    <div className={styles.toggleRow}>
      {(label || sublabel) && (
        <div>
          {label && <p className={styles.toggleLabel}>{label}</p>}
          {sublabel && <p className={styles.toggleSublabel}>{sublabel}</p>}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={clsx(styles.toggle, checked && styles.toggleOn)}
      >
        <span className={clsx(styles.toggleKnob, checked && styles.toggleKnobOn)} />
      </button>
    </div>
  )
}
