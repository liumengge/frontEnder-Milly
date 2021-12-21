const fs = require('fs')

fs.readFile('readme.milly', (err, data) => {
  if(err) {
    throw err
  }
})
console.log('Milly')