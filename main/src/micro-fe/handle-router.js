/**
 * 处理路由变化
 */

import { importHTML } from "./import-html";
import { getApps } from "./index";
import { getCurRoute, getPrevRoute } from "./rewrite-router";

async function bootstrap(app) {
  app.bootstrap && (await app.bootstrap());
}

async function mount(app) {
  app.mount &&
    (await app.mount({
      container: document.querySelector(app.container),
    }));
}

async function unmount(app) {
  app.unmount && (await app.unmount());
}

export const handleRourer = async function () {
  const apps = getApps();
  // 卸载上一个应用
  const prevApp = apps.find((item) => getPrevRoute().startsWith(item.activeRule));
  if (prevApp) {
    await unmount(prevApp);
  }
  // 浏览器出于安全考虑，我们获取不到历史记录
  // 2. 匹配子应用
  // 2.1 获取到当前路由路径
  // console.log(window.location.pathname);
  // 2.2 去apps里查找
  const app = apps.find((item) => getCurRoute().startsWith(item.activeRule));
  if (!app) return;
  // 3. 加载子应用
  const { template, execScripts } = await importHTML(app.entry);
  const container = document.querySelector(app.container);
  container.appendChild(template);
  // 配置全局变量
  window.__POWERED_BY_QIANKUN__ = true;
  window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ = app.entry.endsWith("/")
    ? app.entry
    : `${app.entry}/`;

  const appExports = await execScripts();
  console.log(appExports);
  app.bootstrap = appExports.bootstrap;
  app.mount = appExports.mount;
  app.unmount = appExports.unmount;
  // if (document.querySelector(app.container).innerHTML) unmount(app);
  await bootstrap(app);
  await mount(app);
  // container.appendChild(template);
  // 请求获取子应用的资源：HTML CSS JS
  // const html = await fetch(app.entry).then((res) => res.text());
  // console.log(html);
  // const container = document.querySelector(app.container);
  // 浏览器出于安全考虑，innerHTML中的script不会加载执行，所以以下不能渲染出来
  // container.innerHTML = html;
  // 手动加载子应用的script,执行script里的代码 使用eval()或 new Function
  // 4. 渲染子应用
};
