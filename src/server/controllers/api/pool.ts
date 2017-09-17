import { BaseController } from '..'
import Deamon from '../../../deamon'

import poolOptions from '../../../../config/pool'

export default class ApiPoolController extends BaseController {
  public get() {
    this.log(`Calling get()`)

    const schema = {
      type: 'object',
      properties: {},
      additionalProperties: false,
    }

    return this.validateJsonSchema(schema, () => {
      const deamon = new Deamon(poolOptions.daemon)
      return deamon.fetchInfo()
        .then(data => this.res.status(200).json(data))
        .catch(() => this.res.status(400).json({}))
    })
  }
}
