import { MyPromise } from './handWrite.js'

let p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('res1')
  }, 1000);
}).then(res => {
  return new MyPromise((resolve) => {
    setTimeout(() => {
      resolve('res2')
    }, 1000);
  })
}).then(res2 => {
  console.log('res2Result:', res2)
})