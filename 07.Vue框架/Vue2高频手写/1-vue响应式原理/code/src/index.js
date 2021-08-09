// Vue2.0中，本质是一个构造函数

import { initMixin } from "./init"

function Vue(options) {
    // console.log(options)
    this._init(options)  // 当用户new Vue的时候， 就调用init方法进行vue的初始化操作
}

initMixin(Vue)

export default Vue