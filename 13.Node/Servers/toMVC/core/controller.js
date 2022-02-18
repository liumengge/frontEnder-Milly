const baseFun = require('../util/baseFun')

class Controller {
  constructor(res, req) {
    this.res = res
    this.req = req
  }

  resApi(ret, message, dataInfo, httpStatus=200) {
    return baseFun.setResInfo(this.res, ret, message, dataInfo, httpStatus)
  }
}

module.exports = Controller