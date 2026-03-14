import { AVATAR_COLORS } from '../../utils/constants'

export default function Avatar({ initials, size = 36, colorIdx = 0, style = {} }) {
  const color = AVATAR_COLORS[colorIdx % AVATAR_COLORS.length]
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: color + '22',
      color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.36,
      fontWeight: 800,
      flexShrink: 0,
      letterSpacing: 0.5,
      ...style,
    }}>
      {initials}
    </div>
  )
}
