function loader2(sourceCode) {
  console.log('join loader2')
  return sourceCode + `\n const loader1 = 'milly'`
}

module.exports = loader2