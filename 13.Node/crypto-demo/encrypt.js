
// 解密
const fs = require('fs')
const { createDecipheriv } = require('crypto')

const [key, iv] = fs.readFileSync('aes-256-cbc.key', {encoding: 'utf8'}).split('|')
const decipher = createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'))

fs.createReadStream('aes-256-cbc.dat').pipe(decipher).pipe(fs.createWriteStream('aes-256-cbc.txt'))
