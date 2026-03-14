import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { Toggle } from '../components/ui/Input'
import Avatar from '../components/ui/Avatar'
import { PLATFORMS, BLUE } from '../utils/constants'
import styles from './SettingsPage.module.css'

const TABS = [
  { id: 'team',          label: 'Team Members'   },
  { id: 'social',        label: 'Social Accounts' },
  { id: 'notifications', label: 'Notifications'   },
  { id: 'security',      label: 'Security'        },
  { id: 'appearance',    label: 'Appearance'      },
]

export default function SettingsPage() {
  const { team, darkMode, setDarkMode, addNotification } = useApp()
  const [tab, setTab] = useState('team')
  const [twoFA, setTwoFA] = useState(false)
  const [emailNotif, setEmailNotif] = useState(true)
  const [inAppNotif, setInAppNotif] = useState(true)
  const [connectedPlatforms, setConnectedPlatforms] = useState(['facebook', 'instagram', 'linkedin'])
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Content Creator')

  const togglePlatform = (id) => {
    setConnectedPlatforms(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
    addNotification(
      connectedPlatforms.includes(id) ? 'Account disconnected' : 'Account connected!',
      connectedPlatforms.includes(id) ? 'error' : 'success'
    )
  }

  const handleInvite = () => {
    if (!inviteEmail.trim()) return
    addNotification(`Invitation sent to ${inviteEmail}`, 'success')
    setInviteEmail('')
  }

  const AUDIT_LOG = [
    { action: 'Post approved',   user: 'Alex Morgan', time: 'Today 10:23 AM' },
    { action: 'User invited',    user: 'Alex Morgan', time: 'Today 9:15 AM'  },
    { action: 'Post scheduled',  user: 'Jamie Lee',   time: 'Yesterday 4:42 PM' },
    { action: 'Post rejected',   user: 'Priya Patel', time: 'Yesterday 2:10 PM' },
    { action: 'Caption edited',  user: 'Tom Klein',   time: '2 days ago'     },
  ]

  return (
    <div className={`${styles.page} animate-fadeUp`}>
      <h1 className={styles.pageTitle}>Settings</h1>

      <div className={styles.layout}>
        {/* Sidebar tabs */}
        <Card className={styles.tabSidebar} padding="sm">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`${styles.tabBtn} ${tab === t.id ? styles.tabActive : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </Card>

        {/* Content */}
        <div className={styles.tabContent}>

          {/* Team */}
          {tab === 'team' && (
            <Card>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Team Members</h3>
              </div>
              {/* Invite */}
              <div className={styles.inviteRow}>
                <input
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder="colleague@univerge.com"
                  className={styles.input}
                  onKeyDown={e => e.key === 'Enter' && handleInvite()}
                />
                <select
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value)}
                  className={styles.select}
                >
                  <option>Content Creator</option>
                  <option>Reviewer</option>
                  <option>Admin</option>
                </select>
                <Button onClick={handleInvite} disabled={!inviteEmail.trim()}>
                  Send Invite
                </Button>
              </div>

              <div className={styles.memberList}>
                {team.map((m, i) => (
                  <div key={m.id} className={styles.memberRow}>
                    <Avatar initials={m.initials} size={38} colorIdx={i} />
                    <div className={styles.memberInfo}>
                      <p className={styles.memberName}>{m.name}</p>
                      <p className={styles.memberEmail}>{m.email}</p>
                    </div>
                    <span className={styles.roleBadge}>{m.role}</span>
                    <span
                      className={styles.statusBadge}
                      style={{
                        background: m.status === 'active' ? '#D1FAE5' : 'var(--card-hover)',
                        color: m.status === 'active' ? '#059669' : 'var(--text-muted)',
                      }}
                    >
                      {m.status}
                    </span>
                    <span className={styles.memberPosts}>{m.posts} posts</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Social Accounts */}
          {tab === 'social' && (
            <Card>
              <h3 className={styles.sectionTitle}>Connected Social Accounts</h3>
              <div className={styles.platformList}>
                {PLATFORMS.map(p => {
                  const connected = connectedPlatforms.includes(p.id)
                  return (
                    <div key={p.id} className={styles.platformRow}>
                      <div
                        className={styles.platformIcon}
                        style={{ background: p.color + '18', color: p.color }}
                      >
                        {p.id === 'facebook' ? 'f' : p.id === 'instagram' ? '📷' : p.id === 'linkedin' ? 'in' : '𝕏'}
                      </div>
                      <div className={styles.platformInfo}>
                        <p className={styles.platformName}>{p.label}</p>
                        <p
                          className={styles.platformStatus}
                          style={{ color: connected ? '#059669' : 'var(--text-muted)' }}
                        >
                          {connected ? '✓ Connected · @univerge' : 'Not connected'}
                        </p>
                      </div>
                      <Button
                        variant={connected ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => togglePlatform(p.id)}
                      >
                        {connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </Card>
          )}

          {/* Notifications */}
          {tab === 'notifications' && (
            <Card>
              <h3 className={styles.sectionTitle}>Notification Preferences</h3>
              <div className={styles.toggleList}>
                <Toggle
                  label="Email Notifications"
                  sublabel="Receive updates via email"
                  checked={emailNotif}
                  onChange={setEmailNotif}
                />
                <Toggle
                  label="In-App Notifications"
                  sublabel="Show toast alerts within the platform"
                  checked={inAppNotif}
                  onChange={setInAppNotif}
                />
              </div>
              <div className={styles.notifEvents}>
                <p className={styles.notifEventsTitle}>Notify me when:</p>
                {[
                  'Post submitted for approval',
                  'Post approved',
                  'Post rejected',
                  'Post scheduled',
                  'Post published',
                  'Comment added to my post',
                ].map(event => (
                  <label key={event} className={styles.checkRow}>
                    <input
                      type="checkbox"
                      defaultChecked
                      style={{ accentColor: BLUE, width: 15, height: 15 }}
                    />
                    <span className={styles.checkLabel}>{event}</span>
                  </label>
                ))}
              </div>
            </Card>
          )}

          {/* Security */}
          {tab === 'security' && (
            <Card>
              <h3 className={styles.sectionTitle}>Security Settings</h3>
              <div className={styles.securitySection}>
                <Toggle
                  label="Two-Factor Authentication"
                  sublabel="Add an extra layer of security to your account"
                  checked={twoFA}
                  onChange={(v) => {
                    setTwoFA(v)
                    addNotification(`2FA ${v ? 'enabled' : 'disabled'}`, v ? 'success' : 'info')
                  }}
                />
              </div>

              <div className={styles.securitySection}>
                <p className={styles.sectionSubtitle}>Change Password</p>
                {['Current Password', 'New Password', 'Confirm New Password'].map(f => (
                  <input
                    key={f}
                    type="password"
                    placeholder={f}
                    className={styles.input}
                    style={{ marginBottom: 10 }}
                  />
                ))}
                <Button onClick={() => addNotification('Password updated successfully!', 'success')}>
                  Update Password
                </Button>
              </div>

              <div className={styles.securitySection}>
                <p className={styles.sectionSubtitle}>Audit Log</p>
                <div className={styles.auditList}>
                  {AUDIT_LOG.map((log, i) => (
                    <div key={i} className={styles.auditRow}>
                      <span className={styles.auditAction}>{log.action}</span>
                      <span className={styles.auditMeta}>{log.user} · {log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Appearance */}
          {tab === 'appearance' && (
            <Card>
              <h3 className={styles.sectionTitle}>Appearance</h3>
              <div className={styles.toggleList}>
                <Toggle
                  label="Dark Mode"
                  sublabel="Switch between light and dark interface themes"
                  checked={darkMode}
                  onChange={setDarkMode}
                />
              </div>
              <div className={styles.themePreview}>
                <div
                  className={styles.themeCard}
                  style={!darkMode ? { border: `2px solid ${BLUE}` } : {}}
                  onClick={() => setDarkMode(false)}
                >
                  <div className={styles.themeCardLight}>
                    <div className={styles.themeDot} style={{ background: BLUE }} />
                    <div className={styles.themeLine} />
                    <div className={styles.themeLine} style={{ width: '60%' }} />
                  </div>
                  <p className={styles.themeLabel}>Light</p>
                </div>
                <div
                  className={styles.themeCard}
                  style={darkMode ? { border: `2px solid ${BLUE}` } : {}}
                  onClick={() => setDarkMode(true)}
                >
                  <div className={styles.themeCardDark}>
                    <div className={styles.themeDot} style={{ background: BLUE }} />
                    <div className={styles.themeLine} style={{ background: 'rgba(255,255,255,0.15)' }} />
                    <div className={styles.themeLine} style={{ width: '60%', background: 'rgba(255,255,255,0.1)' }} />
                  </div>
                  <p className={styles.themeLabel}>Dark</p>
                </div>
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  )
}
