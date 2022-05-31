import lookup from "./lookup.js"
import renderTemplate from "./renderTemplate.js"

/**
 * 处理数组结构renderTemplate实现递归
 * @param {*} token  传入的包含#的一项数据 ['#','hobbies',[]]
 * @param {*} data 数据
 * 调用的次数用data的长度决定
 */
export default function parseArray (token, data) {
    // 获取这个数组中需要的数据 
   
    var v = lookup(data, token[1]) 
    // 结果字符串
    var str = ''
     // 遍历的是数据 而不是 tokens   data数组中有几条数据，就需要遍历多少次
    for(let i = 0; i < v.length; i++) {
        str += renderTemplate(token[2],{
            // 当数据是一个简单数组并不是对象数组的时候
            // 我们需要补一个‘.’属性，为当前v[i]数据本身
            ...v[i],
            '.': v[i]
        })
    }
    return str
}
