// import * as express from 'express'
import * as net from 'net'

const rpc = require('jsonrpc2')

import { logInfo, logWarn } from '../libs/helpers/log'
// import writeJsonFile from '../libs/helpers/writeJsonFile'

// const rootPath = process.cwd()

interface StratumOptions {
  port: number
}

export default class Stratum {
  private options: StratumOptions
  private server: any
  // private client: net.Socket

  constructor(options: StratumOptions) {
    this.options = options
    this.init()
  }

  public init() {
    this.server = new rpc.Server.$create({
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    this.server.listen(3333, 'localhost')
    // this.server = net.createServer(this.listen.bind(this))

    // this.server.on('error', (err) => {
    //   throw err
    // })

    // this.server.listen(3333, () => {
    //   console.log('server bound')
    // })

    // this.server.on('connection', (socket) => {
    // });
    // this.connection = net.createConnection(this.listen.bind(this))
    // this.app.get('/', this.listen.bind(this))
  }

  public start() {
    /*if (process.env.NODE_ENV === 'development') {
      logWarn(`Stratum Server will start in a development mode.`)
      this.app.listen(this.options.port, () =>
        logInfo(`Coinboard Server is listening on port ${this.options.port}.`))
      return
    }

    logWarn(`Stratum Server will start in a production mode.`)
    this.app.listen(this.options.port, () =>
      logInfo(`Coinboard Server is listening on port ${this.options.port}.`))*/
  }

  private listen(socket: net.Socket) {
    logInfo('Stratum::listen()')
    logWarn('A client connected to the RPC server')

    console.log(socket)

    socket.on('end', () => {
      console.log('A client disconnected from the RPC server')
    })

    socket.write('hello\r\n')
    socket.pipe(socket)

    // writeJsonFile(`${rootPath}/rcp.json`, req)
    // console.log(req)
    // console.log(res)

    // return res.json({ message: 'ok' })
  }
}
