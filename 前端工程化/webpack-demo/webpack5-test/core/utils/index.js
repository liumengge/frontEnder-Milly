/**
 * 统一路径分隔符 为了后续生成模块ID
 * 因为不同操作系统中文件分隔路径不同，这里将分隔符统一掉，后续会使用模块相对rootPath的路径作为，每一个文件的唯一ID
 * @param { * } path
 * @returns
 */

export function toUnixPath(path) {
  return path.replace(/\\/g, '/')
}

/**
 * webpack.config.js 配置中的resolve.extensions是针对引入依赖时，
 * 在没有书写文件后缀的情况下，webpack自动按照传入的规则为文件添加后缀
 * 
 * @param {*} modulePath 模块绝对路径
 * @param {*} extensions 扩展名数组
 * @param {*} originModulePath 原始引入模块路径
 * @param {*} moduleContext 模块上下文(当前模块所在目录)
 */
export function tryExtensions(
  modulePath,
  extensions,
  originModulePath,
  moduleContext
) {
  // 优先尝试不需要扩展名选项
  extensions.unshift('') // 防止用户如果已经传入了后缀时，优先尝试直接寻找，如果可以找到文件那么就直接返回。找不到的情况下才会依次尝试
  for (const extension of extensions) {
    if (fs.existsSync(modulePath + extension)) {
      return modulePath + extension
    }
  }

  // 未匹配对应文件
  throw new Error(
    `No module, Error: Can't resolve ${originModulePath} in  ${moduleContext}`
  )
}
