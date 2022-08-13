// 泛型：在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定具体类型的一种特性
(() => {
  // 需求：定义一个函数，传入两个参数，第一个参数是数据，第二个参数是数量
  //  函数的作用：根据数量产生对应个数的数据，存放在一个数组中
  function createArr(value: any, count: number): any[] {
    // 根据数据和数量产生一个数组
    const arr: any[] = []
    for (let i = 0; i < count; i++) {
      arr.push(value)
    }
    return arr
  }

  const arr1 = createArr(12, 10)
  const arr2 = createArr('abc', 10)
  console.log(arr1[0].toFixed(), arr2[0].split(''))  // 在 .toFixed 或 .split 的时候没有智能提示

  // 泛型：<T>
  function createArr2<T>(value: T, count: number): T[] {
    // 根据数据和数量产生一个数组
    const arr: T[] = []
    // const arr: Array<T> = []
    for (let i = 0; i < count; i++) {
      arr.push(value)
    }
    return arr
  }

  const arr3 = createArr2<number>(12, 10)
  const arr4 = createArr2<string>('abc', 10)
  console.log(arr3[0].toFixed(), arr4[0].split(''))

  // 多个泛型参数的函数
  function getArr<K, V>(value: K, value2: V): [K, V] {
    return [value, value2]
  }

  const arr5 = getArr<string, number>('abc', 123)
  console.log(arr5)
  console.log(arr5[0].split(''))
})()