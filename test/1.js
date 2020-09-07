// function combine(arr1, arr2) {  
//     let res = arr1.concat(arr2)
//     res.sort((a, b) => a-b)
//     return res
// }

// console.log(combine([1,2,3], [1,2,3,4]))


// function flatten(obj) {
//     let maxKey = Math.max(...Object.keys(obj).map(Number));
//     let res = Array(maxKey).fill(0);
//     for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             res[parseInt(key) - 1] = obj[key]
//         }
//     }
//     return res
// }

// console.log(flatten({ 1: 123, 2: 234, 8: 456 }));

let arr = [10,15,13,2,6,4,2,9]

function getMid(arr) {
  let len = arr.length;
  arr.sort((a, b) => a - b);
//   if (len % 2 !== 0) {  // 如果不能被整除，表示剩余的是奇数个，排序后取中间
//     return arr[(len - 1) / 2];
//   } else {
//     let a = arr[len / 2] + arr[len / 2 - 1]
//     return a / 2;
//   }
    return arr[(len - 1) / 2]
}

// function moveArr(arr, index) {  
//     var r = []
//     for (let i = 0; i < arr.length; i++) {
//         if (i === index) {
//         }else {
//             r.push(arr[i])
//         }
//     }
//     return r
// }

for (let i = 0; i < 8; i++) {
  let array = JSON.parse(JSON.stringify(arr));
  array.splice(i, 1)
  console.log(getMid(array));
}



// function getMid(arr) {
//   let len = arr.length;
//   arr.sort((a, b) => a - b);
//   if (len % 2 !== 0) {
//       console.log(1)
//     return arr[(len - 1) / 2];
//   } else {
//     return (arr[len / 2] + arr[len / 2 - 1]) / 2;
//   }
// }

// for (let i = 0; i < arr.length; i++) {
//     console.log(i)
//     console.log(arr);
//   let array = JSON.parse(JSON.stringify(arr))
//   console.log(array)
//   array = array.slice(i, 1);
//   console.log(getMid(array));
// }

// for (let i = 0; i < n; i++) {
//     let s = readline()
//     let prev = s.slice()
//     let curr = s.slice()
//     let count = 0
//     while(true) {
//         curr = prev.replace(/(\d)\1/, $1 => '')
//         if (curr !== prev) {
//             count++
//             prev = curr
//         }else {
//             break
//         }
//     }
//     console.log(count)
// }





