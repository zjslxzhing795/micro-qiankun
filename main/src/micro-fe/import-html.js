import { fetchResource } from "./fetch-resource";

export const importHTML = async (url) => {
  const template = document.createElement("div");
  const html = await fetchResource(url);
  template.innerHTML = html;

  const scripts = template.querySelectorAll("script");
  // 获取所有script标签的代码 [代码,代码]
  function getExternalScripts() {
    return Promise.all(
      Array.from(scripts).map((script) => {
        const src = script.getAttribute("src");
        if (!src) {
          // 非外链src
          return Promise.resolve(script.innerHTML);
        }
        // 外链src
        return fetchResource(src.startsWith("http") ? src : url.concat(src));
      })
    );
  }

  // 获取并执行所有的script脚本代码
  async function execScripts() {
    const externalScripts = await getExternalScripts();
    // 常规的话通过window['app-vue2-app']可以拿到子应用的生命周期钩子，但针对umd包，我们可以手动构造一个commonjs模拟环境，得到子应用export出的模块
    // 以下几行代码会改变eval(code)的行为，code遵循umd规范，若没有以下代码，子应用export出来的内容会挂载到window，
    // 模拟commonjs规范后，code执行时会将子应用export出来的内容写入到module.exports
    const module = { exports: {} };
    const { exports } = module;
    console.log(exports);
    externalScripts.forEach((code) => {
      eval(code);
    });
    return module.exports; // 这里不能是exports
  }

  return {
    template,
    getExternalScripts,
    execScripts,
  };
};
