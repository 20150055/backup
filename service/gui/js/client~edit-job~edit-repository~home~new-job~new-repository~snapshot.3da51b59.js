(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["client~edit-job~edit-repository~home~new-job~new-repository~snapshot"],{"2a53":function(e,t,n){},"411e":function(e,t,n){"use strict";var i=n("9ab4"),r=n("60a3"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{attrs:{"fill-height":"","justify-center":"","align-center":"",column:""}},[n("logo",{attrs:{loader:""}}),n("div",{staticStyle:{"min-width":"200px","flex-grow":"0"}},[n("v-progress-linear",{attrs:{value:100*e.value,indeterminate:e.indeterminate||e.automaticIndeterminate,color:"accent"}})],1)],1)},a=[],s=n("ee1b"),c=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return i["d"](t,e),Object.defineProperty(t.prototype,"automaticIndeterminate",{get:function(){return this.value>.99},enumerable:!0,configurable:!0}),i["c"]([Object(r["e"])({type:Number,default:0,validator:function(e){return e>=0&&e<=1}})],t.prototype,"value",void 0),i["c"]([Object(r["e"])({type:Boolean,default:!1})],t.prototype,"indeterminate",void 0),t=i["c"]([Object(r["a"])({components:{Logo:s["a"]}})],t),t}(Object(r["d"])()),l=c,h=l,u=n("2877"),d=n("6544"),f=n.n(d),p=n("a722"),v=n("8e36"),m=Object(u["a"])(h,o,a,!1,null,null,null),g=m.exports;f()(m,{VLayout:p["a"],VProgressLinear:v["a"]}),n.d(t,"a",function(){return b});var b=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.currentLoadingPercentage=1,t.shouldFinishLoading=!1,t}return i["d"](t,e),Object.defineProperty(t.prototype,"currentlyLoading",{get:function(){return this.currentLoadingPercentage<1},enumerable:!0,configurable:!0}),t.prototype.setLoading=function(e){e?(this.currentLoadingPercentage=0,this.shouldFinishLoading=!1):this.shouldFinishLoading=!0},t.prototype.updateLoadingPercentage=function(){var e=this;this.currentlyLoading&&setTimeout(function(){e.currentLoadingPercentage+=e.shouldFinishLoading?.3:Math.random()*(.1*(1-e.currentLoadingPercentage)),e.shouldFinishLoading&&(e.currentLoadingPercentage=Math.max(.99,e.currentLoadingPercentage)),e.currentlyLoading&&e.updateLoadingPercentage()},this.shouldFinishLoading?500:200*Math.random())},i["c"]([Object(r["g"])("currentlyLoading")],t.prototype,"updateLoadingPercentage",null),t=i["c"]([Object(r["a"])({components:{FullscreenLoader:g}})],t),t}(r["f"])},"421b":function(e,t,n){"use strict";n("f136");var i=n("411e"),r=n("9ab4"),o=n("60a3"),a=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r["d"](t,e),t.prototype.ordinal=function(e){if("de"===this.$i18n.locale)return e+".";var t=e%10,n=e%100;return 1===t&&11!==n?e+"st":2===t&&12!==n?e+"nd":3===t&&13!==n?e+"rd":e+"th"},t=r["c"]([Object(o["a"])({components:{}})],t),t}(o["f"]),s=(n("10d5"),n("05e1")),c=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r["d"](t,e),t.prototype.$relativeDate=function(e){return Object(s["h"])(e)},t=r["c"]([Object(o["a"])({components:{}})],t),t}(o["f"]),l="mdi-file-image",h="mdi-file-account",u="mdi-file-excel",d="mdi-file-lock",f="mdi-file-music",p="mdi-file-pdf",v="mdi-file-powerpoint",m="mdi-file-video",g="mdi-file-word",b="mdi-file-xml",y="mdi-file-table",O="mdi-file-document",C="mdi-file-move",w="mdi-console",_="mdi-zip-box",j={png:l,jpg:l,jpeg:l,gif:l,bashrc:h,xlsx:u,xls:u,lock:d,mp3:f,wav:f,m4a:f,pdf:p,pptx:v,ppt:v,mp4:m,webm:m,docx:g,doc:g,xml:b,html:b,htm:b,php:b,db:y,txt:O,log:O,yml:O,yaml:O,md:O,ini:y,lnk:C,exe:w,dll:w,jar:w,bat:w,sh:w,zip:_,gz:_,"7z":_},S=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r["d"](t,e),t.prototype.$getFileIcon=function(e){var t=e.split(".").pop()||"";return j[t]||"mdi-file"},t=r["c"]([Object(o["a"])({components:{}})],t),t}(o["f"]);n.d(t,"c",function(){return i["a"]}),n.d(t,"d",function(){return a}),n.d(t,"a",function(){return c}),n.d(t,"b",function(){return S})},4796:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-card",{staticClass:"the-file-browser"},[e.hideChrome?e._e():n("v-toolbar",{attrs:{dense:"",card:"",color:"accent"}},[n("v-icon",[e._v("mdi-file-tree")]),n("v-toolbar-title",[e._v(e._s(e.$t("file-browser.local-files")))]),n("v-spacer"),n("v-btn",{attrs:{icon:""},on:{click:e.refreshBrowser}},[n("v-icon",[e._v("mdi-refresh")])],1)],1),n("v-layout",[n("v-flex",[n("v-card-text",{class:{"pa-0":e.hideChrome}},[e.shouldDisplayTreeView?n("v-treeview",{attrs:{"load-children":e.fetch,items:e.folders,"selected-color":"accent","open-on-click":!e.folderOnly,open:e.opened,selectable:!e.folderOnly,activatable:e.folderOnly,active:e.activeItems,"active-class":"primary",hoverable:"",transition:"","item-key":"fullPath","loading-icon":"mdi-loading","expand-icon":"mdi-chevron-down","on-icon":"mdi-checkbox-marked","off-icon":"mdi-checkbox-blank-outline","indeterminate-icon":"mdi-checkbox-intermediate"},on:{"update:open":function(t){e.opened=t},"update:active":function(t){e.activeItems=t}},scopedSlots:e._u([{key:"prepend",fn:function(t){var i=t.item,r=t.open;return[i.folder?n("v-icon",{staticClass:"yellow--text text--darken-2"},[e._v(e._s(r?"mdi-folder-open":"mdi-folder"))]):n("v-icon",[e._v(e._s(i.icon||e.$getFileIcon(i.name)))])]}}],null,!1,2957931795),model:{value:e.tree,callback:function(t){e.tree=t},expression:"tree"}}):n("v-flex",[n("v-progress-linear",{attrs:{indeterminate:""}}),e._v("\n          "+e._s(e.currentFetchStep)+"\n        ")],1)],1)],1)],1),e.hideSelection||e.hideDivider?e._e():n("v-divider"),e.hideSelection?e._e():n("v-slide-x-reverse-transition",{attrs:{group:""}},e._l(e.value,function(t){return n("v-chip",{key:t,attrs:{close:""},on:{input:function(n){e.value.splice(e.value.indexOf(t),1)}}},[n("pre",[e._v(e._s(t))])])}),1)],1)},r=[],o=n("9ab4"),a=n("60a3"),s=n("ea31"),c=n("df7c"),l=n("c36e"),h=n.n(l),u=n("421b"),d=function(e){return Object(s["b"])(e).then(function(e){return o["a"]({},e,{payload:o["a"]({},e.payload,{folder:e.payload.folder.sort(function(e,t){return e.folder===t.folder?0:e.folder?-1:1})})})})},f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.folders=[],t.isLoading=!1,t.tree=[],t.maxInitialFetchDepth=2,t.shouldDisplayTreeView=!1,t.currentFetchStep="",t.activeItems=[],t.opened=[],t}return o["d"](t,e),t.prototype.onActiveItemsChange=function(){this.folderOnly&&(this.tree=this.activeItems.length?[this.activeItems[0]]:[])},t.prototype.openFolder=function(e){return o["b"](this,void 0,void 0,function(){var t,n;return o["e"](this,function(i){for(console.log("called open folder",e),t=e,n=[];;)if(t=c["dirname"](t),n.push(t,""+t+c["sep"]),c["dirname"](t)===t)break;return this.opened=n,[2]})})},t.prototype.refreshBrowser=function(){return o["b"](this,void 0,void 0,function(){return o["e"](this,function(e){switch(e.label){case 0:return[4,this.manuallySetFolders(this.tree)];case 1:return e.sent(),[2]}})})},t.prototype.processResponse=function(e){if(!e.payload)return[];var t=e.payload.folder.map(function(e){return o["a"]({},e,{children:e.folder?[]:void 0})});return this.folderOnly?t.filter(function(e){return e.folder}):t},t.prototype.mounted=function(){return o["b"](this,void 0,void 0,function(){var e;return o["e"](this,function(t){switch(t.label){case 0:return this.onValueChange(),this.currentFetchStep=this.$t("file-browser.loading-root-children").toString(),console.log("dirpath",this.dirpath),console.log("clientfilebrowser",this.client),this.dirpath?this.client?[4,Object(s["c"])({path:this.dirpath,clientId:this.client})]:[3,2]:[3,5];case 1:return e=t.sent(),[3,4];case 2:return[4,d({path:this.dirpath})];case 3:e=t.sent(),t.label=4;case 4:return[3,9];case 5:return this.client?[4,Object(s["c"])({path:!1,clientId:this.client})]:[3,7];case 6:return e=t.sent(),[3,9];case 7:return[4,d({path:!1})];case 8:e=t.sent(),t.label=9;case 9:return console.log("fodlersclient",e),this.folders=this.processResponse(e),this.onValueChange(),[4,this.fetchChildrenExistingInModel(this.folders)];case 10:return t.sent(),this.shouldDisplayTreeView=!0,[2]}})})},t.prototype.fetch=function(e){return o["b"](this,void 0,Promise,function(){var t;return o["e"](this,function(n){switch(n.label){case 0:return this.client?[4,Object(s["c"])({path:e.fullPath,clientId:this.client})]:[3,2];case 1:return t=n.sent(),[3,4];case 2:return[4,d({path:e.fullPath})];case 3:t=n.sent(),n.label=4;case 4:return e.children=e.children&&e.children.length&&e.children||this.processResponse(t),[2]}})})},t.prototype.fetchChildrenExistingInModel=function(e,t){return void 0===t&&(t=0),o["b"](this,void 0,void 0,function(){var n=this;return o["e"](this,function(i){return++t,[2,Promise.all(e.filter(function(e){return e.folder}).map(function(e){return o["b"](n,void 0,void 0,function(){var n,i,r;return o["e"](this,function(o){switch(o.label){case 0:return o.trys.push([0,4,,5]),this.value.some(function(t){return c["normalize"](t).startsWith(c["normalize"](e.fullPath))})?(this.currentFetchStep=this.$t("file-browser.loading-children-of").toString()+" "+e.fullPath,n=e,i=this.processResponse,[4,d({path:e.fullPath})]):[3,3];case 1:return n.children=i.apply(this,[o.sent()]),t<this.maxInitialFetchDepth?[4,this.fetchChildrenExistingInModel(e.children,t)]:[3,3];case 2:o.sent(),o.label=3;case 3:return[3,5];case 4:return r=o.sent(),console.log(r),[3,5];case 5:return[2]}})})}))]})})},t.prototype.manuallySetFolders=function(e){return o["b"](this,void 0,void 0,function(){var t;return o["e"](this,function(n){switch(n.label){case 0:return this.shouldDisplayTreeView?(this.shouldDisplayTreeView=!1,this.tree=e.slice(),this.onValueChange(),this.dirpath?[3,6]:(t=void 0,this.client?[4,Object(s["c"])({path:!1,clientId:this.client})]:[3,2])):[3,12];case 1:return t=n.sent(),[3,4];case 2:return[4,d({path:!1})];case 3:t=n.sent(),n.label=4;case 4:return this.folders=this.processResponse(t),[4,this.fetchChildrenExistingInModel(this.folders)];case 5:return n.sent(),this.shouldDisplayTreeView=!0,[3,12];case 6:return t=void 0,this.client?[4,Object(s["c"])({path:!1,clientId:this.client})]:[3,8];case 7:return t=n.sent(),[3,10];case 8:return[4,d({path:!1})];case 9:t=n.sent(),n.label=10;case 10:return this.folders=this.processResponse(t),[4,this.fetchChildrenExistingInModel(this.folders)];case 11:n.sent(),this.shouldDisplayTreeView=!0,n.label=12;case 12:return[2]}})})},t.prototype.setValue=function(e){},t.prototype.updateModel=function(){var e=this,t=[];h()(this.tree.slice()).sort(function(e,t){return e.length-t.length}).forEach(function(e){t.find(function(t){return e.startsWith(t)})||t.push(e)});var n=t.length===this.value.length;t.forEach(function(t,i){t!==e.value[i]&&(n=!1)}),n||this.$nextTick(function(){requestAnimationFrame(function(){e.setValue(t)})})},t.prototype.callOnValueChange=function(){this.tree=this.value,this.onValueChange()},t.prototype.onValueChange=function(){this.maxInitialFetchDepth=Math.max.apply(Math,[this.maxInitialFetchDepth].concat(this.value.map(function(e){return e.split(c["sep"]).length+1})))},o["c"]([Object(a["e"])({type:Array,required:!0})],t.prototype,"value",void 0),o["c"]([Object(a["e"])({type:[Boolean],default:!1})],t.prototype,"hideChrome",void 0),o["c"]([Object(a["e"])({type:[String,Boolean],default:!1})],t.prototype,"client",void 0),o["c"]([Object(a["e"])({type:[Boolean],default:!1})],t.prototype,"folderOnly",void 0),o["c"]([Object(a["e"])({type:[Boolean],default:!1})],t.prototype,"hideSelection",void 0),o["c"]([Object(a["e"])({type:[String,Boolean],default:!1})],t.prototype,"dirpath",void 0),o["c"]([Object(a["e"])({type:[Boolean],default:!1})],t.prototype,"hideDivider",void 0),o["c"]([Object(a["g"])("activeItems")],t.prototype,"onActiveItemsChange",null),o["c"]([Object(a["b"])("input")],t.prototype,"setValue",null),o["c"]([Object(a["g"])("folders",{immediate:!0,deep:!0}),Object(a["g"])("tree")],t.prototype,"updateModel",null),o["c"]([Object(a["g"])("folders",{immediate:!0,deep:!0}),Object(a["g"])("value",{immediate:!0,deep:!0})],t.prototype,"callOnValueChange",null),t=o["c"]([Object(a["a"])({})],t),t}(Object(a["d"])(u["b"])),p=f,v=p,m=(n("a037"),n("2877")),g=n("6544"),b=n.n(g),y=n("8336"),O=n("b0af"),C=n("99d9"),w=n("cc20"),_=n("ce7e"),j=n("0e8f"),S=n("132d"),x=n("a722"),I=n("8e36"),A=n("0789"),k=n("9910"),P=n("71d9"),L=n("2a7f"),$=n("eb2a"),V=Object(m["a"])(v,i,r,!1,null,null,null);t["a"]=V.exports;b()(V,{VBtn:y["a"],VCard:O["a"],VCardText:C["b"],VChip:w["a"],VDivider:_["a"],VFlex:j["a"],VIcon:S["a"],VLayout:x["a"],VProgressLinear:I["a"],VSlideXReverseTransition:A["e"],VSpacer:k["a"],VToolbar:P["a"],VToolbarTitle:L["a"],VTreeview:$["a"]})},"7b16":function(e,t,n){},a037:function(e,t,n){"use strict";var i=n("2a53"),r=n.n(i);r.a},c36e:function(e,t,n){(function(t){var n=200,i="__lodash_hash_undefined__",r=1/0,o="[object Function]",a="[object GeneratorFunction]",s=/[\\^$.*+?()[\]{}|]/g,c=/^\[object .+?Constructor\]$/,l="object"==typeof t&&t&&t.Object===Object&&t,h="object"==typeof self&&self&&self.Object===Object&&self,u=l||h||Function("return this")();function d(e,t){var n=e?e.length:0;return!!n&&v(e,t,0)>-1}function f(e,t,n){var i=-1,r=e?e.length:0;while(++i<r)if(n(t,e[i]))return!0;return!1}function p(e,t,n,i){var r=e.length,o=n+(i?1:-1);while(i?o--:++o<r)if(t(e[o],o,e))return o;return-1}function v(e,t,n){if(t!==t)return p(e,m,n);var i=n-1,r=e.length;while(++i<r)if(e[i]===t)return i;return-1}function m(e){return e!==e}function g(e,t){return e.has(t)}function b(e,t){return null==e?void 0:e[t]}function y(e){var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"")}catch(n){}return t}function O(e){var t=-1,n=Array(e.size);return e.forEach(function(e){n[++t]=e}),n}var C=Array.prototype,w=Function.prototype,_=Object.prototype,j=u["__core-js_shared__"],S=function(){var e=/[^.]+$/.exec(j&&j.keys&&j.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}(),x=w.toString,I=_.hasOwnProperty,A=_.toString,k=RegExp("^"+x.call(I).replace(s,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),P=C.splice,L=ae(u,"Map"),$=ae(u,"Set"),V=ae(Object,"create");function E(e){var t=-1,n=e?e.length:0;this.clear();while(++t<n){var i=e[t];this.set(i[0],i[1])}}function T(){this.__data__=V?V(null):{}}function F(e){return this.has(e)&&delete this.__data__[e]}function B(e){var t=this.__data__;if(V){var n=t[e];return n===i?void 0:n}return I.call(t,e)?t[e]:void 0}function D(e){var t=this.__data__;return V?void 0!==t[e]:I.call(t,e)}function K(e,t){var n=this.__data__;return n[e]=V&&void 0===t?i:t,this}function M(e){var t=-1,n=e?e.length:0;this.clear();while(++t<n){var i=e[t];this.set(i[0],i[1])}}function N(){this.__data__=[]}function W(e){var t=this.__data__,n=te(t,e);if(n<0)return!1;var i=t.length-1;return n==i?t.pop():P.call(t,n,1),!0}function R(e){var t=this.__data__,n=te(t,e);return n<0?void 0:t[n][1]}function z(e){return te(this.__data__,e)>-1}function q(e,t){var n=this.__data__,i=te(n,e);return i<0?n.push([e,t]):n[i][1]=t,this}function J(e){var t=-1,n=e?e.length:0;this.clear();while(++t<n){var i=e[t];this.set(i[0],i[1])}}function G(){this.__data__={hash:new E,map:new(L||M),string:new E}}function X(e){return oe(this,e)["delete"](e)}function H(e){return oe(this,e).get(e)}function Q(e){return oe(this,e).has(e)}function U(e,t){return oe(this,e).set(e,t),this}function Y(e){var t=-1,n=e?e.length:0;this.__data__=new J;while(++t<n)this.add(e[t])}function Z(e){return this.__data__.set(e,i),this}function ee(e){return this.__data__.has(e)}function te(e,t){var n=e.length;while(n--)if(ue(e[n][0],t))return n;return-1}function ne(e){if(!fe(e)||ce(e))return!1;var t=de(e)||y(e)?k:c;return t.test(le(e))}function ie(e,t,i){var r=-1,o=d,a=e.length,s=!0,c=[],l=c;if(i)s=!1,o=f;else if(a>=n){var h=t?null:re(e);if(h)return O(h);s=!1,o=g,l=new Y}else l=t?[]:c;e:while(++r<a){var u=e[r],p=t?t(u):u;if(u=i||0!==u?u:0,s&&p===p){var v=l.length;while(v--)if(l[v]===p)continue e;t&&l.push(p),c.push(u)}else o(l,p,i)||(l!==c&&l.push(p),c.push(u))}return c}E.prototype.clear=T,E.prototype["delete"]=F,E.prototype.get=B,E.prototype.has=D,E.prototype.set=K,M.prototype.clear=N,M.prototype["delete"]=W,M.prototype.get=R,M.prototype.has=z,M.prototype.set=q,J.prototype.clear=G,J.prototype["delete"]=X,J.prototype.get=H,J.prototype.has=Q,J.prototype.set=U,Y.prototype.add=Y.prototype.push=Z,Y.prototype.has=ee;var re=$&&1/O(new $([,-0]))[1]==r?function(e){return new $(e)}:pe;function oe(e,t){var n=e.__data__;return se(t)?n["string"==typeof t?"string":"hash"]:n.map}function ae(e,t){var n=b(e,t);return ne(n)?n:void 0}function se(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}function ce(e){return!!S&&S in e}function le(e){if(null!=e){try{return x.call(e)}catch(t){}try{return e+""}catch(t){}}return""}function he(e){return e&&e.length?ie(e):[]}function ue(e,t){return e===t||e!==e&&t!==t}function de(e){var t=fe(e)?A.call(e):"";return t==o||t==a}function fe(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function pe(){}e.exports=he}).call(this,n("c8ba"))},df7c:function(e,t,n){"use strict";(function(t){function n(e){if("string"!==typeof e)throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}function i(e,t){for(var n,i="",r=0,o=-1,a=0,s=0;s<=e.length;++s){if(s<e.length)n=e.charCodeAt(s);else{if(47===n)break;n=47}if(47===n){if(o===s-1||1===a);else if(o!==s-1&&2===a){if(i.length<2||2!==r||46!==i.charCodeAt(i.length-1)||46!==i.charCodeAt(i.length-2))if(i.length>2){var c=i.lastIndexOf("/");if(c!==i.length-1){-1===c?(i="",r=0):(i=i.slice(0,c),r=i.length-1-i.lastIndexOf("/")),o=s,a=0;continue}}else if(2===i.length||1===i.length){i="",r=0,o=s,a=0;continue}t&&(i.length>0?i+="/..":i="..",r=2)}else i.length>0?i+="/"+e.slice(o+1,s):i=e.slice(o+1,s),r=s-o-1;o=s,a=0}else 46===n&&-1!==a?++a:a=-1}return i}function r(e,t){var n=t.dir||t.root,i=t.base||(t.name||"")+(t.ext||"");return n?n===t.root?n+i:n+e+i:i}var o={resolve:function(){for(var e,r="",o=!1,a=arguments.length-1;a>=-1&&!o;a--){var s;a>=0?s=arguments[a]:(void 0===e&&(e=t.cwd()),s=e),n(s),0!==s.length&&(r=s+"/"+r,o=47===s.charCodeAt(0))}return r=i(r,!o),o?r.length>0?"/"+r:"/":r.length>0?r:"."},normalize:function(e){if(n(e),0===e.length)return".";var t=47===e.charCodeAt(0),r=47===e.charCodeAt(e.length-1);return e=i(e,!t),0!==e.length||t||(e="."),e.length>0&&r&&(e+="/"),t?"/"+e:e},isAbsolute:function(e){return n(e),e.length>0&&47===e.charCodeAt(0)},join:function(){if(0===arguments.length)return".";for(var e,t=0;t<arguments.length;++t){var i=arguments[t];n(i),i.length>0&&(void 0===e?e=i:e+="/"+i)}return void 0===e?".":o.normalize(e)},relative:function(e,t){if(n(e),n(t),e===t)return"";if(e=o.resolve(e),t=o.resolve(t),e===t)return"";for(var i=1;i<e.length;++i)if(47!==e.charCodeAt(i))break;for(var r=e.length,a=r-i,s=1;s<t.length;++s)if(47!==t.charCodeAt(s))break;for(var c=t.length,l=c-s,h=a<l?a:l,u=-1,d=0;d<=h;++d){if(d===h){if(l>h){if(47===t.charCodeAt(s+d))return t.slice(s+d+1);if(0===d)return t.slice(s+d)}else a>h&&(47===e.charCodeAt(i+d)?u=d:0===d&&(u=0));break}var f=e.charCodeAt(i+d),p=t.charCodeAt(s+d);if(f!==p)break;47===f&&(u=d)}var v="";for(d=i+u+1;d<=r;++d)d!==r&&47!==e.charCodeAt(d)||(0===v.length?v+="..":v+="/..");return v.length>0?v+t.slice(s+u):(s+=u,47===t.charCodeAt(s)&&++s,t.slice(s))},_makeLong:function(e){return e},dirname:function(e){if(n(e),0===e.length)return".";for(var t=e.charCodeAt(0),i=47===t,r=-1,o=!0,a=e.length-1;a>=1;--a)if(t=e.charCodeAt(a),47===t){if(!o){r=a;break}}else o=!1;return-1===r?i?"/":".":i&&1===r?"//":e.slice(0,r)},basename:function(e,t){if(void 0!==t&&"string"!==typeof t)throw new TypeError('"ext" argument must be a string');n(e);var i,r=0,o=-1,a=!0;if(void 0!==t&&t.length>0&&t.length<=e.length){if(t.length===e.length&&t===e)return"";var s=t.length-1,c=-1;for(i=e.length-1;i>=0;--i){var l=e.charCodeAt(i);if(47===l){if(!a){r=i+1;break}}else-1===c&&(a=!1,c=i+1),s>=0&&(l===t.charCodeAt(s)?-1===--s&&(o=i):(s=-1,o=c))}return r===o?o=c:-1===o&&(o=e.length),e.slice(r,o)}for(i=e.length-1;i>=0;--i)if(47===e.charCodeAt(i)){if(!a){r=i+1;break}}else-1===o&&(a=!1,o=i+1);return-1===o?"":e.slice(r,o)},extname:function(e){n(e);for(var t=-1,i=0,r=-1,o=!0,a=0,s=e.length-1;s>=0;--s){var c=e.charCodeAt(s);if(47!==c)-1===r&&(o=!1,r=s+1),46===c?-1===t?t=s:1!==a&&(a=1):-1!==t&&(a=-1);else if(!o){i=s+1;break}}return-1===t||-1===r||0===a||1===a&&t===r-1&&t===i+1?"":e.slice(t,r)},format:function(e){if(null===e||"object"!==typeof e)throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return r("/",e)},parse:function(e){n(e);var t={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return t;var i,r=e.charCodeAt(0),o=47===r;o?(t.root="/",i=1):i=0;for(var a=-1,s=0,c=-1,l=!0,h=e.length-1,u=0;h>=i;--h)if(r=e.charCodeAt(h),47!==r)-1===c&&(l=!1,c=h+1),46===r?-1===a?a=h:1!==u&&(u=1):-1!==a&&(u=-1);else if(!l){s=h+1;break}return-1===a||-1===c||0===u||1===u&&a===c-1&&a===s+1?-1!==c&&(t.base=t.name=0===s&&o?e.slice(1,c):e.slice(s,c)):(0===s&&o?(t.name=e.slice(1,a),t.base=e.slice(1,c)):(t.name=e.slice(s,a),t.base=e.slice(s,c)),t.ext=e.slice(a,c)),s>0?t.dir=e.slice(0,s-1):o&&(t.dir="/"),t},sep:"/",delimiter:":",win32:null,posix:null};o.posix=o,e.exports=o}).call(this,n("4362"))},ea31:function(e,t,n){"use strict";n.d(t,"b",function(){return s}),n.d(t,"c",function(){return c}),n.d(t,"a",function(){return l});var i=n("9ab4"),r=n("be95"),o=n("073d"),a=void 0,s=function(e){return i["b"](a,void 0,Promise,function(){var t;return i["e"](this,function(n){switch(n.label){case 0:return[4,o["a"].get("/system/directory",{params:e})];case 1:return t=n.sent(),[2,Object(r["W"])(t)]}})})},c=function(e){return i["b"](a,void 0,Promise,function(){var t;return i["e"](this,function(n){switch(n.label){case 0:return[4,o["a"].get("/admin/client/"+e.clientId+"/dir",{params:e})];case 1:return t=n.sent(),console.log("responseclient",t),console.log("args",e),[2,Object(r["W"])(t)]}})})},l=function(e){return i["b"](a,void 0,Promise,function(){var t;return i["e"](this,function(n){switch(n.label){case 0:return[4,o["a"].post("/system/directory",e)];case 1:return t=n.sent(),[2,Object(r["W"])(t)]}})})}},eb2a:function(e,t,n){"use strict";n("7b16");var i=n("0789"),r=n("132d"),o=n("94ab"),a=n("58df"),s=n("80d2"),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e};function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h={activatable:Boolean,activeClass:{type:String,default:"v-treeview-node--active"},selectable:Boolean,selectedColor:{type:String,default:"accent"},indeterminateIcon:{type:String,default:"$vuetify.icons.checkboxIndeterminate"},onIcon:{type:String,default:"$vuetify.icons.checkboxOn"},offIcon:{type:String,default:"$vuetify.icons.checkboxOff"},expandIcon:{type:String,default:"$vuetify.icons.subgroup"},loadingIcon:{type:String,default:"$vuetify.icons.loading"},itemKey:{type:String,default:"id"},itemText:{type:String,default:"name"},itemChildren:{type:String,default:"children"},loadChildren:Function,openOnClick:Boolean,transition:Boolean},u=Object(a["a"])(Object(o["a"])("treeview")).extend({name:"v-treeview-node",inject:{treeview:{default:null}},props:c({item:{type:Object,default:function(){return null}}},h),data:function(){return{isOpen:!1,isSelected:!1,isIndeterminate:!1,isActive:!1,isLoading:!1,hasLoaded:!1}},computed:{key:function(){return Object(s["m"])(this.item,this.itemKey)},children:function(){return Object(s["m"])(this.item,this.itemChildren)},text:function(){return Object(s["m"])(this.item,this.itemText)},scopedProps:function(){return{item:this.item,leaf:!this.children,selected:this.isSelected,indeterminate:this.isIndeterminate,active:this.isActive,open:this.isOpen}},computedIcon:function(){return this.isIndeterminate?this.indeterminateIcon:this.isSelected?this.onIcon:this.offIcon},hasChildren:function(){return!!this.children&&(!!this.children.length||!!this.loadChildren)}},created:function(){this.treeview.register(this)},beforeDestroy:function(){this.treeview.unregister(this)},methods:{checkChildren:function(){var e=this;return new Promise(function(t){if(!e.children||e.children.length||!e.loadChildren||e.hasLoaded)return t();e.isLoading=!0,t(e.loadChildren(e.item))}).then(function(){e.isLoading=!1,e.hasLoaded=!0})},open:function(){this.isOpen=!this.isOpen,this.treeview.updateOpen(this.key,this.isOpen),this.treeview.emitOpen()},genLabel:function(){var e=[];return this.$scopedSlots.label?e.push(this.$scopedSlots.label(this.scopedProps)):e.push(this.text),this.$createElement("div",{slot:"label",staticClass:"v-treeview-node__label"},e)},genContent:function(){var e=[this.$scopedSlots.prepend&&this.$scopedSlots.prepend(this.scopedProps),this.genLabel(),this.$scopedSlots.append&&this.$scopedSlots.append(this.scopedProps)];return this.$createElement("div",{staticClass:"v-treeview-node__content"},e)},genToggle:function(){var e=this;return this.$createElement(r["a"],{staticClass:"v-treeview-node__toggle",class:{"v-treeview-node__toggle--open":this.isOpen,"v-treeview-node__toggle--loading":this.isLoading},slot:"prepend",on:{click:function(t){t.stopPropagation(),e.isLoading||e.checkChildren().then(function(){return e.open()})}}},[this.isLoading?this.loadingIcon:this.expandIcon])},genCheckbox:function(){var e=this;return this.$createElement(r["a"],{staticClass:"v-treeview-node__checkbox",props:{color:this.isSelected?this.selectedColor:void 0},on:{click:function(t){t.stopPropagation(),e.isLoading||e.checkChildren().then(function(){e.$nextTick(function(){e.isSelected=!e.isSelected,e.isIndeterminate=!1,e.treeview.updateSelected(e.key,e.isSelected),e.treeview.emitSelected()})})}}},[this.computedIcon])},genNode:function(){var e=this,t=[this.genContent()];return this.selectable&&t.unshift(this.genCheckbox()),this.hasChildren&&t.unshift(this.genToggle()),this.$createElement("div",{staticClass:"v-treeview-node__root",class:l({},this.activeClass,this.isActive),on:{click:function(){e.openOnClick&&e.children?e.open():e.activatable&&(e.isActive=!e.isActive,e.treeview.updateActive(e.key,e.isActive),e.treeview.emitActive())}}},t)},genChild:function(e){return this.$createElement(u,{key:Object(s["m"])(e,this.itemKey),props:{activatable:this.activatable,activeClass:this.activeClass,item:e,selectable:this.selectable,selectedColor:this.selectedColor,expandIcon:this.expandIcon,indeterminateIcon:this.indeterminateIcon,offIcon:this.offIcon,onIcon:this.onIcon,loadingIcon:this.loadingIcon,itemKey:this.itemKey,itemText:this.itemText,itemChildren:this.itemChildren,loadChildren:this.loadChildren,transition:this.transition,openOnClick:this.openOnClick},scopedSlots:this.$scopedSlots})},genChildrenWrapper:function(){if(!this.isOpen||!this.children)return null;var e=[this.children.map(this.genChild)];return this.$createElement("div",{staticClass:"v-treeview-node__children"},e)},genTransition:function(){return this.$createElement(i["a"],[this.genChildrenWrapper()])}},render:function(e){var t=[this.genNode()];return this.transition?t.push(this.genTransition()):t.push(this.genChildrenWrapper()),e("div",{staticClass:"v-treeview-node",class:{"v-treeview-node--leaf":!this.hasChildren,"v-treeview-node--click":this.openOnClick,"v-treeview-node--selected":this.isSelected,"v-treeview-node--excluded":this.treeview.isExcluded(this.key)}},t)}}),d=n("6a18"),f=n("d9bd");function p(e,t,n){var i=Object(s["m"])(e,n);return i.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1}function v(e,t,n,i,r,o,a){if(e(t,n,r))return!0;var c=Object(s["m"])(t,o);if(c){for(var l=!1,h=0;h<c.length;h++)v(e,c[h],n,i,r,o,a)&&(l=!0);if(l)return!0}return a.add(Object(s["m"])(t,i)),!1}var m=function(){function e(e,t){var n=[],i=!0,r=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(i=(a=s.next()).done);i=!0)if(n.push(a.value),t&&n.length===t)break}catch(c){r=!0,o=c}finally{try{!i&&s["return"]&&s["return"]()}finally{if(r)throw o}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),g=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i])}return e};function b(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}t["a"]=Object(a["a"])(Object(o["b"])("treeview"),d["a"]).extend({name:"v-treeview",provide:function(){return{treeview:this}},props:g({active:{type:Array,default:function(){return[]}},items:{type:Array,default:function(){return[]}},hoverable:Boolean,multipleActive:Boolean,open:{type:Array,default:function(){return[]}},openAll:Boolean,returnObject:{type:Boolean,default:!1},value:{type:Array,default:function(){return[]}},search:String,filter:Function},h),data:function(){return{nodes:{},selectedCache:new Set,activeCache:new Set,openCache:new Set}},computed:{excludedItems:function(){var e=new Set;if(!this.search)return e;for(var t=0;t<this.items.length;t++)v(this.filter||p,this.items[t],this.search,this.itemKey,this.itemText,this.itemChildren,e);return e}},watch:{items:{handler:function(){var e=this,t=Object.keys(this.nodes).map(function(t){return Object(s["m"])(e.nodes[t].item,e.itemKey)}),n=this.getKeys(this.items),i=Object(s["c"])(n,t);if(i.length||!(n.length<t.length)){i.forEach(function(t){return delete e.nodes[t]});var r=[].concat(b(this.selectedCache));this.selectedCache=new Set,this.activeCache=new Set,this.openCache=new Set,this.buildTree(this.items),Object(s["j"])(r,[].concat(b(this.selectedCache)))||this.emitSelected()}},deep:!0},active:function(e){this.handleNodeCacheWatcher(e,this.activeCache,this.updateActive,this.emitActive)},value:function(e){this.handleNodeCacheWatcher(e,this.selectedCache,this.updateSelected,this.emitSelected)},open:function(e){this.handleNodeCacheWatcher(e,this.openCache,this.updateOpen,this.emitOpen)}},created:function(){var e=this;this.buildTree(this.items),this.value.forEach(function(t){return e.updateSelected(t,!0)}),this.emitSelected(),this.active.forEach(function(t){return e.updateActive(t,!0)}),this.emitActive()},mounted:function(){var e=this;(this.$slots.prepend||this.$slots.append)&&Object(f["c"])("The prepend and append slots require a slot-scope attribute",this),this.openAll?this.updateAll(!0):(this.open.forEach(function(t){return e.updateOpen(t,!0)}),this.emitOpen())},methods:{updateAll:function(e){var t=this;Object.keys(this.nodes).forEach(function(n){return t.updateOpen(Object(s["m"])(t.nodes[n].item,t.itemKey),e)}),this.emitOpen()},getKeys:function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=0;n<e.length;n++){var i=Object(s["m"])(e[n],this.itemKey);t.push(i);var r=Object(s["m"])(e[n],this.itemChildren);r&&t.push.apply(t,b(this.getKeys(r)))}return t},buildTree:function(e){for(var t=this,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=0;i<e.length;i++){var r=e[i],o=Object(s["m"])(r,this.itemKey),a=Object(s["m"])(r,this.itemChildren,[]),c=this.nodes.hasOwnProperty(o)?this.nodes[o]:{isSelected:!1,isIndeterminate:!1,isActive:!1,isOpen:!1,vnode:null},l={vnode:c.vnode,parent:n,children:a.map(function(e){return Object(s["m"])(e,t.itemKey)}),item:r};this.buildTree(a,o),!this.nodes.hasOwnProperty(o)&&null!==n&&this.nodes.hasOwnProperty(n)?(l.isSelected=this.nodes[n].isSelected,l.isIndeterminate=this.nodes[n].isIndeterminate):(l.isSelected=c.isSelected,l.isIndeterminate=c.isIndeterminate),l.isActive=c.isActive,l.isOpen=c.isOpen,this.nodes[o]=a.length?this.calculateState(l,this.nodes):l,this.nodes[o].isSelected&&this.selectedCache.add(o),this.nodes[o].isActive&&this.activeCache.add(o),this.nodes[o].isOpen&&this.openCache.add(o),this.updateVnodeState(o)}},calculateState:function(e,t){var n=e.children.reduce(function(e,n){return e[0]+=+Boolean(t[n].isSelected),e[1]+=+Boolean(t[n].isIndeterminate),e},[0,0]);return e.isSelected=!!e.children.length&&n[0]===e.children.length,e.isIndeterminate=!e.isSelected&&(n[0]>0||n[1]>0),e},emitOpen:function(){this.emitNodeCache("update:open",this.openCache)},emitSelected:function(){this.emitNodeCache("input",this.selectedCache)},emitActive:function(){this.emitNodeCache("update:active",this.activeCache)},emitNodeCache:function(e,t){var n=this;this.$emit(e,this.returnObject?[].concat(b(t)).map(function(e){return n.nodes[e].item}):[].concat(b(t)))},handleNodeCacheWatcher:function(e,t,n,i){var r=this;e=this.returnObject?e.map(function(e){return Object(s["m"])(e,r.itemKey)}):e;var o=[].concat(b(t));Object(s["j"])(o,e)||(o.forEach(function(e){return n(e,!1)}),e.forEach(function(e){return n(e,!0)}),i())},getDescendants:function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=this.nodes[e].children;(t=n).push.apply(t,b(i));for(var r=0;r<i.length;r++)n=this.getDescendants(i[r],n);return n},getParents:function(e){var t=this.nodes[e].parent,n=[];while(null!==t)n.push(t),t=this.nodes[t].parent;return n},register:function(e){var t=Object(s["m"])(e.item,this.itemKey);this.nodes[t].vnode=e,this.updateVnodeState(t)},unregister:function(e){var t=Object(s["m"])(e.item,this.itemKey);this.nodes[t]&&(this.nodes[t].vnode=null)},updateActive:function(e,t){var n=this;if(this.nodes.hasOwnProperty(e)){this.multipleActive||this.activeCache.forEach(function(e){n.nodes[e].isActive=!1,n.updateVnodeState(e),n.activeCache.delete(e)});var i=this.nodes[e];i&&(t?this.activeCache.add(e):this.activeCache.delete(e),i.isActive=t,this.updateVnodeState(e))}},updateSelected:function(e,t){var n=this;if(this.nodes.hasOwnProperty(e)){var i=new Map,r=[e].concat(b(this.getDescendants(e)));r.forEach(function(e){n.nodes[e].isSelected=t,n.nodes[e].isIndeterminate=!1,i.set(e,t)});var o=this.getParents(e);o.forEach(function(e){n.nodes[e]=n.calculateState(n.nodes[e],n.nodes),i.set(e,n.nodes[e].isSelected)});var a=[e].concat(b(r),b(o));a.forEach(this.updateVnodeState);var s=!0,c=!1,l=void 0;try{for(var h,u=i.entries()[Symbol.iterator]();!(s=(h=u.next()).done);s=!0){var d=h.value,f=m(d,2),p=f[0],v=f[1];!0===v?this.selectedCache.add(p):this.selectedCache.delete(p)}}catch(g){c=!0,l=g}finally{try{!s&&u.return&&u.return()}finally{if(c)throw l}}}},updateOpen:function(e,t){var n=this;if(this.nodes.hasOwnProperty(e)){var i=this.nodes[e],r=Object(s["m"])(i.item,this.itemChildren);r&&!r.length&&i.vnode&&!i.vnode.hasLoaded?i.vnode.checkChildren().then(function(){return n.updateOpen(e,t)}):r&&r.length&&(i.isOpen=t,i.isOpen?this.openCache.add(e):this.openCache.delete(e),this.updateVnodeState(e))}},updateVnodeState:function(e){var t=this.nodes[e];t&&t.vnode&&(t.vnode.isSelected=t.isSelected,t.vnode.isIndeterminate=t.isIndeterminate,t.vnode.isActive=t.isActive,t.vnode.isOpen=t.isOpen)},isExcluded:function(e){return!!this.search&&this.excludedItems.has(e)}},render:function(e){var t=this.items.length?this.items.map(u.options.methods.genChild.bind(this)):this.$slots.default;return e("div",{staticClass:"v-treeview",class:g({"v-treeview--hoverable":this.hoverable},this.themeClasses)},t)}})}}]);
//# sourceMappingURL=client~edit-job~edit-repository~home~new-job~new-repository~snapshot.3da51b59.js.map