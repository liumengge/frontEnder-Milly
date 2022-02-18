const http = require('http')
const URL = require('url').URL
const querystring = require('querystring')
const rq = require('request-promise')
  
const baseMongo = require('./baseMongodb')()

// 创建服务
const server = http.createServer(async (req, res) => {
  const myUrl = new URL(req.url, `http://${req.headers.host}`)
  console.log(myUrl, 'myUrl')
  const pathname = myUrl.pathname

  if('/v1/contents' !== pathname) {
    return setResInfo(res, false, 'path not found', null, 404)
  }

  let contents = await queryData({}, {limit: 10})
  contents = await filterUserinfo(contents)
  return setResInfo(res, true, 'success', contents)
})

// 启动服务
server.listen(4000, () => {
  console.log('server start http://127.0.0.1:4000')
})

async function filterUserinfo(contents) {
  const userIds = []
  contents.forEach(content => {
    if(content['user_id']){
      userIds.push(content['user_id'])
    }
  })
  if(userIds.length < 1){
    return addUserinfo(contents)
  }
  const userinfos = await callApi('http://127.0.0.1:5000/v1/userinfos', {user_ids: userIds.join(',')})
  if(!userinfos || userinfos.length < 1) {
    return addUserinfo(contents)
  }

  const mapUserinfo = {}
  userinfos.forEach(item => {
    if(userIds.includes(item.id)){
      mapUserinfo[item.id] = item
    }
  })

  return addUserinfo(contents, mapUserinfo)
}

async function callApi(api, params={}, method='get') {
  const paramsStr = querystring.stringify(params)
  if(api.indexOf('?') === -1) {
    api = `${api}?`
  } 
  api = `${api}${paramsStr}`
  let retStr = await rq(api)
  try {
    retInfo = JSON.parse(retStr)
  } catch (error) {
    return false
  }
  if(retInfo['ret'] !== 0 || !retInfo['data']) {
    return false
  }
  return retInfo['data']
}

function addUserinfo(contents, mapUserinfo={}) {
  contents = contents.map(content => {
    content['user_info'] = mapUserinfo[content['user_id']] ? mapUserinfo[content['user_id']] : {}
    return content
  })
  return contents
}

async function queryData(queryOption) {
  const client = await baseMongo.getClient()
  const collection = client.db("nodejs_cloumn").collection("content")
  const queryArr = await collection.find(queryOption).toArray()
  
  return queryArr
}

function setResInfo(res, ret, message, dataInfo, httpStatus=200) {
  let retInfo = {}
  if(!ret) {
    retInfo = {
      'ret' : -1,
      'message' : message ? message : 'error',
      'data' : {}
    }
  } else {
    retInfo = {
      'ret' : 0,
      'message' : message ? message : 'success',
      'data' : dataInfo ? dataInfo : {}
    }
  }
  res.writeHead(httpStatus, { 'Content-Type': 'text/plain' })
  res.write(JSON.stringify(retInfo))
  res.end()
  return
}