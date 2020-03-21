import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import { json, urlencoded } from 'body-parser'
import exphbs from 'express-handlebars'
import session from 'express-session'
import path from 'path'
import cors from 'cors'
import { env } from './env'
import logger from './logger'

const app = express()

const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'defaultlayout.hbs',
  layoutsDir: path.join(__dirname, '../views/layouts'),
  partialsDir: path.join(__dirname, '../views/partials'),
})

// middlewares
app.use(helmet())
app.use(compression())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(session({
  name: env.SESSION_NAME,
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: env.SESSION_COOKIE_AGE, secure: env.SESSION_COOKIE_SECURE },
}))
app.use(cors())

// static path
app.use(express.static(path.join(__dirname, '../static')))

// view engine
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine)

// common data context
app.use((req, res, next) => {
  res.data = {}
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
  }
  next()
})

// 404
app.use((req, res) => {
  logger.warn('request made', {
    user: req.user,
    ip: req.ip,
    url: req.originalUrl,
  })
  res.status(404).json({
    message: 'resource not found',
  })
})

export default app
