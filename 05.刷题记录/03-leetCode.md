- [简单](#简单)
  - [141. 环形链表](#141-环形链表)
- [中等](#中等)
  - [49.字母异位词分组](#49字母异位词分组)
  - [215. 数组中的第k个最大元素](#215-数组中的第k个最大元素)
## 简单
### [141. 环形链表](https://leetcode-cn.com/problems/linked-list-cycle/)

## 中等

### [49.字母异位词分组](https://leetcode-cn.com/problems/group-anagrams/)

```javascript
var groupAnagrams = function(arr) {
    let map = new Map()  // 创建哈希表

    for(let i = 0; i < arr.length; i++) {
        let str = arr[i].split('').sort().join()
        if(map.has(str)) {
            map.get(str).push(arr[i])
        } else {
            map.set(str, [arr[i]])
        }
    }
    
    return [...map.values()]
}
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
```
### [215. 数组中的第k个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

```javascript

```

