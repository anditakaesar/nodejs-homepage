import { LOGIN_PAGE, DEFAULT_ADMIN_PAGE } from './env'

export const genError = (message, intmsg, status = 500) => {
  const error = new Error(message)
  error.intmsg = intmsg
  error.status = status

  return error
}

export function userExist(req) {
  if (req.user !== 'anonymous' && req.user !== undefined) {
    return true
  }
  return false
}

export function requireAuth(req, res, next) {
  if (userExist(req)) {
    next()
  } else {
    res.redirect(LOGIN_PAGE)
  }
}

export function isLoggedIn(req, res, next) {
  if (userExist(req)) {
    res.redirect(DEFAULT_ADMIN_PAGE)
  } else {
    next()
  }
}

const utils = {
  genError,
  requireAuth,
  isLoggedIn,
}

export default utils
