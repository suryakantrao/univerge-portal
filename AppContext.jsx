import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { INITIAL_POSTS, INITIAL_TEAM } from '../utils/constants'
import { generateId } from '../utils/helpers'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('univerge-theme') === 'dark'
  })
  const [posts, setPosts] = useState(INITIAL_POSTS)
  const [team, setTeam] = useState(INITIAL_TEAM)
  const [notifications, setNotifications] = useState([])
  const [currentUser] = useState({ name: 'Alex Morgan', role: 'Admin', initials: 'AM', email: 'alex@univerge.com' })

  // Apply theme to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('univerge-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Notifications
  const addNotification = useCallback((message, type = 'info') => {
    const id = generateId()
    setNotifications(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 4000)
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  // Posts CRUD
  const addPost = useCallback((postData) => {
    const newPost = {
      ...postData,
      id: generateId(),
      creator: currentUser.name,
      createdAt: new Date().toISOString().split('T')[0],
      comments: [],
      versions: [],
      scheduledFor: null,
      engagement: { likes: 0, shares: 0, comments: 0 },
    }
    setPosts(prev => [newPost, ...prev])
    addNotification('Post submitted for approval!', 'success')
    return newPost
  }, [currentUser.name, addNotification])

  const updatePost = useCallback((id, updates) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }, [])

  const approvePost = useCallback((id) => {
    updatePost(id, { status: 'approved' })
    addNotification('Post approved ✓', 'success')
  }, [updatePost, addNotification])

  const rejectPost = useCallback((id, reason = '') => {
    updatePost(id, { status: 'rejected' })
    addNotification('Post rejected', 'error')
  }, [updatePost, addNotification])

  const schedulePost = useCallback((id, scheduledFor) => {
    updatePost(id, { status: 'scheduled', scheduledFor })
    addNotification('Post scheduled!', 'success')
  }, [updatePost, addNotification])

  const addComment = useCallback((postId, text) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p
      return {
        ...p,
        comments: [...p.comments, {
          author: currentUser.name,
          text,
          time: new Date().toISOString(),
        }]
      }
    }))
    addNotification('Note added', 'success')
  }, [currentUser.name, addNotification])

  const editCaption = useCallback((postId, newCaption) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p
      return {
        ...p,
        caption: newCaption,
        versions: [...(p.versions || []), {
          caption: p.caption,
          editedBy: currentUser.name,
          editedAt: new Date().toISOString(),
        }]
      }
    }))
    addNotification('Caption updated', 'success')
  }, [currentUser.name, addNotification])

  const saveDraft = useCallback((postData) => {
    const newPost = {
      ...postData,
      id: generateId(),
      status: 'draft',
      creator: currentUser.name,
      createdAt: new Date().toISOString().split('T')[0],
      comments: [],
      versions: [],
      scheduledFor: null,
      engagement: { likes: 0, shares: 0, comments: 0 },
    }
    setPosts(prev => [newPost, ...prev])
    addNotification('Saved as draft', 'info')
    return newPost
  }, [currentUser.name, addNotification])

  // Team
  const inviteTeamMember = useCallback((member) => {
    setTeam(prev => [...prev, { ...member, id: generateId(), status: 'active', posts: 0 }])
    addNotification('Invitation sent!', 'success')
  }, [addNotification])

  const value = {
    darkMode, setDarkMode,
    posts, setPosts,
    team, setTeam,
    notifications, addNotification, removeNotification,
    currentUser,
    addPost, updatePost, approvePost, rejectPost, schedulePost,
    addComment, editCaption, saveDraft,
    inviteTeamMember,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
