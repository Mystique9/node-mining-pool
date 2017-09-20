import { Request, Response } from 'express'

import answerError from '../../libs/helpers/answerError'
import { log, logError } from '../../libs/helpers/log'
import validateJsonSchema, { Schema } from '../../libs/helpers/validateJsonSchema'
import Deamon from '../../deamon'

import { BaseControllerResponse } from './types'

import poolOptions from '../../../config/pool'

export interface BaseController {}

export abstract class BaseController {
  protected deamon = new Deamon(poolOptions.daemon)
  protected filePath = this.constructor.name

  constructor(
    protected readonly req: Request,
    protected readonly res: Response
  ) {}

  public get(): BaseControllerResponse { return this.answerError('Not Found', 404) }
  public post(): BaseControllerResponse { return this.answerError('Not Found', 404) }
  public put(): BaseControllerResponse { return this.answerError('Not Found', 404) }
  public delete(): BaseControllerResponse { return this.answerError('Not Found', 404) }

  protected log(message: string): void {
    log(`${this.filePath}: ${message}`)
  }

  protected logError(message: string): void {
    logError(`${this.filePath}: ${message}`)
  }

  protected answerError(err: string, statusCode?: number): Response {
    return answerError({
      res: this.res,
      filePath: this.filePath,
      err,
      statusCode: statusCode || 0,
    })
  }

  protected validateJsonSchema(schema: Schema, cb: () => BaseControllerResponse): BaseControllerResponse {
    this.log(`Validating JSON Schema`)

    return validateJsonSchema(schema, this.req.query, (err) => {
      if (err) return this.answerError(err)

      return cb()
    })
  }
}
