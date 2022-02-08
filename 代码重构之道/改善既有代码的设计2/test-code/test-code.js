const assert = require('assert')

class Province {
  constructor(doc) {
    this._name = doc.name            // 名称
    this._producers = []             // 生产商
    this._totalProduction = 0        // 总产量
    this._demand = doc.demand        // 需求量
    this._price = doc.price          // 采购价格
    doc.producers.forEach(item => this.addProducer(new Producer(this, item)))
  }

  addProducer(arg) {
    this._producers.push(arg)
    this._totalProduction += arg._production
  }

  get name() {return this._name}
  get producers() {return this._producers.slice()}
  get totalProduction() {return this._totalProduction}
  set totalProduction(arg) {this._totalProduction = arg}
  get demand() {return this._demand}
  set demand(arg) {this._demand = parseInt(arg)}
  get price() {return this._price}
  set price(arg) {this._price = parseInt(arg)}

  // 缺额
  get shortfall() {
    // 需求量 - 总产量
    return this.demand - this.totalProduction
  }

  // 利润
  get profit() {
    return this.demandValue - this.demandCost
  }
  get demandValue() {
    return this.satisfiedDemand * this.price
  }
  get satisfiedDemand() {
    return Math.min(this.demand, this.totalProduction)
  }
  get demandCost() {
    let remainingDemand = this.demand
    let result = 0
    this.producers.sort((a, b) => a.cost - b.cost)
      .forEach(p => {
        const contribution = Math.min(remainingDemand, p.production)
        remainingDemand -= contribution
        result += contribution * p.cost
      })
    return result
  }
}

function sampleProvinceData() {
  return {
    name: 'Asia',
    producers: [
      {name: 'Bytzantium', cost: 10, production: 9},
      {name: 'Att', cost: 12, production: 10},
      {name: 'Sinope', cost: 10, production: 6},
    ],
    demand: 30,
    price: 20
  }
}

class Producer {
  constructor(aProvince, data) {
    this._province = aProvince  // 省份
    this._cost = data.cost // 成本
    this._name = data.name // 名称
    this._production = data.production || 0 // 产量
  }

  get name() {return this._name}
  get cost() {return this._cost}
  set cost(arg) {this._cost = arg}
  get production() {return this._production}
  set production(amontStr) {
    const amount = parseInt(amontStr)
    const newProduction = Number.isNaN(amount) ? 0 : amount
    this._province._totalProduction += newProduction - this._production
    this._production = newProduction
  }
}

describe('province', function () {
  let asia
  beforeEach(function () {
    // 初始标准夹具
    asia = new Province(sampleProvinceData())
  })

  it('shortfall', function () {
    assert.equal(asia.shortfall, 5)
  })
  it('profit', function () {
    assert.equal(asia.profit, 230)
  })
  it('change production', function () {
    asia.producers[0].production = 20
    assert.equal(asia.shortfall, -6)
    assert.equal(asia.profit, 292)
  })
  
})
