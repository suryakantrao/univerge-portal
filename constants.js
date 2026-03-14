export const BLUE = '#0067FB'
export const ORANGE = '#FF9900'

export const PLATFORMS = [
  { id: 'facebook',  label: 'Facebook',   color: '#1877F2', textColor: '#fff' },
  { id: 'instagram', label: 'Instagram',  color: '#E1306C', textColor: '#fff' },
  { id: 'linkedin',  label: 'LinkedIn',   color: '#0A66C2', textColor: '#fff' },
  { id: 'twitter',   label: 'X (Twitter)',color: '#111111', textColor: '#fff' },
]

export const STATUS_CONFIG = {
  draft:     { label: 'Draft',            color: '#6B7280', bg: '#F3F4F6',   darkBg: '#2A2F4A' },
  pending:   { label: 'Pending Approval', color: '#D97706', bg: '#FEF3C7',   darkBg: '#2D2510' },
  approved:  { label: 'Approved',         color: '#059669', bg: '#D1FAE5',   darkBg: '#0D2E20' },
  rejected:  { label: 'Rejected',         color: '#DC2626', bg: '#FEE2E2',   darkBg: '#2E0D0D' },
  scheduled: { label: 'Scheduled',        color: '#0067FB', bg: '#DBEAFE',   darkBg: '#0D1A2E' },
  published: { label: 'Published',        color: '#7C3AED', bg: '#EDE9FE',   darkBg: '#1A0D2E' },
}

export const ROLES = ['Admin', 'Content Creator', 'Reviewer']

export const INITIAL_POSTS = [
  {
    id: 1,
    title: 'Summer Product Launch',
    caption: 'Exciting news! Our summer collection is here. Discover innovation that moves with you. The future of enterprise communication starts today.',
    platform: 'instagram',
    status: 'pending',
    creator: 'Jamie Lee',
    createdAt: '2024-06-01',
    media: null,
    mediaType: 'image',
    mediaEmoji: '📸',
    hashtags: ['Innovation', 'Univerge', 'Summer2024'],
    comments: [{ author: 'Sarah M.', text: 'Great composition! Maybe brighten the image a bit?', time: '2024-06-02T10:30:00Z' }],
    scheduledFor: null,
    versions: [{ caption: 'Original draft caption here.', editedBy: 'Jamie Lee', editedAt: '2024-06-01T09:00:00Z' }],
    engagement: { likes: 0, shares: 0, comments: 0 },
  },
  {
    id: 2,
    title: 'LinkedIn Thought Leadership',
    caption: 'The future of connectivity is here. At Univerge, we believe technology should empower every team. Read our latest insights on enterprise communication and why 2024 is the year of connected workforces.',
    platform: 'linkedin',
    status: 'approved',
    creator: 'Marcus Chen',
    createdAt: '2024-05-28',
    media: null,
    mediaType: 'image',
    mediaEmoji: '📄',
    hashtags: ['Enterprise', 'Tech', 'Leadership'],
    comments: [],
    scheduledFor: '2024-06-10T09:00:00Z',
    versions: [],
    engagement: { likes: 142, shares: 38, comments: 21 },
  },
  {
    id: 3,
    title: 'Twitter Product Update',
    caption: 'Just shipped: Real-time collaboration features that your team will love. Try it free today! 🚀 Link in bio.',
    platform: 'twitter',
    status: 'published',
    creator: 'Priya Patel',
    createdAt: '2024-05-25',
    media: null,
    mediaType: 'image',
    mediaEmoji: '🎨',
    hashtags: ['ProductUpdate', 'SaaS'],
    comments: [],
    scheduledFor: null,
    versions: [],
    engagement: { likes: 891, shares: 234, comments: 67 },
  },
  {
    id: 4,
    title: 'Facebook Brand Story',
    caption: 'From startup to enterprise solution — our journey to redefining workplace connectivity. Swipe to see how we got here.',
    platform: 'facebook',
    status: 'rejected',
    creator: 'Alex Morgan',
    createdAt: '2024-05-22',
    media: null,
    mediaType: 'video',
    mediaEmoji: '🎬',
    hashtags: ['BrandStory', 'Univerge'],
    comments: [{ author: 'Tom K.', text: 'The story angle is good but we need better visuals for slide 3. Please resubmit with updated assets.', time: '2024-05-23T14:00:00Z' }],
    scheduledFor: null,
    versions: [],
    engagement: { likes: 0, shares: 0, comments: 0 },
  },
  {
    id: 5,
    title: 'Instagram Campaign — Work Smart',
    caption: 'Work smarter. Connect faster. Live better. The new Univerge platform is built for the modern team. Experience the difference.',
    platform: 'instagram',
    status: 'scheduled',
    creator: 'Jamie Lee',
    createdAt: '2024-06-02',
    media: null,
    mediaType: 'image',
    mediaEmoji: '📸',
    hashtags: ['WorkSmart', 'RemoteWork', 'Univerge'],
    comments: [],
    scheduledFor: '2024-06-15T14:00:00Z',
    versions: [],
    engagement: { likes: 0, shares: 0, comments: 0 },
  },
  {
    id: 6,
    title: 'LinkedIn Tech Insight',
    caption: 'AI-powered communication tools are transforming how enterprises collaborate. Here\'s what we\'re seeing in 2024 and what it means for your team.',
    platform: 'linkedin',
    status: 'draft',
    creator: 'Marcus Chen',
    createdAt: '2024-06-03',
    media: null,
    mediaType: 'image',
    mediaEmoji: '📄',
    hashtags: ['AI', 'Enterprise', 'FutureOfWork'],
    comments: [],
    scheduledFor: null,
    versions: [],
    engagement: { likes: 0, shares: 0, comments: 0 },
  },
]

