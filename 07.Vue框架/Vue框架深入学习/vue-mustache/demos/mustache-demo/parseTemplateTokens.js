import Scanner from './Scanner.js'
import nestTokens from './nestTokens.js'

export default function parseTemplateTokens(templateStr) {
  // 实例化一个扫描器 构造时提供一个参数 专门为模板字符串服务的 
  // 处理模板字符串 为生成tokens服务
  const scanner = new Scanner(templateStr)
  // 将token存储到数组中 形成tokens
  let tokens = []
  // 收集路过的文字内容
  let words
  while (!scanner.eos()) {
    // 收集路过的文字内容
    words = scanner.scanUtil('{{')
    if (words != '') {
        // 标志位 不能去掉类名的空格
        let isClass = false
        // 去除空格
        // 拼接
        var _words = ''
        for (let i = 0; i < words.length; i++) {
            // 判断是否在标签里面
            if (words[i] == '<') {
                isClass = true
            } else if (words[i] == '>') {
                isClass = false
            }
            // 当前项不是空格 拼接上
            if (!/\s/.test(words[i])) {
                _words += words[i] 
            } else {
                // 是空格 只有在标签内才拼接上
                if(isClass) {
                    _words += ' ' 
                }
            }
        }
        tokens.push(["text",_words])
    }
      // 跳过指定的内容
    scanner.scan('{{')
    words = scanner.scanUtil('}}')
    if (words != '') {
      if (words[0] === '#') {
        tokens.push(["#", words.substring(1)])
      } else if (words[0] === '/') {
        tokens.push(["/", words.substring(1)])
      } else {
        tokens.push(["name", words])
      } 
    }
    scanner.scan('}}')
  }
  return nestTokens(tokens)
}
