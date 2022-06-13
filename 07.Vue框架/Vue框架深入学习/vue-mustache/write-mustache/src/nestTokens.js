/**
 *  折叠tokens，将#和/之间的tokens整合，作为其下标为2的项
 */
export default function nestTokens(tokens) {
  let nestedTokens = []
  console.log(tokens)
  // 栈结构，存放小tokens，栈顶(靠近端口的，最新进入的)的tokens数组中当前操作的tokens数组
  let sections = []
  // 收集器, 引用 切断引用
  let collector = nestedTokens

  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]

    switch (token[0]) {
      case '#':
        collector.push(token)
        // 入栈
        sections.push(token)
        // 给token添加下标为2的项，并且让收集器指向它
        collector = token[2] = []
        break;
      case '/':
        // 出栈
        const section = sections.pop()
        // 改变收集器为栈尾（栈顶）那项的下标为2的数组
        collector = sections.length > 0 ? sections[sections.length-1][2] : nestedTokens
        break;
      default:
        collector.push(token)
    }
    
  }
  return nestedTokens
}