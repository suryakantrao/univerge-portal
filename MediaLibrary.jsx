import { useState, useRef } from 'react'
import { useApp } from '../context/AppContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { MEDIA_FILES, BLUE } from '../utils/constants'
import styles from './MediaLibrary.module.css'

const TYPE_FILTERS = ['all', 'image', 'video', 'gif']

export default function MediaLibrary() {
  const { addNotification } = useApp()
  const fileRef = useRef()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [files, setFiles] = useState(MEDIA_FILES)
  const [selected, setSelected] = useState(null)

  const filtered = files.filter(f =>
    (typeFilter === 'all' || f.type === typeFilter) &&
    (search === '' ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
  )

  const handleUpload = (e) => {
    const uploaded = Array.from(e.target.files)
    const newFiles = uploaded.map((file, i) => ({
      id: Date.now() + i,
      name: file.name,
      type: file.type.startsWith('video') ? 'video' : file.type === 'image/gif' ? 'gif' : 'image',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      tags: [],
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      emoji: file.type.startsWith('video') ? '🎬' : '📸',
    }))
    setFiles(prev => [...newFiles, ...prev])
    addNotification(`${uploaded.length} file(s) uploaded successfully!`, 'success')
  }

  return (
    <div className={`${styles.page} animate-fadeUp`}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Media Library</h1>
          <p className={styles.pageSub}>{files.length} files stored</p>
        </div>
        <Button onClick={() => fileRef.current?.click()}>↑ Upload Files</Button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*,video/*"
          style={{ display: 'none' }}
          onChange={handleUpload}
        />
      </div>

      {/* Search + Filter */}
      <div className={styles.toolbar}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search files, tags…"
          className={styles.searchInput}
        />
        <div className={styles.typeFilters}>
          {TYPE_FILTERS.map(f => (
            <button
              key={f}
              className={`${styles.typeBtn} ${typeFilter === f ? styles.typeBtnActive : ''}`}
              onClick={() => setTypeFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p style={{ fontSize: 32 }}>🔍</p>
          <p>No files match your search</p>
        </div>
      ) : (
        <div className={`${styles.grid} stagger`}>
          {filtered.map(file => (
            <div
              key={file.id}
              className={`${styles.fileCard} ${selected?.id === file.id ? styles.fileCardSelected : ''}`}
              onClick={() => setSelected(s => s?.id === file.id ? null : file)}
            >
              <div className={styles.fileThumbnail}>{file.emoji}</div>
              <div className={styles.fileMeta}>
                <p className={styles.fileName}>{file.name}</p>
                <p className={styles.fileDetails}>{file.size} · {file.date}</p>
                <div className={styles.fileTags}>
                  {file.tags.map(t => (
                    <span key={t} className={styles.fileTag}>{t}</span>
                  ))}
                </div>
                <div className={styles.fileActions} onClick={e => e.stopPropagation()}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard?.writeText(file.name)
                      addNotification('File name copied!', 'success')
                    }}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => addNotification(`Downloading ${file.name}…`, 'info')}
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail panel */}
      {selected && (
        <Card className={`${styles.detailPanel} animate-slideRight`}>
          <div className={styles.detailHeader}>
            <h3 className={styles.detailTitle}>File Details</h3>
            <button className={styles.detailClose} onClick={() => setSelected(null)}>✕</button>
          </div>
          <div className={styles.detailPreview}>{selected.emoji}</div>
          <p className={styles.detailName}>{selected.name}</p>
          <div className={styles.detailGrid}>
            <span className={styles.detailKey}>Type</span>   <span className={styles.detailVal}>{selected.type}</span>
            <span className={styles.detailKey}>Size</span>   <span className={styles.detailVal}>{selected.size}</span>
            <span className={styles.detailKey}>Uploaded</span><span className={styles.detailVal}>{selected.date}</span>
          </div>
          {selected.tags.length > 0 && (
            <div className={styles.detailTags}>
              {selected.tags.map(t => <span key={t} className={styles.fileTag}>{t}</span>)}
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <Button fullWidth variant="ghost" size="sm" onClick={() => addNotification('Copied!', 'success')}>Copy URL</Button>
            <Button fullWidth size="sm" onClick={() => addNotification('Downloading…', 'info')}>Download</Button>
          </div>
        </Card>
      )}
    </div>
  )
}
