/*
* @Author: Chen
* @Date:   2019-10-23 11:24:02
* @Last Modified by:   Chen
* @Last Modified time: 2019-10-24 11:37:22
*/

/*
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
global.window = document.defaultView;
const $ = require('jquery')(window);
console.log($)
console.log($.extend({},{name:"tom"},{age:18}))

console.log(module.paths)

*/
const $ = require('jquery')
console.log($+'')
console.log(module.paths)

/*
const http = require('http')
const kztest = require('kztest')
console.log(kztest)
console.log(http)
*/