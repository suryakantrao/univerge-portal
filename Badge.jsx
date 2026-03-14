import { STATUS_CONFIG, PLATFORMS } from '../../utils/constants'

export function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.draft
  return (
    <span style={{
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 700,
      color: cfg.color,
      background: cfg.bg,
      whiteSpace: 'nowrap',
      letterSpacing: 0.3,
    }}>
      {cfg.label}
    </span>
  )
}

export function PlatformBadge({ platform }) {
  const p = PLATFORMS.find(x => x.id === platform) || PLATFORMS[0]
  return (
    <span style={{
      padding: '3px 10px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 700,
      color: p.textColor,
      background: p.color,
      whiteSpace: 'nowrap',
      letterSpacing: 0.3,
    }}>
      {p.label}
    </span>
  )
}

export function CountBadge({ count, color = 'var(--orange)' }) {
  if (!count) return null
  return (
    <span style={{
      width: 20, height: 20,
      borderRadius: '50%',
      background: color,
      color: '#fff',
      fontSize: 10,
      fontWeight: 900,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {count > 99 ? '99+' : count}
    </span>
  )
}
