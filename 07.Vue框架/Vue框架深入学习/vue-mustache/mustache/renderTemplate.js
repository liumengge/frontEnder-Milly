/*
    将tokens和数据进行合并，生成DOM字符串
*/ 
import lookup from "./lookup.js"

export default function renderTemplate (tokens, data) {
    console.log(tokens)
    console.log(data)
    // 结果字符串
    let str = ''
    for(let i = 0; i < tokens.length; i++) {
        let token = tokens[i]
        // 判断第一项是text 还是 name 和 #
        if(token[0] == "text") {
            // 直接将数据拼接到结果字符串中
            str +=  token[1]
        } else if (token[0] == "name") {
            // 从data中寻找数据 拼接到结果字符串中
            str += lookup(data, token[1])
        } else if (token[0] == "#") {
            // 循环递归遍历 
        }
    }
    console.log(str)
    return str
}
