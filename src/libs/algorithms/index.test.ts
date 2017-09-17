import * as assert from 'assert'

import algorithms from '.'

describe('libs/algorithms', () => {
  describe('#keccak()', () => {
    it('should return a buffer', () => {
      const data = new Buffer('test')
      // It needs to become an even length hex : 54321 => D431 (4 chars)
      // https://stackoverflow.com/a/35013079/2736233
      const nTime = 54321

      assert.equal(
        '38f23b1eedffcbb29e4d5ce4fa7babb2979e87bd7798e6d14a841c9c1e687048',
        algorithms.keccak.hash(data, nTime).toString('hex')
      )
    })
  })
})
