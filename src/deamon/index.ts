import { EventEmitter } from 'events'
// import async from 'async'

import { log } from '../libs/helpers/log'
import Rpc from '../libs/rpc'

import { DeamonOptions } from './types'

export default class Daemon extends EventEmitter {
  public rpc: Rpc
  private options: DeamonOptions

  constructor(options: DeamonOptions) {
    super()

    this.options = options
    this.rpc = new Rpc(options)
  }

  // public start() {
  //   log.info(`Daemon::start()`)

  //   this.check()
  // }

  public isOnline(): Promise<boolean> {
    log(`Daemon::isOnline()`)

    return this.fetchInfo()
      .then(() => true)
      .catch(() => false)
  }

  public fetchInfo(): Promise<any> {
    log(`Daemon::fetchInfo()`)

    return this.rpc.request({ method: 'getinfo' })
      .then(data => data)
      .catch((err: Error) => err)
  }
}
