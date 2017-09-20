import { BaseController } from '..'

export default class ApiInfoController extends BaseController {
  public get() {
    this.log(`Calling get()`)

    const schema = {
      type: 'object',
      properties: {},
      additionalProperties: false,
    }

    return this.validateJsonSchema(schema, () => {
      return this.deamon.rpc.request({ method: 'getinfo' })
        .then(data => this.res.status(200).json(data))
        .catch(() => this.res.status(400).json({}))
    })
  }
}
