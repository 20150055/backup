(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["edit-job"],{"26e5":function(t,e,n){},"4bd4":function(t,e,n){"use strict";n("26e5");var i=n("94ab");e["a"]={name:"v-form",mixins:[Object(i["b"])("form")],inheritAttrs:!1,props:{value:Boolean,lazyValidation:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(){var t=Object.values(this.errorBag).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,n=function(t){return t.$watch("hasError",function(n){e.$set(e.errorBag,t._uid,n)},{immediate:!0})},i={_uid:t._uid,valid:void 0,shouldValidate:void 0};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",function(o){o&&(e.errorBag.hasOwnProperty(t._uid)||(i.valid=n(t)))}):i.valid=n(t),i},validate:function(){var t=this.inputs.filter(function(t){return!t.validate(!0)}).length;return!t},reset:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].reset();this.lazyValidation&&setTimeout(function(){t.errorBag={}},0)},resetValidation:function(){for(var t=this,e=this.inputs.length;e--;)this.inputs[e].resetValidation();this.lazyValidation&&setTimeout(function(){t.errorBag={}},0)},register:function(t){var e=this.watchInput(t);this.inputs.push(t),this.watchers.push(e)},unregister:function(t){var e=this.inputs.find(function(e){return e._uid===t._uid});if(e){var n=this.watchers.find(function(t){return t._uid===e._uid});n.valid&&n.valid(),n.shouldValidate&&n.shouldValidate(),this.watchers=this.watchers.filter(function(t){return t._uid!==e._uid}),this.inputs=this.inputs.filter(function(t){return t._uid!==e._uid}),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object.assign({novalidate:!0},this.$attrs),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}}},8038:function(t,e,n){},"8d17":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"ma-4"},[n("job-editor",{attrs:{"initial-data":t.jobData},on:{"form-submit":t.onSubmit}})],1)},o=[],a=n("9ab4"),s=n("60a3"),r=n("da34"),l=n("f33f"),u=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return a["d"](e,t),Object.defineProperty(e.prototype,"jobId",{get:function(){return l["f"].params.jobId},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"jobData",{get:function(){return l["c"].getById(this.jobId)},enumerable:!0,configurable:!0}),e.prototype.onSubmit=function(t){return a["b"](this,void 0,void 0,function(){var e;return a["e"](this,function(n){switch(n.label){case 0:return[4,l["c"].updateJob(t)];case 1:return e=n.sent(),e&&e.payload&&this.$router.replace({path:"/jobs/"+e.payload.job.id}),[2]}})})},e=a["c"]([Object(s["a"])({components:{JobEditor:r["a"]}})],e),e}(Object(s["d"])()),c=u,d=c,h=n("2877"),p=Object(h["a"])(d,i,o,!1,null,null,null);e["default"]=p.exports},b56d:function(t,e,n){"use strict";var i=n("b974"),o=(n("8038"),n("c6a6")),a=o["a"],s=n("8654"),r=n("afdd"),l=n("d9bd"),u=a.extend({name:"v-overflow-btn",props:{segmented:Boolean,editable:Boolean,transition:i["a"].options.props.transition},computed:{classes:function(){return Object.assign(a.options.computed.classes.call(this),{"v-overflow-btn":!0,"v-overflow-btn--segmented":this.segmented,"v-overflow-btn--editable":this.editable})},isAnyValueAllowed:function(){return this.editable||a.options.computed.isAnyValueAllowed.call(this)},isSingle:function(){return!0},computedItems:function(){return this.segmented?this.allItems:this.filteredItems},$_menuProps:function(){var t=a.options.computed.$_menuProps.call(this);return t.transition=t.transition||"v-menu-transition",t}},methods:{genSelections:function(){return this.editable?a.options.methods.genSelections.call(this):i["a"].options.methods.genSelections.call(this)},genCommaSelection:function(t,e,n){return this.segmented?this.genSegmentedBtn(t):i["a"].options.methods.genCommaSelection.call(this,t,e,n)},genInput:function(){var t=s["a"].options.methods.genInput.call(this);return t.data.domProps.value=this.editable?this.internalSearch:"",t.data.attrs.readonly=!this.isAnyValueAllowed,t},genLabel:function(){if(this.editable&&this.isFocused)return null;var t=s["a"].options.methods.genLabel.call(this);return t?(t.data.style={},t):t},genSegmentedBtn:function(t){var e=this,n=this.getValue(t),i=this.computedItems.find(function(t){return e.getValue(t)===n})||t;return i.text&&i.callback?this.$createElement(r["a"],{props:{flat:!0},on:{click:function(t){t.stopPropagation(),i.callback(t)}}},[i.text]):(Object(l["c"])("When using 'segmented' prop without a selection slot, items must contain both a text and callback property",this),null)}}}),c=u,d=n("2b5d"),h=d["a"],p=n("7cf7"),b=n("ab6d");n.d(e,"a",function(){return f});var f={functional:!0,$_wrapperFor:i["a"],props:{autocomplete:Boolean,combobox:Boolean,multiple:Boolean,tags:Boolean,editable:Boolean,overflow:Boolean,segmented:Boolean},render:function(t,e){var n=e.props,o=e.data,s=e.slots,r=e.parent;Object(b["a"])(o);var u=Object(p["a"])(s(),t);return n.autocomplete&&Object(l["d"])("<v-select autocomplete>","<v-autocomplete>",f,r),n.combobox&&Object(l["d"])("<v-select combobox>","<v-combobox>",f,r),n.tags&&Object(l["d"])("<v-select tags>","<v-combobox multiple>",f,r),n.overflow&&Object(l["d"])("<v-select overflow>","<v-overflow-btn>",f,r),n.segmented&&Object(l["d"])("<v-select segmented>","<v-overflow-btn segmented>",f,r),n.editable&&Object(l["d"])("<v-select editable>","<v-overflow-btn editable>",f,r),o.attrs=o.attrs||{},n.combobox||n.tags?(o.attrs.multiple=n.tags,t(h,o,u)):n.autocomplete?(o.attrs.multiple=n.multiple,t(a,o,u)):n.overflow||n.segmented||n.editable?(o.attrs.segmented=n.segmented,o.attrs.editable=n.editable,t(c,o,u)):(o.attrs.multiple=n.multiple,t(i["a"],o,u))}}}}]);
//# sourceMappingURL=edit-job.0b1fd372.js.map