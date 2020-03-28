import { Router } from 'express'

const router = Router()

router.use((req, res, next) => {
  res.data.title = 'Dashboard'
  res.data.topnavs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Works', href: '/admin/works' },
  ]
  res.data.user = req.user
  next()
})

router.get('/', (req, res) => {
  res.redirect('/admin/dashboard')
})

router.get('/dashboard', (req, res) => {
  res.data.title = 'Dashboard'
  res.render('admin-dashboard', { layout: 'adminlayout', data: res.data })
})

router.get('/works', (req, res) => {
  res.data.title = 'Admin - Works'
  res.render('admin-works', { layout: 'adminlayout', data: res.data })
})

export default router
