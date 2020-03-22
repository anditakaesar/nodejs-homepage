import { Router } from 'express'
import httpStatus from 'http-status'
import { DataTypes } from 'sequelize'
import { sequelize } from '../../models/index'
import { genError, isLoggedIn } from '../utils'
import { DEFAULT_ADMIN_PAGE } from '../env'

const User = require('../../models/user')(sequelize, DataTypes)

const router = Router()

router.get('/login', isLoggedIn, (req, res) => {
  res.data.title = 'Please Login'
  res.render('login', { data: res.data })
})

router.post('/login', (req, res, next) => {
  process.nextTick(() => {
    User.findOne({
      where: {
        email: req.body.email,
      },
    })
      .then((user) => {
        if (!user) {
          next(genError('Unauthorized', `notfound user for email: ${req.body.email}`, httpStatus.UNAUTHORIZED))
        } else {
          const userobj = {
            id: user.id,
            username: user.username,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
          }
          req.session.user = userobj
          res.redirect(DEFAULT_ADMIN_PAGE)
        }
      })
      .catch((err) => {
        next(genError('Something wrong', err.message, httpStatus.INTERNAL_SERVER_ERROR))
      })
  })
})

export default router
