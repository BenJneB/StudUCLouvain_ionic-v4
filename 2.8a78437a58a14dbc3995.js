(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{ihYY:function(t,n,o){"use strict";o.d(n,"a",function(){return r}),o.d(n,"b",function(){return e}),o.d(n,"c",function(){return s}),o.d(n,"d",function(){return h}),o.d(n,"e",function(){return i});function i(t,n){return{type:7,name:t,definitions:n,options:{}}}function r(t,n){return void 0===n&&(n=null),{type:4,styles:n,timings:t}}function s(t){return{type:6,styles:t,offset:null}}function e(t,n,o){return{type:0,name:t,styles:n,options:o}}function h(t,n,o){return void 0===o&&(o=null),{type:1,expr:t,animation:n,options:o}}function u(t){Promise.resolve(null).then(t)}(function(){function t(t,n){void 0===t&&(t=0),void 0===n&&(n=0),this._onDoneFns=[],this._onStartFns=[],this._onDestroyFns=[],this._started=!1,this._destroyed=!1,this._finished=!1,this.parentPlayer=null,this.totalTime=t+n}t.prototype._onFinish=function(){this._finished||(this._finished=!0,this._onDoneFns.forEach(function(t){return t()}),this._onDoneFns=[])},t.prototype.onStart=function(t){this._onStartFns.push(t)},t.prototype.onDone=function(t){this._onDoneFns.push(t)},t.prototype.onDestroy=function(t){this._onDestroyFns.push(t)},t.prototype.hasStarted=function(){return this._started},t.prototype.init=function(){},t.prototype.play=function(){this.hasStarted()||(this._onStart(),this.triggerMicrotask()),this._started=!0},t.prototype.triggerMicrotask=function(){var t=this;u(function(){return t._onFinish()})},t.prototype._onStart=function(){this._onStartFns.forEach(function(t){return t()}),this._onStartFns=[]},t.prototype.pause=function(){},t.prototype.restart=function(){},t.prototype.finish=function(){this._onFinish()},t.prototype.destroy=function(){this._destroyed||(this._destroyed=!0,this.hasStarted()||this._onStart(),this.finish(),this._onDestroyFns.forEach(function(t){return t()}),this._onDestroyFns=[])},t.prototype.reset=function(){},t.prototype.setPosition=function(t){},t.prototype.getPosition=function(){return 0},t.prototype.triggerCallback=function(t){var n="start"==t?this._onStartFns:this._onDoneFns;n.forEach(function(t){return t()}),n.length=0}})(),function(){function t(t){var n=this;this._onDoneFns=[],this._onStartFns=[],this._finished=!1,this._started=!1,this._destroyed=!1,this._onDestroyFns=[],this.parentPlayer=null,this.totalTime=0,this.players=t;var o=0,i=0,r=0,s=this.players.length;0==s?u(function(){return n._onFinish()}):this.players.forEach(function(t){t.onDone(function(){++o==s&&n._onFinish()}),t.onDestroy(function(){++i==s&&n._onDestroy()}),t.onStart(function(){++r==s&&n._onStart()})}),this.totalTime=this.players.reduce(function(t,n){return Math.max(t,n.totalTime)},0)}t.prototype._onFinish=function(){this._finished||(this._finished=!0,this._onDoneFns.forEach(function(t){return t()}),this._onDoneFns=[])},t.prototype.init=function(){this.players.forEach(function(t){return t.init()})},t.prototype.onStart=function(t){this._onStartFns.push(t)},t.prototype._onStart=function(){this.hasStarted()||(this._started=!0,this._onStartFns.forEach(function(t){return t()}),this._onStartFns=[])},t.prototype.onDone=function(t){this._onDoneFns.push(t)},t.prototype.onDestroy=function(t){this._onDestroyFns.push(t)},t.prototype.hasStarted=function(){return this._started},t.prototype.play=function(){this.parentPlayer||this.init(),this._onStart(),this.players.forEach(function(t){return t.play()})},t.prototype.pause=function(){this.players.forEach(function(t){return t.pause()})},t.prototype.restart=function(){this.players.forEach(function(t){return t.restart()})},t.prototype.finish=function(){this._onFinish(),this.players.forEach(function(t){return t.finish()})},t.prototype.destroy=function(){this._onDestroy()},t.prototype._onDestroy=function(){this._destroyed||(this._destroyed=!0,this._onFinish(),this.players.forEach(function(t){return t.destroy()}),this._onDestroyFns.forEach(function(t){return t()}),this._onDestroyFns=[])},t.prototype.reset=function(){this.players.forEach(function(t){return t.reset()}),this._destroyed=!1,this._finished=!1,this._started=!1},t.prototype.setPosition=function(t){var n=t*this.totalTime;this.players.forEach(function(t){var o=t.totalTime?Math.min(1,n/t.totalTime):1;t.setPosition(o)})},t.prototype.getPosition=function(){var t=0;return this.players.forEach(function(n){var o=n.getPosition();t=Math.min(o,t)}),t},t.prototype.beforeDestroy=function(){this.players.forEach(function(t){t.beforeDestroy&&t.beforeDestroy()})},t.prototype.triggerCallback=function(t){var n="start"==t?this._onStartFns:this._onDoneFns;n.forEach(function(t){return t()}),n.length=0}}()}}]);