export const INITIAL_TEAM = [
  { id: 1, name: 'Alex Morgan',  role: 'Admin',           email: 'alex@univerge.com',   initials: 'AM', status: 'active',   posts: 34, colorIdx: 0 },
  { id: 2, name: 'Jamie Lee',    role: 'Content Creator', email: 'jamie@univerge.com',  initials: 'JL', status: 'active',   posts: 67, colorIdx: 1 },
  { id: 3, name: 'Marcus Chen',  role: 'Content Creator', email: 'marcus@univerge.com', initials: 'MC', status: 'active',   posts: 52, colorIdx: 2 },
  { id: 4, name: 'Priya Patel',  role: 'Reviewer',        email: 'priya@univerge.com',  initials: 'PP', status: 'active',   posts: 28, colorIdx: 3 },
  { id: 5, name: 'Tom Klein',    role: 'Reviewer',        email: 'tom@univerge.com',    initials: 'TK', status: 'inactive', posts: 15, colorIdx: 4 },
]

export const AVATAR_COLORS = [BLUE, ORANGE, '#059669', '#7C3AED', '#E1306C']

export const MEDIA_FILES = [
  { id: 1, name: 'summer-hero.jpg',     type: 'image', size: '2.4 MB', tags: ['summer', 'product'],   date: 'Jun 1',  emoji: '🖼️' },
  { id: 2, name: 'product-demo.mp4',    type: 'video', size: '18.2 MB',tags: ['demo', 'product'],     date: 'May 28', emoji: '🎬' },
  { id: 3, name: 'team-photo.jpg',      type: 'image', size: '1.8 MB', tags: ['team', 'brand'],       date: 'May 25', emoji: '📸' },
  { id: 4, name: 'infographic-q2.gif',  type: 'gif',   size: '3.1 MB', tags: ['data', 'quarterly'],   date: 'May 20', emoji: '🎨' },
  { id: 5, name: 'brand-campaign.jpg',  type: 'image', size: '2.9 MB', tags: ['brand', 'campaign'],   date: 'May 18', emoji: '🖼️' },
  { id: 6, name: 'webinar-recap.mp4',   type: 'video', size: '42.5 MB',tags: ['event', 'webinar'],    date: 'May 15', emoji: '🎬' },
  { id: 7, name: 'logo-dark.png',       type: 'image', size: '0.3 MB', tags: ['brand', 'logo'],       date: 'May 10', emoji: '🖼️' },
  { id: 8, name: 'product-shot-2.jpg',  type: 'image', size: '3.2 MB', tags: ['product', 'studio'],   date: 'May 5',  emoji: '📸' },
  { id: 9, name: 'social-promo.gif',    type: 'gif',   size: '4.8 MB', tags: ['promo', 'campaign'],   date: 'Apr 30', emoji: '🎨' },
]

export const ANALYTICS = {
  totals: { published: 189, scheduled: 23, pending: 8, rejected: 12 },
  platformData: [
    { name: 'Instagram', posts: 89, engagement: 12400, color: '#E1306C', id: 'instagram' },
    { name: 'LinkedIn',  posts: 67, engagement: 8920,  color: '#0A66C2', id: 'linkedin'  },
    { name: 'Facebook',  posts: 54, engagement: 6100,  color: '#1877F2', id: 'facebook'  },
    { name: 'X/Twitter', posts: 37, engagement: 4300,  color: '#111111', id: 'twitter'   },
  ],
  weekly: [
    { week: 'W1', posts: 31, engagements: 4200 },
    { week: 'W2', posts: 47, engagements: 6800 },
    { week: 'W3', posts: 38, engagements: 5100 },
    { week: 'W4', posts: 52, engagements: 7900 },
  ],
  approvalTimes: [6.2, 4.8, 3.9, 4.2],
  topPosts: [
    { title: 'Summer Launch Campaign',       platform: 'instagram', likes: 4200, shares: 891, comments: 234 },
    { title: 'Enterprise Solution Deep Dive',platform: 'linkedin',  likes: 2100, shares: 445, comments: 178 },
    { title: 'Real-time Collab Feature',     platform: 'twitter',   likes: 1800, shares: 712, comments: 89  },
  ],
}

export const SUGGESTED_HASHTAGS = [
  '#Univerge', '#Enterprise', '#Innovation', '#SaaS',
  '#TechLeader', '#FutureOfWork', '#RemoteWork', '#Productivity',
]

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',      icon: 'LayoutDashboard' },
  { id: 'upload',    label: 'New Post',        icon: 'PlusCircle'      },
  { id: 'queue',     label: 'Approval Queue',  icon: 'CheckSquare'     },
  { id: 'calendar',  label: 'Calendar',        icon: 'CalendarDays'    },
  { id: 'media',     label: 'Media Library',   icon: 'FolderOpen'      },
  { id: 'analytics', label: 'Analytics',       icon: 'BarChart3'       },
  { id: 'settings',  label: 'Settings',        icon: 'Settings'        },
]
