/**
 * 处理嵌套对象的获取最底层对象的数据
 * @param {*} obj  传入的对象 原始对象
 * @param {*} keyName  传入的字符串比如 person.name
 * @returns 返回获取嵌套对象里的数据
 */
 export default function lookup(obj, keyName) {
  // 对data数据中普通数组的处理
 if (keyName !='.'){
     // 使用数组的redcue方法进行遍历 
      return keyName.split('.').reduce((pre, next) => {
          return pre[next]
      }, obj)
 }
  return data[keyName]
}
