import * as express from 'express'
const mustacheExpress = require('mustache-express')

import { logInfo, logWarn } from '../libs/helpers/log'
import routes from './routes'

const port = process.env.PORT || 80
const rootPath = process.cwd()

export default class Server {
  private app: express.Express

  constructor() {
    this.app = express()
    this.init()
  }

  public init() {
    // Attaches the routes
    routes(this.app)

    // Define mustache as the template renderer
    this.app.engine('mst', mustacheExpress())
    this.app.set('view engine', 'mst')
    this.app.set('views', `${rootPath}/server/views`)

    // Define 'public' directory as the static files directory
    this.app.use(express.static(`${rootPath}/public`))
  }

  public start() {
    if (process.env.NODE_ENV === 'development') {
      logWarn(`Coinboard Server will start in a development mode.`)
      this.app.listen(port, () => logInfo(`Coinboard Server is listening on port ${port}.`))
      return
    }

    logWarn(`Coinboard Server will start in a production mode.`)
    this.app.listen(port, () => logInfo(`Coinboard Server is listening on port ${port}.`))
  }
}
