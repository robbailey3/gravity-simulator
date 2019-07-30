!function(i){var n={};function o(t){if(n[t])return n[t].exports;var e=n[t]={i:t,l:!1,exports:{}};return i[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}o.m=i,o.c=n,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(i,n,function(t){return e[t]}.bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=3)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(t,e,i,n){this.position=t,this.radius=e,this.mass=i,this.canvas=n};e.GameObject=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(7);e.GameEngine=n.GameEngine;var o=i(10);e.Vector=o.Vector},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(0);e.GameObject=n.GameObject;var o=i(8);e.Sun=o.Sun;var r=i(9);e.Planet=r.Planet},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var c=i(4);i(11);var a=document.getElementById("planet-mass"),u=document.getElementById("planet-radius"),n=document.getElementById("force-vector");n.addEventListener("change",function(){l.showForceVector=n.checked});var h=new c.Canvas,l=new c.GameEngine(h);h.setCanvasSize(window.innerWidth,window.innerHeight),h.fillBackground();var o=new c.Sun(new c.Vector(window.innerWidth/2,window.innerHeight/2,0),40,1.989e30,h);l.gameObjects.push(o);var f,r=new c.Planet(new c.Vector(window.innerWidth/2-200,window.innerHeight/2,0),5,5e12,new c.Vector(0,4.927,0),h,"#0077be");l.gameObjects.push(r),h.el.addEventListener("mousedown",function(t){f=new c.Vector(t.clientX,t.clientY,0),l.isDragging=!0,l.clickPosition=f}),h.el.addEventListener("mousemove",function(t){l.isDragging&&(l.dragPosition=new c.Vector(t.clientX,t.clientY,0))}),h.el.addEventListener("mouseup",function(t){var e=parseInt(u.value,10),i=1*Math.pow(10,parseInt(a.value,10));l.isDragging=!1,l.dragPosition=void 0;var n=(t.clientX-f.x)/10,o=(t.clientY-f.y)/10;if(t.ctrlKey){var r=new c.Sun(new c.Vector(t.clientX,t.clientY,0),50,1.989e30,h);l.gameObjects.push(r)}else{var s=new c.Planet(new c.Vector(t.clientX,t.clientY,0),e,i,new c.Vector(n,o,0),h);l.gameObjects.push(s)}})},function(t,i,e){"use strict";function n(t){for(var e in t)i.hasOwnProperty(e)||(i[e]=t[e])}Object.defineProperty(i,"__esModule",{value:!0}),n(e(5)),n(e(1)),n(e(2))},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(6);e.Canvas=n.Canvas},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t){void 0===t&&(t="body"),this.defaults={backgroundColor:"#0f0f0f",fillColor:"#333",strokeColor:"#fff"},this.el=document.createElement("canvas"),document.querySelector(t).appendChild(this.el),this.ctx=this.el.getContext("2d")}return t.prototype.setCanvasSize=function(t,e){return this.el.width=t,this.el.height=e,this},t.prototype.fillBackground=function(t){void 0===t&&(t=this.defaults.backgroundColor),this.ctx.save(),this.ctx.fillStyle=t,this.ctx.fillRect(0,0,this.el.width,this.el.height),this.ctx.closePath(),this.ctx.restore()},t.prototype.fillCircle=function(t,e,i,n,o){void 0===n&&(n=this.defaults.fillColor),this.ctx.fillStyle=n,this.ctx.beginPath(),this.ctx.arc(t,e,i,0,2*Math.PI),o&&(this.ctx.shadowOffsetX=o.shadowOffsetX,this.ctx.shadowOffsetY=o.shadowOffsetY,this.ctx.shadowColor=o.shadowColor,this.ctx.shadowBlur=o.shadowBlur),this.ctx.fill(),this.ctx.closePath(),this.ctx.restore()},t.prototype.drawLine=function(t,e,i){void 0===i&&(i=this.defaults.strokeColor),this.ctx.save(),this.ctx.strokeStyle=i,this.ctx.beginPath(),this.ctx.moveTo(t.x,t.y),this.ctx.lineTo(e.x,e.y),this.ctx.stroke(),this.ctx.restore()},t}();e.Canvas=n},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(2),n=function(){function t(t){this.canvas=t,this.gameObjects=[],this.isDragging=!1,this.showForceVector=!1,this.constants={G:667e-13},this.animate()}return t.prototype.animate=function(){var t=this;this.canvas.fillBackground(),this.calculateObjectForces();for(var e=0,i=this.gameObjects;e<i.length;e++){var n=i[e];n.move(),n.draw()}this.isDragging&&this.canvas.drawLine(this.clickPosition,this.dragPosition||this.clickPosition),this.cleanUpCanvas(),requestAnimationFrame(function(){t.animate()})},t.prototype.drawForceVector=function(t,e){this.canvas.drawLine(t,t.add(e),"#ff0000")},t.prototype.detectCollision=function(t,e){return!(!t||!e)&&(t.position.x>=e.position.x-e.radius&&t.position.x<=e.position.x+e.radius&&t.position.y>=e.position.y-e.radius&&t.position.y<=e.position.y+e.radius)},t.prototype.cleanUpCanvas=function(){for(var t=0,e=this.gameObjects;t<e.length;t++){var i=e[t];(i.position.x>this.canvas.el.width||i.position.x<0)&&this.gameObjects.splice(this.gameObjects.indexOf(i),1),(i.position.y>this.canvas.el.height||i.position.y<0)&&this.gameObjects.splice(this.gameObjects.indexOf(i),1)}},t.prototype.calculateObjectForces=function(){for(var t=0;t<this.gameObjects.length;t+=1)for(var e=0;e<this.gameObjects.length;e+=1)if(t!==e){var i=this.gameObjects[t],n=this.gameObjects[e];if(this.detectCollision(i,n))return void this.gameObjects.splice(this.gameObjects.indexOf(i.mass>n.mass?n:i),1);var o=51470*Math.sqrt(Math.pow(i.position.x-n.position.x,2)+Math.pow(i.position.y-n.position.y,2)),r=n.position.minus(i.position).normalize().times(this.constants.G*n.mass/Math.pow(o,3));this.showForceVector&&i instanceof s.Planet&&this.drawForceVector(i.position,r.times(1e3)),i.velocity=i.velocity.add(r)}},t}();e.GameEngine=n},function(t,e,i){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(e,"__esModule",{value:!0});var s=i(1),r=function(r){function t(t,e,i,n){var o=r.call(this,t,e,i,n)||this;return o.draw(),o.velocity=new s.Vector(0,0,0),o}return o(t,r),t.prototype.draw=function(){this.canvas.fillCircle(this.position.x,this.position.y,this.radius,"#FDB813",{shadowBlur:50,shadowColor:"#FDB813",shadowOffsetX:0,shadowOffsetY:0})},t.prototype.move=function(){this.position=this.position.add(this.velocity)},t}(i(0).GameObject);e.Sun=r},function(t,e,i){"use strict";var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)});Object.defineProperty(e,"__esModule",{value:!0});var r=function(c){function t(t,e,i,n,o,r){void 0===r&&(r="#e1a95f");var s=c.call(this,t,e,i,o)||this;return s.velocity=n,s.color=r,s.previousPositions=[],s.trailLength=15,s.draw(),s}return o(t,c),t.prototype.draw=function(){for(var t=0,e=this.previousPositions;t<e.length;t++){var i=e[t];this.canvas.fillCircle(i.x,i.y,1,"#fff")}this.canvas.fillCircle(this.position.x,this.position.y,this.radius,this.color,{shadowBlur:2,shadowColor:"#ddd",shadowOffsetX:0,shadowOffsetY:0})},t.prototype.move=function(){this.previousPositions.push(this.position),this.previousPositions.length>this.trailLength&&this.previousPositions.shift(),this.position=this.position.add(this.velocity)},t}(i(0).GameObject);e.Planet=r},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function i(t,e,i){void 0===t&&(t=0),void 0===e&&(e=0),void 0===i&&(i=0),this.x=t,this.y=e,this.z=i}return i.fromArray=function(t){return new i(t[0],t[1],t[2])},i.fromObject=function(t){return new i(t.x,t.y,t.z)},i.clone=function(t){return i.fromObject(t)},i.minus=function(t,e){return new i(t.x-e.x,t.y-e.y,t.z-e.z)},i.add=function(t,e){return new i(t.x+e.x,t.y+e.y,t.z+e.z)},i.times=function(t,e){return new i(e*t.x,e*t.y,e*t.z)},i.divide=function(t,e){return new i(t.x/e,t.y/e,t.z/e)},i.dot=function(t,e){return t.x*e.x+t.y*e.y+t.z*e.z},i.cross=function(t,e){return new i(t.y*e.z-t.z*e.y,t.z*e.x-t.x*e.z,t.x*e.y-t.y*e.x)},i.normalize=function(t){var e=i.magnitude(t);return i.times(t,0===e?1/0:1/e)},i.magnitude=function(t){return Math.sqrt(Math.pow(t.x,2)+Math.pow(t.y,2)+Math.pow(t.z,2))},i.prototype.toString=function(){return JSON.stringify({x:this.x,y:this.y})},i.prototype.clone=function(){return new i(this.x,this.y)},i.prototype.normalize=function(){return i.normalize(this)},i.prototype.magnitude=function(){return i.magnitude(this)},i.prototype.add=function(t){return i.add(this,t)},i.prototype.minus=function(t){return i.minus(this,t)},i.prototype.times=function(t){return i.times(this,t)},i.prototype.divide=function(t){return i.divide(this,t)},i.prototype.dot=function(t){return i.dot(this,t)},i.prototype.cross=function(t){return i.cross(this,t)},i}();e.Vector=n},function(t,e,i){}]);