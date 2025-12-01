import { deepClone } from './deep-clone.js'

let map1 = new Map()
let map2 = new Map()
map2.set('loop', map1)
map1.set('key', 'value')
map1.set('loop', map2)

let source = {
  name: 'niko',
  age: 18,
  isMale: true,
  desc: undefined,
  obj: null,
  date: new Date(),
  reg: /\d+/gi,
  fn: function() {
    console.log(123)
  },
  symVal: Symbol('sym'),
  [Symbol('symKey')]: 'symbol key and value',
  obj: {a: 1, b: 2},
  arr: [1,2,3],
  map: map1,
  set: new Set([1,2,3])
}

source.self = source

const result = deepClone(source)
console.log('--- 结果验证 ---');

// 验证循环引用
console.log('循环引用:', result.self === result); // true

// 验证函数引用是否一致
console.log('函数引用一致:', result.fn === source.fn); // true

// 验证 Date 和 RegExp 是否是新对象但值相同
console.log('Date拷贝:', result.date !== source.date && result.date.getTime() === source.date.getTime()); // true
console.log('RegExp拷贝:', result.reg !== source.reg && result.reg.toString() === source.reg.toString()); // true

// 验证 Symbol Key 是否拷贝成功
const symKeys = Object.getOwnPropertySymbols(result);
console.log('Symbol Key拷贝:', result[symKeys[0]] === 'symbol key and value'); // true

// 验证对象修改不影响原对象
result.obj.a = 999;
console.log('深拷贝独立性:', source.obj.a === 1); // true

console.log(source === result)
console.log(result)