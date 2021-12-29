(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Index = {}));
})(this, (function (exports) { 'use strict';

  const funA = () => {
    console.log('funA');
  };

  var name = "rollup-demo";
  var version = "1.0.0";
  var description = "";
  var main = "index.js";
  var scripts = {
  	test: "echo \"Error: no test specified\" && exit 1"
  };
  var keywords = [
  ];
  var author = "";
  var license = "ISC";
  var dependencies = {
  	"@rollup/plugin-json": "^4.1.0",
  	rollup: "^2.62.0"
  };
  var pkg = {
  	name: name,
  	version: version,
  	description: description,
  	main: main,
  	scripts: scripts,
  	keywords: keywords,
  	author: author,
  	license: license,
  	dependencies: dependencies
  };

  console.log(pkg);

  funA();
  console.log('hello');
  const x = 123;

  exports.x = x;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
