## 【源码阅读-02】axios

> 准备：获取源码便于debug

## lib库

### utils 工具函数

首先，来整体看下utils.js中提供的22个工具函数：
```javascript
module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};
```
下面逐一看下是如何实现的，在后续开发或者项目重构时获取能用的上。

1. `isArray`: 判断一个数据是不是数组
  ```javascript
  function isArray(val) {
    return Array.isArray(val);
  }
  ```
2. `isUndefined`: 判断一个数据是不是undefined
  ```javascript
   function isUndefined(val) {
      return typeof val === 'undefined';
    }
  ```
3. `isBuffer`: 判断一个数据是不是Buffer类型的
  ```javascript
  function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
      && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
  }
  ```
  什么是Buffer？
4. `isArrayBuffer`: 判断数据是否为ArrayBuffer
  ```javascript
  var toString = Object.prototype.toString;
  function isArrayBuffer(val) {
    return toString.call(val) === '[object ArrayBuffer]';
  }
  ```
  关于 toString 检测对象类型的问题可以参看[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString)。
5. `isFormData`: 判断val是否为Formata
  ```javascript
  function isFormData(val) {
    return toString.call(val) === '[object FormData]';
  }
  ```
6. `isArrayBufferView`: ?什么作用？
  ```javascript
   function isArrayBufferView(val) {
    var result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
      result = ArrayBuffer.isView(val);
    } else {
      result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
    }
    return result;
  }
  ```
7. `isString`: 判断val是否为string类型
  ```javascript
  function isString(val) {
    return typeof val === 'string';
  }
  ```
8. `isNumber`: 判断val是否为number类型
  ```javascript
  function isNumber(val) {
    return typeof val === 'number';
  }
  ```
9. `isObject`: 判断val是否为object类型
  ```javascript
  function isObject(val) {
    return val !== null && typeof val === 'object';
  }
  ```
10. `isPlainObject`: 判断val是否为Object类型
  ```javascript
  function isPlainObject(val) {
    if (toString.call(val) !== '[object Object]') {
      return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
  }
  ```
11. `isDate`: 判断val是否为Date类型
  ```javascript
  function isDate(val) {
    return toString.call(val) === '[object Date]';
  }
  ```
12. 文件相关：
  ```javascript
  function isFile(val) {
    return toString.call(val) === '[object File]';
  }

  function isBlob(val) {
    return toString.call(val) === '[object Blob]';
  }
  ```
13. `isFunction`: 判断val是否为function
  ```javascript
  function isFunction(val) {
    return toString.call(val) === '[object Function]';
  }
  ```
14. `isStream`: 判断val是否为stream流
  ```javascript
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }
  ```
15. `isURLSearchParams`: 判断是否为url查询参数
  ```javascript
  function isURLSearchParams(val) {
    return toString.call(val) === '[object URLSearchParams]';
  }
  ```
16. `trim`: 去除首尾空格，使用正则兼容trim方法不存在的情况
  ```javascript
  function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
  }
  ```
17. `isStandardBrowserEnv`: 判断是否在标准浏览器环境
  ```javascript
  function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
      navigator.product === 'NativeScript' ||
      navigator.product === 'NS')) {
      return false;
    }
    return (
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    );
  }
  ```
18. `forEach`: 封装了一个可以遍历Object和Array的方法
  ```javascript
  function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }
  ```
19. `merge`: 合并对象属性
  ```javascript
  function merge(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
      if (isPlainObject(result[key]) && isPlainObject(val)) {
        result[key] = merge(result[key], val);
      } else if (isPlainObject(val)) {
        result[key] = merge({}, val);
      } else if (isArray(val)) {
        result[key] = val.slice();
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }
  ```
20. `extend`:
  ```javascript
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }
  ```
21. `stripBOM`: 删除UTF-8编码中的BOM，什么意思？暂时还不太懂？？？
  ```javascript
  function stripBOM(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  }
  ```

### 


