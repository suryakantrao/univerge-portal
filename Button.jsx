import styles from './Button.module.css'
import { clsx } from 'clsx'

const VARIANTS = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  success:   'btn-success',
  danger:    'btn-danger',
  warning:   'btn-warning',
  ghost:     'btn-ghost',
  link:      'btn-link',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  className = '',
  style = {},
  loading = false,
  icon,
  iconRight,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={style}
      className={clsx(
        styles.btn,
        styles[VARIANTS[variant] || 'btn-primary'],
        styles[`size-${size}`],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className
      )}
      {...props}
    >
      {loading && <span className={`animate-spin ${styles.spinner}`}>⟳</span>}
      {!loading && icon && <span className={styles.iconLeft}>{icon}</span>}
      <span>{children}</span>
      {!loading && iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  )
}
