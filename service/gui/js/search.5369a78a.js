(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["search"],{"011d":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-list",{attrs:{"three-line":""}},t._l(t.extendedJobs,function(e,i){return n("v-list-tile",{key:i,attrs:{to:"/jobs/"+e.id,avatar:""}},[n("v-list-tile-content",[n("v-list-tile-title",[t._v(t._s(e.name))]),n("v-list-tile-sub-title",[t._v(t._s(t.$t("jobs-list.next-execution"))+": "+t._s(t.$d(e.nextDate,"long")))]),n("v-list-tile-sub-title",t._l(e.backupLocations,function(e){return n("v-chip",{key:e,attrs:{color:"accent",small:""}},[n("pre",[t._v(t._s(e))])])}),1)],1)],1)}),1)},a=[],r=n("9ab4"),o=n("60a3"),s=n("05e1"),l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r["d"](e,t),Object.defineProperty(e.prototype,"extendedJobs",{get:function(){return this.jobs.map(function(t){return r["a"]({},t,{nextDate:Object(s["f"])(t.repeatPattern,t.startDate)})})},enumerable:!0,configurable:!0}),r["c"]([Object(o["e"])({type:Array,default:[]})],e.prototype,"jobs",void 0),e=r["c"]([Object(o["a"])({components:{}})],e),e}(Object(o["d"])()),u=l,c=u,d=n("2877"),p=n("6544"),f=n.n(p),b=n("cc20"),h=n("8860"),m=n("ba95"),v=n("5d23"),g=Object(d["a"])(c,i,a,!1,null,null,null);e["a"]=g.exports;f()(g,{VChip:b["a"],VList:h["a"],VListTile:m["a"],VListTileContent:v["a"],VListTileSubTitle:v["b"],VListTileTitle:v["c"]})},"0c15":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ma-4"},[n("Client-Editor",{on:{submit:t.addClient}})],1)},a=[],r=n("9ab4"),o=n("60a3"),s=n("fcb1"),l=n("f33f"),u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r["d"](e,t),e.prototype.addClient=function(t){return r["b"](this,void 0,void 0,function(){var e;return r["e"](this,function(n){switch(n.label){case 0:return[4,l["a"].addClient(t)];case 1:return e=n.sent(),e&&e.payload&&this.$router.replace({path:"/admin/client/"+e.payload.client.id}),[2]}})})},e=r["c"]([Object(o["a"])({components:{ClientEditor:s["a"]}})],e),e}(o["f"]),c=u,d=c,p=n("2877"),f=Object(p["a"])(d,i,a,!1,null,null,null);e["default"]=f.exports},"26e5":function(t,e,n){},"2d3b":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.currentlyLoading?n("fullscreen-loader",{attrs:{value:t.currentLoadingPercentage}}):n("div",{staticClass:"ma-4"},[n("v-card",{staticClass:"mb-5"},[n("v-card-title",[t._v(t._s(t.$t("search.repositories")))]),n("repositories-list",{attrs:{repositories:t.repositories}}),n("v-btn",{attrs:{color:"accent",fab:"",absolute:"",bottom:"",right:"",small:"",to:"/repositories/new"}},[n("v-icon",[t._v("mdi-plus")])],1)],1),n("v-card",[n("v-card-title",[t._v(t._s(t.$t("search.jobs")))]),n("jobs-list",{attrs:{jobs:t.jobs}}),n("v-btn",{attrs:{color:"accent",fab:"",absolute:"",bottom:"",right:"",small:"",to:"/jobs/new"}},[n("v-icon",[t._v("mdi-plus")])],1)],1)],1)},a=[],r=n("9ab4"),o=n("60a3"),s=n("411e"),l=n("f33f"),u=n("4023"),c=n("011d"),d=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r["d"](e,t),e.prototype.mounted=function(){var t=this;this.setLoading(!0),setTimeout(function(){return t.setLoading(!1)},400)},Object.defineProperty(e.prototype,"searchQuery",{get:function(){return String(l["f"].query.query)||""},enumerable:!0,configurable:!0}),e.prototype.strContainsQuery=function(t){return console.log(t),t.toLowerCase().includes(this.searchQuery.toLowerCase())},Object.defineProperty(e.prototype,"jobs",{get:function(){var t=this;return l["c"].allJobs.filter(function(e){return t.strContainsQuery(e.name)})},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"repositories",{get:function(){var t=this;return l["e"].allRepositories.filter(function(e){return t.strContainsQuery(e.name)})},enumerable:!0,configurable:!0}),e=r["c"]([Object(o["a"])({components:{RepositoriesList:u["a"],JobsList:c["a"]}})],e),e}(Object(o["d"])(s["a"])),p=d,f=p,b=n("2877"),h=n("6544"),m=n.n(h),v=n("8336"),g=n("b0af"),y=n("12b2"),j=n("132d"),_=Object(b["a"])(f,i,a,!1,null,null,null);e["default"]=_.exports;m()(_,{VBtn:v["a"],VCard:g["a"],VCardTitle:y["a"],VIcon:j["a"]})},3530:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ma-3"},[n("v-btn",{attrs:{color:"accent",fab:"",fixed:"",bottom:"",right:"",to:"/admin/client/new"}},[n("v-icon",[t._v("mdi-plus")])],1),n("client-list",{attrs:{clients:t.clients}})],1)},a=[],r=n("9ab4"),o=n("60a3"),s=n("f33f"),l=n("fcb1"),u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-list",t._l(t.clients,function(e,i){return n("v-list-tile",{key:i,attrs:{to:"/admin/client/"+e.id,avatar:""}},[n("v-list-tile-content",[n("v-list-tile-title",[t._v(t._s(e.name))]),n("v-list-tile-sub-title",[t._v(t._s(e.ip))])],1)],1)}),1)},c=[],d=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r["d"](e,t),r["c"]([Object(o["e"])({type:Array,default:[]})],e.prototype,"clients",void 0),e=r["c"]([Object(o["a"])({components:{}})],e),e}(Object(o["d"])()),p=d,f=p,b=n("2877"),h=n("6544"),m=n.n(h),v=n("8860"),g=n("ba95"),y=n("5d23"),j=Object(b["a"])(f,u,c,!1,null,null,null),_=j.exports;m()(j,{VList:v["a"],VListTile:g["a"],VListTileContent:y["a"],VListTileSubTitle:y["b"],VListTileTitle:y["c"]});var L=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r["d"](e,t),e.prototype.mounted=function(){return r["b"](this,void 0,void 0,function(){return r["e"](this,function(t){switch(t.label){case 0:return[4,s["a"].fetchAllClients()];case 1:return t.sent(),[2]}})})},Object.defineProperty(e.prototype,"clients",{get:function(){return s["a"].allClients},enumerable:!0,configurable:!0}),e=r["c"]([Object(o["a"])({components:{ClientEditor:l["a"],ClientList:_}})],e),e}(o["f"]),O=L,V=O,w=n("8336"),x=n("132d"),$=Object(b["a"])(V,i,a,!1,null,null,null);e["default"]=$.exports;m()($,{VBtn:w["a"],VIcon:x["a"]})},4023:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-list",t._l(t.repositories,function(e,i){return n("v-list-tile",{key:i,attrs:{to:"/repositories/"+e.id,avatar:""}},[n("v-list-tile-content",[n("v-list-tile-title",[t._v(t._s(e.name))]),n("v-list-tile-sub-title",[t._v(t._s(e.location))])],1)],1)}),1)},a=[],r=n("9ab4"),o=n("60a3"),s=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r["d"](e,t),r["c"]([Object(o["e"])({type:Array,default:[]})],e.prototype,"repositories",void 0),e=r["c"]([Object(o["a"])({components:{}})],e),e}(Object(o["d"])()),l=s,u=l,c=n("2877"),d=n("6544"),p=n.n(d),f=n("8860"),b=n("ba95"),h=n("5d23"),m=Object(c["a"])(u,i,a,!1,null,null,null);e["a"]=m.exports;p()(m,{VList:f["a"],VListTile:b["a"],VListTileContent:h["a"],VListTileSubTitle:h["b"],VListTileTitle:h["c"]})},"411e":function(t,e,n){"use strict";var i=n("9ab4"),a=n("60a3"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{attrs:{"fill-height":"","justify-center":"","align-center":"",column:""}},[n("logo",{attrs:{loader:""}}),n("div",{staticStyle:{"min-width":"200px","flex-grow":"0"}},[n("v-progress-linear",{attrs:{value:100*t.value,indeterminate:t.indeterminate,color:"accent"}})],1)],1)},o=[],s=n("ee1b"),l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return i["d"](e,t),i["c"]([Object(a["e"])({type:Number,default:0,validator:function(t){return t>=0&&t<=1}})],e.prototype,"value",void 0),i["c"]([Object(a["e"])({type:Boolean,default:!1})],e.prototype,"indeterminate",void 0),e=i["c"]([Object(a["a"])({components:{Logo:s["a"]}})],e),e}(Object(a["d"])()),u=l,c=u,d=n("2877"),p=n("6544"),f=n.n(p),b=n("a722"),h=n("8e36"),m=Object(d["a"])(c,r,o,!1,null,null,null),v=m.exports;f()(m,{VLayout:b["a"],VProgressLinear:h["a"]}),n.d(e,"a",function(){return g});var g=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.currentLoadingPercentage=1,e.shouldFinishLoading=!1,e}return i["d"](e,t),Object.defineProperty(e.prototype,"currentlyLoading",{get:function(){return this.currentLoadingPercentage<1},enumerable:!0,configurable:!0}),e.prototype.setLoading=function(t){t?(this.currentLoadingPercentage=0,this.shouldFinishLoading=!1):this.shouldFinishLoading=!0},e.prototype.updateLoadingPercentage=function(){var t=this;this.currentlyLoading&&setTimeout(function(){t.currentLoadingPercentage+=t.shouldFinishLoading?.3:Math.random()*(.1*(1-t.currentLoadingPercentage)),t.shouldFinishLoading&&(t.currentLoadingPercentage=Math.max(.99,t.currentLoadingPercentage)),t.currentlyLoading&&t.updateLoadingPercentage()},this.shouldFinishLoading?500:200*Math.random())},i["c"]([Object(a["g"])("currentlyLoading")],e.prototype,"updateLoadingPercentage",null),e=i["c"]([Object(a["a"])({components:{FullscreenLoader:v}})],e),e}(a["f"])},"4bd4":function(t,e,n){"use strict";n("26e5");var i=n("94ab");e["a"]={name:"v-form",mixins:[Object(i["b"])("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var t=Object.values(this.errorBag).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,n=function(t){return t.$watch("hasError",function(n){e.$set(e.errorBag,t._uid,n)},{immediate:!0})},i={_uid:t._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(i.valid=n(t)))}):i.valid=n(t),i},validate:function(){var t=this.inputs.filter(function(t){return!t.validate(!0)}).length;return!t},reset:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout(function(){t.errorBag={}},0)},resetValidation:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout(function(){t.errorBag={}},0)},register:function(t){var e=this.watchInput(t);this.inputs.push(t),this.watchers.push(e)},unregister:function(t){var e=this.inputs.find(function(e){return e._uid===t._uid});if(e){var n=this.watchers.find(function(t){return t._uid===e._uid});n.valid&&n.valid(),n.shouldValidate&&n.shouldValidate(),this.watchers=this.watchers.filter(function(t){return t._uid!==e._uid}),this.inputs=this.inputs.filter(function(t){return t._uid!==e._uid}),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}},8038:function(t,e,n){},b56d:function(t,e,n){"use strict";var i=n("b974"),a=(n("8038"),n("c6a6")),r=a["a"],o=n("8654"),s=n("afdd"),l=n("d9bd"),u=r.extend({name:"v-overflow-btn",props:{segmented:Boolean,editable:Boolean,transition:i["a"].options.props.transition},computed:{classes:function(){return Object.assign(r.options.computed.classes.call(this),{"v-overflow-btn":!0,"v-overflow-btn--segmented":this.segmented,"v-overflow-btn--editable":this.editable})},isAnyValueAllowed:function(){return this.editable||r.options.computed.isAnyValueAllowed.call(this)},isSingle:function(){return!0},computedItems:function(){return this.segmented?this.allItems:this.filteredItems},$_menuProps:function(){var t=r.options.computed.$_menuProps.call(this);return t.transition=t.transition||"v-menu-transition",t}},methods:{genSelections:function(){return this.editable?r.options.methods.genSelections.call(this):i["a"].options.methods.genSelections.call(this)},genCommaSelection:function(t,e,n){return this.segmented?this.genSegmentedBtn(t):i["a"].options.methods.genCommaSelection.call(this,t,e,n)},genInput:function(){var t=o["a"].options.methods.genInput.call(this);return t.data.domProps.value=this.editable?this.internalSearch:"",t.data.attrs.readonly=!this.isAnyValueAllowed,t},genLabel:function(){if(this.editable&&this.isFocused)return null;var t=o["a"].options.methods.genLabel.call(this);return t?(t.data.style={},t):t},genSegmentedBtn:function(t){var e=this,n=this.getValue(t),i=this.computedItems.find(function(t){return e.getValue(t)===n})||t;return i.text&&i.callback?this.$createElement(s["a"],{props:{flat:!0},on:{click:function(t){t.stopPropagation(),i.callback(t)}}},[i.text]):(Object(l["c"])("When using 'segmented' prop without a selection slot, items must contain both a text and callback property",this),null)},setSelectedItems:function(){null==this.internalValue?this.selectedItems=[]:this.selectedItems=[this.internalValue]}}}),c=u,d=n("2b5d"),p=d["a"],f=n("7cf7"),b=n("ab6d");n.d(e,"a",function(){return h});var h={functional:!0,$_wrapperFor:i["a"],props:{autocomplete:Boolean,combobox:Boolean,multiple:Boolean,tags:Boolean,editable:Boolean,overflow:Boolean,segmented:Boolean},render:function(t,e){var n=e.props,a=e.data,o=e.slots,s=e.parent;Object(b["a"])(a);var u=Object(f["a"])(o(),t);return n.autocomplete&&Object(l["d"])("<v-select autocomplete>","<v-autocomplete>",h,s),n.combobox&&Object(l["d"])("<v-select combobox>","<v-combobox>",h,s),n.tags&&Object(l["d"])("<v-select tags>","<v-combobox multiple>",h,s),n.overflow&&Object(l["d"])("<v-select overflow>","<v-overflow-btn>",h,s),n.segmented&&Object(l["d"])("<v-select segmented>","<v-overflow-btn segmented>",h,s),n.editable&&Object(l["d"])("<v-select editable>","<v-overflow-btn editable>",h,s),a.attrs=a.attrs||{},n.combobox||n.tags?(a.attrs.multiple=n.tags,t(p,a,u)):n.autocomplete?(a.attrs.multiple=n.multiple,t(r,a,u)):n.overflow||n.segmented||n.editable?(a.attrs.segmented=n.segmented,a.attrs.editable=n.editable,t(c,a,u)):(a.attrs.multiple=n.multiple,t(i["a"],a,u))}}},fcb1:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-text-field",{attrs:{counter:t.maxNameLength,rules:t.validateRules.name,label:t.$t("admin.client.name"),required:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),n("v-text-field",{attrs:{counter:t.maxNameLength,label:t.$t("admin.client.ip"),rules:t.validateRules.ip,required:""},model:{value:t.ip,callback:function(e){t.ip=e},expression:"ip"}}),n("v-select",{attrs:{items:t.avaliableOS,label:t.$t("admin.client.os"),required:""},model:{value:t.os,callback:function(e){t.os=e},expression:"os"}}),n("v-btn",{attrs:{disabled:!t.valid},on:{click:t.submit}},[t._v(t._s(t.$t("admin.client.add")))])],1)],1)},a=[],r=n("9ab4"),o=n("60a3"),s=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.maxNameLength=100,e.name="",e.ip="",e.valid=!0,e.os="",e}return r["d"](e,t),e.prototype.updateLocalData=function(){this.name=this.initialData.name,this.ip=this.initialData.ip,this.os=this.initialData.os},e.prototype.submit=function(){return r["b"](this,void 0,void 0,function(){var t;return r["e"](this,function(e){return this.$refs.form.validate()&&(t=void 0,t=void 0!==this.initialData.id?{id:this.initialData.id,ip:this.ip,name:this.name,os:this.os}:{ip:this.ip,name:this.name,os:this.os},this.$emit("submit",t)),[2]})})},Object.defineProperty(e.prototype,"validateRules",{get:function(){var t=this;return{name:[function(e){return!!e||t.$t("client-editor.name-required")}],ip:[function(e){return!!e||t.$t("client-editor.ip-required")},function(e){var n=/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;return n.test(e)||t.$t("client-editor.ip-ipPattern")}]}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"avaliableOS",{get:function(){return["Windows","Linux","MacOS"]},enumerable:!0,configurable:!0}),r["c"]([Object(o["e"])({type:Object,default:function(){return{name:"",ip:"",os:""}}})],e.prototype,"initialData",void 0),r["c"]([Object(o["g"])("initialData",{immediate:!0})],e.prototype,"updateLocalData",null),e=r["c"]([Object(o["a"])({components:{}})],e),e}(o["f"]),l=s,u=l,c=n("2877"),d=n("6544"),p=n.n(d),f=n("8336"),b=n("4bd4"),h=n("b56d"),m=n("2677"),v=Object(c["a"])(u,i,a,!1,null,null,null);e["a"]=v.exports;p()(v,{VBtn:f["a"],VForm:b["a"],VSelect:h["a"],VTextField:m["a"]})}}]);
//# sourceMappingURL=search.5369a78a.js.map