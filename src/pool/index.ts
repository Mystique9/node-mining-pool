import { EventEmitter } from 'events'
import { blue, green, red } from 'chalk'

import Daemon from '../deamon'
import Stratum from '../stratum'

import { PoolOptions } from './types'
import { RpcRequestParams, RpcResponse } from '../libs/rpc/types'

export default class Pool extends EventEmitter {
  private deamon: Daemon
  private options: PoolOptions
  private stratum: Stratum

  constructor(options: PoolOptions) {
    super()

    this.options = options

    this.deamon = new Daemon(options.daemon)
    this.stratum = new Stratum({ port: options.ports[0].port })
  }

  private emitLog(text: string): void { this.emit('log', green(text)) }
  private emitInfo(text: string): void { this.emit('log', blue(text)) }
  // private emitWarning(text: string): void { this.emit('log', yellow(text)) }
  private emitError(text: string): void { this.emit('log', red(text)) }

  public start() {
    this.emitLog('Pool::start()')

    this.deamon.isOnline()
      .then(() => this.analyseDeamon())
      .catch((error: Error) => this.emitError(error.message))
  }

  private analyseDeamon() {
    this.emitLog('Pool::analyseDeamon()')

    const requests: RpcRequestParams[] = [
      { method: 'getinfo' },
      { method: 'getdifficulty' },
      { method: 'getmininginfo' },
      // TODO Replace by a real block there
      { method: 'submitblock', params: [''] },
      { method: 'validateaddress', params: [this.options.address] },
    ]

    this.deamon.rpc.batchRequest(requests)
      .then((responses: RpcResponse[]) => {
        let hasError = false
        responses.forEach((response, index) => {
          const method = requests[index].method

          if (response.error && method !== 'submitblock') {
            hasError = true
            this.emitError(`RPC '${requests[index].method}': ${response.error.message}`)
            return
          }

          if (method === 'getdifficulty') {
            this.options.coin.reward = (isNaN(response.result) && 'proof-of-stake' in response.result)
              ? 'POS'
              : 'POW'
          }

          // POS coins must use the public key in coinbase transactions,
          // and this public key is only given if the address is owned by the local wallet.
          if (
            method === 'validateaddress'
            && this.options.coin.reward === 'POS'
            && !response.result.pubkey
          ) {
            hasError = true
            this.emitError([
              `RPC '${requests[index].method}':`,
              `The address provided is not from the local daemon wallet.`,
              `This is required for POS coins.`,
            ].join(' '))
            return
          }

          this.emitInfo(`RPC '${requests[index].method}': OK`)
        })

        if (!hasError) this.run()
      })
  }

  private run() {
    this.stratumStart()
  }

  private stratumStart() {
    this.stratum.start()
  }
}
