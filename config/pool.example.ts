import coin from './coin'
import { PoolOptions } from '../src/pool/types'

const poolOptions: PoolOptions = {
  coin,

  address: 'EbEkkYTagkWnDBu1qbo5atHEqjChkp2NGH',
  rewardRecipients: [
    { address: 'Ed7r1egTY6ydepJQXJCLkq5GCejvECq1Pj', percent: 1 },
  ],

  blockRefreshInterval: 1000,
  jobRebroadcastTimeout: 55,
  connectionTimeout: 600,

  banning: {
      enabled: false,
      time: 600, //How many seconds to ban worker for
      invalidPercent: 50, //What percent of invalid shares triggers ban
      checkThreshold: 500, //Check invalid percent when this many shares have been submitted
      purgeInterval: 300 //Every this many seconds clear out the list of old bans
  },

  ports: [
    {
      port: 3333,
      diff: 16
    }
  ],

  daemon: {
    host: '127.0.0.1',
    port: 17388,
    user: 'edouardh',
    password: '123'
  },

  p2p: {
    enabled: true,
    host: '127.0.0.1',
    port: 17389
  }
}

export default poolOptions
