import 'dotenv/config'
import app from './app'
import logger from './logger'
import { env } from './env'

app.listen(env.PORT, () => {
  logger.info(`app running at port ${env.PORT}`)
})
