const http = require('http')
const URL = require('url').URL

const baseFun = require('./util/baseFun')

// 路由映射
const routerMapping = {
  '/v1/contents': {
    'controller': 'content',
    'method': 'list'
  },
  '/v1/test': {
    'controller': 'content',
    'method': 'test'
  }
}

const server = http.createServer(async (req, res) => {
  // 获取 get 参数
  const myUrl = new URL(req.url, `http://${req.headers.host}`)
  console.log(myUrl, 'myUrl')
  const pathname = myUrl.pathname
  
  if(!routerMapping[pathname]) {
    return baseFun.setResInfo(res, false, 'path not found', null, 404)
  }

  const ControllerClass = require(`./controller/${routerMapping[pathname]['controller']}`)

  try {
    const controllerObj = new ControllerClass(res, req)
    if(controllerObj[
      routerMapping[pathname]['method']
    ][
      Symbol.toStringTag
    ] === 'AsyncFunction') {
      return await controllerObj[routerMapping[pathname]['method']]()
    } else { // 普通方法直接调用
      return controllerObj[routerMapping[pathname]['method']]()
    }
  } catch (error) { // 异常时，需要返回 500 错误码给前端
    console.log(error)
    return baseFun.setResInfo(res, false, 'server error', null, 500)
  }
})

server.listen(3000, () => {
  console.log('server start http://127.0.0.1:3000')
})