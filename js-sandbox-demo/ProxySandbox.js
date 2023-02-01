class ProxySandbox {
  isRunning = false
  constructor() {
    const fakeWindow = Object.create(null)
    this.proxyWindow = new Proxy(fakeWindow, {
      set: (target, prop, value, receiver) => {
        if (this.isRunning) {
          target[prop] = value
        }
      },
      get: (target, prop, receiver) => {
        return prop in target ? target[prop] : window[prop]
      },
    })
  }
  active() {
    this.isRunning = true
  }
  inactive() {
    this.isRunning = false
  }
}

window.city = "Beijing"
let proxySandbox01 = new ProxySandbox()
let proxySandbox02 = new ProxySandbox()
proxySandbox01.active()
proxySandbox02.active()
proxySandbox01.proxyWindow.city = "Shanghai"
proxySandbox02.proxyWindow.city = "Tianjin"
console.log(
  "proxySandbox01.proxyWindow.city 01:",
  proxySandbox01.proxyWindow.city
)
console.log(
  "proxySandbox02.proxyWindow.city 01:",
  proxySandbox02.proxyWindow.city
)
console.log("window.city 01:", window.city)
proxySandbox01.inactive()
proxySandbox02.inactive()
console.log(
  "proxySandbox01.proxyWindow.city 02:",
  proxySandbox01.proxyWindow.city
)
console.log(
  "proxySandbox02.proxyWindow.city 02:",
  proxySandbox02.proxyWindow.city
)
console.log("window.city 02:", window.city)

/**
 * 优点：不需要遍历window上的所有属性，性能良好
 *      同一时间可以激活多个微应用
 * 缺点：只支持能够运行es6的平台上运行，兼容性没有快照沙箱好
 */
