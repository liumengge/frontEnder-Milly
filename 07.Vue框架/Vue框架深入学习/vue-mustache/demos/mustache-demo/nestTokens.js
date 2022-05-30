export default function nestTokens(tokens) {
  // 组装好的结果数组
  const nestTokens = []
  // 栈 用来存储 #
  let section = []
  // 收集器 一开始指向结果数组 使用引用类型的方式
  // 收集器的指向会发生变化 当遇到#的时候 收集器会指向这个token下标为2的新数组
  var collector = nestTokens
  for (let i = 0; i < tokens.length; i++) {
      // 遍历每一项
      let token = tokens[i]
      // 判断数组第一个项是# 还是 / 还是文本类型
      switch (token[0]) {
          case "#":
              // 收集器中放入这个token
              collector.push(token)
              // 入栈
              section.push(token)
              // 改变收集器
              // 将#后面的token存入到当前栈的队尾(栈口)数组的下标为2的项,
              // 给token添加下标为2的项 并让收集器指向它
              collector = token[2] = []
              break
          case "/":
              // 出栈
              section.pop()
              // 改变收集器为栈结构队尾(栈顶)那项的下标为2的数组
              collector = section.length > 0 ? section[section.length - 1 ][2] : nestTokens
              break
          default:
              collector.push(token)
      }
      
  }
  console.log(nestTokens)
  return nestTokens
}

