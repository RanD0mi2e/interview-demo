export function throttle(func, delay) {
  let lastTime = 0
  return function(...args) {
    let nowTime = Date.now()
    if (nowTime - lastTime < delay) return
    lastTime = nowTime
    func(args)
  }
}