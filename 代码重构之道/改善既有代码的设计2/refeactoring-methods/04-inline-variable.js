// 内联变量

let basePrice = anOrder.basePrice
return (basePrice > 1000)

// 重构为

// return anOrder.basePrice > 1000