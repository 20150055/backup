(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["jobs"],{"011d":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-list",{attrs:{"three-line":""}},t._l(t.extendedJobs,function(e,n){return i("v-list-tile",{key:n,attrs:{to:"/jobs/"+e.id,avatar:""}},[i("v-list-tile-content",[i("v-list-tile-title",[t._v(t._s(e.name))]),i("v-list-tile-sub-title",[t._v(t._s(t.$t("jobs-list.next-execution"))+": "+t._s(t.$d(e.nextDate,"long")))]),i("v-list-tile-sub-title",t._l(e.backupLocations,function(e){return i("v-chip",{key:e,attrs:{color:"accent",small:""}},[i("pre",[t._v(t._s(e))])])}),1)],1),i("v-list-tile-action",[i("v-menu",{attrs:{bottom:"",left:"","open-on-hover":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[i("v-btn",t._g({attrs:{icon:""}},n),[i("v-icon",[t._v("mdi-dots-vertical")])],1)]}}],null,!0)},[i("v-list",t._l(t.getMenuItems(e),function(e,n){return i("v-list-tile",{key:n,attrs:{to:e.to}},[i("v-list-tile-title",[t._v(t._s(e.title))])],1)}),1)],1)],1)],1)}),1)},s=[],o=i("9ab4"),a=i("60a3"),r=i("05e1"),c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o["d"](e,t),Object.defineProperty(e.prototype,"extendedJobs",{get:function(){return this.jobs.map(function(t){return o["a"]({},t,{nextDate:Object(r["f"])(t.repeatPattern,t.startDate)})})},enumerable:!0,configurable:!0}),e.prototype.getMenuItems=function(t){return[{title:this.$t("job.view-logs"),to:"/jobs/"+t.id+"/logs"},{title:this.$t("job.view-repository"),to:"/repositories/"+t.repoId}]},o["c"]([Object(a["e"])({type:Array,default:function(){return[]}})],e.prototype,"jobs",void 0),e=o["c"]([Object(a["a"])({components:{}})],e),e}(Object(a["d"])()),l=c,u=l,h=i("2877"),d=i("6544"),v=i.n(d),f=i("8336"),p=i("cc20"),m=i("132d"),g=i("8860"),b=i("ba95"),y=i("40fe"),x=i("5d23"),_=i("e449"),C=Object(h["a"])(u,n,s,!1,null,null,null);e["a"]=C.exports;v()(C,{VBtn:f["a"],VChip:p["a"],VIcon:m["a"],VList:g["a"],VListTile:b["a"],VListTileAction:y["a"],VListTileContent:x["a"],VListTileSubTitle:x["b"],VListTileTitle:x["c"],VMenu:_["a"]})},3880:function(t,e,i){},"411e":function(t,e,i){"use strict";var n=i("9ab4"),s=i("60a3"),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-layout",{attrs:{"fill-height":"","justify-center":"","align-center":"",column:""}},[i("logo",{attrs:{loader:""}}),i("div",{staticStyle:{"min-width":"200px","flex-grow":"0"}},[i("v-progress-linear",{attrs:{value:100*t.value,indeterminate:t.indeterminate||t.automaticIndeterminate,color:"accent"}})],1)],1)},a=[],r=i("ee1b"),c=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n["d"](e,t),Object.defineProperty(e.prototype,"automaticIndeterminate",{get:function(){return this.value>.99},enumerable:!0,configurable:!0}),n["c"]([Object(s["e"])({type:Number,default:0,validator:function(t){return t>=0&&t<=1}})],e.prototype,"value",void 0),n["c"]([Object(s["e"])({type:Boolean,default:!1})],e.prototype,"indeterminate",void 0),e=n["c"]([Object(s["a"])({components:{Logo:r["a"]}})],e),e}(Object(s["d"])()),l=c,u=l,h=i("2877"),d=i("6544"),v=i.n(d),f=i("a722"),p=i("8e36"),m=Object(h["a"])(u,o,a,!1,null,null,null),g=m.exports;v()(m,{VLayout:f["a"],VProgressLinear:p["a"]}),i.d(e,"a",function(){return b});var b=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.currentLoadingPercentage=1,e.shouldFinishLoading=!1,e}return n["d"](e,t),Object.defineProperty(e.prototype,"currentlyLoading",{get:function(){return this.currentLoadingPercentage<1},enumerable:!0,configurable:!0}),e.prototype.setLoading=function(t){t?(this.currentLoadingPercentage=0,this.shouldFinishLoading=!1):this.shouldFinishLoading=!0},e.prototype.updateLoadingPercentage=function(){var t=this;this.currentlyLoading&&setTimeout(function(){t.currentLoadingPercentage+=t.shouldFinishLoading?.3:Math.random()*(.1*(1-t.currentLoadingPercentage)),t.shouldFinishLoading&&(t.currentLoadingPercentage=Math.max(.99,t.currentLoadingPercentage)),t.currentlyLoading&&t.updateLoadingPercentage()},this.shouldFinishLoading?500:200*Math.random())},n["c"]([Object(s["g"])("currentlyLoading")],e.prototype,"updateLoadingPercentage",null),e=n["c"]([Object(s["a"])({components:{FullscreenLoader:g}})],e),e}(s["f"])},bf5a:function(t,e,i){},bfc5:function(t,e,i){"use strict";var n=i("6a18"),s=i("58df");e["a"]=Object(s["a"])(n["a"]).extend({name:"theme-provider",props:{root:Boolean},computed:{isDark:function(){return this.root?this.rootIsDark:n["a"].options.computed.isDark.call(this)}},render:function(){return this.$slots.default&&this.$slots.default.find(function(t){return!t.isComment&&" "!==t.text})}})},cc20:function(t,e,i){"use strict";i("bf5a");var n=i("58df"),s=i("9d26"),o=i("b64a"),a=i("6a18"),r=i("98a1"),c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t};e["a"]=Object(n["a"])(o["a"],a["a"],r["a"]).extend({name:"v-chip",props:{close:Boolean,disabled:Boolean,label:Boolean,outline:Boolean,selected:Boolean,small:Boolean,textColor:String,value:{type:Boolean,default:!0}},computed:{classes:function(){return c({"v-chip--disabled":this.disabled,"v-chip--selected":this.selected&&!this.disabled,"v-chip--label":this.label,"v-chip--outline":this.outline,"v-chip--small":this.small,"v-chip--removable":this.close},this.themeClasses)}},methods:{genClose:function(t){var e=this,i={staticClass:"v-chip__close",on:{click:function(t){t.stopPropagation(),e.$emit("input",!1)}}};return t("div",i,[t(s["a"],"$vuetify.icons.delete")])},genContent:function(t){return t("span",{staticClass:"v-chip__content"},[this.$slots.default,this.close&&this.genClose(t)])}},render:function(t){var e=this.setBackgroundColor(this.color,{staticClass:"v-chip",class:this.classes,attrs:{tabindex:this.disabled?-1:0},directives:[{name:"show",value:this.isActive}],on:this.$listeners}),i=this.textColor||this.outline&&this.color;return t("span",this.setTextColor(i,e),[this.genContent(t)])}})},e449:function(t,e,i){"use strict";i("3880");var n=i("2b0e"),s=i("163b"),o=i("c69d"),a=i("30d4"),r=i("b8d7"),c=i("e949"),l=i("98a1"),u=i("6a18"),h={methods:{activatorClickHandler:function(t){this.openOnClick&&!this.isActive?(this.getActivator(t).focus(),this.isActive=!0,this.absoluteX=t.clientX,this.absoluteY=t.clientY):this.closeOnClick&&this.isActive&&(this.getActivator(t).blur(),this.isActive=!1)},mouseEnterHandler:function(){var t=this;this.runDelay("open",function(){t.hasJustFocused||(t.hasJustFocused=!0,t.isActive=!0)})},mouseLeaveHandler:function(t){var e=this;this.runDelay("close",function(){e.$refs.content.contains(t.relatedTarget)||requestAnimationFrame(function(){e.isActive=!1,e.callDeactivate()})})},addActivatorEvents:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;t&&!this.disabled&&t.addEventListener("click",this.activatorClickHandler)},removeActivatorEvents:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;t&&t.removeEventListener("click",this.activatorClickHandler)}}},d=i("80d2"),v=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t};function f(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function p(t){if(Array.isArray(t)){for(var e=0,i=Array(t.length);e<t.length;e++)i[e]=t[e];return i}return Array.from(t)}var m={methods:{genActivator:function(){if(!this.$slots.activator&&!this.$scopedSlots.activator)return null;var t={};if(this.disabled||(this.openOnHover?(t.mouseenter=this.mouseEnterHandler,t.mouseleave=this.mouseLeaveHandler):this.openOnClick&&(t.click=this.activatorClickHandler)),"scoped"===Object(d["o"])(this,"activator")){t.keydown=this.onKeyDown;var e=this.$scopedSlots.activator({on:t});return this.activatorNode=e,e}return this.$createElement("div",{staticClass:"v-menu__activator",class:{"v-menu__activator--active":this.hasJustFocused||this.isActive,"v-menu__activator--disabled":this.disabled},ref:"activator",on:t},this.$slots.activator)},genTransition:function(){return this.transition?this.$createElement("transition",{props:{name:this.transition}},[this.genContent()]):this.genContent()},genDirectives:function(){var t=this,e=!this.openOnHover&&this.closeOnClick?[{name:"click-outside",value:function(){t.isActive=!1},args:{closeConditional:this.closeConditional,include:function(){return[t.$el].concat(p(t.getOpenDependentElements()))}}}]:[];return e.push({name:"show",value:this.isContentActive}),e},genContent:function(){var t=this,e={attrs:this.getScopeIdAttrs(),staticClass:"v-menu__content",class:v({},this.rootThemeClasses,f({"v-menu__content--auto":this.auto,"v-menu__content--fixed":this.activatorFixed,menuable__content__active:this.isActive},this.contentClass.trim(),!0)),style:this.styles,directives:this.genDirectives(),ref:"content",on:{click:function(e){e.stopPropagation(),e.target.getAttribute("disabled")||t.closeOnContentClick&&(t.isActive=!1)},keydown:this.onKeyDown}};return!this.disabled&&this.openOnHover&&(e.on.mouseenter=this.mouseEnterHandler),this.openOnHover&&(e.on.mouseleave=this.mouseLeaveHandler),this.$createElement("div",e,this.showLazyContent(this.$slots.default))}}},g={props:{disableKeys:Boolean},data:function(){return{listIndex:-1,tiles:[]}},watch:{isActive:function(t){t||(this.listIndex=-1)},listIndex:function(t,e){if(t in this.tiles){var i=this.tiles[t];i.classList.add("v-list__tile--highlighted"),this.$refs.content.scrollTop=i.offsetTop-i.clientHeight}e in this.tiles&&this.tiles[e].classList.remove("v-list__tile--highlighted")}},methods:{onKeyDown:function(t){var e=this;if(t.keyCode===d["r"].esc){setTimeout(function(){e.isActive=!1});var i=this.getActivator();this.$nextTick(function(){return i&&i.focus()})}else t.keyCode===d["r"].tab?setTimeout(function(){e.$refs.content.contains(document.activeElement)||(e.isActive=!1)}):this.changeListIndex(t)},changeListIndex:function(t){if(this.getTiles(),t.keyCode===d["r"].down&&this.listIndex<this.tiles.length-1)this.listIndex++;else if(t.keyCode===d["r"].up&&this.listIndex>-1)this.listIndex--;else{if(t.keyCode!==d["r"].enter||-1===this.listIndex)return;this.tiles[this.listIndex].click()}t.preventDefault()},getTiles:function(){this.tiles=this.$refs.content.querySelectorAll(".v-list__tile")}}},b={data:function(){return{calculatedTopAuto:0}},methods:{calcScrollPosition:function(){var t=this.$refs.content,e=t.querySelector(".v-list__tile--active"),i=t.scrollHeight-t.offsetHeight;return e?Math.min(i,Math.max(0,e.offsetTop-t.offsetHeight/2+e.offsetHeight/2)):t.scrollTop},calcLeftAuto:function(){return this.isAttached?0:parseInt(this.dimensions.activator.left-2*this.defaultOffset)},calcTopAuto:function(){var t=this.$refs.content,e=t.querySelector(".v-list__tile--active");if(e||(this.selectedIndex=null),this.offsetY||!e)return this.computedTop;this.selectedIndex=Array.from(this.tiles).indexOf(e);var i=e.offsetTop-this.calcScrollPosition(),n=t.querySelector(".v-list__tile").offsetTop;return this.computedTop-i-n}}},y=i("c584"),x=i("0d3d"),_=i("bfc5"),C=i("d9bd");e["a"]=n["default"].extend({name:"v-menu",provide:function(){return{theme:this.theme}},directives:{ClickOutside:y["a"],Resize:x["a"]},mixins:[h,o["a"],s["a"],a["a"],m,g,r["a"],b,c["a"],l["a"],u["a"]],props:{auto:Boolean,closeOnClick:{type:Boolean,default:!0},closeOnContentClick:{type:Boolean,default:!0},disabled:Boolean,fullWidth:Boolean,maxHeight:{default:"auto"},openOnClick:{type:Boolean,default:!0},offsetX:Boolean,offsetY:Boolean,openOnHover:Boolean,origin:{type:String,default:"top left"},transition:{type:[Boolean,String],default:"v-menu-transition"}},data:function(){return{defaultOffset:8,hasJustFocused:!1,resizeTimeout:null}},computed:{calculatedLeft:function(){var t=Math.max(this.dimensions.content.width,parseFloat(this.calculatedMinWidth));return this.auto?this.calcXOverflow(this.calcLeftAuto(),t)+"px":this.calcLeft(t)},calculatedMaxHeight:function(){return this.auto?"200px":Object(d["e"])(this.maxHeight)},calculatedMaxWidth:function(){return isNaN(this.maxWidth)?this.maxWidth:this.maxWidth+"px"},calculatedMinWidth:function(){if(this.minWidth)return isNaN(this.minWidth)?this.minWidth:this.minWidth+"px";var t=Math.min(this.dimensions.activator.width+this.nudgeWidth+(this.auto?16:0),Math.max(this.pageWidth-24,0)),e=isNaN(parseInt(this.calculatedMaxWidth))?t:parseInt(this.calculatedMaxWidth);return Math.min(e,t)+"px"},calculatedTop:function(){return!this.auto||this.isAttached?this.calcTop():this.calcYOverflow(this.calculatedTopAuto)+"px"},styles:function(){return{maxHeight:this.calculatedMaxHeight,minWidth:this.calculatedMinWidth,maxWidth:this.calculatedMaxWidth,top:this.calculatedTop,left:this.calculatedLeft,transformOrigin:this.origin,zIndex:this.zIndex||this.activeZIndex}}},watch:{activator:function(t,e){this.removeActivatorEvents(e),this.addActivatorEvents(t)},disabled:function(t){this.activator&&(t?this.removeActivatorEvents(this.activator):this.addActivatorEvents(this.activator))},isContentActive:function(t){this.hasJustFocused=t}},mounted:function(){this.isActive&&this.activate(),"v-slot"===Object(d["o"])(this,"activator",!0)&&Object(C["a"])("v-tooltip's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{activate:function(){var t=this;this.getTiles(),this.updateDimensions(),requestAnimationFrame(function(){t.startTransition().then(function(){t.$refs.content&&(t.calculatedTopAuto=t.calcTopAuto(),t.auto&&(t.$refs.content.scrollTop=t.calcScrollPosition()))})})},closeConditional:function(t){return this.isActive&&this.closeOnClick&&!this.$refs.content.contains(t.target)},onResize:function(){this.isActive&&(this.$refs.content.offsetWidth,this.updateDimensions(),clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(this.updateDimensions,100))}},render:function(t){var e={staticClass:"v-menu",class:{"v-menu--inline":!this.fullWidth&&this.$slots.activator},directives:[{arg:500,name:"resize",value:this.onResize}],on:this.disableKeys?void 0:{keydown:this.onKeyDown}};return t("div",e,[this.genActivator(),this.$createElement(_["a"],{props:{root:!0,light:this.light,dark:this.dark}},[this.genTransition()])])}})},e949:function(t,e,i){"use strict";var n=i("2b0e");e["a"]=n["default"].extend({name:"returnable",props:{returnValue:null},data:function(){return{isActive:!1,originalValue:null}},watch:{isActive:function(t){t?this.originalValue=this.returnValue:this.$emit("update:returnValue",this.originalValue)}},methods:{save:function(t){var e=this;this.originalValue=t,setTimeout(function(){e.isActive=!1})}}})},ee68:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.currentlyLoading?i("fullscreen-loader",{attrs:{value:t.currentLoadingPercentage}}):t.jobs.length?i("div",{staticClass:"ma-4"},[i("jobs-list",{attrs:{jobs:t.jobs}}),i("v-btn",{attrs:{color:"accent",fab:"",fixed:"",bottom:"",right:"",to:"/jobs/new"}},[i("v-icon",[t._v("mdi-plus")])],1)],1):i("v-layout",{staticClass:"ma-4",attrs:{"fill-height":"","justify-center":"","align-center":"",column:""}},[i("v-flex",{staticClass:"shrink"},[i("v-layout",{attrs:{column:""}},[i("v-icon",{attrs:{size:"200"}},[t._v("mdi-calendar-blank")]),i("span",{staticClass:"display-1"},[t._v(t._s(t.$t("data.we-couldnt-find-what-youre-looking-for")))]),i("v-btn",{staticClass:"mt-5",attrs:{block:"",outline:"",large:"",to:"/jobs/new"}},[t._v(t._s(t.$t("jobs.create-new")))])],1)],1),i("v-btn",{attrs:{color:"accent",fab:"",fixed:"",bottom:"",right:"",to:"/jobs/new"}},[i("v-icon",[t._v("mdi-plus")])],1)],1)},s=[],o=i("9ab4"),a=i("60a3"),r=i("411e"),c=i("011d"),l=i("f33f"),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.fab=!1,e}return o["d"](e,t),e.prototype.mounted=function(){var t=this;this.setLoading(!0),setTimeout(function(){return t.setLoading(!1)},500)},Object.defineProperty(e.prototype,"jobs",{get:function(){return l["c"].allJobs},enumerable:!0,configurable:!0}),e=o["c"]([Object(a["a"])({components:{JobsList:c["a"]}})],e),e}(Object(a["d"])(r["a"])),h=u,d=h,v=i("2877"),f=i("6544"),p=i.n(f),m=i("8336"),g=i("0e8f"),b=i("132d"),y=i("a722"),x=Object(v["a"])(d,n,s,!1,null,null,null);e["default"]=x.exports;p()(x,{VBtn:m["a"],VFlex:g["a"],VIcon:b["a"],VLayout:y["a"]})}}]);
//# sourceMappingURL=jobs.12bf6b09.js.map