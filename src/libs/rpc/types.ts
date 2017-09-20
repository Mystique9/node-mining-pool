export type RpcMethod =
  'getdifficulty'
  | 'getinfo'
  | 'getmininginfo'
  | 'submitblock'
  | 'validateaddress'

export interface RpcRequestParams {
  method: RpcMethod
  params?: string[]
}

export interface RpcResponse {
  result: any | null
  error: {
    code: number
    message: string
  } | null
  id: number
}
