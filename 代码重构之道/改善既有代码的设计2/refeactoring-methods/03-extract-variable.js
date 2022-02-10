// 提炼变量

class Order {
  constructor(aRecord) {
    this._data = aRecord
  }

  get quantity() {return this._data.quantity}
  get itemPrice() {return this._data.itemPrice}
  get price() {
    return this.quantity * this.itemPrice -
      Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
      Math.min(this.quantity * this.itemPrice * 0.1, 100)
  }
}


// 提炼变量：在类中，提炼出来的变量可以适用于整个类，而不仅仅是“计算价格上下文”，所以可以提炼为方法

class Order {
  constructor(aRecord) {
    this._data = aRecord
  }

  get quantity() {return this._data.quantity}
  get itemPrice() {return this._data.itemPrice}
  get price() {
    return this.basePrice - this.quantityDiscount + this.shipping
      
  }

  get basePrice() {return this.quantity * this.itemPrice}
  get quantityDiscount() {return Math.max(0, this.quantity - 500) * this.itemPrice * 0.05}
  get shipping() {return Math.min(this.quantity * this.itemPrice * 0.1, 100)}
}



