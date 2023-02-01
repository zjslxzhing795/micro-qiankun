class LegacySandbox {
  currentUpdatePropsValueMap = new Map()
  modifiedPropsOriginalValueMapInSandbox = new Map()
  addedPropsMapInSandbox = new Map()
  constructor() {
    const fakeWindow = Object.create(null)
    this.proxyWindow = new Proxy(fakeWindow, {
      set: (target, prop, value, receiver) => {
        console.log("set target", target)
        console.log("set prop", prop)
        console.log("set value", value)
        console.log("set receiver", receiver)
        const originalVal = window[prop]
        if (!window.hasOwnProperty(prop)) {
          this.addedPropsMapInSandbox.set(prop, value)
        } else if (!this.modifiedPropsOriginalValueMapInSandbox.has(prop)) {
          this.modifiedPropsOriginalValueMapInSandbox.set(prop, originalVal)
        }
        this.currentUpdatePropsValueMap.set(prop, value)
        window[prop] = value
      },
      get: (target, prop, receiver) => {
        console.log("get target", target)
        console.log("get prop", prop)
        console.log("get receiver", receiver)
        return target[prop]
      },
    })
  }
  setWindowProp(prop, value, isToDelete = false) {
    if (value === undefined && isToDelete) {
      delete window[prop]
    } else {
      window[prop] = value
    }
  }
  active() {
    // 恢复上一次在运行该微应用时所修改过的window上的属性
    this.currentUpdatePropsValueMap.forEach((value, prop) => {
      this.setWindowProp(prop, value)
    })
  }
  incative() {
    // 将window对象上的属性状态还原至微应用运行之前的状态
    this.modifiedPropsOriginalValueMapInSandbox.forEach((value, prop) => {
      this.setWindowProp(prop, value)
    })
    // 删除在微应用运行期间，window上新增的属性
    this.addedPropsMapInSandbox.forEach((_, prop) => {
      this.setWindowProp(prop, undefined, true)
    })
  }
}

window.city = "Beijing "
let legacySandBox = new LegacySandbox()
console.log("window.city 01:", window.city)
legacySandBox.active()
legacySandBox.proxyWindow.city = "Shanghai"
console.log("window.city 02:", window.city)
legacySandBox.incative()
console.log("window.city 03:", window.city)
legacySandBox.active()
console.log("window.city 04:", window.city)
legacySandBox.incative()

/**
 * 优点：不需要遍历window上的所有属性，性能良好
 * 缺点：同一时间只能激活一个微应用
 */
