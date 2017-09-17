const Sha3 = require('sha3')

const sha3 = new Sha3.SHA3Hash(256)

function keccakHash(data: string): string {
  return sha3.update(data).digest('hex')
}

export default {
  keccak: {
    multiplier: Math.pow(2, 8),
    hash: (data: Buffer, nTime: number): Buffer => {
      const newData = Buffer.concat([data, new Buffer(nTime.toString(16), 'hex')])
      console.log(typeof newData)
      console.log(newData instanceof Buffer)
      console.log(newData)
      console.log(newData.toString('hex'))
      console.log(keccakHash(keccakHash(newData.toString('hex'))))
      return new Buffer(keccakHash(keccakHash(newData.toString('hex'))), 'hex')
    },
  },
}
