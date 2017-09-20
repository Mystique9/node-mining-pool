import { BaseController } from '..'

export default class ApiValidateAddressController extends BaseController {
  public get() {
    this.log(`Calling get()`)

    const schema = {
      type: 'object',
      properties: {
        address: {
          type: 'string',
          minLength: 34,
          maxLength: 102,
        },
      },
      required: ['address'],
      additionalProperties: false,
    }

    return this.validateJsonSchema(schema, () => {
      return this.deamon.rpc.request({ method: 'validateaddress', params: [this.req.query.address] })
        .then(data => this.res.status(200).json(data))
        .catch(() => this.res.status(400).json({}))
    })
  }
}
