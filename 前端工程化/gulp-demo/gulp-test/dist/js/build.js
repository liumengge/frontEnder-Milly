/*
 * @Author: Milly
 * @Date: 2021-11-21 12:14:09
 * @LastEditTime: 2021-11-21 13:17:40
 */
;(function () {
  function add(num1, num2) {
    return num1 + num2;
  }
  console.log(add(10, 20));
})()
/*
 * @Author: Milly
 * @Date: 2021-11-21 12:14:09
 * @LastEditTime: 2021-11-21 13:17:44
 */
;(function () {
  var arr = [1, 2, 3].map(function (item, index) {
    return item**2;
  })
  console.log(arr);
})()