function printOwing(invoice) {
  printBanner()
  const outstanding = calculateOutstanding()

  // print details
  console.log(`name: ${ invoice }`)
  console.log(`amount: ${ outstanding }`)
}

// 如何提炼函数？ 阅读代码，理解代码的作用，抽离成完成某个功能的独立函数
// 提炼函数后函数如何命名?  以这段代码的用途命名，即以它“做什么”命名，而不是以“怎么做”给函数命名

// 什么时候需要将代码放在独立的函数中？ 
  // 函数的长度：函数应该能在一屏中展示
  // 复用的角度：被用过不止一次的代码需要抽离，只用过一次的代码保持内联状态
  // 将意图与实现分开：
    // 如果需要花费一段时间浏览代码才能搞清楚其作用，那就需要将其放在单独的函数中，并以该代码做的事情为其命名

function printOwing(invoice) {
  printBanner()
  const outstanding = calculateOutstanding()
  printDetails(outstanding)

  // print details
  function printDetails(outstanding) {
    console.log(`name: ${ invoice }`)
    console.log(`amount: ${ outstanding }`)
  }
  console.log(`name: ${ invoice }`)
  console.log(`amount: ${ outstanding }`)
}

// 提炼函数 - 无局部变量

function printOwing(invoice) {
  let outstanding = 0

  // print banner
  console.log('******************')
  console.log('****Customer Owes*****')
  console.log('******************')

  // calculate outstanding
  for(const o of invoice.orders) {
    outstanding += o.amount
  }

  // record due date
  const today = Clock.today
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)

  // print details
  console.log(`name: ${ invoice.customer }`)
  console.log(`amount: ${ outstanding }`)
  console.log(`due: ${ invoice.dueDate.toLocalDateString }`)
}

// 重构后
function printOwing(invoice) {
  let outstanding = 0

  // print banner
  printBanner()

  // calculate outstanding
  for(const o of invoice.orders) {
    outstanding += o.amount
  }

  // record due date
  const today = Clock.today
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)

  // print details
  printDetails()

  function printDetails() {
    console.log(`name: ${ invoice.customer }`)
    console.log(`amount: ${ outstanding }`)
    console.log(`due: ${ invoice.dueDate.toLocalDateString }`)
  }
}

function printBanner() {
  console.log('******************')
  console.log('****Customer Owes*****')
  console.log('******************')
}

// 提炼函数 - 有局部变量 - 被提炼代码段只是读取这些变量的值，并不修改他们：此时，可以将其当作参数传递给目标变量

// 提炼函数时需要特别注意"只存在于源函数作用域的变量"，包含源函数的参数以及源函数内部定义的临时变量

// 所以，上述函数print details功能可以提炼出如下函数
function printOwing(invoice) {
  let outstanding = 0

  // print banner
  printBanner()

  // calculate outstanding
  for(const o of invoice.orders) {
    outstanding += o.amount
  }

  // record due date
  recordDueDate(invoice)

  // print details
  printDetails(invoice, outstanding)
}

// 没有局部变量
function printBanner() {
  console.log('******************')
  console.log('****Customer Owes*****')
  console.log('******************')
}

// 有局部变量，只访问，未修改
function printDetails(invoice, outstanding) {
  console.log(`name: ${ invoice.customer }`)
  console.log(`amount: ${ outstanding }`)
  console.log(`due: ${ invoice.dueDate.toLocalDateString }`)
}

// 有局部变量，局部变量是一个数据结构(数组、对象)，被提炼函数修改了该结构中的数据
function recordDueDate(invoice) {
  const today = Clock.today
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30)
}

// 提炼函数 - 有局部变量 - 对局部变量再赋值
// 1. 源函数的参数被赋值：使用 拆分变量 方法，将其变成临时变量
// 2. 被提炼函数对临时再赋值：
  // 2.1 被赋值的临时变量只在被提炼代码中使用：将这个临时变量的声明移动到被提炼代码中一起提炼出去；
    // 若临时变量的初始化和使用离得有点远，可以使用 移动语句 方法把针对这个变量的操作放到一起
  // 2.2 被提炼代码之外的代码也使用了这个临时变量：需要返回修改的值

function printOwing(invoice) {
  
  // print banner
  printBanner()

  // calculate outstanding
  const outstanding = calculateOutstanding(invoice)  
  // 使用const，表示不会再被赋值，且阅读该代码的人也不会有心理负担，看到const就知道这个变量不会再变化

  // record due date
  recordDueDate(invoice)

  // print details
  printDetails(invoice, outstanding)
}

function calculateOutstanding(invoice) {
  // 将最终返回的变量命名为result，方便快速识别
  let result = 0
  for(const o of invoice.orders) {
    result += o.amount
  }
  // 修改后返回，因为在后面的printDetails函数中使用到了这个变量
  return result
}












