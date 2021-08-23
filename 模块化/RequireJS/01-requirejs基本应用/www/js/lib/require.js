var require
var define

(function () {
  var executedModule = {}    // key 为已执行的模块名称，value为执行后的值
  var handlers = []          // 待依赖完成而执行的模块
  var depsToName = {}       // 路径和名称对应表，key为路径，value为模块名

  function checkIsAllLoaded(handle) {
    if (!handle.deps.length) return true   // 没有依赖

    return handle.deps.every(dep => {
      const moduleName = depsToName[dep]
      return !!executedModule[moduleName] === true
    })
  }

  function getArgsFromDepend(handle) {
    const args = []
    handle.deps.forEach(re => {
      const moduleName = depsToName[re]
      if (executedModule[moduleName]) {
        args.push(executedModule[moduleName])
      }
    })
    return args
  }


  function runHandles() {
    handlers.forEach((handle, index) => {
      const isDependLoaded = checkIsAllLoaded(handle)
      if (isDependLoaded) {
        const arg = getArgsFromDepend(handle)
        var result = handle.fn(...arg)

        executedModule[handle.name] = result
        handlers.splice(index, 1)

        runHandles()
      }
    })
  }


  require = (deps, cb) => {
    if (typeof deps === 'function' && cb === undefined) {
      cb = deps;
      url = []
    }

    if (!Array.isArray(deps)) {
      throw 'first argument is not array'
    }

    if (typeof cb !== 'function') {
      throw 'second argument must be a function'
    }

    handlers.push({
      name: 'main',
      deps: deps,
      fn: cb
    })

    loadRequireModule(deps)
  }


  function addNameToModule(urlName) {
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i].isLoading) {
        if (!handlers[i].name) {                 // 如果没有定义define名字
          handlers[i].name = urlName
        }
        depsToName[urlName] = handlers[i].name    // 将depUrl与moduleName关联起来
        handlers[i].isLoading = false
        break
      }
    }
    
  }
  
  function loadRequireModule(deps) {
    for (let i = 0; i < deps.length; i++) {
      const url = deps[i]
      
      let script = document.createElement('script')
      script.src = 'scripts/' + url + '.js'
      script.setAttribute('data-name', url)
      document.body.appendChild(script)

      script.onload = (data) => {
        const moduleName = data.target.getAttribute('data-name')

        addNameToModule(moduleName)              // 添加名字

        runHandles()                             // 执行回调
        
      }
    }
  }

  define = (name, deps, cb) => {
    
    if (typeof name === 'function') {
      cb = name
      deps = []
      name = null
    }

    if (Array.isArray(name) && typeof deps === 'function') {
      cb = deps
      deps = name
      name = null
    }

    if (typeof name === 'string' && typeof deps === 'function') {
      cb = deps
      deps = []
    }

    handlers.push({
      name: name,
      deps: deps,
      fn: cb,
      isLoading: true  // 这个字符标识的是当前正在加载的路径，用于为其添加名字时的定位
    })
    
    loadRequireModule(deps)
  }

  

  function startMain() {
    const scripts = document.querySelectorAll('script');
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i]
      const attr = script.getAttribute("data-main");
      if (attr) {
        const mainScript = document.createElement('script')
        mainScript.src = attr + '.js'
        window.onload = () => {
          document.body.appendChild(mainScript)
        }
      }
    }
  }

  startMain()
})()

