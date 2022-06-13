import parseTemplateToTokens from './parseTemplateToTokens'

window.Milly_Template = {
  render(templateStr, data) {
    console.log(templateStr)
    // // 命令Scanner工作
    // const scanner = new Scanner(templateStr)
    // // const words = scanner.scanUntil('{{')
    // // console.log(words)
    // // console.log(scanner.pos)

    // // 交替执行
    // while(!scanner.eos()) { // 指针没有走到头
    //   scanner.scanUntil('{{')
    //   scanner.scan('{{')
    //   scanner.scanUntil('}}')
    //   scanner.scan('}}')
    // }

    const tokens = parseTemplateToTokens(templateStr)
    console.log(tokens)
  }
}