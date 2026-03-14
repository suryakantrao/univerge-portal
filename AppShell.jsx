import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, PlusCircle, CheckSquare, CalendarDays,
  FolderOpen, BarChart3, Settings, Menu, X, Bell, Moon, Sun,
  LogOut, ChevronRight,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CountBadge } from './ui/Badge'
import Avatar from './ui/Avatar'
import NotificationToast from './ui/NotificationToast'
import styles from './AppShell.module.css'

const ICON_MAP = {
  LayoutDashboard, PlusCircle, CheckSquare, CalendarDays,
  FolderOpen, BarChart3, Settings,
}

const NAV_ITEMS = [
  { label: 'Dashboard',     path: '/dashboard', icon: 'LayoutDashboard' },
  { label: 'New Post',      path: '/upload',    icon: 'PlusCircle'      },
  { label: 'Approval Queue',path: '/queue',     icon: 'CheckSquare',    badge: true },
  { label: 'Calendar',      path: '/calendar',  icon: 'CalendarDays'    },
  { label: 'Media Library', path: '/media',     icon: 'FolderOpen'      },
  { label: 'Analytics',     path: '/analytics', icon: 'BarChart3'       },
  { label: 'Settings',      path: '/settings',  icon: 'Settings'        },
]

export default function AppShell({ children, onLogout }) {
  const { darkMode, setDarkMode, posts, currentUser } = useApp()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const pendingCount = posts.filter(p => p.status === 'pending').length

  return (
    <div className={styles.shell}>
      <NotificationToast />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className={styles.mobileOverlay} onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''} ${mobileOpen ? styles.mobileOpen : ''}`}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>U</div>
          {!collapsed && (
            <div className={styles.logoText}>
              <span className={styles.logoName}>Univerge</span>
              <span className={styles.logoSub}>Content Portal</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className={styles.nav}>
          {NAV_ITEMS.map(item => {
            const Icon = ICON_MAP[item.icon]
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.navActive : ''}`
                }
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} className={styles.navIcon} />
                {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
                {item.badge && pendingCount > 0 && !collapsed && (
                  <CountBadge count={pendingCount} />
                )}
                {item.badge && pendingCount > 0 && collapsed && (
                  <span className={styles.collapsedBadge} />
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* User */}
        <div className={styles.userRow}>
          <Avatar initials={currentUser.initials} size={32} colorIdx={0} />
          {!collapsed && (
            <div className={styles.userInfo}>
              <span className={styles.userName}>{currentUser.name}</span>
              <span className={styles.userRole}>{currentUser.role}</span>
            </div>
          )}
          {!collapsed && (
            <button className={styles.logoutBtn} onClick={onLogout} title="Sign out">
              <LogOut size={15} />
            </button>
          )}
        </div>
      </aside>

      {/* Main area */}
      <div className={`${styles.main} ${collapsed ? styles.mainCollapsed : ''}`}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <button
              className={styles.menuBtn}
              onClick={() => {
                if (window.innerWidth < 768) setMobileOpen(v => !v)
                else setCollapsed(v => !v)
              }}
            >
              <Menu size={20} />
            </button>
          </div>
          <div className={styles.topbarRight}>
            <button
              className={styles.iconBtn}
              onClick={() => setDarkMode(v => !v)}
              title="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className={styles.iconBtn} style={{ position: 'relative' }}>
              <Bell size={18} />
              {pendingCount > 0 && <span className={styles.bellDot} />}
            </button>
            <Avatar initials={currentUser.initials} size={32} colorIdx={0} />
          </div>
        </header>

        {/* Page content */}
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  )
}
