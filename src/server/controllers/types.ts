import { Response } from 'express'

export type BaseControllerMethod = 'delete' | 'get' | 'post' | 'put'

export type BaseControllerResponse = Response | Promise<Response> | void
