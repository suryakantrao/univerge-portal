import styles from './Card.module.css'
import { clsx } from 'clsx'

export default function Card({ children, className = '', style = {}, onClick, padding = 'md', hover = false }) {
  return (
    <div
      className={clsx(
        styles.card,
        styles[`pad-${padding}`],
        hover && styles.hover,
        onClick && styles.clickable,
        className
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
