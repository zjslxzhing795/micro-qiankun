/**
 * window.a = 1
 * 进入微应用: 1. 保存window.a = 1 2. 修改window.a = 2
 * 退出微应用: 1. 记录window.a = 2 2. 恢复window.a = 1以使主应用使用这个变量
 */

class SnapshotSandbox {
  windowSnapshot = {}
  modifyPropsMap = {}
  active() {
    /***
     * 微应用处于运行状态
     */
    // 1. 保存window对象上所有属性的状态
    for (const prop in window) {
      this.windowSnapshot[prop] = window[prop]
    }
    // 2. 恢复上一次在运行该微应用时所修改过的window上的属性
    Object.keys(this.modifyPropsMap).forEach((prop) => {
      window[prop] = this.modifyPropsMap[prop]
    })
  }
  inactive() {
    /***
     * 微应用退出运行状态
     */

    for (const prop in window) {
      if (window[prop] !== this.windowSnapshot[prop]) {
        // 1. 记录修改了window对象上的哪些属性
        this.modifyPropsMap[prop] = window[prop]
        // 2. 将window对象上的属性状态还原至微应用运行之前的状态
        window[prop] = this.windowSnapshot[prop]
      }
    }
  }
}

window.city = "Beijing"
let snapshotSandbox = new SnapshotSandbox()
console.log("window.city 01:", window.city)
snapshotSandbox.active()
window.city = "Shanghai"
console.log("window.city 02:", window.city)
snapshotSandbox.inactive()
console.log("window.city 03:", window.city)

/**
 * 优点：兼容性好
 * 缺点：
 * 1. for in 遍历性能低
 * 2. 不支持同时运行多个微应用：会改变全局window的属性，如果同时运行多个微应用，多个应用同时改写window上的属性，势必会出现状态混乱。
 */
