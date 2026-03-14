import { useApp } from '../context/AppContext'
import Card from '../components/ui/Card'
import { PlatformBadge } from '../components/ui/Badge'
import { ANALYTICS, BLUE, ORANGE } from '../utils/constants'
import { countByStatus } from '../utils/helpers'
import styles from './Analytics.module.css'

export default function Analytics() {
  const { posts } = useApp()
  const counts = countByStatus(posts)
  const maxWeekly = Math.max(...ANALYTICS.weekly.map(w => w.posts))
  const maxEng = Math.max(...ANALYTICS.platformData.map(p => p.engagement))

  const kpis = [
    { label: 'Total Published',    value: ANALYTICS.totals.published, change: '+12%', color: BLUE      },
    { label: 'Total Engagements',  value: '31,720',                    change: '+28%', color: '#059669' },
    { label: 'Avg Approval Time',  value: '4.2h',                      change: '-18%', color: ORANGE    },
    { label: 'Rejection Rate',     value: '8%',                        change: '-3%',  color: '#7C3AED' },
  ]

  return (
    <div className={`${styles.page} animate-fadeUp`}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Analytics</h1>
          <p className={styles.pageSub}>Performance overview · {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={`${styles.kpiGrid} stagger`}>
        {kpis.map(k => (
          <Card key={k.label} className={styles.kpiCard}>
            <p className={styles.kpiLabel}>{k.label}</p>
            <p className={styles.kpiValue} style={{ color: k.color }}>{k.value}</p>
            <span className={styles.kpiChange}>{k.change} vs last month</span>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className={styles.chartsGrid}>
        {/* Weekly bar chart */}
        <Card>
          <h3 className={styles.cardTitle}>Weekly Posts Published</h3>
          <div className={styles.barChart}>
            {ANALYTICS.weekly.map((w, i) => (
              <div key={w.week} className={styles.barGroup}>
                <span className={styles.barVal}>{w.posts}</span>
                <div className={styles.barOuter}>
                  <div
                    className={styles.barInner}
                    style={{
                      height: `${(w.posts / maxWeekly) * 100}%`,
                      background: i === ANALYTICS.weekly.length - 1 ? BLUE : BLUE + '55',
                    }}
                  />
                </div>
                <span className={styles.barLabel}>{w.week}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Platform distribution */}
        <Card>
          <h3 className={styles.cardTitle}>Platform Engagement</h3>
          <div className={styles.platformList}>
            {ANALYTICS.platformData.map(p => (
              <div key={p.id} className={styles.platformRow}>
                <div className={styles.platformTop}>
                  <span className={styles.platformName}>{p.name}</span>
                  <span className={styles.platformEng} style={{ color: p.color }}>
                    {p.engagement.toLocaleString()}
                  </span>
                </div>
                <div className={styles.barTrack}>
                  <div
                    className={styles.barFill}
                    style={{
                      width: `${(p.engagement / maxEng) * 100}%`,
                      background: p.color,
                    }}
                  />
                </div>
                <p className={styles.platformPosts}>{p.posts} posts published</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Approval time trend */}
      <Card>
        <h3 className={styles.cardTitle} style={{ marginBottom: 20 }}>Approval Time Trend (hours)</h3>
        <div className={styles.approvalChart}>
          {ANALYTICS.approvalTimes.map((t, i) => (
            <div key={i} className={styles.approvalBar}>
              <span className={styles.approvalVal}>{t}h</span>
              <div className={styles.approvalOuter}>
                <div
                  className={styles.approvalFill}
                  style={{
                    height: `${(t / 7) * 100}%`,
                    background: t <= 4 ? '#059669' : t <= 5 ? ORANGE : '#DC2626',
                  }}
                />
              </div>
              <span className={styles.approvalLabel}>W{i + 1}</span>
            </div>
          ))}
          <div className={styles.approvalTarget}>
            <span className={styles.approvalTargetLine} style={{ bottom: `${(4 / 7) * 100}%` }} />
            <span className={styles.approvalTargetLabel} style={{ bottom: `${(4 / 7) * 100 + 1}%` }}>
              Target: 4h
            </span>
          </div>
        </div>
      </Card>

      {/* Top Posts */}
      <Card>
        <h3 className={styles.cardTitle}>Top Performing Posts</h3>
        <div className={styles.topPostsList}>
          {ANALYTICS.topPosts.map((post, i) => (
            <div key={i} className={styles.topPostRow}>
              <div className={styles.rank} style={{ background: i === 0 ? ORANGE + '20' : 'var(--card-hover)', color: i === 0 ? ORANGE : 'var(--text-muted)' }}>
                #{i + 1}
              </div>
              <div className={styles.topPostInfo}>
                <p className={styles.topPostTitle}>{post.title}</p>
                <PlatformBadge platform={post.platform} />
              </div>
              <div className={styles.topPostStats}>
                <div className={styles.statPill}>
                  <span className={styles.statPillNum}>{post.likes.toLocaleString()}</span>
                  <span className={styles.statPillLabel}>Likes</span>
                </div>
                <div className={styles.statPill}>
                  <span className={styles.statPillNum}>{post.shares.toLocaleString()}</span>
                  <span className={styles.statPillLabel}>Shares</span>
                </div>
                <div className={styles.statPill}>
                  <span className={styles.statPillNum}>{post.comments.toLocaleString()}</span>
                  <span className={styles.statPillLabel}>Comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Status breakdown */}
      <Card>
        <h3 className={styles.cardTitle}>Current Post Status Breakdown</h3>
        <div className={styles.statusGrid}>
          {Object.entries({
            draft: '📝', pending: '⏳', approved: '✅',
            rejected: '❌', scheduled: '📅', published: '🟢'
          }).map(([status, icon]) => (
            <div key={status} className={styles.statusTile}>
              <span className={styles.statusIcon}>{icon}</span>
              <span className={styles.statusCount}>{counts[status] || 0}</span>
              <span className={styles.statusLabel}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
