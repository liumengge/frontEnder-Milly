import { initState } from "./state";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        // console.log(options);
        const vm = this;
        vm.$options = options;   // 实例上有个属性$options  表示的是用户传入的所有属性
        // 初始化状态
        initState(vm)

        // 
        if (vm.$options.el) {  // 表示实例上有el这个属性，数据可以挂载到页面上
            // 渲染
            vm.$mount(vm.$options.el)
        }
    }

    Vue.prototype.$mount = function (el) {
        el = document.querySelector(el)

        const vm = this  // 这个this是什么 
    }
}