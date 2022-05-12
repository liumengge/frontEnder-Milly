// 停车场
class Park {
  constructor(floors) {
    this.floors = floors || []
    // 初始化摄像头
    this.camera = new Camera()
    // 出口显示器
    this.screen = new Screen()
    // 存储摄像头返回的车辆信息
    this.carList = {} // 命名可优化？
  }
  in(car) {
    // 通过摄像头获取信息
    const info = this.camera.shot(car)
    // 停到某个停车位
    const i = parseInt(Math.random() * 100 % 100)
    const place = this.floors[0].places[i]
    // 驶入停车位
    place.in()
    info.place = place
    // 记录信息
    this.carList[car.num] = info
  }
  out(car) {
    // 获取信息
    const { num, inTime, place } = this.carList[car.num]
    // 将停车位清空
    place.out()
    // 显示屏显示车牌号和停车时长
    this.screen.show(car, inTime)
    // 清空记录
    delete this.carList[num]
  }
  emptyNum() {
    return this.floors.map(floor => {
      return `${floor.index}层，还有${floor.emptyPlaceNum()}个空余车位`
    }).join('\n')
  }

}

// 摄像头
class Camera {
  shot(car) {
    return {
      num: car.num,
      inTime: Date.now()
    }
  }
}

// 停车场出口显示器
class Screen {
  show (car, inTime) {
    console.log('车牌号：', car.num)
    console.log('停车时长：', Date.now() - inTime)
  }
}

// 车辆
class Car {
  constructor(num) {
    this.num = num
  }
}

// 层
class Floor {
  constructor(index, places) {
    this.index = index  // 表示第几层
    this.places = places || [] // 这一层的空车位
  }
  emptyPlaceNum() {
    let num = 0
    this.places.forEach(place => {
      if (place.empty) {
        num++
      }
    })

    return num
  }
}

// 车位
class Place {
  constructor() {
    this.empty = true // 空车位
  }
  in() {
    this.empty = false
  }
  out() {
    this.empty = true
  }
}


// 测试
// 初始化停车场
const floors = []
for (let i = 0; i < 3; i++) {
  const places = []
  for (let j = 0; j < 100; j++) {
    places[j] = new Place()
  }
  floors[i] = new Floor(i+1, places)
}

const park = new Park(floors)

// 初始化车辆
const car1 = new Car(100)
const car2 = new Car(200)
const car3 = new Car(300)

// 测试第一辆车进入
console.log('第一辆车进入')
console.log('当前空余车位数：', park.emptyNum())
park.in(car1)
console.log('第二辆车进入')
console.log('当前空余车位数：', park.emptyNum())
park.in(car2)
console.log('第一辆车离开')
park.out(car1)
console.log('第二辆车离开')
park.out(car2)

console.log('第三辆车进入')
console.log('当前空余车位数：', park.emptyNum())
park.in(car3)
console.log('第三辆车离开')
park.out(car3)

