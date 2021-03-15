(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

    function initMixin(Vue) {
      Vue.prototype._init = function (options) {
        // console.log(options);
        var vm = this;
        vm.$options = options; // 实例上有个属性$options  表示的是用户传入的所有属性
      };
    }

    // Vue2.0中，本质是一个构造函数

    function Vue(options) {
      // console.log(options)
      this._init(options); // 当用户new Vue的时候， 就调用init方法进行vue的初始化操作

    }

    initMixin(Vue);

    return Vue;

})));
//# sourceMappingURL=vue.js.map
