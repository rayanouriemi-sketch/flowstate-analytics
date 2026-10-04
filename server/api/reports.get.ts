const pages = [
  { path: '/', views: 18420, time: 72, bounce: 34 },
  { path: '/tarifs', views: 9310, time: 128, bounce: 22 },
  { path: '/blog/guide-onboarding', views: 6120, time: 241, bounce: 41 },
  { path: '/inscription', views: 5480, time: 64, bounce: 18 },
  { path: '/fonctionnalites', views: 4870, time: 97, bounce: 29 },
  { path: '/blog/kpi-saas', views: 3120, time: 205, bounce: 46 },
  { path: '/contact', views: 1890, time: 51, bounce: 38 },
]

export default defineEventHandler((event) => {
  const { sort = 'views', dir = 'desc' } = getQuery(event) as { sort?: 'views' | 'time' | 'bounce', dir?: 'asc' | 'desc' }
  const key = ['views', 'time', 'bounce'].includes(sort) ? sort : 'views'
  return [...pages].sort((a, b) => (dir === 'asc' ? a[key] - b[key] : b[key] - a[key]))
})
