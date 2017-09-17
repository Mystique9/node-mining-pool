import * as path from 'path'

import answerError from '../libs/helpers/answerError'

import ApiPoolController from './controllers/api/pool'

import { Express, Request, Response } from 'express'
import { BaseControllerMethod } from './controllers/types'
import { BaseController } from './controllers'

const filePath = path.basename(__filename)

function answer(req: Request, res: Response, controller: BaseController, method: BaseControllerMethod) {
  console.log(`${filePath} > ${method.toUpperCase()} on ${req.path}`)

  try {
    return controller[method]()
  }
  catch (err) {
    return answerError({ res, filePath, err })
  }
}

export default function routes(app: Express): void {
  app.get('/api/pool', (req, res) => answer(req, res, new ApiPoolController(req, res), 'get'))
}
