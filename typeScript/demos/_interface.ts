// interface 接口
// 类型别名 与 接口 之前有什么区别？？？

interface Person {   // 接口：只能代表一个函数或者对象，不能直接代表一个基础类型，比如string
  name: string
  age?: number  // 可选属性，实际调用的时候可以不传，传的话会被检测类型，否则，不检查
  [propName: string]: any    // 可以有其他属性，属性名称为string类型，属性值为任意类型, 可选属性：对可能存在的属性进行预定义, 捕获引用不存在的属性时的错误
  say(): string
}

type Person1 = {
  name: string,
}

type Person2 = string   // 可以直接等于一个string

// 规范：能用接口表示就用接口，如果不能用接口表示的再用type类型别名来表示


const getPersonName = (person: Person) => {
  console.log(person.name)
}

const setPersonName = (person: Teacher, name: string) => {
  person.name = name
}

const person = {
  name: 'Milly',
  sex: 'female',
  say() {
    return 'hello'
  },
  teach() {
    return 'teach'
  }
}

// 
getPersonName(person)
// 以字面量的方式传参时会被强校验，未指定类型的属性传了就会报错
// getPersonName({
//   name: 'Milly'
// })
setPersonName(person, 'yiyi ')

// 类 可以应用接口
// 类中必须具备接口中的必备属性，否则就会报错
class User implements Person {
  name = 'milly'
  say() {
    return 'helo '
  }
}

// 接口之间继承
interface Teacher extends Person {
  teach(): string
}

// 函数接口
interface sayHi {
  (word: string): string
}

const say: sayHi = (word: string) => {
  return word
}