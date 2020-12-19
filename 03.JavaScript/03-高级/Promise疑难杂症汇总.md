1.
```javascript
Promise.resolve()
    .then(() => {
        return new Error('error!!!');
    })
    .then((res) => {
        console.log('then: ', res);
    })
    .catch((err) => {
        console.log('catch: ', err);
    })
```
---

2.
```javascript
const promise = new Promise((resolve, reject) => {
  resolve("success1");
  reject("error");
  resolve("success2");
});

promise
  .then(res => {
    console.log("then: ", res);
  })
  .catch(err => {
    console.log("catch: ", err);
  });
```
---

3.
```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
```
---

4.
```javascript
let p1 = new Promise(function(resolve, reject) {
  reject(42);
});
p1.catch(function(value) {
  console.log(value);
  return value + 1;
}).then(function(value) {
  console.log(value);
});
```
---

5.
```javascript
let p1 = new Promise(function(resolve, reject) {
  resolve(42);
});
let p2 = new Promise(function(resolve, reject) {
  reject(43);
});
p1.then(function(value) {
  console.log(value);
  return p2;
}).then(function(value) {
  console.log(value);
});
```
---

6.
```javascript
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(() => {
    console.log("promise1");
  });
});

Promise.resolve().then(() => {
  console.log("promise2");
  setTimeout(() => {
    console.log("timer2");
  });
});
```
---

7.
```javascript
Promise.resolve()
  .then(() => {
    Promise.resolve()
      .then(() => {
        console.log(1);
      })
      .then(() => {
        console.log(2);
      });
  })
  .then(() => {
    console.log(3);
  });
```
---

8.
```javascript
async function async1() {
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2 end");
}

async1();
console.log(10);
```
---

9.
```javascript
console.log("start");

async function async1() {
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2 end");
  // return Promise.reject(1);
}

async1();
setTimeout(function() {
  console.log("setTimeout");
});

new Promise(resolve => {
  console.log("Promise");
  resolve();
})
  .then(() => {
    console.log("promise1");
  })
  .then(() => {
    console.log("promise2");
  });

console.log("script end");
```
---

10.
```javascript
let a;
const b = new Promise((resolve, reject) => {
  console.log("promise1");
  resolve();
})
  .then(() => {
    console.log("promise2");
  })
  .then(() => {
    console.log("promise3");
  })
  .then(() => {
    console.log("promise4");
  });

a = new Promise(async (resolve, reject) => {
  console.log(a);
  await b;
  console.log(a);
  console.log("after1");
  await a;
  resolve(true);
  console.log("after2");
});

console.log("end");

```
---

11.
```javascript
function runAsync(x) {
  const p = new Promise(resolve =>
    setTimeout(() => resolve(x, console.log(x)), 1000)
  );
  return p;
}
function runReject(x) {
  const p = new Promise((res, rej) =>
    setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
  );
  return p;
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then(res => console.log(res))
  .catch(err => console.log(err));

```
---

12.
```javascript
function runAsync(x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000));
  return p;
}
Promise.race([runAsync(1), runAsync(2), runAsync(3)])
  .then(res => console.log("result: ", res))
  .catch(err => console.log(err));
```
