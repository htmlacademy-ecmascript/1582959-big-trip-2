(()=>{var t={10:(t,e,n)=>{"use strict";n.d(e,{Z:()=>a});var i=n(537),s=n.n(i),r=n(645),o=n.n(r)()(s());o.push([t.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",i=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),i&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),i&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,i,s,r){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(i)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<t.length;c++){var u=[].concat(t[c]);i&&o[u[0]]||(void 0!==r&&(void 0===u[5]||(u[1]="@layer".concat(u[5].length>0?" ".concat(u[5]):""," {").concat(u[1],"}")),u[5]=r),n&&(u[2]?(u[1]="@media ".concat(u[2]," {").concat(u[1],"}"),u[2]=n):u[2]=n),s&&(u[4]?(u[1]="@supports (".concat(u[4],") {").concat(u[1],"}"),u[4]=s):u[4]="".concat(s)),e.push(u))}},e}},537:t=>{"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[e].concat([r]).join("\n")}return[e].join("\n")}},484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",u="year",d="date",p="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},v=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:v,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+v(i,2,"0")+":"+v(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,o=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:u,w:a,d:o,D:d,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",g={};g[y]=m;var b=function(t){return t instanceof w},$=function t(e,n,i){var s;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(s=r),n&&(g[r]=n,s=r);var o=e.split("-");if(!s&&o.length>1)return t(o[0])}else{var a=e.name;g[a]=e,s=a}return!i&&s&&(y=s),s||!i&&y},C=function(t,e){if(b(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new w(n)},M=_;M.l=$,M.i=b,M.w=function(t,e){return C(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var w=function(){function m(t){this.$L=$(t.locale,null,!0),this.parse(t)}var v=m.prototype;return v.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(f);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},v.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},v.$utils=function(){return M},v.isValid=function(){return!(this.$d.toString()===p)},v.isSame=function(t,e){var n=C(t);return this.startOf(e)<=n&&n<=this.endOf(e)},v.isAfter=function(t,e){return C(t)<this.startOf(e)},v.isBefore=function(t,e){return this.endOf(e)<C(t)},v.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(t,e){var n=this,c=!!M.u(e)||e,p=M.p(t),f=function(t,e){var i=M.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(o)},h=function(t,e){return M.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,v=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case u:return c?f(1,0):f(31,11);case l:return c?f(1,v):f(0,v+1);case a:var g=this.$locale().weekStart||0,b=(m<g?m+7:m)-g;return f(c?_-b:_+(6-b),v);case o:case d:return h(y+"Hours",0);case r:return h(y+"Minutes",1);case s:return h(y+"Seconds",2);case i:return h(y+"Milliseconds",3);default:return this.clone()}},v.endOf=function(t){return this.startOf(t,!1)},v.$set=function(t,e){var a,c=M.p(t),p="set"+(this.$u?"UTC":""),f=(a={},a[o]=p+"Date",a[d]=p+"Date",a[l]=p+"Month",a[u]=p+"FullYear",a[r]=p+"Hours",a[s]=p+"Minutes",a[i]=p+"Seconds",a[n]=p+"Milliseconds",a)[c],h=c===o?this.$D+(e-this.$W):e;if(c===l||c===u){var m=this.clone().set(d,1);m.$d[f](h),m.init(),this.$d=m.set(d,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](h);return this.init(),this},v.set=function(t,e){return this.clone().$set(t,e)},v.get=function(t){return this[M.p(t)]()},v.add=function(n,c){var d,p=this;n=Number(n);var f=M.p(c),h=function(t){var e=C(p);return M.w(e.date(e.date()+Math.round(t*n)),p)};if(f===l)return this.set(l,this.$M+n);if(f===u)return this.set(u,this.$y+n);if(f===o)return h(1);if(f===a)return h(7);var m=(d={},d[s]=t,d[r]=e,d[i]=1e3,d)[f]||1,v=this.$d.getTime()+n*m;return M.w(v,this)},v.subtract=function(t,e){return this.add(-1*t,e)},v.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=M.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,u=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},d=function(t){return M.s(r%12||12,t,"0")},f=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:M.s(a+1,2,"0"),MMM:u(n.monthsShort,a,c,3),MMMM:u(c,a),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:u(n.weekdaysMin,this.$W,l,2),ddd:u(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:M.s(r,2,"0"),h:d(1),hh:d(2),a:f(r,o,!0),A:f(r,o,!1),m:String(o),mm:M.s(o,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||m[t]||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(n,d,p){var f,h=M.p(d),m=C(n),v=(m.utcOffset()-this.utcOffset())*t,_=this-m,y=M.m(this,m);return y=(f={},f[u]=y/12,f[l]=y,f[c]=y/3,f[a]=(_-v)/6048e5,f[o]=(_-v)/864e5,f[r]=_/e,f[s]=_/t,f[i]=_/1e3,f)[h]||_,p?y:M.a(y)},v.daysInMonth=function(){return this.endOf(l).$D},v.$locale=function(){return g[this.$L]},v.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=$(t,e,!0);return i&&(n.$L=i),n},v.clone=function(){return M.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},m}(),E=w.prototype;return C.prototype=E,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",u],["$D",d]].forEach((function(t){E[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),C.extend=function(t,e){return t.$i||(t(e,w,C),t.$i=!0),C},C.locale=$,C.isDayjs=b,C.unix=function(t){return C(1e3*t)},C.en=g[y],C.Ls=g,C.p={},C}()},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,i=0;i<e.length;i++)if(e[i].identifier===t){n=i;break}return n}function i(t,i){for(var r={},o=[],a=0;a<t.length;a++){var l=t[a],c=i.base?l[0]+i.base:l[0],u=r[c]||0,d="".concat(c," ").concat(u);r[c]=u+1;var p=n(d),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)e[p].references++,e[p].updater(f);else{var h=s(f,i);i.byIndex=a,e.splice(a,0,{identifier:d,updater:h,references:1})}o.push(d)}return o}function s(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,s){var r=i(t=t||[],s=s||{});return function(t){t=t||[];for(var o=0;o<r.length;o++){var a=n(r[o]);e[a].references--}for(var l=i(t,s),c=0;c<r.length;c++){var u=n(r[c]);0===e[u].references&&(e[u].updater(),e.splice(u,1))}r=l}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var i=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={id:i,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";var t=n(379),e=n.n(t),i=n(795),s=n.n(i),r=n(569),o=n.n(r),a=n(565),l=n.n(a),c=n(216),u=n.n(c),d=n(589),p=n.n(d),f=n(10),h={};h.styleTagTransform=p(),h.setAttributes=l(),h.insert=o().bind(null,"head"),h.domAPI=s(),h.insertStyleElement=u(),e()(f.Z,h),f.Z&&f.Z.locals&&f.Z.locals;const m="shake";class v{#t=null;constructor(){if(new.target===v)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#t||(this.#t=function(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}(this.template)),this.#t}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#t=null}shake(t){this.element.classList.add(m),setTimeout((()=>{this.element.classList.remove(m),t?.()}),600)}}const _="afterbegin";function y(t,e,n="beforeend"){if(!(t instanceof v))throw new Error("Can render only components");if(null===e)throw new Error("Container element doesn't exist");e.insertAdjacentElement(n,t.element)}function g(t,e){if(!(t instanceof v&&e instanceof v))throw new Error("Can replace only components");const n=t.element,i=e.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}function b(t){if(null!==t){if(!(t instanceof v))throw new Error("Can remove only components");t.element.remove(),t.removeElement()}}const $=["Taxi","Bus","Train","Ship","Drive","Flight","Check-in","Sightseeing","Restaurant"],C="everything",M="future",w="present",E="past",S="time",k="price",A=["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Cras aliquet varius magna, non porta ligula feugiat eget.","Fusce tristique felis at fermentum pharetra.","Aliquam id orci ut lectus varius viverra.","Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.","Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.","Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.","Sed sed nisi sed augue convallis suscipit in sed felis.","Aliquam erat volutpat.","Nunc fermentum tortor ac porta dapibus.","In rutrum ac purus sit amet tempus."],D=["Chamonix","Geneva","Amsterdam","Moscow","London"],x="HH:mm",T="YYYY-MM-DD",P="DD/MM/YY HH:mm",F="DEFAULT",B="EDITING";var L=n(484),O=n.n(L);const R=1440;function j(t,e){return t?O()(t).format(e):""}function I(t){const e=O()(t.dateFrom);return O()(t.dateTo).diff(e)}function H(t){return t.sort(((t,e)=>I(e)-I(t)))}const Y={[C]:t=>t,[M]:t=>t.filter((t=>(({dateFrom:t})=>O()().isBefore(t,"day"))(t))),[w]:t=>t.filter((t=>(({dateFrom:t})=>O()().isSame(t,"day"))(t))),[E]:t=>t.filter((t=>(({dateFrom:t})=>O()().isAfter(t,"day"))(t)))};class N extends v{get template(){return'\n  <ul class="trip-events__list"></ul>\n  '}}class q extends v{#e=null;constructor({onSortTypeChange:t}){super(),this.#e=t,this.element.addEventListener("click",this.#n)}get template(){return`\n  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    <div class="trip-sort__item  trip-sort__item--day">\n      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n      <label class="trip-sort__btn" for="sort-day" data-sort-type="day">Day</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--event">\n      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n      <label class="trip-sort__btn" for="sort-event">Event</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--time">\n      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n      <label class="trip-sort__btn" for="sort-time" data-sort-type="${S}">Time</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--price">\n      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n      <label class="trip-sort__btn" for="sort-price" data-sort-type="${k}">Price</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--offer">\n      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n      <label class="trip-sort__btn" for="sort-offer">Offers</label>\n    </div>\n  </form>\n  `}#n=t=>{"trip-sort__btn"===t.target.className&&(t.preventDefault(),this.#e(t.target.dataset.sortType))}}class U extends v{#i=null;constructor({filters:t}){super(),this.#i=t}get template(){return function(t){const e=t.map((t=>function(t){return`\n  <div class="trip-filters__filter">\n      <input id="filter-${t.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${t.type}" ${function(t){return 0===t.count?"disabled":"unchecked"}(t)}>\n      <label class="trip-filters__filter-label" for="filter-${t.type}">${t.type}</label>\n    </div>\n  `}(t))).join("");return`\n  <form class="trip-filters" action="#" method="get">\n    ${e}\n    <button class="visually-hidden" type="submit">Accept filter</button>\n  </form>\n  `}(this.#i)}}class W extends v{get template(){return'\n  <p class="trip-events__msg">Click New Event to create your first point</p>\n  '}}class Z extends v{#s=null;#r=null;#o=null;#a=null;#l=null;constructor({point:t,destination:e,offers:n,onFormSubmit:i,onRollupButtonClick:s}){super(),this.#s=t,this.#r=e,this.#o=n,this.#a=i,this.#l=s,this.element.querySelector(".event--edit").addEventListener("submit",this.#c),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#u)}get template(){return function(t,e,n){const{basePrice:i,dateFrom:s,dateTo:r,type:o,offers:a}=t,l=j(s,P),c=j(r,P);return`\n  <li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n          <div class="event__type-wrapper">\n          <label class="event__type  event__type-btn" for="event-type-toggle-1">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/${o}.png" alt="Event type icon">\n          </label>\n          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n          <div class="event__type-list">\n              <fieldset class="event__type-group">\n              <legend class="visually-hidden">Event type</legend>\n              ${$.map((t=>function(t){return`\n    <div class="event__type-item">\n      <input id="event-type-${t}-1" class="event__type-input visually-hidden" type="radio" name="event-type" value="${t}">\n      <label class="event__type-label event__type-label--${t}" for="event-type-${t}-1">${t}</label>\n    </div>\n  `}(t))).join("")}\n\n              </fieldset>\n          </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n              ${o}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${e.name}" list="destination-list-1">\n          <datalist id="destination-list-1">\n              <option value="Amsterdam"></option>\n              <option value="Geneva"></option>\n              <option value="Chamonix"></option>\n          </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${l}">\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${c}">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n              <span class="visually-hidden">Price</span>\n              &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${i}">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">Cancel</button>\n          <button class="event__rollup-btn" type="button">\n            <span class="visually-hidden">Open event</span>\n          </button>\n      </header>\n      <section class="event__details">\n          <section class="event__section  event__section--offers">\n          <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n          <div class="event__available-offers">\n             ${function(t,e){return t.offers?t.offers.map((({title:t,price:n,id:i})=>` <div class="event__offer-selector">\n        <input class="event__offer-checkbox visually-hidden" id="${i}" type="checkbox" name="${t}" ${e.includes(i)?"checked":""}>\n        <label class="event__offer-label" for="${i}">\n          <span class="event__offer-title">${t}</span>\n          +€&nbsp;\n          <span class="event__offer-price">${n}</span>\n        </label>\n      </div>`)).join(""):""}(n,a)}\n          </div>\n          </section>\n\n          <section class="event__section  event__section--destination">\n          <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n          <p class="event__destination-description">${e.description}</p>\n\n          ${function(t){return t?`<div class="event__photos-container">\n            <div class="event__photos-tape">\n            ${t.pictures.map((({src:t,description:e})=>`<img class="event__photo" src="${t}" alt="${e}"></img>`)).join("")}\n            </div>\n          </div>`:""}(e)}\n          </section>\n      </section>\n      </form>\n  </li>\n`}(this.#s,this.#r,this.#o)}#c=t=>{t.preventDefault(),this.#a(this.#s)};#u=t=>{t.preventDefault(),this.#l()}}class V extends v{#s=null;#r=null;#o=null;#d=null;#p=null;constructor({point:t,destination:e,offers:n,onRollupButtonClick:i,onFavoriteClick:s}){super(),this.#s=t,this.#r=e,this.#o=n,this.#d=i,this.#p=s,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#u),this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#f)}get template(){return function(t,e,n){const{basePrice:i,type:s,dateFrom:r,dateTo:o,isFavorite:a,offers:l}=t,c=j(r,"MMM D"),u=j(r,T),d=j(o,T),p=j(r,x),f=j(o,x),h=a?"event__favorite-btn event__favorite-btn--active":"event__favorite-btn";return`\n  <li class="trip-events__item">\n    <div class="event">\n      <time class="event__date" datetime="${u}">${c}</time>\n      <div class="event__type">\n        <img class="event__type-icon" width="42" height="42" src="img/icons/${s}.png" alt="Event type icon">\n      </div>\n      <h3 class="event__title">${s} ${e.name}</h3>\n      <div class="event__schedule">\n        <p class="event__time">\n          <time class="event__start-time" datetime="${u}T${p}">${p}</time>\n          &mdash;\n          <time class="event__end-time" datetime="${d}T${f}">${f}</time>\n        </p>\n        <p class="event__duration">${function(t,e){const n=O()(t),i=O()(e).diff(n,"minute"),s=Math.floor(i/R),r=Math.floor((i-s*R)/60),o=i-(s*R+60*r);return`${s?`${s}D`:""} ${r?`${r}H`:""} ${o?`${o}M`:"00M"}`}(r,o)}</p>\n      </div>\n      <p class="event__price">\n        &euro;&nbsp;<span class="event__price-value">${i}</span>\n      </p>\n      <h4 class="visually-hidden">Offers:</h4>\n      <ul class="event__selected-offers">\n      ${function(t,e){return t.offers?t.offers.filter((t=>e.includes(t.id))).map((({title:t,price:e})=>`<li class="event__offer">\n          <span class="event__offer-title">${t}</span>\n          &plus;&euro;&nbsp;\n          <span class="event__offer-price">${e}</span>\n        </li>`)).join(""):""}(n,l)}\n      </ul>\n      <button class="${h}" type="button">\n        <span class="visually-hidden">Add to favorite</span>\n        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n        </svg>\n      </button>\n      <button class="event__rollup-btn" type="button">\n        <span class="visually-hidden">Open event</span>\n      </button>\n    </div>\n  </li>\n  `}(this.#s,this.#r,this.#o)}#u=t=>{t.preventDefault(),this.#d()};#f=t=>{t.preventDefault(),this.#p()}}class z{#h=null;#s=null;#m=null;#r=null;#v=null;#_=null;#y=null;#g=null;#b=F;constructor({eventListContainer:t,onDataChange:e,onModeChange:n}){this.#h=t,this.#y=e,this.#g=n}init({point:t,offers:e,destination:n}){this.#s=t,this.#m=e,this.#r=n;const i=this.#v,s=this.#_;this.#v=new V({point:this.#s,offers:this.#m,destination:this.#r,onRollupButtonClick:this.#d,onFavoriteClick:this.#p}),this.#_=new Z({point:this.#s,offers:this.#m,destination:this.#r,onFormSubmit:this.#a,onRollupButtonClick:this.#l}),null!==i&&null!==s?(this.#b===F&&g(this.#v,i),this.#b===B&&g(this.#_,s),b(i),b(s)):y(this.#v,this.#h)}destroy(){b(this.#v),b(this.#_)}resetView(){this.#b!==F&&this.#$()}#C(){g(this.#_,this.#v),document.addEventListener("keydown",this.#M),this.#g(),this.#b=B}#$(){g(this.#v,this.#_),document.removeEventListener("keydown",this.#M),this.#b=F}#M=t=>{"Escape"===t.key&&(t.preventDefault(),this.#$())};#d=()=>{this.#C()};#l=()=>{this.#$()};#a=t=>{this.#y(t),this.#$()};#p=()=>{this.#y({...this.#s,isFavorite:!this.#s.isFavorite})}}const J=t=>t[Math.floor(Math.random()*t.length)];function X(t,e){return t.map((t=>t.id===e.id?e:t))}let G=(t=21)=>{let e="",n=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"[63&n[t]];return e};const K=[{basePrice:1100,dateFrom:"12/12/25 16:00",dateTo:"12/12/25 16:43",destination:11,isFavorite:!1,offers:["taxi-1"],type:"taxi"},{basePrice:2e3,dateFrom:"01/01/19 10:00",dateTo:"01/01/19 13:00",destination:12,isFavorite:!0,offers:["flight-1","flight-2","flight-3"],type:"flight"},{basePrice:1500,dateFrom:"02/06/19 15:00",dateTo:"02/07/19 16:00",destination:13,isFavorite:!1,offers:[],type:"train"},{basePrice:1100,dateFrom:"10/05/19 09:00",dateTo:"10/05/19 13:00",destination:14,isFavorite:!1,offers:[],type:"sightseeing"},{basePrice:500,dateFrom:"08/21/19 16:00",dateTo:"08/21/19 18:00",destination:15,isFavorite:!0,offers:["restaurant-2"],type:"restaurant"}];function Q(){return{id:G(),...J(K)}}const tt=[{id:11,description:J(A),name:J(D),pictures:[{src:"https://img.goodfon.ru/original/3901x2600/d/be/hong-kong-gonkong-megapolis.jpg",description:J(A)},{src:"https://i.pinimg.com/originals/55/88/75/5588755d55ffe02e389ae85168d8fac1.jpg",description:J(A)},{src:"https://avatars.mds.yandex.net/i?id=4b62e59248144abdfba88e5378356f17_l-12525508-images-thumbs&n=13",description:J(A)},{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_City_London.jpg/1600px-The_City_London.jpg",description:J(A)}]},{id:12,description:J(A),name:J(D),pictures:[]},{id:13,description:J(A),name:J(D),pictures:[{src:"https://avatars.mds.yandex.net/i?id=f9e425807be3be06c12bd94bd549ffb3_l-5205329-images-thumbs&n=13",description:J(A)}]},{id:14,description:J(A),name:J(D),pictures:[{src:"https://i.pinimg.com/originals/57/9a/81/579a8119c135c5035bbd4e96df124c31.jpg",description:J(A)},{src:"https://static.wikia.nocookie.net/366c9f7e-a384-4f72-9e83-c2276bb1488a/scale-to-width/755",description:J(A)}]},{id:15,description:J(A),name:J(D),pictures:[{src:"https://avatars.mds.yandex.net/i?id=c45cc78c5548fe72ac9b3154c1126e03_l-4307487-images-thumbs&n=13",description:J(A)},{src:"https://avatars.mds.yandex.net/i?id=484bd843fb585f08109145a6e38cd1a4_l-8311862-images-thumbs&n=13",description:J(A)},{src:"https://i01.fotocdn.net/s205/77d119845fc25c49/public_pin_l/2327635410.jpg",description:J(A)},{src:"https://static1-repo.aif.ru/1/2c/505851/3ea44e467eca224b7987f3adf1078846.jpg",description:J(A)}]}],et=[{type:"taxi",offers:[{id:"taxi-1",title:"Upgrade to a business class",price:120}]},{type:"sightseeing",offers:[{id:"sightseeing-1",title:"Guided tour",price:100},{id:"sightseeing-2",title:"Comfortable bus",price:200}]},{type:"restaurant",offers:[{id:"restaurant-1",title:"Make a pre-order",price:1e3},{id:"restaurant-2",title:"Book a table by the window",price:200}]},{type:"flight",offers:[{id:"flight-1",title:"Upgrade to a business class",price:120},{id:"flight-2",title:"Airport transfer",price:200},{id:"flight-3",title:"Baggage insurance",price:500}]},{type:"train",offers:[]}],nt=document.querySelector(".trip-main"),it=document.querySelector(".trip-events"),st=new class{#w=Array.from({length:4},Q);get points(){return this.#w}},rt=new class{#E=tt;get destinations(){return this.#E}getDestinationById(t){return this.#E.find((e=>e.id===t))}},ot=new class{#m=et;get offers(){return this.#m}getOffersByType(t){return this.#m.find((e=>e.type===t))}},at=(lt=st.points,Object.entries(Y).map((([t,e])=>({type:t,count:e(lt).length}))));var lt;const ct=new class{#S=null;#k=document.querySelector(".trip-controls__filters");#A=null;#D=null;#x=null;#w=[];#T=new Map;#P="day";#F=[];#B=null;#L=null;#O=new N;#R=new W;constructor({container:t,pointsModel:e,offersModel:n,destinationsModel:i,filters:s}){this.#S=t,this.#A=e,this.#D=n,this.#x=i,this.#L=new U({filters:s})}init(){this.#w=[...this.#A.points],this.#F=[...this.#A.points],this.#j(),this.#I()}#g=()=>{this.#T.forEach((t=>t.resetView()))};#H=t=>{this.#w=X(this.#w,t),this.#F=X(this.#F,t),this.#T.get(t.id).init({point:t,offers:this.#D.getOffersByType(t.type),destination:this.#x.getDestinationById(t.destination)})};#Y(t){switch(t){case k:this.#w=[...(e=this.#w,e.sort(((t,e)=>e.basePrice-t.basePrice)))];break;case S:this.#w=[...H(this.#w)];break;default:this.#w=[...this.#F]}var e;this.#P=t}#e=t=>{this.#P!==t&&(this.#Y(t),this.#N(),this.#q())};#U(){this.#B=new q({onSortTypeChange:this.#e}),y(this.#B,this.#S,_)}#I(){y(this.#L,this.#k)}#W(t,e,n){const i=new z({eventListContainer:this.#O.element,onDataChange:this.#H,onModeChange:this.#g});i.init({point:t,offers:e,destination:n}),this.#T.set(t.id,i)}#Z(){y(this.#R,this.#O.element)}#q(){this.#w.forEach((t=>{const e=this.#D.getOffersByType(t.type),n=this.#x.getDestinationById(t.destination);this.#W(t,e,n)}))}#N(){this.#T.forEach((t=>t.destroy())),this.#T.clear()}#j(){y(this.#O,this.#S),0!==this.#w.length?(this.#U(),this.#q()):this.#Z()}}({container:it,pointsModel:st,destinationsModel:rt,offersModel:ot,filters:at});y(new class extends v{get template(){return'\n  <section class="trip-main__trip-info  trip-info">\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n      <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n    </div>\n\n    <p class="trip-info__cost">\n      Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n    </p>\n  </section>\n  '}},nt,_),ct.init()})()})();
//# sourceMappingURL=bundle.d4bdfdf82f715d323969.js.map