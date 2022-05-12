const fs = require('fs')
const { createCipheriv, randomBytes } = require('crypto')

const key = randomBytes(32)
const iv = randomBytes(16)
const cipher = createCipheriv('aes-256-cbc', key, iv)


// 加密文件
fs.createReadStream('plain.txt').pipe(cipher).pipe(fs.createWriteStream('aes-256-cbc.dat'))

// 输出 key，iv
fs.writeFileSync('aes-256-cbc.key', key.toString('hex') + '|' + iv.toString('hex'))