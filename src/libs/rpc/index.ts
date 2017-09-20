import * as http from 'http'

import { log, logError } from '../helpers/log'

import { DeamonOptions } from '../../deamon/types'
import { RpcRequestParams, RpcResponse } from './types'

export default class Rpc {
  private options: DeamonOptions

  constructor(options: DeamonOptions) {
    this.options = options
  }

  public batchRequest(requestsParams: RpcRequestParams[]): Promise<(RpcResponse | Error)[]> {
    log(`Rpc::batchRequest()`)

    return Promise.all(requestsParams.map(requestParams => this.request(requestParams)))
  }

  public request({ method, params = [] }: RpcRequestParams): Promise<RpcResponse | Error> {
    log(`Rpc::request()`)

    const requestData = JSON.stringify({
      method,
      params,
      id: Date.now() + Math.floor(Math.random() * 10)
    })

    const options = {
      // url: params.hostname ? null : params.url,
      hostname: this.options.host || null,
      port: this.options.port || null,
      method: 'POST',
      auth: this.options.user + ':' + this.options.password,
      headers: {
        'Content-Length': requestData.length,
      }
    }

    // console.info(options)

    log(`RPC request on '${method}'...`)

    return new Promise((resolve, reject) => {
      const req = http.request(options, res => {
        let data = '';
        // res.setEncoding('utf8')

        res.on('data', chunk => data += chunk)

        res.on('end', () => {
          log(`Successful RPC request on '${method}'`)
          resolve(JSON.parse(data) as RpcResponse)
        })
      })

      req.on('error', err => {
        logError(`Failed RPC request on '${method}'`)
        console.log(err)
        reject(err)
      });

      req.end(requestData)
    })
  }
}
