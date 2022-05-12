const validate = require('validate-npm-package-name')
console.log(validate.scopedPackagePattern)

// console.log(validate("some-package"))
// console.log(validate("example.com"))
// console.log(validate("under_score"))
// console.log(validate("123numeric"))
// console.log(validate("@npm/thingy"))
// console.log(validate("@jane/foo.js"))
// console.log('@npm/thingy'.match(validate.scopedPackagePattern))


// console.log(validate("excited!"))
// console.log(validate(" leading-space:and:weirdchars"))
// console.log(validate("eLaBorAtE-paCkAgE-with-mixed-case-and-more-than-214-characters-----------------------------------------------------------------------------------------------------------------------------------------------------------"))

var builtins = require('builtins')({ experimental: true })

console.log(builtins.indexOf('wasi') > -1)

console.log(builtins)