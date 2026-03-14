import { useState } from 'react'
import { X, Clock } from 'lucide-react'
import { StatusBadge, PlatformBadge } from './ui/Badge'
import Button from './ui/Button'
import { useApp } from '../context/AppContext'
import { timeAgo, formatDateTime } from '../utils/helpers'
import styles from './PostDetailPanel.module.css'
import { BLUE, ORANGE } from '../utils/constants'

export default function PostDetailPanel({ post, onClose }) {
  const { approvePost, rejectPost, addComment, editCaption, schedulePost, addNotification } = useApp()
  const [noteText, setNoteText] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [editedCaption, setEditedCaption] = useState(post.caption)
  const [scheduleDate, setScheduleDate] = useState('')

  const handleSaveCaption = () => {
    editCaption(post.id, editedCaption)
    setEditMode(false)
  }

  const handleAddNote = () => {
    if (!noteText.trim()) return
    addComment(post.id, noteText)
    setNoteText('')
  }

  const handleSchedule = () => {
    if (!scheduleDate) return
    schedulePost(post.id, scheduleDate)
    onClose()
  }

  return (
    <div className={`${styles.panel} animate-slideRight`}>
      {/* Header */}
      <div className={styles.panelHeader}>
        <h3 className={styles.panelTitle}>Post Details</h3>
        <button className={styles.closeBtn} onClick={onClose}><X size={18} /></button>
      </div>

      <div className={styles.scroll}>
        {/* Media Preview */}
        <div className={styles.mediaBanner}>
          <span className={styles.mediaEmoji}>{post.mediaEmoji || '📄'}</span>
        </div>

        {/* Badges */}
        <div className={styles.badges}>
          <PlatformBadge platform={post.platform} />
          <StatusBadge status={post.status} />
        </div>

        {/* Title */}
        <h4 className={styles.postTitle}>{post.title}</h4>

        {/* Caption / Edit */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Caption</span>
            {!editMode && (
              <button className={styles.editBtn} onClick={() => { setEditMode(true); setEditedCaption(post.caption) }}>
                ✏ Edit
              </button>
            )}
          </div>
          {editMode ? (
            <>
              <textarea
                value={editedCaption}
                onChange={e => setEditedCaption(e.target.value)}
                rows={5}
                className={styles.editTextarea}
              />
              <div className={styles.editActions}>
                <Button size="sm" onClick={handleSaveCaption}>Save Changes</Button>
                <Button size="sm" variant="secondary" onClick={() => setEditMode(false)}>Cancel</Button>
              </div>
            </>
          ) : (
            <p className={styles.caption}>{post.caption}</p>
          )}
        </div>

        {/* Hashtags */}
        {post.hashtags?.length > 0 && (
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Hashtags</span>
            <div className={styles.hashtags}>
              {post.hashtags.map(t => (
                <span key={t} className={styles.hashtag}>#{t}</span>
              ))}
            </div>
          </div>
        )}

        {/* Meta */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Details</span>
          <div className={styles.metaGrid}>
            <span className={styles.metaKey}>Creator</span>
            <span className={styles.metaVal}>{post.creator}</span>
            <span className={styles.metaKey}>Created</span>
            <span className={styles.metaVal}>{post.createdAt}</span>
            {post.scheduledFor && <>
              <span className={styles.metaKey}>Scheduled</span>
              <span className={styles.metaVal}>{formatDateTime(post.scheduledFor)}</span>
            </>}
            {post.versions?.length > 0 && <>
              <span className={styles.metaKey}>Revisions</span>
              <span className={styles.metaVal}>{post.versions.length} version(s)</span>
            </>}
          </div>
        </div>

        {/* Comments */}
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Comments & Notes</span>
          {post.comments?.length === 0 && (
            <p className={styles.emptyComments}>No comments yet</p>
          )}
          {post.comments?.map((c, i) => (
            <div key={i} className={styles.comment}>
              <div className={styles.commentHeader}>
                <span className={styles.commentAuthor}>{c.author}</span>
                <span className={styles.commentTime}>
                  <Clock size={10} style={{ marginRight: 3 }} />
                  {timeAgo(c.time)}
                </span>
              </div>
              <p className={styles.commentText}>{c.text}</p>
            </div>
          ))}
          <div className={styles.addNote}>
            <input
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Add a note or feedback..."
              className={styles.noteInput}
              onKeyDown={e => e.key === 'Enter' && handleAddNote()}
            />
            <Button size="sm" onClick={handleAddNote} disabled={!noteText.trim()}>Send</Button>
          </div>
        </div>

        {/* Approval Actions */}
        {post.status === 'pending' && (
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Review Actions</span>
            <div className={styles.actionBtns}>
              <Button variant="success" fullWidth onClick={() => { approvePost(post.id); onClose() }}>
                ✓ Approve Post
              </Button>
              <Button variant="danger" fullWidth onClick={() => { rejectPost(post.id); onClose() }}>
                ✕ Reject Post
              </Button>
              <Button variant="secondary" fullWidth onClick={() => setEditMode(true)}>
                ✏ Request Changes
              </Button>
            </div>
          </div>
        )}

        {/* Schedule */}
        {post.status === 'approved' && (
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Schedule Post</span>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={e => setScheduleDate(e.target.value)}
              className={styles.dateInput}
            />
            <Button fullWidth style={{ marginTop: 10 }} onClick={handleSchedule} disabled={!scheduleDate}>
              📅 Schedule Publication
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
