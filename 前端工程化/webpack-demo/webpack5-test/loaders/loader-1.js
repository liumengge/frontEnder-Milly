// loader 本质上就是一个函数， 接收源码作为入参，返回处理后的结果

function loader1(sourceCode) {
  console.log('join loader1')
  return sourceCode + `\n const loader1 = 'https://github.com/'`
}

module.exports = loader1