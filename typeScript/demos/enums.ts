// TS 支持数字的和基于字符串的枚举

// 数字枚举

enum Dir {
  Up,
  Down,
  Left,
  Right
}

// 以上枚举未初始化，默认从上到下，从0开始逐一递增，Dir.Up = 0, Dir.Down = 1, ...

// 如果指定了初始化数据，则从指定的数字开始递增：Dir.Up = 1, Dir.Down = 2, ...

enum Dir1 {
  Up = 1,
  Down,
  Left,
  Right
}

// 使用
console.log(Dir.Down)  // 1

// 字符串枚举 - 运行时
// 注意： 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化
enum Dir2 {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right"
}

// 异构枚举： 枚举中混合了字符串和数字成员，一般不用

// 反向映射
// 通常使用的是正向映射，即通过枚举的name找到对应value
let up = Dir.Up
console.log(Dir[up]) // Up

// const枚举

// 外部枚举: 描述已经存在的枚举类型的形状
declare enum Dir4 {
  A = 1,
  B,
  C = 2
}






