/**
 * 扫描器
 */

export default class Scanner {
  constructor(templateStr) {
    this.templateStr = templateStr
    // 指针
    this.pos = 0
    // 尾部字符串，最开始就是模板字符串，包含指针指向的这一位
    this.tail = templateStr
  }

  // 跳过指定内容，没有返回值
  scan(tag) {
    if (this.tail.indexOf(tag) === 0) {
      // tag 有多长，比如 {{ 长度为2， pos就后移多少位
      this.pos += tag.length
      this.tail = this.templateStr.substring(this.pos)
    }
  }

  // 扫描字符串：收集除去 {{ }} 之外的字符串
  // 1. {{ 之前的字符串内容
  // 2. 跳过 {{，收集 {{ 和 }} 之间的字符串
  // 3. 收集 }} 到结尾的字符串
  scanUntil(stopTag) {
    // 备份开始位置
    const pos_backup = this.pos
    // 当尾巴的开头不是 stopTag 的时候，说明还没有扫描到 stopTag
    while(!this.eos() && this.tail.indexOf(stopTag) !== 0) {
      this.pos++
      // 修改 尾巴 为当前指针及之后的内容
      this.tail = this.templateStr.substring(this.pos)
    }

    return this.templateStr.substring(pos_backup, this.pos)
  }

  // 源码中的eos(end of string)方法，返回一个boolean值，表示指针pos是否走到头了
  eos() {
    return this.pos >= this.templateStr.length
  }
}