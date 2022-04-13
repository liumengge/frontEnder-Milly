/**
 * 统一路径分隔符 为了后续生成模块ID
 * 因为不同操作系统中文件分隔路径不同，这里将分隔符统一掉，后续会使用模块相对rootPath的路径作为，每一个文件的唯一ID
 * @param { * } path
 * @returns
 */

export function toUnixPath(path) {
  return path.replace(/\\/g, '/')
}
