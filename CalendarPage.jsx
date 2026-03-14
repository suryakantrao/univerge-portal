import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { PlatformBadge, StatusBadge } from '../components/ui/Badge'
import Card from '../components/ui/Card'
import { PLATFORMS } from '../utils/constants'
import styles from './CalendarPage.module.css'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function buildCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  return cells
}

export default function CalendarPage() {
  const { posts } = useApp()
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [filterPlatform, setFilterPlatform] = useState('all')

  const cells = buildCalendarDays(year, month)

  const scheduled = posts.filter(p =>
    (p.status === 'scheduled' || p.status === 'published') &&
    (filterPlatform === 'all' || p.platform === filterPlatform)
  )

  // Distribute posts across calendar days deterministically
  const getPostsForDay = (day) => {
    if (!day) return []
    return scheduled.filter((_, i) => ((i * 7 + 11) % 28) + 1 === day).slice(0, 3)
  }

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  return (
    <div className={`${styles.page} animate-fadeUp`}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Content Calendar</h1>
          <p className={styles.pageSub}>{MONTHS[month]} {year}</p>
        </div>
        <div className={styles.controls}>
          <select
            value={filterPlatform}
            onChange={e => setFilterPlatform(e.target.value)}
            className={styles.select}
          >
            <option value="all">All Platforms</option>
            {PLATFORMS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
          <div className={styles.navBtns}>
            <button className={styles.navBtn} onClick={prevMonth}>‹</button>
            <button className={styles.navBtn} onClick={() => { setMonth(today.getMonth()); setYear(today.getFullYear()) }}>Today</button>
            <button className={styles.navBtn} onClick={nextMonth}>›</button>
          </div>
        </div>
      </div>

      {/* Calendar grid */}
      <Card padding="none" className={styles.calCard}>
        {/* Day headers */}
        <div className={styles.dayHeaders}>
          {DAYS.map(d => <div key={d} className={styles.dayHeader}>{d}</div>)}
        </div>
        {/* Cells */}
        <div className={styles.grid}>
          {cells.map((day, i) => {
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
            const dayPosts = getPostsForDay(day)
            return (
              <div key={i} className={`${styles.cell} ${!day ? styles.cellEmpty : ''} ${isToday ? styles.cellToday : ''}`}>
                {day && (
                  <>
                    <div className={`${styles.dayNum} ${isToday ? styles.dayNumToday : ''}`}>{day}</div>
                    {dayPosts.map((post, j) => {
                      const pl = PLATFORMS.find(p => p.id === post.platform)
                      return (
                        <div key={j} className={styles.eventChip} style={{ background: pl?.color + '22', color: pl?.color }}>
                          {post.title}
                        </div>
                      )
                    })}
                  </>
                )}
              </div>
            )
          })}
        </div>
      </Card>

      {/* Upcoming list */}
      <div>
        <h3 className={styles.sectionTitle}>Upcoming & Scheduled Posts</h3>
        <div className={styles.upcomingList}>
          {scheduled.length === 0 && (
            <Card className={styles.emptyCard}>
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>No scheduled posts yet</p>
            </Card>
          )}
          {scheduled.map(post => (
            <Card key={post.id} className={styles.upcomingRow}>
              <div className={styles.upcomingThumb}>{post.mediaEmoji || '📄'}</div>
              <div className={styles.upcomingInfo}>
                <p className={styles.upcomingTitle}>{post.title}</p>
                <div className={styles.upcomingMeta}>
                  <PlatformBadge platform={post.platform} />
                  <span className={styles.upcomingDate}>{post.scheduledFor
                    ? new Date(post.scheduledFor).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                    : 'Date TBD'
                  }</span>
                </div>
              </div>
              <StatusBadge status={post.status} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
