!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;"undefined"!=typeof window?b=window:"undefined"!=typeof global?b=global:"undefined"!=typeof self&&(b=self),b.AppearIn=a()}}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};a[g][0].call(k.exports,function(b){var c=a[g][1][b];return e(c?c:b)},k,k.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){b.exports=a("./lib/appearin")},{"./lib/appearin":2}],2:[function(a,b){"use strict";function c(a){var b=a||"stun:stun.l.google.com:19302",c={iceServers:[{url:b}]};try{var d=window.RTCPeerConnection||window.webkitRTCPeerConnection||window.mozRTCPeerConnection,e=new d(c);return e&&!!e.iceConnectionState}catch(f){return!1}}function d(a,b){b=h.normalize(b),a.src=k+b}function e(a){a=a||{},this.namespace=a.namespace,this.stunServer=a.stunServer}var f=a("browser-request"),g=a("promise"),h=a("./roomNameUtil"),i=g.denodeify(f),j="https://api.appear.in",k="https://appear.in";e.prototype.isWebRtcCompatible=function(){try{var a=!!document.createElement("video").canPlayType,b="probably"===document.createElement("video").canPlayType('video/webm; codecs="vp8", vorbis'),d=!!(navigator.mozGetUserMedia||navigator.webkitGetUserMedia||navigator.msGetUserMedia||navigator.getUserMedia),e=!!(window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection),f=c(this.stunServer);return a&&b&&d&&e&&f}catch(g){return!1}},e.prototype.getRandomRoomName=g.nodeify(function(){return i({method:"POST",uri:j+"/random-room-name",headers:{accept:"application/json, text/plain, */*"}}).then(function(a){try{return JSON.parse(a.body).roomName}catch(b){throw new Error("Could not parse response body")}})}),e.prototype.addRoomToIframe=function(a,b){if(!a||!b)throw new Error("Missing parameters");d(a,b)},e.prototype.addRoomToElementById=function(a,b){if(!a||!b)throw new Error("Missing parameters");var c=document.getElementById(a);c&&d(c,b)},b.exports=e},{"./roomNameUtil":3,"browser-request":4,promise:6}],3:[function(a,b){"use strict";function c(a){return a&&"/"!==a[0]?"/"+a:a}var d=["templates","styles","scripts","libraries","i","images","information","error","extensions","translations","robots.txt"],e={};e.requirements="the room name cannot start with / or be any of these reserved words: "+d.join(", ")+".",e.pattern="(?!(?:"+d.join("|")+")(?:/.*|$))([^?#]+)",e.normalize=function(a){var b=c(a);return(b+"").trim().toLowerCase().replace(/\/*$/,"")},b.exports=e},{}],4:[function(b,c,d){!function(b,e){"function"==typeof a&&a.amd?a([],e):"object"==typeof d?c.exports=e():b.returnExports=e()}(this,function(){function a(e,f){if("function"!=typeof f)throw new Error("Bad callback given: "+f);if(!e)throw new Error("No options given");var h=e.onResponse;if(e="string"==typeof e?{uri:e}:JSON.parse(JSON.stringify(e)),e.onResponse=h,e.verbose&&(a.log=d()),e.url&&(e.uri=e.url,delete e.url),!e.uri&&""!==e.uri)throw new Error("options.uri is a required argument");if("string"!=typeof e.uri)throw new Error("options.uri must be a string");for(var i=["proxy","_redirectsFollowed","maxRedirects","followRedirect"],j=0;j<i.length;j++)if(e[i[j]])throw new Error("options."+i[j]+" is not supported");if(e.callback=f,e.method=e.method||"GET",e.headers=e.headers||{},e.body=e.body||null,e.timeout=e.timeout||a.DEFAULT_TIMEOUT,e.headers.host)throw new Error("Options.headers.host is not supported");e.json&&(e.headers.accept=e.headers.accept||"application/json","GET"!==e.method&&(e.headers["content-type"]="application/json"),"boolean"!=typeof e.json?e.body=JSON.stringify(e.json):"string"!=typeof e.body&&(e.body=JSON.stringify(e.body)));var k=function(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return b.join("&")};if(e.qs){var l="string"==typeof e.qs?e.qs:k(e.qs);e.uri=-1!==e.uri.indexOf("?")?e.uri+"&"+l:e.uri+"?"+l}var m=function(a){var b={};b.boundry="-------------------------------"+Math.floor(1e9*Math.random());var c=[];for(var d in a)a.hasOwnProperty(d)&&c.push("--"+b.boundry+'\nContent-Disposition: form-data; name="'+d+'"\n\n'+a[d]+"\n");return c.push("--"+b.boundry+"--"),b.body=c.join(""),b.length=b.body.length,b.type="multipart/form-data; boundary="+b.boundry,b};if(e.form){if("string"==typeof e.form)throw"form name unsupported";if("POST"===e.method){var n=(e.encoding||"application/x-www-form-urlencoded").toLowerCase();switch(e.headers["content-type"]=n,n){case"application/x-www-form-urlencoded":e.body=k(e.form).replace(/%20/g,"+");break;case"multipart/form-data":var o=m(e.form);e.body=o.body,e.headers["content-type"]=o.type;break;default:throw new Error("unsupported encoding:"+n)}}}return e.onResponse=e.onResponse||c,e.onResponse===!0&&(e.onResponse=f,e.callback=c),!e.headers.authorization&&e.auth&&(e.headers.authorization="Basic "+g(e.auth.username+":"+e.auth.password)),b(e)}function b(b){function c(){l=!0;var c=new Error("ETIMEDOUT");return c.code="ETIMEDOUT",c.duration=b.timeout,a.log.error("Timeout",{id:k._id,milliseconds:b.timeout}),b.callback(c,k)}function d(){if(l)return a.log.debug("Ignoring timed out state change",{state:k.readyState,id:k.id});if(a.log.debug("State change",{state:k.readyState,id:k.id,timed_out:l}),k.readyState===h.OPENED){a.log.debug("Request started",{id:k.id});for(var c in b.headers)k.setRequestHeader(c,b.headers[c])}else k.readyState===h.HEADERS_RECEIVED?e():k.readyState===h.LOADING?(e(),g()):k.readyState===h.DONE&&(e(),g(),i())}function e(){if(!p.response){if(p.response=!0,a.log.debug("Got response",{id:k.id,status:k.status}),clearTimeout(k.timeoutTimer),k.statusCode=k.status,m&&0==k.statusCode){var c=new Error("CORS request rejected: "+b.uri);return c.cors="rejected",p.loading=!0,p.end=!0,b.callback(c,k)}b.onResponse(null,k)}}function g(){p.loading||(p.loading=!0,a.log.debug("Response body loading",{id:k.id}))}function i(){if(!p.end){if(p.end=!0,a.log.debug("Request done",{id:k.id}),k.body=k.responseText,b.json)try{k.body=JSON.parse(k.responseText)}catch(c){return b.callback(c,k)}b.callback(null,k,k.body)}}var k=new h,l=!1,m=f(b.uri),n="withCredentials"in k;if(j+=1,k.seq_id=j,k.id=j+": "+b.method+" "+b.uri,k._id=k.id,m&&!n){var o=new Error("Browser does not support cross-origin request: "+b.uri);return o.cors="unsupported",b.callback(o,k)}k.timeoutTimer=setTimeout(c,b.timeout);var p={response:!1,loading:!1,end:!1};return k.onreadystatechange=d,k.open(b.method,b.uri,!0),m&&(k.withCredentials=!!b.withCredentials),k.send(b.body),k}function c(){}function d(){var a,b,d={},f=["trace","debug","info","warn","error"];for(b=0;b<f.length;b++)a=f[b],d[a]=c,"undefined"!=typeof console&&console&&console[a]&&(d[a]=e(console,a));return d}function e(a,b){function c(c,d){return"object"==typeof d&&(c+=" "+JSON.stringify(d)),a[b].call(a,c)}return c}function f(a){var b,c=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/;try{b=location.href}catch(d){b=document.createElement("a"),b.href="",b=b.href}var e=c.exec(b.toLowerCase())||[],f=c.exec(a.toLowerCase()),g=!(!f||f[1]==e[1]&&f[2]==e[2]&&(f[3]||("http:"===f[1]?80:443))==(e[3]||("http:"===e[1]?80:443)));return g}function g(a){var b,c,d,e,f,g,h,i,j="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",k=0,l=0,m="",n=[];if(!a)return a;do b=a.charCodeAt(k++),c=a.charCodeAt(k++),d=a.charCodeAt(k++),i=b<<16|c<<8|d,e=i>>18&63,f=i>>12&63,g=i>>6&63,h=63&i,n[l++]=j.charAt(e)+j.charAt(f)+j.charAt(g)+j.charAt(h);while(k<a.length);switch(m=n.join(""),a.length%3){case 1:m=m.slice(0,-2)+"==";break;case 2:m=m.slice(0,-1)+"="}return m}var h=XMLHttpRequest;if(!h)throw new Error("missing XMLHttpRequest");a.log={trace:c,debug:c,info:c,warn:c,error:c};var i=18e4,j=0;a.withCredentials=!1,a.DEFAULT_TIMEOUT=i,a.defaults=function(b){var c=function(a){var c=function(c,d){c="string"==typeof c?{uri:c}:JSON.parse(JSON.stringify(c));for(var e in b)void 0===c[e]&&(c[e]=b[e]);return a(c,d)};return c},d=c(a);return d.get=c(a.get),d.post=c(a.post),d.put=c(a.put),d.head=c(a.head),d};var k=["get","put","post","head"];return k.forEach(function(b){var c=b.toUpperCase(),d=b.toLowerCase();a[d]=function(b){"string"==typeof b?b={method:c,uri:b}:(b=JSON.parse(JSON.stringify(b)),b.method=c);var d=[b].concat(Array.prototype.slice.apply(arguments,[1]));return a.apply(this,d)}}),a.couch=function(b,d){function e(a,b,c){if(a)return d(a,b,c);if((b.statusCode<200||b.statusCode>299)&&c.error){a=new Error("CouchDB error: "+(c.error.reason||c.error.error));for(var e in c)a[e]=c[e];return d(a,b,c)}return d(a,b,c)}"string"==typeof b&&(b={uri:b}),b.json=!0,b.body&&(b.json=b.body),delete b.body,d=d||c;var f=a(b,e);return f},a})},{}],5:[function(a,b){function c(){}var d=b.exports={};d.nextTick=function(){var a="undefined"!=typeof window&&window.setImmediate,b="undefined"!=typeof window&&window.MutationObserver,c="undefined"!=typeof window&&window.postMessage&&window.addEventListener;if(a)return function(a){return window.setImmediate(a)};var d=[];if(b){var e=document.createElement("div"),f=new MutationObserver(function(){var a=d.slice();d.length=0,a.forEach(function(a){a()})});return f.observe(e,{attributes:!0}),function(a){d.length||e.setAttribute("yes","no"),d.push(a)}}return c?(window.addEventListener("message",function(a){var b=a.source;if((b===window||null===b)&&"process-tick"===a.data&&(a.stopPropagation(),d.length>0)){var c=d.shift();c()}},!0),function(a){d.push(a),window.postMessage("process-tick","*")}):function(a){setTimeout(a,0)}}(),d.title="browser",d.browser=!0,d.env={},d.argv=[],d.on=c,d.addListener=c,d.once=c,d.off=c,d.removeListener=c,d.removeAllListeners=c,d.emit=c,d.binding=function(){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(){throw new Error("process.chdir is not supported")}},{}],6:[function(a,b){"use strict";b.exports=a("./lib/core.js"),a("./lib/done.js"),a("./lib/es6-extensions.js"),a("./lib/node-extensions.js")},{"./lib/core.js":7,"./lib/done.js":8,"./lib/es6-extensions.js":9,"./lib/node-extensions.js":10}],7:[function(a,b){"use strict";function c(a){function b(a){return null===i?void k.push(a):void f(function(){var b=i?a.onFulfilled:a.onRejected;if(null===b)return void(i?a.resolve:a.reject)(j);var c;try{c=b(j)}catch(d){return void a.reject(d)}a.resolve(c)})}function c(a){try{if(a===l)throw new TypeError("A promise cannot be resolved with itself.");if(a&&("object"==typeof a||"function"==typeof a)){var b=a.then;if("function"==typeof b)return void e(b.bind(a),c,g)}i=!0,j=a,h()}catch(d){g(d)}}function g(a){i=!1,j=a,h()}function h(){for(var a=0,c=k.length;c>a;a++)b(k[a]);k=null}if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof a)throw new TypeError("not a function");var i=null,j=null,k=[],l=this;this.then=function(a,c){return new l.constructor(function(e,f){b(new d(a,c,e,f))})},e(a,c,g)}function d(a,b,c,d){this.onFulfilled="function"==typeof a?a:null,this.onRejected="function"==typeof b?b:null,this.resolve=c,this.reject=d}function e(a,b,c){var d=!1;try{a(function(a){d||(d=!0,b(a))},function(a){d||(d=!0,c(a))})}catch(e){if(d)return;d=!0,c(e)}}var f=a("asap");b.exports=c},{asap:11}],8:[function(a,b){"use strict";var c=a("./core.js"),d=a("asap");b.exports=c,c.prototype.done=function(){var a=arguments.length?this.then.apply(this,arguments):this;a.then(null,function(a){d(function(){throw a})})}},{"./core.js":7,asap:11}],9:[function(a,b){"use strict";function c(a){this.then=function(b){return"function"!=typeof b?this:new d(function(c,d){e(function(){try{c(b(a))}catch(e){d(e)}})})}}var d=a("./core.js"),e=a("asap");b.exports=d,c.prototype=d.prototype;var f=new c(!0),g=new c(!1),h=new c(null),i=new c(void 0),j=new c(0),k=new c("");d.resolve=function(a){if(a instanceof d)return a;if(null===a)return h;if(void 0===a)return i;if(a===!0)return f;if(a===!1)return g;if(0===a)return j;if(""===a)return k;if("object"==typeof a||"function"==typeof a)try{var b=a.then;if("function"==typeof b)return new d(b.bind(a))}catch(e){return new d(function(a,b){b(e)})}return new c(a)},d.all=function(a){var b=Array.prototype.slice.call(a);return new d(function(a,c){function d(f,g){try{if(g&&("object"==typeof g||"function"==typeof g)){var h=g.then;if("function"==typeof h)return void h.call(g,function(a){d(f,a)},c)}b[f]=g,0===--e&&a(b)}catch(i){c(i)}}if(0===b.length)return a([]);for(var e=b.length,f=0;f<b.length;f++)d(f,b[f])})},d.reject=function(a){return new d(function(b,c){c(a)})},d.race=function(a){return new d(function(b,c){a.forEach(function(a){d.resolve(a).then(b,c)})})},d.prototype["catch"]=function(a){return this.then(null,a)}},{"./core.js":7,asap:11}],10:[function(a,b){"use strict";var c=a("./core.js"),d=a("asap");b.exports=c,c.denodeify=function(a,b){return b=b||1/0,function(){var d=this,e=Array.prototype.slice.call(arguments);return new c(function(c,f){for(;e.length&&e.length>b;)e.pop();e.push(function(a,b){a?f(a):c(b)}),a.apply(d,e)})}},c.nodeify=function(a){return function(){var b=Array.prototype.slice.call(arguments),e="function"==typeof b[b.length-1]?b.pop():null,f=this;try{return a.apply(this,arguments).nodeify(e,f)}catch(g){if(null===e||"undefined"==typeof e)return new c(function(a,b){b(g)});d(function(){e.call(f,g)})}}},c.prototype.nodeify=function(a,b){return"function"!=typeof a?this:void this.then(function(c){d(function(){a.call(b,null,c)})},function(c){d(function(){a.call(b,c)})})}},{"./core.js":7,asap:11}],11:[function(a,b){(function(a){function c(){for(;e.next;){e=e.next;var a=e.task;e.task=void 0;var b=e.domain;b&&(e.domain=void 0,b.enter());try{a()}catch(d){if(i)throw b&&b.exit(),setTimeout(c,0),b&&b.enter(),d;setTimeout(function(){throw d},0)}b&&b.exit()}g=!1}function d(b){f=f.next={task:b,domain:i&&a.domain,next:null},g||(g=!0,h())}var e={task:void 0,next:null},f=e,g=!1,h=void 0,i=!1;if("undefined"!=typeof a&&a.nextTick)i=!0,h=function(){a.nextTick(c)};else if("function"==typeof setImmediate)h="undefined"!=typeof window?setImmediate.bind(window,c):function(){setImmediate(c)};else if("undefined"!=typeof MessageChannel){var j=new MessageChannel;j.port1.onmessage=c,h=function(){j.port2.postMessage(0)}}else h=function(){setTimeout(c,0)};b.exports=d}).call(this,a("_process"))},{_process:5}]},{},[1])(1)});
//# sourceMappingURL=appearin-sdk.0.0.4.min.js.map