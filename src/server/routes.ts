import * as path from 'path'

import answerError from '../libs/helpers/answerError'

import ApiDifficultyController from './controllers/api/difficulty'
import ApiInfoController from './controllers/api/info'
import ApiValidateAddressController from './controllers/api/validateAddress'

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
  app.get('/api/network/difficulty', (req, res) => answer(req, res, new ApiDifficultyController(req, res), 'get'))
  app.get('/api/info', (req, res) => answer(req, res, new ApiInfoController(req, res), 'get'))
  app.get('/api/address/validate', (req, res) => answer(req, res, new ApiValidateAddressController(req, res), 'get'))
}
