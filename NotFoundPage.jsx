import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className={`${styles.page} animate-fadeUp`}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.sub}>The page you're looking for doesn't exist or has been moved.</p>
      <Button onClick={() => navigate('/dashboard')} size="lg">← Back to Dashboard</Button>
    </div>
  )
}
