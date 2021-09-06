const koa = require('koa')
const Router = require('koa-router')
const { historyApiFallback } = require('koa2-connect-history-api-fallback')
const { createProxyMiddleware } = require('http-proxy-middleware')  // 将请求代理到其他服务器
const c2k = require('koa2-connect')
const fs = require('fs')

const app = new koa()

/**
 * 用Promise封装异步读取文件方法
 * @param  {string} page html文件名称
 * @return {promise}      
 */
function render( page ) {
  return new Promise(( resolve, reject ) => {
    let distUrl = `./dist/${page}`
    fs.readFile(distUrl, "binary", ( err, data ) => {
      if ( err ) {
        reject( err )
      } else {
        resolve( data )
      }
    })
  })
}

/**
 * 根据URL获取HTML内容
 * @param  {string} url koa2上下文的url，ctx.url
 * @return {string}     获取HTML文件内容
 */
async function route( url ) {
  let dist = '404.html'
  switch (url) {
    case '/': 
    case '/index':
      dist = 'index.html'
      break
    case '/todo':
      dist = 'todo.html'
      break
    case '/404':
      dist = '404.html'
      break
    default:
      break
  }
  let html = await render(dist)
  return html
}

app.use(historyApiFallback())   // 解决项目中SPA应用程序的history模式路由问题
app.use(require("koa-static")(__dirname + "/dist"))   // 将所有文件作为静态资源访问且指向入口 ./dist/index.html上 
app.use(async ctx => {
  let url = ctx.request.url
  let html = await route(url)
  ctx.body = html
})

const router = new Router()
var target = 'https://222.222.222.222:8080' // 要代理的目标地址，vue项目写 vue.config.js 里的 target 地址
//项目一共使用5种请求方式： get post put patch delete  /* 'head','connect','options','trace','patch' */
let method = ['get', 'post', 'put', 'patch','delete']
method.forEach(item => {
  router[item](
    '*',
    c2k(
      createProxyMiddleware({
        target,
        changeOrigin: true,
        ws: true
      })
    )
  )
})
app.use(router.routes())

app.listen(3000, () => {
  console.log('服务已启动，请访问：http://127.0.0.1:3000 或 localhost:3000')
})