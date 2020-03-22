import { Router } from 'express'

const router = Router()

router.use((req, res, next) => {
  res.data.title = 'Dashboard'
  res.data.topnavs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'General', href: '/admin/general' },
    { title: 'Works', href: '/admin/works' },
  ]

  next()
})

router.get('/', (req, res) => {
  res.redirect('/admin/dashboard')
})

router.get('/dashboard', (req, res) => {
  res.data.title = 'Dashboard'
  res.render('admin-dashboard', { layout: 'adminlayout', data: res.data })
})

router.get('/general', (req, res) => {
  res.data.title = 'Admin - General'
  res.render('admin-general', { layout: 'adminlayout', data: res.data })
})

router.get('/works', (req, res) => {
  res.data.title = 'Admin - Works'
  res.render('admin-general', { layout: 'adminlayout', data: res.data })
})

export default router
