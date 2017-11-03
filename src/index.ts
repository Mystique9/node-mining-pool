// Check and load the local .env file (development mode)
import * as dotenv from 'dotenv'
import fileExists from './libs/helpers/isFile'
const rootPath = process.cwd()
if (fileExists(`${rootPath}/.env`)) dotenv.config({ path: `${rootPath}/.env` })

import Pool from './pool'
import Server from './server'

import poolOptions from '../config/pool'

const pool = new Pool(poolOptions)
const server = new Server()

pool.on('log', (message: string) => console.log(`${message}`))

pool.start()
server.start()

// process.once('SIGUSR2', () => {
//   process.kill(process.pid, 'SIGUSR2');
// })
