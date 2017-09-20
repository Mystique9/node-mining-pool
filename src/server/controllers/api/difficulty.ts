import { BaseController } from '..'

export default class ApiDifficultyController extends BaseController {
  public get() {
    this.log(`Calling get()`)

    const schema = {
      type: 'object',
      properties: {},
      additionalProperties: false,
    }

    return this.validateJsonSchema(schema, () => {
      return this.deamon.rpc.request({ method: 'getdifficulty' })
        .then(data => this.res.status(200).json(data))
        .catch(() => this.res.status(400).json({}))
    })
  }
}
