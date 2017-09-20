import { DeamonOptions } from '../deamon/types'

export interface Coin {
  name: string
  symbol: string
  algorithm: 'keccak'
  peerMagic: string
  normalHashing?: boolean
  reward?: 'POS' | 'POW'
}

interface PoolPort {
  port: number
  diff: number

  /**
   * Variable difficulty is a feature that will automatically adjust difficulty
   * for individual miners based on their hashrate in order to lower networking overhead
   */
  varDiff?: {
    minDiff: number, // Minimum difficulty
    maxDiff: number, // Network difficulty will be used if it is lower than this
    targetTime: number, // Try to get 1 share per this many seconds
    retargetTime: number, // Check to see if we should retarget every this many seconds
    variancePercent: number // Allow time to very this % from target without retargeting
  }
}

export interface PoolRewardRecipient {
  address: string
  percent: number
}

export interface PoolOptions {
  coin: Coin
  address: string
  rewardRecipients: PoolRewardRecipient[]
  // How often to poll RPC daemons for new blocks (in ms)
  blockRefreshInterval: number
  /* Some miner apps will consider the pool dead/offline if it doesn't receive anything new jobs
      for around a minute, so every time we broadcast jobs, set a timeout to rebroadcast
      in this many seconds unless we find a new job. Set to zero or remove to disable this. */
  jobRebroadcastTimeout: number

  /**
   * Remove workers that haven't been in contact for this many seconds
   *
   * Some attackers will create thousands of workers that use up all available socket connections,
   * usually the workers are zombies and don't submit shares after connecting.
   * This features detects those and disconnects them.
   */
  connectionTimeout: number

  /* If a worker is submitting a high threshold of invalid shares we can temporarily ban their IP
      to reduce system/network load. Also useful to fight against flooding attacks. If running
      behind something like HAProxy be sure to enable 'tcpProxyProtocol', otherwise you'll end up
      banning your own IP address (and therefore all workers). */
  banning: {
      enabled: boolean
      time: number //How many seconds to ban worker for
      invalidPercent: number //What percent of invalid shares triggers ban
      checkThreshold: number //Check invalid percent when this many shares have been submitted
      purgeInterval: number //Every this many seconds clear out the list of old bans
  }

  /* Each pool can have as many ports for your miners to connect to as you wish. Each port can
      be configured to use its own pool difficulty and variable difficulty settings. varDiff is
      optional and will only be used for the ports you configure it for. */
  ports: PoolPort[]

  /* Recommended to have at least two daemon instances running in case one drops out-of-sync
      or offline. For redundancy, all instances will be polled for block/transaction updates
      and be used for submitting blocks. Creating a backup daemon involves spawning a daemon
      using the -datadir=/backup argument which creates a new daemon instance with it's own
      RPC config. For more info on this see:
        - https://en.bitcoin.it/wiki/Data_directory
        - https://en.bitcoin.it/wiki/Running_bitcoind */
  daemon: DeamonOptions

  /* This allows the pool to connect to the daemon as a node peer to receive block updates.
      It may be the most efficient way to get block updates (faster than polling, less
      intensive than blocknotify script). It requires the additional field "peerMagic" in
      the coin config. */
  p2p: {
    enabled: boolean,
    /* Host for daemon */
    host: string,
    /* Port configured for daemon (this is the actual peer port not RPC port) */
    port: number,
  }
}
