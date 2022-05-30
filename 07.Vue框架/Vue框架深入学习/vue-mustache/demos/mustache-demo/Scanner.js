export default class Scanner {
  constructor(templateStr) {
      this.templateStr = templateStr
      // 指针
      this.pos = 0
      // 尾部 一开始就是模板字符串的原长度
      this.tail = templateStr
  }
  // 跳过指定的内容 没有返回值
  scan(jump) {
      // 字符串的indexOf 返回0 说明第一个就是指定的内容
      if (this.tail.indexOf(jump) == 0) {
          // 改变指针 直接跳过指定的内容
          this.pos += jump.length
          // 更新尾部
          this.tail = this.templateStr.substring(this.pos)
      }
  }
  // 让指针进行扫描模板字符串，直到遇到指定的内容结束，并且能够返回指定内容之前的文字
  scanUtil(stopTag) {
      // 记录执行本方法的指针pos的位置
      const pos_pack = this.pos
      // 当尾巴开头不是指定的内容的时候 说明扫描器还没有找内容 
      // 当找不到的时候 必须要设置指针长度小于模板字符串的长度，否则会一直找不到会陷入死循环
      while (!this.eos() && this.tail.indexOf(stopTag) !== 0 ) {
          // 没有找指定的内容则让指针往下移动
          this.pos++
          // 尾巴跟着指针发生变化
          this.tail = this.templateStr.substring(this.pos)
      }
      // 如果找到 返回前面的文字
      return this.templateStr.substring(pos_pack, this.pos)
  }
  // 指针是否已经到头
  eos () {
      return this.pos >= this.templateStr.length
  }
}
