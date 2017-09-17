const createKeccakHash = require('keccak')
const keccak256 = require('js-sha3').keccak256
const keccak512 = require('js-sha3').keccak512
console.info(keccak256)

var bignum = require('bignum')
// var multiHashing = require('multi-hashing')
// var util = require('./util.js')

var diff1 = global.diff1 = 0x00000000ffff0000000000000000000000000000000000000000000000000000
// const sha3 = new Sha3.SHA3Hash(256)

function keccakHash(data) {
    // return keccak256(data)
    return createKeccakHash('keccak256').update(data).digest('hex')
}

var algos = module.exports = global.algos = {
    keccak: {
        // multiplier: 1,
        multiplier: Math.pow(2, 8),
        hash: function(coinConfig){
            return (data, nTimeInt) => {
                // console.log(data.toString('hex'))
                // console.log(nTimeInt)
                const newData = Buffer.concat([data, new Buffer(nTimeInt.toString(16), 'hex')])
                // console.log(newData.toString('hex'))
                const newDataHex = newData.toString('hex')

                // const k = new Buffer(keccakHash(keccakHash(newDataHex)), 'hex')
                const k = keccakHash(keccakHash(newDataHex))
                // const k = keccakHash(keccakHash(newDataHex))
                // console.log(k)
                // console.log(k.toString('hex'))
                return new Buffer(k, 'hex')
                // return keccakHash(keccakHash(newData))
                // return keccakHash(newData)
            }

            // if (coinConfig.normalHashing === true) {
            //     return function (data, nTimeInt) {
            //         return hashKeccak(hashKeccak(Buffer.concat([data, new Buffer(nTimeInt.toString(16), 'hex')])))
            //         // return multiHashing.keccak(multiHashing.keccak(Buffer.concat([data, new Buffer(nTimeInt.toString(16), 'hex')])))
            //     }
            // }
            // else {
            //     return function () {
            //         return multiHashing.keccak.apply(this, arguments)
            //     }
            // }
        }
    },
}
