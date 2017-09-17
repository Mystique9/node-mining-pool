import { EventEmitter } from 'events'
// import { blue, green, red, yellow } from 'chalk'
import { green } from 'chalk'

import Daemon from '../deamon'

import { PoolOptions } from './types'

export default class Pool extends EventEmitter {
  private deamon: Daemon
  private options: PoolOptions

  constructor(options: PoolOptions) {
    super()
    this.options = options
  }

  private emitLog(text: string): void { this.emit('log', 'Log', green(text)) }
  // private emitInfo(text: string): void { this.emit('log', 'Info', blue(text)) }
  // private emitWarning(text: string): void { this.emit('log', 'Warn', yellow(text)) }
  // private emitError(text: string): void { this.emit('log', 'Error', red(text)) }

  public start() {
    this.emitLog('Pool::start()')

    this.attachDeamon()
  }

  private attachDeamon() {
    this.emitLog('Pool::attachDeamon()')

    this.deamon = new Daemon(this.options.daemon)

    // this.daemon.once('online', function() => {
    //     finishedCallback();

    // })
    // .on('error', function(message) => {
    //     emitErrorLog(message);
    // });

    this.deamon.start();
  }
}
