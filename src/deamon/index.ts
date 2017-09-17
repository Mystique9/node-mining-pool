// import * as axios from 'axios'
import * as http from 'http'
import { EventEmitter } from 'events'
// import async from 'async'

import log from '../libs/helpers/log'

import { DeamonOptions } from './types'

export default class Daemon extends EventEmitter {
  private options: DeamonOptions

  constructor(options: DeamonOptions) {
    super()
    console.log(options)
    this.options = options
  }

  public start() {
    log.info(`Daemon::start()`)

    this.check()
  }

  private check() {
    // const requestJson = JSON.stringify({
    //   method: 'getinfo',
    //   params: [],
    //   id: Date.now() + Math.floor(Math.random() * 10)
    // })

    this.fetchInfo()
  }

  public fetchInfo(): Promise<any> {
    log(`Daemon::fetchInfo()`)

    const requestData = JSON.stringify({
      method: 'getinfo',
      params: [],
      id: Date.now() + Math.floor(Math.random() * 10)
    })

    const method = 'POST'
    const url = `http://${this.options.host}:${this.options.port}/getinfo`

    log(`Request on ${method} ${url}...`)

    const options = {
      hostname: this.options.host,
      port: this.options.port,
      method,
      auth: this.options.user + ':' + this.options.password,
      headers: {
        'Content-Length': requestData.length,
      },
    }

    return new Promise((resolve, reject) => {
      const req = http.request(options, res => {
        let data = '';
        res.setEncoding('utf8')

        res.on('data', chunk => data += chunk)

        res.on('end', () => {
          log(`Successful request on ${method} ${url}`)
          resolve(JSON.parse(data))
        })
      })

      req.on('error', err => {
        log.error(`Failed request on ${method} ${url}`)
        console.log(err)
        reject(err)
      });

      req.end(requestData)
    })

    /*const instance = axios.default.create({
      method,
      url,
      auth: {
        username: this.options.user,
        password: this.options.password,
      },
      headers: {
        'Content-Length': data.length,
      },
      // data,
    })

    return instance.request({})
      .then(webServiceResponse => {
        log(`Successful request on ${method} ${url}`)
        log.info(webServiceResponse.data)

        return webServiceResponse.data
      })
      .catch((err: axios.AxiosError) => {
        log.error(`Failed request on ${method} ${url}`)
        log.error(err.code)

        return err
      })*/
  }
}
