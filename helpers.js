import { format, formatDistanceToNow } from 'date-fns'

export function formatDate(dateStr, pattern = 'MMM d, yyyy') {
  if (!dateStr) return ''
  try { return format(new Date(dateStr), pattern) }
  catch { return dateStr }
}

export function timeAgo(dateStr) {
  if (!dateStr) return ''
  try { return formatDistanceToNow(new Date(dateStr), { addSuffix: true }) }
  catch { return dateStr }
}

export function formatDateTime(dateStr) {
  if (!dateStr) return ''
  try { return format(new Date(dateStr), 'MMM d, yyyy · h:mm a') }
  catch { return dateStr }
}

export function truncate(str, len = 120) {
  if (!str || str.length <= len) return str
  return str.slice(0, len).trimEnd() + '…'
}

export function generateId() {
  return Date.now() + Math.floor(Math.random() * 1000)
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function getPlatform(id, platforms) {
  return platforms.find(p => p.id === id) || platforms[0]
}

export function getStatusConfig(status, config) {
  return config[status] || config.draft
}

export function countByStatus(posts) {
  return posts.reduce((acc, post) => {
    acc[post.status] = (acc[post.status] || 0) + 1
    return acc
  }, {})
}
