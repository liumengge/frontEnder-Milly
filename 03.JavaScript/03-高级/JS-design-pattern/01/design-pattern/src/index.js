class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  getName() {
    return this.name
  }
}

class Student extends Person {
  constructor(name, age, number) {
    super(name, age)
    this.number = number
  }

  study() {
    return this.number
  }
}

const p = new Person('milly')
console.log(p.getName())
