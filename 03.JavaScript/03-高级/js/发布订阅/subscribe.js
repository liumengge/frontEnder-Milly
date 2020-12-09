(function () {  
  /**
   * 真实项目中的封装，包括类库，插件，组件的封装，基本上都是基于面向对象的思想
   * 优点：
   *    1. 创建类和类的实例，每一个实例之间是相互独立的，有自己的私有属性方法，还能拥有公共的属性方法
   *    2. 只要保证方法中this是实例，这样各个方法中就可以实现信息的通信
   * */ 
  // function subDecrator(target) {  
  //   // Sub => target
  //   // 通过装饰器在Sub原型上添加属性
  //   target.prototype.aaa = 10;
  // }

  // @subDecrator;
  // class Sub {
  //   constructor() {
  //     // 私有属性
  //     this.xxx = 'xxx';
  //   }

  //   // Sub.prototype: 只能设置方法，不能像ES5一样在原型上设置公共属性
  //   // 可以使用装饰器在原型上添加属性
  //   A() {

  //   }

  //   // 静态属性方法
  //   static xx = 10;
  //   static B() {

  //   }

  // }


  const hasOwn = Object.prototype.hasOwnProperty;   // obj.hasOwnProperty('xxx')  <=> hasOwn.call(obj, 'xxx')

  class  Sub {
    // constructor() {
    //   this.$pond = {};
    // }

    // 创建一个事件池
    $pond = {};   // ES7中的写法，与ES6的constructor写法效果一致

    // 向事件池中追加方法
    $on(type, func) {
      // 每一次增加方法的时候，首先验证是否存在这个自定义事件，存在则把方法push到这个自定义方法的数组中(注意：去重)
      // 如果不存在，创建一个自定义事件，属性值是一个空数组，然后将这个方法添加到这个数组中
      // 用的是同一个堆地址， 会影响this.$pond，数组的操作也一样
      let $pond = this.$pond,  
            arr = null;
      !hasOwn.call($pond, type) ? $pond[type] = [] : null;

      arr = $pond[type];
      !arr.includes(func) ? arr.push(func) : null; 

    }

    // 从事件池中移除方法
    $off(type, func) {
      let $pond = this.$pond,  
            arr = $pond[type];
      if (!arr) return;    // 如果根据类型获取到的arr是undefined，什么都不做

      for (let i = 0; i < arr.length; i++) {
        if (func === arr[i]) {
          // arr.splice(i, 1);   // 会造成数组塌陷
          arr[i] = null;   // 想要删除的方法，再第一次$emit的时候设置为null，第二次$emit的时候真正删除即可
          break;  // 后面不需要比较了，因为在增加的时候已经去重了，找到就直接删除即可
        }
      }
    }

    // 通知事件池中的方法执行
    $emit(type, ...params) {
      let $pond = this.$pond,  
            arr = $pond[type];
      if (!arr) return;

      for (let i = 0; i < arr.length; i++) {
        let itemFunc = arr[i];
        if (typeof itemFunc !== 'function') {
          // 把非函数项真正移除掉
          arr.splice(i,1);
          i--;
          continue;  // 不执行，继续下一次循环
        }
        itemFunc(...params); 
      }
    }
  
  }

  // let sub = new Sub;
  // sub.$on();
  // sub.$emit('A', 10, 20);

  // 通过window暴露给全局用的API
  // 方式1：
  window.subscribe = function subscribe() {  
    return new Sub;   // 返回一个实例，使用的时候:  .$on()等来使用即可
  }

  // 方式2：全局下直接使用$on, $off, $emit方法
  // let sub = new Sub;
  // ['$on', '$off','$emit'].forEach(item => {
  //   window[item] = function anonymous(...params) {  
  //     sub[item](...params);
  //   }
  // });


})();