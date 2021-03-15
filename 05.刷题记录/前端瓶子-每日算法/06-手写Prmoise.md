```javascript
class MyPromise {
    constructor(executor) {
        this.status = 'pending';
        this.value = undefined;
        this.resolvedArr = [];
        this.rejectedArr = [];

        let change = (status, result) => {
            if (this.status !== 'pending') return;
            this.status = status;
            this.value = result;
            let arr = status === 'rejected' ? this.rejectedArr : this.resolvedArr;
            arr.forEach(item => (typeof item === 'function' ? item(this.value) : null));
        };
        let resolve = result => {
            if (this.resolvedArr.length > 0) {
                change('resolved', result);
                return;
            }
            let delayTimer = setTimeout(() => {
                clearTimeout(delayTimer);
                change('resolved', result);
            }, 0);
        };
        let reject = reason => {
            if (this.rejectedArr.length > 0) {
                change('rejected', reason);
                return;
            }
            let delayTimer = setTimeout(() => {
                clearTimeout(delayTimer);
                change('rejected', reason);
            }, 0);
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(resolvedFn, rejectedFn) {
        if (typeof resolvedFn !== 'function') {
            resolvedFn = result => {
                return result;
            };
        }
        if (typeof rejectedFn !== 'function') {
            rejectedFn = reason => {
                return new MyPromise((resolve, reject) => {
                    reject(reason);
                });
            };
        }

        return new MyPromise((resolve, reject) => {
            this.resolvedArr.push(() => {
                try {
                    let x = resolvedFn(this.value);
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch (error) {
                    reject(error);
                }
            });
            this.rejectedArr.push(() => {
                try {
                    let x = rejectedFn(this.value);
                    x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    catch (rejectedFn) {
        // catch(rejectedFn) === then(null,rejectedFn)
        return this.then(null, rejectedFn);
    }

    /* 静态方法 */
    static resolve(result) {
        return new MyPromise(resolve => {
            resolve(result);
        });
    }

    static reject(reason) {
        return new MyPromise((_, reject) => {
            reject(reason);
        });
    }

    static all(arr) {
        return new MyPromise((resolve, reject) => {
            let index = 0,
                results = [];
            for (let i = 0; i < arr.length; i++) {
                let item = arr[i];
                if (!(item instanceof MyPromise)) continue;
                item.then(result => {
                    index++;
                    results[i] = result;   // 顺序保持一致
                    if (index === arr.length) {
                        resolve(results);
                    }
                }).catch(reason => {
                    // 只要有一个失败，整体就是失败
                    reject(reason);
                });
            }
        });
    }
}
```