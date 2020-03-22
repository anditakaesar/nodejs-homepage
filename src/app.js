import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import { json, urlencoded } from 'body-parser'
import session from 'express-session'
import path from 'path'
import cors from 'cors'
import logger from './logger'
import { requireAuth } from './utils'
import { hbs, sessionConfig } from './config'
import getDefaultContext from './context'

const app = express()

// middlewares
app.use(helmet())
app.use(compression())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(session(sessionConfig))
app.use(cors())

// static path
app.use(express.static(path.join(__dirname, '../static')))

// view engine
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine)

// common data context
app.use((req, res, next) => {
  res.data = getDefaultContext()

  if (req.session.user) {
    req.user = req.session.user
  } else {
    req.user = 'anonymous'
  }
  next()
})

// routers
app.get('/', (req, res) => {
  res.data.title = 'Hello HBS'
  res.render('index', { data: res.data })
})
app.use('/user', require('./routers/user.router').default)
app.use('/admin', requireAuth, require('./routers/admin.router').default)

// error handler
app.use((err, req, res, next) => {
  if (err) {
    logger.error(err.message, {
      method: req.method,
      path: req.originalUrl,
      user: req.user,
      ip: req.ip,
    })

    res.status(err.status).json({
      message: err.message,
    })
  } else {
    next()
  }
})

// 404
app.use((req, res) => {
  logger.warn('request made', {
    user: req.user.username,
    ip: req.ip,
    url: req.originalUrl,
  })
  res.status(404).json({
    message: 'resource not found',
  })
})

export default app
