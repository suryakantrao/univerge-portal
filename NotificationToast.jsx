import { useApp } from '../../context/AppContext'
import styles from './NotificationToast.module.css'

const ICONS = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' }

export default function NotificationToast() {
  const { notifications, removeNotification } = useApp()
  if (!notifications.length) return null
  return (
    <div className={styles.stack}>
      {notifications.map(n => (
        <div key={n.id} className={`${styles.toast} ${styles[n.type]} animate-slideRight`}>
          <span className={styles.icon}>{ICONS[n.type] || 'ℹ'}</span>
          <span className={styles.message}>{n.message}</span>
          <button className={styles.dismiss} onClick={() => removeNotification(n.id)}>✕</button>
        </div>
      ))}
    </div>
  )
}
