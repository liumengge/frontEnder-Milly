require.config({
  baseUrl: 'js/lib',
  paths: {
    jquery: 'jquery-1.12.0'  // 后面不要带.js
  }
})

require(['jquery'], function ($) {
  // console.log($)
})