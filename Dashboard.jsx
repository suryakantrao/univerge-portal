import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { StatusBadge, PlatformBadge } from '../components/ui/Badge'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { ANALYTICS, PLATFORMS, BLUE, ORANGE } from '../utils/constants'
import { countByStatus } from '../utils/helpers'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const { posts, currentUser } = useApp()
  const navigate = useNavigate()
  const counts = countByStatus(posts)

  const stats = [
    { label: 'Total Posts',    value: ANALYTICS.totals.published + posts.length, color: BLUE,      icon: '◻', sub: '+12% this month' },
    { label: 'Published',      value: ANALYTICS.totals.published,                color: '#059669', icon: '✓', sub: '+8 this week'    },
    { label: 'Pending Review', value: counts.pending || 0,                        color: ORANGE,    icon: '⏳', sub: 'Needs attention'  },
    { label: 'Scheduled',      value: counts.scheduled || 0,                      color: '#7C3AED', icon: '📅', sub: 'Ready to publish' },
  ]

  const recentPosts = posts.slice(0, 5)

  return (
    <div className={`${styles.page} animate-fadeUp`}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSub}>
            Welcome back, {currentUser.name} ·{' '}
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Button onClick={() => navigate('/upload')} size="lg">+ Create Post</Button>
      </div>

      {/* Stat Cards */}
      <div className={`${styles.statsGrid} stagger`}>
        {stats.map(s => (
          <Card key={s.label} className={styles.statCard}>
            <div className={styles.statTop}>
              <span className={styles.statLabel}>{s.label}</span>
              <div className={styles.statIcon} style={{ background: s.color + '18', color: s.color }}>
                {s.icon}
              </div>
            </div>
            <p className={styles.statValue} style={{ color: s.color }}>{s.value}</p>
            <p className={styles.statSub}>{s.sub}</p>
          </Card>
        ))}
      </div>

      {/* Content grid */}
      <div className={styles.grid}>
        {/* Recent Posts */}
        <Card>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Recent Posts</h3>
            <Button variant="link" onClick={() => navigate('/queue')}>View all →</Button>
          </div>
          <div className={`${styles.postList} stagger`}>
            {recentPosts.map(post => (
              <div
                key={post.id}
                className={styles.postRow}
                onClick={() => navigate('/queue')}
              >
                <div className={styles.postThumb}>{post.mediaEmoji || '📄'}</div>
                <div className={styles.postInfo}>
                  <p className={styles.postTitle}>{post.title}</p>
                  <div className={styles.postMeta}>
                    <PlatformBadge platform={post.platform} />
                    <span className={styles.postCreator}>{post.creator}</span>
                  </div>
                </div>
                <StatusBadge status={post.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Platform Performance */}
        <Card>
          <h3 className={styles.cardTitle} style={{ marginBottom: 20 }}>Platform Performance</h3>
          <div className={styles.platformList}>
            {ANALYTICS.platformData.map(p => (
              <div key={p.id} className={styles.platformRow}>
                <div className={styles.platformTop}>
                  <span className={styles.platformName}>{p.name}</span>
                  <span className={styles.platformPosts}>{p.posts} posts</span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{ width: `${(p.posts / 89) * 100}%`, background: p.color }}
                  />
                </div>
                <p className={styles.platformEng}>{p.engagement.toLocaleString()} engagements</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weekly bar chart */}
      <Card className={styles.weeklyCard}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>Posts Published — Last 4 Weeks</h3>
          <span className={styles.weeklyTotal}>168 total</span>
        </div>
        <div className={styles.barChart}>
          {ANALYTICS.weekly.map((w, i) => (
            <div key={w.week} className={styles.barGroup}>
              <span className={styles.barValue}>{w.posts}</span>
              <div className={styles.barOuter}>
                <div
                  className={styles.barInner}
                  style={{
                    height: `${(w.posts / 52) * 100}%`,
                    background: i === 3 ? BLUE : BLUE + '55',
                  }}
                />
              </div>
              <span className={styles.barLabel}>{w.week}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Pending alert */}
      {(counts.pending || 0) > 0 && (
        <div className={styles.pendingAlert}>
          <div className={styles.pendingLeft}>
            <span className={styles.pendingIcon}>⏳</span>
            <div>
              <p className={styles.pendingTitle}>{counts.pending} post{counts.pending > 1 ? 's' : ''} awaiting your approval</p>
              <p className={styles.pendingSub}>Review and approve or reject submitted content</p>
            </div>
          </div>
          <Button variant="warning" onClick={() => navigate('/queue')}>Review Now</Button>
        </div>
      )}
    </div>
  )
}
