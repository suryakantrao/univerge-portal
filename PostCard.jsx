import { StatusBadge, PlatformBadge } from './ui/Badge'
import Button from './ui/Button'
import styles from './PostCard.module.css'

export default function PostCard({ post, onClick, onApprove, onReject, onEdit, selected = false, compact = false }) {
  return (
    <div
      className={`${styles.card} ${selected ? styles.selected : ''} ${compact ? styles.compact : ''}`}
      onClick={onClick}
    >
      {/* Media thumb */}
      <div className={styles.thumb}>{post.mediaEmoji || '📄'}</div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{post.title}</h3>
          <StatusBadge status={post.status} />
        </div>

        {!compact && (
          <p className={styles.caption}>{post.caption}</p>
        )}

        <div className={styles.meta}>
          <PlatformBadge platform={post.platform} />
          <span className={styles.metaText}>by {post.creator}</span>
          <span className={styles.metaText}>· {post.createdAt}</span>
          {post.comments?.length > 0 && (
            <span className={styles.commentCount}>💬 {post.comments.length}</span>
          )}
        </div>

        {/* Actions for pending posts */}
        {post.status === 'pending' && (onApprove || onReject || onEdit) && (
          <div className={styles.actions} onClick={e => e.stopPropagation()}>
            {onApprove && (
              <Button variant="success" size="sm" onClick={() => onApprove(post.id)}>
                ✓ Approve
              </Button>
            )}
            {onReject && (
              <Button variant="danger" size="sm" onClick={() => onReject(post.id)}>
                ✕ Reject
              </Button>
            )}
            {onEdit && (
              <Button variant="secondary" size="sm" onClick={() => onEdit(post)}>
                ✏ Edit
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
