import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { StatusBadge, PlatformBadge } from '../components/ui/Badge'
import { PLATFORMS, SUGGESTED_HASHTAGS, BLUE, ORANGE } from '../utils/constants'
import styles from './UploadPost.module.css'

const STEPS = ['Media & Platform', 'Caption & Tags', 'Review & Submit']

export default function UploadPost() {
  const { addPost, saveDraft, addNotification } = useApp()
  const navigate = useNavigate()
  const fileRef = useRef()

  const [step, setStep] = useState(0)
  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState('instagram')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [caption, setCaption] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  const addHashtag = (tag) => {
    if (hashtags.includes(tag)) return
    setHashtags(h => h ? `${h} ${tag}` : tag)
  }

  const generateAI = () => {
    setAiLoading(true)
    setTimeout(() => {
      setCaption(
        'Experience the future of enterprise communication with Univerge. ' +
        'Our platform empowers teams to connect, collaborate, and create — anywhere, anytime. ' +
        'Built for the modern workforce. 🚀'
      )
      setHashtags('#Univerge #Enterprise #Collaboration #FutureOfWork #Innovation')
      setAiLoading(false)
      addNotification('✨ AI caption generated!', 'success')
    }, 1400)
  }

  const handleSubmit = () => {
    addPost({
      title,
      caption,
      platform,
      hashtags: hashtags.replace(/#/g, '').split(/\s+/).filter(Boolean),
      status: 'pending',
      mediaEmoji: uploadedFile ? '📸' : '📄',
      mediaType: uploadedFile?.type?.startsWith('video') ? 'video' : 'image',
    })
    navigate('/queue')
  }

  const handleDraft = () => {
    saveDraft({
      title: title || 'Untitled Draft',
      caption,
      platform,
      hashtags: hashtags.replace(/#/g, '').split(/\s+/).filter(Boolean),
      mediaEmoji: '📄',
      mediaType: 'image',
    })
    navigate('/dashboard')
  }

  const canNext0 = title.trim().length > 0
  const canNext1 = caption.trim().length > 0

  return (
    <div className={`${styles.page} animate-fadeUp`}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Create New Post</h1>
          <p className={styles.pageSub}>Upload content and submit for team review</p>
        </div>
        <Button variant="secondary" onClick={() => navigate(-1)}>← Back</Button>
      </div>

      {/* Step Indicator */}
      <div className={styles.stepper}>
        {STEPS.map((s, i) => (
          <button
            key={s}
            className={`${styles.stepBtn} ${step === i ? styles.stepActive : ''} ${i < step ? styles.stepDone : ''}`}
            onClick={() => i < step && setStep(i)}
          >
            <span className={styles.stepNum}>{i < step ? '✓' : i + 1}</span>
            <span className={styles.stepLabel}>{s}</span>
          </button>
        ))}
      </div>

      {/* Step 0 – Media & Platform */}
      {step === 0 && (
        <div className={`${styles.stepContent} animate-fadeUp`}>
          <Card>
            <h3 className={styles.sectionTitle}>Post Title</h3>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Give your post a descriptive title…"
              className={styles.input}
            />
          </Card>

          <Card>
            <h3 className={styles.sectionTitle}>Target Platform</h3>
            <div className={styles.platformGrid}>
              {PLATFORMS.map(p => (
                <button
                  key={p.id}
                  className={`${styles.platformCard} ${platform === p.id ? styles.platformSelected : ''}`}
                  style={platform === p.id ? { borderColor: p.color, background: p.color + '10' } : {}}
                  onClick={() => setPlatform(p.id)}
                >
                  <span className={styles.platformIcon}>
                    {p.id === 'facebook' ? 'f' : p.id === 'instagram' ? '📷' : p.id === 'linkedin' ? 'in' : '𝕏'}
                  </span>
                  <span
                    className={styles.platformLabel}
                    style={platform === p.id ? { color: p.color } : {}}
                  >
                    {p.label}
                  </span>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className={styles.sectionTitle}>Upload Media</h3>
            <div
              className={`${styles.dropzone} ${uploadedFile ? styles.dropzoneActive : ''}`}
              onClick={() => fileRef.current?.click()}
            >
              <span className={styles.dropIcon}>{uploadedFile ? '✅' : '📁'}</span>
              <p className={styles.dropTitle}>
                {uploadedFile ? uploadedFile.name : 'Drop files here or click to browse'}
              </p>
              <p className={styles.dropSub}>Images, Videos, GIFs · Max 100 MB</p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,video/*"
                style={{ display: 'none' }}
                onChange={e => setUploadedFile(e.target.files[0])}
              />
            </div>
          </Card>

          <div className={styles.stepFooter}>
            <Button onClick={() => setStep(1)} disabled={!canNext0} size="lg">
              Next: Caption & Tags →
            </Button>
          </div>
        </div>
      )}

      {/* Step 1 – Caption & Tags */}
      {step === 1 && (
        <div className={`${styles.stepContent} animate-fadeUp`}>
          <Card>
            <div className={styles.captionHeader}>
              <h3 className={styles.sectionTitle}>Caption</h3>
              <Button variant="ghost" size="sm" onClick={generateAI} loading={aiLoading}>
                ✨ AI Suggest
              </Button>
            </div>
            <textarea
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="Write your post caption here…"
              rows={7}
              className={styles.textarea}
            />
            <p className={styles.charCount} style={{ color: caption.length > 260 ? '#DC2626' : 'var(--text-muted)' }}>
              {caption.length} / 280 characters
            </p>
          </Card>

          <Card>
            <h3 className={styles.sectionTitle}>Hashtags</h3>
            <input
              value={hashtags}
              onChange={e => setHashtags(e.target.value)}
              placeholder="#Univerge #Innovation #Tech"
              className={styles.input}
              style={{ marginBottom: 12 }}
            />
            <p className={styles.chipLabel}>Quick add:</p>
            <div className={styles.chips}>
              {SUGGESTED_HASHTAGS.map(tag => (
                <button
                  key={tag}
                  className={styles.chip}
                  onClick={() => addHashtag(tag)}
                  style={hashtags.includes(tag) ? { background: BLUE, color: '#fff', borderColor: BLUE } : {}}
                >
                  {tag}
                </button>
              ))}
            </div>
          </Card>

          <div className={styles.stepFooter}>
            <Button variant="secondary" onClick={() => setStep(0)}>← Back</Button>
            <Button onClick={() => setStep(2)} disabled={!canNext1} size="lg">
              Review Post →
            </Button>
          </div>
        </div>
      )}

      {/* Step 2 – Review */}
      {step === 2 && (
        <div className={`${styles.stepContent} animate-fadeUp`}>
          <Card>
            <h3 className={styles.sectionTitle}>Post Preview</h3>
            <div className={styles.preview}>
              <div className={styles.previewBanner}>📸</div>
              <div className={styles.previewBody}>
                <div className={styles.previewBadges}>
                  <PlatformBadge platform={platform} />
                  <StatusBadge status="pending" />
                </div>
                <h4 className={styles.previewTitle}>{title}</h4>
                <p className={styles.previewCaption}>{caption}</p>
                <p className={styles.previewHashtags}>{hashtags}</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className={styles.sectionTitle}>Summary</h3>
            <div className={styles.summaryGrid}>
              <span className={styles.summaryKey}>Title</span>      <span className={styles.summaryVal}>{title}</span>
              <span className={styles.summaryKey}>Platform</span>   <span className={styles.summaryVal}><PlatformBadge platform={platform} /></span>
              <span className={styles.summaryKey}>Caption</span>    <span className={styles.summaryVal}>{caption.length} characters</span>
              <span className={styles.summaryKey}>Hashtags</span>   <span className={styles.summaryVal}>{hashtags || '—'}</span>
              <span className={styles.summaryKey}>Media</span>      <span className={styles.summaryVal}>{uploadedFile ? uploadedFile.name : 'No file attached'}</span>
            </div>
          </Card>

          <div className={styles.stepFooter}>
            <Button variant="secondary" onClick={() => setStep(1)}>← Back</Button>
            <Button variant="ghost" onClick={handleDraft}>Save Draft</Button>
            <Button variant="success" size="lg" onClick={handleSubmit}>
              Submit for Approval ✓
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
