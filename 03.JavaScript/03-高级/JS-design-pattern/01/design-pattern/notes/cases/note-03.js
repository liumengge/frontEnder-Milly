// let checkType = function(str, type) {
//   switch (type) {
//     case 'email':
//       return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
//     case 'mobile':
//       return /^1[3|4|5|7|8][0-9]{9}$/.test(str)
//     case 'tel':
//       return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str)
//     default:
//       return true
//   }
// }

// console.log(checkType('165226226326','mobile'))  // false

let checkType = (function() {
  let rules = {
    email(str) {
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
    },
    mobile(str) {
      return /^1[3|4|5|7|8][0-9]{9}$/.test(str)
    }
  }

  //暴露接口
  return {
    //校验
    check(str, type) {
      return rules[type] ? rules[type](str) : false
    },
    //添加规则
    addRule(type, fn) {
      rules[type] = fn
    }
  }
})()

//调用方式
//使用mobile校验规则
console.log(checkType.check('188170239', 'mobile'))
//添加金额校验规则
checkType.addRule('money', function (str) {
  return /^[0-9]+(.[0-9]{2})?$/.test(str)
})
//使用金额校验规则
console.log(checkType.check('18.36', 'money'))