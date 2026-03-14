import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import LoginPage from './pages/LoginPage'
import AppShell from './components/AppShell'
import Dashboard from './pages/Dashboard'
import UploadPost from './pages/UploadPost'
import ApprovalQueue from './pages/ApprovalQueue'
import CalendarPage from './pages/CalendarPage'
import MediaLibrary from './pages/MediaLibrary'
import Analytics from './pages/Analytics'
import SettingsPage from './pages/SettingsPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  if (!loggedIn) {
    return (
      <AppProvider>
        <LoginPage onLogin={() => setLoggedIn(true)} />
      </AppProvider>
    )
  }

  return (
    <AppProvider>
      <AppShell onLogout={() => setLoggedIn(false)}>
        <Routes>
          <Route path="/"          element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload"    element={<UploadPost />} />
          <Route path="/queue"     element={<ApprovalQueue />} />
          <Route path="/calendar"  element={<CalendarPage />} />
          <Route path="/media"     element={<MediaLibrary />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings"  element={<SettingsPage />} />
          <Route path="*"          element={<NotFoundPage />} />
        </Routes>
      </AppShell>
    </AppProvider>
  )
}
