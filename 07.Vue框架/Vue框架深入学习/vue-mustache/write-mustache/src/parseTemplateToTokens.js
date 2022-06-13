import Scanner from './Scanner.js'
import nestTokens from './nestTokens.js'

/**
 * 将模板字符传转换为tokens
 */
export default function parseTemplateToTokens(templateStr) {
  const tokens = []
  // 创建扫描器
  const scanner = new Scanner(templateStr)
  let words

  while(!scanner.eos()) {
    words = scanner.scanUntil('{{')
    if (words !== '') tokens.push(['text', words])
    scanner.scan('{{')

    // 收集 {{ 和 }} 之前的内容
    words = scanner.scanUntil('}}')
    if (!words) {
      if (words[0] === '#') {
        tokens.push(['#', words.substring(1)])
      } else if (words[0] === '/') {
        tokens.push(['/', words.substring(1)])
      } else {
        tokens.push(['name', words])
      }
    }
    scanner.scan('}}')
  }

  // 返回折叠的tokens
  return nestTokens(tokens)
}