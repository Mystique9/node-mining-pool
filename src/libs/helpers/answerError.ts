import { Response } from 'express'

import { logError, logWarn } from './log'

interface AnswerErrorParams {
  res: Response
  filePath: string
  err: string
  statusCode?: number
}

export default function answerError({ res, filePath, err, statusCode }: AnswerErrorParams): Response {
  if (statusCode && statusCode < 500)
    logWarn(`${filePath}: ${err}`)
  else
    logError(`${filePath}: ${err}`)

  if (process.env.NODE_ENV === 'development') {
    return res.status(statusCode || 400).json({
      error: {
        code: statusCode || 400,
        message: err
      }
    })
  }

  return res.status(400).json({
    error: {
      code: 400,
      message: 'Bad Request'
    }
  })
}
