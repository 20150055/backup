(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["events"],{"169a":function(t,e,i){"use strict";i("6ec0");var n=i("c69d"),a=i("30d4"),s=i("14ec"),o=i("e949"),r=i("261e"),l=i("98a1"),c=i("c584"),d=i("80d2"),h=i("bfc5"),u=i("d9bd"),v=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t};function p(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}e["a"]={name:"v-dialog",directives:{ClickOutside:c["a"]},mixins:[n["a"],a["a"],s["a"],o["a"],r["a"],l["a"]],props:{disabled:Boolean,persistent:Boolean,fullscreen:Boolean,fullWidth:Boolean,noClickAnimation:Boolean,light:Boolean,dark:Boolean,maxWidth:{type:[String,Number],default:"none"},origin:{type:String,default:"center center"},width:{type:[String,Number],default:"auto"},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"}},data:function(){return{animate:!1,animateTimeout:null,stackClass:"v-dialog__content--active",stackMinZIndex:200}},computed:{classes:function(){var t;return t={},p(t,("v-dialog "+this.contentClass).trim(),!0),p(t,"v-dialog--active",this.isActive),p(t,"v-dialog--persistent",this.persistent),p(t,"v-dialog--fullscreen",this.fullscreen),p(t,"v-dialog--scrollable",this.scrollable),p(t,"v-dialog--animated",this.animate),t},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind())},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},beforeMount:function(){var t=this;this.$nextTick(function(){t.isBooted=t.isActive,t.isActive&&t.show()})},mounted:function(){"v-slot"===Object(d["n"])(this,"activator",!0)&&Object(u["a"])("v-dialog's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},beforeDestroy:function(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick(function(){t.animate=!0,clearTimeout(t.animateTimeout),t.animateTimeout=setTimeout(function(){return t.animate=!1},150)})},closeConditional:function(t){return!(this.$refs.content.contains(t.target)||!this.isActive)&&(this.persistent?(this.noClickAnimation||this.overlay!==t.target||this.animateClick(),!1):Object(d["o"])(this.$refs.content)>=this.getMaxZIndex())},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):s["a"].options.methods.hideScroll.call(this)},show:function(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$refs.content.focus(),this.$listeners.keydown&&this.bind()},bind:function(){window.addEventListener("keydown",this.onKeydown)},unbind:function(){window.removeEventListener("keydown",this.onKeydown)},onKeydown:function(t){this.$emit("keydown",t)},genActivator:function(){var t=this;if(!this.hasActivator)return null;var e=this.disabled?{}:{click:function(e){e.stopPropagation(),t.disabled||(t.isActive=!t.isActive)}};if("scoped"===Object(d["n"])(this,"activator")){var i=this.$scopedSlots.activator({on:e});return this.activatorNode=i,i}return this.$createElement("div",{staticClass:"v-dialog__activator",class:{"v-dialog__activator--disabled":this.disabled},on:e},this.$slots.activator)}},render:function(t){var e=this,i=[],n={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:function(){return e.isActive=!1},args:{closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],on:{click:function(t){t.stopPropagation()}}};this.fullscreen||(n.style={maxWidth:"none"===this.maxWidth?void 0:Object(d["d"])(this.maxWidth),width:"auto"===this.width?void 0:Object(d["d"])(this.width)}),i.push(this.genActivator());var a=t("div",n,this.showLazyContent(this.$slots.default));return this.transition&&(a=t("transition",{props:{name:this.transition,origin:this.origin}},[a])),i.push(t("div",{class:this.contentClasses,attrs:v({tabIndex:"-1"},this.getScopeIdAttrs()),style:{zIndex:this.activeZIndex},ref:"content"},[this.$createElement(h["a"],{props:{root:!0,light:this.light,dark:this.dark}},[a])])),t("div",{staticClass:"v-dialog__container",style:{display:!this.hasActivator||this.fullWidth?"block":"inline-block"}},i)}}},"1a29":function(t,e,i){},"6ec0":function(t,e,i){},"7b9c":function(t,e,i){"use strict";var n=i("1a29"),a=i.n(n);a.a},"823f":function(t,e,i){},aa9c:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("timeline",{attrs:{type:"other"}})},a=[],s=i("9ab4"),o=i("60a3"),r=i("da9e"),l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return s["d"](e,t),e=s["c"]([Object(o["a"])({components:{Timeline:r["a"]}})],e),e}(Object(o["d"])()),c=l,d=c,h=i("2877"),u=Object(h["a"])(d,n,a,!1,null,null,null);e["default"]=u.exports},da9e:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{staticStyle:{"max-width":"800px"}},[i("v-timeline",{attrs:{dense:"",clipped:""}},[i("v-timeline-item",{staticClass:"white--text mb-5",attrs:{"fill-dot":"",color:"primary",large:""}},[i("v-icon",{attrs:{slot:"icon"},slot:"icon"},[t._v("mdi-gesture-tap")]),i("v-card",[i("v-card-actions",{staticClass:"d-flex"},["other"===t.type||"job"===t.type||"repo"===t.type?i("v-btn",{attrs:{flat:"",color:"accent",to:"/jobs/new"}},[t._v("new backup job")]):t._e(),"other"===t.type||"repo"===t.type?i("v-btn",{attrs:{flat:"",color:"accent",to:"/repositories/new"}},[t._v("new repository")]):t._e(),"other"===t.type||"client"===t.type?i("v-btn",{attrs:{flat:"",color:"accent",to:"/admin/client/new"}},[t._v("new client")]):t._e()],1)],1)],1),i("v-slide-x-transition",{attrs:{group:""}},[t._l(t.computedEvents,function(e,n){return[i("v-timeline-item",{key:n,staticClass:"mb-3",attrs:{color:e.dotColor,small:"","fill-dot":"","hide-dot":!e.dotColor}},[i(e.isSectionHeading?"span":"v-card",{tag:"component"},[i("v-card-title",[i("v-layout",{attrs:{"align-middle":"","align-center":"","justify-center":""}},[e.chips?i("v-flex",{staticClass:"shrink"},t._l(e.chips,function(e,n){return i("v-chip",{key:n,staticClass:"white--text ml-0",class:e.class,attrs:{label:"",small:""}},[t._v(t._s(e.name))])}),1):t._e(),i("v-flex",{staticClass:"grow",class:e.isSectionHeading&&"title"},[t._v(t._s(e.heading))]),i("v-flex",{staticClass:"shrink"},[t._v(t._s(e.time))])],1)],1),e.text?i("v-card-text",[i("v-layout",{attrs:{"justify-space-between":""}},[i("v-flex",{attrs:{xs7:""}},[i("pre",{staticClass:"full-log"},[t._v(t._s(e.text))])])],1)],1):t._e(),e.actions||!e.isSectionHeading?i("v-card-actions",[i("v-spacer"),t._l(e.actions,function(e,n){return i("v-btn",{key:n,attrs:{flat:"",color:"accent"}},[t._v(t._s(e.text))])}),i("v-btn",{attrs:{flat:"",color:"accent"},on:{click:function(i){return t.showEventDetails(e)}}},[t._v(t._s(t.$t("timeline.show-details")))])],2):t._e()],1)],1)]})],2)],1),i("v-layout",{attrs:{"justify-center":"","align-center":"",column:""}},[i("v-btn",{attrs:{icon:"",large:"",fab:"",outline:"",color:"accent",disabled:t.noMoreEntries,loading:t.loading},on:{click:t.fetchLogs}},[i("v-icon",{attrs:{"x-large":""}},[t._v("mdi-chevron-down")])],1),t.noMoreEntries?i("v-flex",{staticClass:"text-xs-center grey--text",attrs:{xs12:""}},[t._v(t._s(t.$t("timeline.no-more-entries")))]):t._e()],1),i("v-dialog",{attrs:{"max-width":"1000px",scrollable:""},model:{value:t.dialogOpen,callback:function(e){t.dialogOpen=e},expression:"dialogOpen"}},[i("v-card",[i("v-card-title",[i("span",{staticClass:"headline"},[t._v(t._s(t.$t("timeline.details")))])]),t.currentEventDetails?i("v-card-text",[i("div",{staticClass:"full-log"},[t._v(t._s(t.currentEventDetails.fullText))])]):t._e(),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{target:"_blank",href:t.logDetailsUrl,flat:""}},[t._v(t._s(t.$t("timeline.details.open-in-new-tab")))]),i("v-btn",{attrs:{color:"accent",flat:""},nativeOn:{click:function(e){t.dialogOpen=!1}}},[t._v(t._s(t.$t("common.interaction.close")))])],1)],1)],1)],1)},a=[],s=i("9ab4"),o=i("60a3"),r=i("340b"),l=i("f33f"),c=i("845e"),d=i("52cf"),h=i.n(d),u=i("6e0c"),v=i.n(u),p=i("d378"),f=i("be95"),m=i("ee1b"),g=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.dialogOpen=!1,e.currentEventDetails=null,e.loading=!1,e.noMoreEntries=!1,e.events=[],e.interval=0,e}return s["d"](e,t),Object.defineProperty(e.prototype,"logDetailsUrl",{get:function(){return this.currentEventDetails&&""+f["d"]+Object(f["p"])(this.currentEventDetails.id)},enumerable:!0,configurable:!0}),e.prototype.showEventDetails=function(t){return s["b"](this,void 0,void 0,function(){var e,i;return s["e"](this,function(n){switch(n.label){case 0:this.dialogOpen=!0,console.log(t.id),n.label=1;case 1:return n.trys.push([1,3,,4]),[4,Object(f["o"])(Number(t.id))];case 2:return e=n.sent(),e?(this.currentEventDetails=s["a"]({},t,{fullText:e}),[2]):[3,4];case 3:return i=n.sent(),console.log(i),[3,4];case 4:return this.dialogOpen=!1,[2]}})})},Object.defineProperty(e.prototype,"computedEvents",{get:function(){var t=this,e="";return this.events.slice().flatMap(function(i){var n=s["a"]({},i,{time:i.date&&t.$d(i.date,"time")});if(n.date){var a=Object(p["a"])(n.date);if(a!==e){e=a;var o=(t.$d(Object(r["parse"])(a),"short")+" - "+Object(r["distanceInWordsStrict"])(new Date,a,{locale:l["g"].language===c["Language"].de?v.a:h.a,addSuffix:!0,unit:"d"})).toUpperCase();return[{id:o,isSectionHeading:!0,heading:o},n]}}return n})},enumerable:!0,configurable:!0}),e.prototype.fetchLogs=function(){return s["b"](this,void 0,void 0,function(){var t,e,i,n,a;return s["e"](this,function(s){switch(s.label){case 0:e=20,i=this.events.length&&Number(this.events[this.events.length-1].id)||void 0,this.loading=!0,s.label=1;case 1:return s.trys.push([1,3,,4]),[4,Object(f["q"])(this.type===f["a"].other&&{limit:e,type:f["a"].other,offset:i}||this.type===f["a"].client&&{limit:e,type:f["a"].client,clientId:this.clientId,offset:i}||this.type===f["a"].job&&{limit:e,type:f["a"].job,jobId:this.jobId,offset:i}||{limit:e,type:f["a"].repo,repoId:this.repoId,offset:i})];case 2:return n=s.sent(),n.payload&&((t=this.events).push.apply(t,n.payload.logs.map(this.transformLogFromApiToInternal)),this.events.length>30&&(this.noMoreEntries=!0)),[3,4];case 3:return a=s.sent(),console.log(a),[3,4];case 4:return this.loading=!1,[2]}})})},e.prototype.transformLogFromApiToInternal=function(t){var e=[];if(t.type===f["a"].client){var i=l["a"].clientbyID(t.clientId);i&&e.push({name:i.name,class:"orange"})}if(t.type===f["a"].repo||t.type===f["a"].job){var n=l["a"].clientbyID(t.repoId);n&&e.push({name:n.name,class:"green"})}if(t.type===f["a"].job){var a=l["a"].clientbyID(t.jobId);a&&e.push({name:a.name,class:"blue"})}return{id:t.id,heading:t.message,dotColor:t.level.toString(),date:Object(r["parse"])(t.date),chips:e}},e.prototype.mounted=function(){},e.prototype.beforeDestroy=function(){},s["c"]([Object(o["e"])({type:String,required:!0,validator:function(t){return-1!==[f["a"].other,f["a"].client,f["a"].repo,f["a"].job].indexOf(t)}})],e.prototype,"type",void 0),s["c"]([Object(o["e"])({type:[Number,String],default:0})],e.prototype,"jobId",void 0),s["c"]([Object(o["e"])({type:[Number,String],default:0})],e.prototype,"repoId",void 0),s["c"]([Object(o["e"])({type:[Number,String],default:0})],e.prototype,"clientId",void 0),s["c"]([Object(o["g"])("type",{immediate:!0})],e.prototype,"fetchLogs",null),e=s["c"]([Object(o["a"])({components:{Logo:m["a"]}})],e),e}(Object(o["d"])()),b=g,y=b,_=(i("7b9c"),i("2877")),O=i("6544"),w=i.n(O),j=i("8336"),x=i("b0af"),C=i("99d9"),k=i("12b2"),$=i("cc20"),I=i("a523"),S=i("169a"),D=i("0e8f"),E=i("132d"),B=i("a722"),A=i("0789"),T=i("9910"),V=(i("823f"),i("58df")),L=i("6a18"),M=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},N=Object(V["a"])(L["a"]).extend({name:"v-timeline",props:{alignTop:Boolean,dense:Boolean},computed:{classes:function(){return M({"v-timeline--align-top":this.alignTop,"v-timeline--dense":this.dense},this.themeClasses)}},render:function(t){return t("div",{staticClass:"v-timeline",class:this.classes},this.$slots.default)}}),P=i("9d26"),W=i("b64a"),H=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},F=Object(V["a"])(W["a"],L["a"]).extend({name:"v-timeline-item",props:{color:{type:String,default:"primary"},fillDot:Boolean,hideDot:Boolean,icon:String,iconColor:String,large:Boolean,left:Boolean,right:Boolean,small:Boolean},computed:{hasIcon:function(){return!!this.icon||!!this.$slots.icon}},methods:{genBody:function(){return this.$createElement("div",{staticClass:"v-timeline-item__body"},this.$slots.default)},genIcon:function(){return this.$slots.icon?this.$slots.icon:this.$createElement(P["a"],{props:{color:this.iconColor,dark:!this.theme.isDark,small:this.small}},this.icon)},genInnerDot:function(){var t=this.setBackgroundColor(this.color);return this.$createElement("div",H({staticClass:"v-timeline-item__inner-dot"},t),[this.hasIcon&&this.genIcon()])},genDot:function(){return this.$createElement("div",{staticClass:"v-timeline-item__dot",class:{"v-timeline-item__dot--small":this.small,"v-timeline-item__dot--large":this.large}},[this.genInnerDot()])},genOpposite:function(){return this.$createElement("div",{staticClass:"v-timeline-item__opposite"},this.$slots.opposite)}},render:function(t){var e=[this.genBody()];return this.hideDot||e.unshift(this.genDot()),this.$slots.opposite&&e.push(this.genOpposite()),t("div",{staticClass:"v-timeline-item",class:H({"v-timeline-item--fill-dot":this.fillDot,"v-timeline-item--left":this.left,"v-timeline-item--right":this.right},this.themeClasses)},e)}}),K=Object(_["a"])(y,n,a,!1,null,"e7603064",null);e["a"]=K.exports;w()(K,{VBtn:j["a"],VCard:x["a"],VCardActions:C["a"],VCardText:C["b"],VCardTitle:k["a"],VChip:$["a"],VContainer:I["a"],VDialog:S["a"],VFlex:D["a"],VIcon:E["a"],VLayout:B["a"],VSlideXTransition:A["f"],VSpacer:T["a"],VTimeline:N,VTimelineItem:F})}}]);
//# sourceMappingURL=events.39a7bfa3.js.map