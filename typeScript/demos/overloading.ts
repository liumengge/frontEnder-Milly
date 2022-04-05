// 为同一个函数提供多个函数类型定义来进行函数重载，编译器会根据这个列表去处理函数的调用

let suits = ['hearts', 'spades', 'clubs', 'diamonds']

// 定义重载列表
function pickCard(x: { suit: string, card: number }[]): number
function pickCard(x: number): { suit: string, card: number }
function pickCard(x): any {
  if(typeof x === 'object') {
    let pickedCard = Math.floor(Math.random() * x.length)
    return pickedCard
  } else if(typeof x === 'number') {
    let pickedSuit = Math.floor(x/13)
    return { suit: suits[pickedSuit], card: x % 3 }
  }
}

let test = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }]

let pickedCard1 = test[pickCard(test)]

let pickedCard2 = pickCard(15)

// 为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。 
// 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。

// 注意，function pickCard(x): any并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用 pickCard会产生错误

