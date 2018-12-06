(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["events"],{"823f":function(t,e,i){},aa9c:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("timeline")},s=[],o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{staticStyle:{"max-width":"800px"}},[i("v-timeline",{attrs:{dense:"",clipped:""}},[i("v-timeline-item",{staticClass:"white--text mb-5",attrs:{"fill-dot":"",color:"orange",large:""}},[i("v-icon",{attrs:{slot:"icon"},slot:"icon"},[t._v("mdi-gesture-tap")]),i("v-btn",[t._v("new backup job")]),i("v-btn",[t._v("new repository")])],1),i("v-slide-x-transition",{attrs:{group:""}},[t._l(t.timeline,function(e){return[i("v-timeline-item",{key:e.id,staticClass:"mb-3",attrs:{color:e.color||"primary",small:"","hide-dot":!!e.heading}},[e.heading?i("span",[t._v(t._s(e.heading.toUpperCase()))]):i("v-layout",{attrs:{"justify-space-between":""}},[i("v-flex",{attrs:{xs7:""}},[e.project?i("v-chip",{staticClass:"white--text ml-0",attrs:{color:"purple",label:"",small:""}},[t._v(t._s(e.project.name))]):t._e(),t._v("\n              "+t._s(e.text)+"\n            ")],1),i("v-flex",{attrs:{xs5:"","text-xs-right":""},domProps:{textContent:t._s(e.time)}})],1)],1),e.email?i("v-timeline-item",{key:e.id+"_",staticClass:"mb-3",attrs:{"hide-dot":""}},[i("v-btn",{staticClass:"mx-0"},[t._v("Resend Email")])],1):t._e()]})],2)],1)],1)},a=[],l={data:()=>({events:[{id:543456545,text:"repository created",time:"20:05",project:{name:"repo 1"},color:"success"},{id:54345645,text:"backup job created",time:"20:08",project:{name:"weekly backup job"},color:"success"},{id:456546,heading:"2 days ago"},{id:54345,text:"backup job created",time:"12:08",project:{name:"backup job 1"},color:"success"},{id:4593485793,text:"backup job completed",time:"10:08",project:{name:"backup job 1"},email:!0,color:"success"},{id:45893475,heading:"yesterday"},{id:454593485793,text:"backup job failed",time:"10:08",project:{name:"weekly backup job"},email:!0,error:!0,color:"error"}],input:null,nonce:0}),computed:{timeline(){return this.events.slice().reverse()}},methods:{comment(){const t=(new Date).toTimeString();this.events.push({id:this.nonce++,text:this.input,time:t.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/,(t,e)=>{return` ${e.split(" ").map(t=>t.charAt(0)).join("")}`})}),this.input=null}}},r=l,c=i("2877"),m=i("6544"),p=i.n(m),d=i("8336"),h=i("cc20"),u=i("a523"),v=i("0e8f"),f=i("132d"),g=i("a722"),b=i("0789"),_=(i("823f"),i("58df")),j=i("6a18"),x=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},y=Object(_["a"])(j["a"]).extend({name:"v-timeline",props:{alignTop:Boolean,dense:Boolean},computed:{classes:function(){return x({"v-timeline--align-top":this.alignTop,"v-timeline--dense":this.dense},this.themeClasses)}},render:function(t){return t("div",{staticClass:"v-timeline",class:this.classes},this.$slots.default)}}),C=i("9d26"),k=i("b64a"),w=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},$=Object(_["a"])(k["a"],j["a"]).extend({name:"v-timeline-item",props:{color:{type:String,default:"primary"},fillDot:Boolean,hideDot:Boolean,icon:String,iconColor:String,large:Boolean,left:Boolean,right:Boolean,small:Boolean},computed:{hasIcon:function(){return!!this.icon||!!this.$slots.icon}},methods:{genBody:function(){return this.$createElement("div",{staticClass:"v-timeline-item__body"},this.$slots.default)},genIcon:function(){return this.$slots.icon?this.$slots.icon:this.$createElement(C["a"],{props:{color:this.iconColor,dark:!this.theme.isDark,small:this.small}},this.icon)},genInnerDot:function(){var t=[];this.hasIcon&&t.push(this.genIcon());var e=this.setBackgroundColor(this.color);return this.$createElement("div",w({staticClass:"v-timeline-item__inner-dot"},e),t)},genDot:function(){return this.$createElement("div",{staticClass:"v-timeline-item__dot",class:{"v-timeline-item__dot--small":this.small,"v-timeline-item__dot--large":this.large}},[this.genInnerDot()])},genOpposite:function(){return this.$createElement("div",{staticClass:"v-timeline-item__opposite"},[this.$slots.opposite])}},render:function(t){var e=[this.genBody()];return this.hideDot||e.unshift(this.genDot()),this.$slots.opposite&&e.push(this.genOpposite()),t("div",{staticClass:"v-timeline-item",class:w({"v-timeline-item--fill-dot":this.fillDot,"v-timeline-item--left":this.left,"v-timeline-item--right":this.right},this.themeClasses)},e)}}),B=Object(c["a"])(r,o,a,!1,null,null,null);B.options.__file="Timeline.vue";var O=B.exports;p()(B,{VBtn:d["a"],VChip:h["a"],VContainer:u["a"],VFlex:v["a"],VIcon:f["a"],VLayout:g["a"],VSlideXTransition:b["d"],VTimeline:y,VTimelineItem:$});var D={components:{Timeline:O}},E=D,T=Object(c["a"])(E,n,s,!1,null,null,null);T.options.__file="Events.vue";e["default"]=T.exports}}]);
//# sourceMappingURL=events.cdf37817.js.map