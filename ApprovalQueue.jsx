import { useState } from 'react'
import { useApp } from '../context/AppContext'
import PostCard from '../components/PostCard'
import PostDetailPanel from '../components/PostDetailPanel'
import styles from './ApprovalQueue.module.css'

const FILTERS = ['all', 'pending', 'approved', 'rejected', 'draft', 'scheduled', 'published']

export default function ApprovalQueue() {
  const { posts, approvePost, rejectPost } = useApp()
  const [filter, setFilter] = useState('all')
  const [selectedPost, setSelectedPost] = useState(null)

  const filtered = posts.filter(p => filter === 'all' || p.status === filter)
  const pendingCount = posts.filter(p => p.status === 'pending').length

  const handleSelect = (post) => {
    setSelectedPost(prev => prev?.id === post.id ? null : post)
  }

  // Keep selected post in sync with live data
  const liveSelected = selectedPost
    ? posts.find(p => p.id === selectedPost.id) || null
    : null

  return (
    <div className={`${styles.page} animate-fadeUp`}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Approval Queue</h1>
          <p className={styles.pageSub}>
            {pendingCount > 0
              ? `${pendingCount} post${pendingCount > 1 ? 's' : ''} awaiting review`
              : 'All posts reviewed — great work!'}
          </p>
        </div>
        {/* Filter tabs */}
        <div className={styles.filterRow}>
          {FILTERS.map(f => {
            const count = f === 'all' ? posts.length : posts.filter(p => p.status === f).length
            return (
              <button
                key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {count > 0 && <span className={styles.filterCount}>{count}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Layout: list + optional panel */}
      <div className={`${styles.layout} ${liveSelected ? styles.withPanel : ''}`}>
        {/* Post list */}
        <div className={styles.list}>
          {filtered.length === 0 && (
            <div className={styles.empty}>
              <p className={styles.emptyIcon}>✓</p>
              <p className={styles.emptyText}>No posts in this category</p>
            </div>
          )}
          {filtered.map(post => (
            <PostCard
              key={post.id}
              post={post}
              selected={liveSelected?.id === post.id}
              onClick={() => handleSelect(post)}
              onApprove={post.status === 'pending' ? approvePost : undefined}
              onReject={post.status === 'pending' ? rejectPost : undefined}
              onEdit={post.status === 'pending' ? () => handleSelect(post) : undefined}
            />
          ))}
        </div>

        {/* Detail panel */}
        {liveSelected && (
          <PostDetailPanel
            post={liveSelected}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </div>
    </div>
  )
}
