import * as Ajv from 'ajv'

export type Schema = Object | string | boolean
type Callback = (err: string | null) => any

const ajv = new Ajv()

export default function validateJsonSchema(schema: Schema, data: {}, cb: Callback) {
  return cb(ajv.validate(schema, data) ? null : ajv.errorsText())
}
