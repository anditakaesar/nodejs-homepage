import exphbs from 'express-handlebars'
import path from 'path'
import { env } from './env'

export const hbs = exphbs.create({
  extname: 'hbs',
  defaultLayout: 'defaultlayout.hbs',
  layoutsDir: path.join(__dirname, '../views/layouts'),
  partialsDir: path.join(__dirname, '../views/partials'),
})

export const sessionConfig = {
  name: env.SESSION_NAME,
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: env.SESSION_COOKIE_AGE, secure: env.SESSION_COOKIE_SECURE },
}

const config = {
  hbs,
  sessionConfig,
}

export default config
