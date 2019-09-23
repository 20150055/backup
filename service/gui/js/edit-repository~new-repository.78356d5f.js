(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["edit-repository~new-repository"],{"169a":function(t,e,i){"use strict";i("6ec0");var o=i("c69d"),n=i("30d4"),s=i("14ec"),a=i("e949"),r=i("261e"),c=i("98a1"),l=i("c584"),u=i("80d2"),d=i("bfc5"),h=i("d9bd"),p=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])}return t};function f(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}e["a"]={name:"v-dialog",directives:{ClickOutside:l["a"]},mixins:[o["a"],n["a"],s["a"],a["a"],r["a"],c["a"]],props:{disabled:Boolean,persistent:Boolean,fullscreen:Boolean,fullWidth:Boolean,noClickAnimation:Boolean,light:Boolean,dark:Boolean,maxWidth:{type:[String,Number],default:"none"},origin:{type:String,default:"center center"},width:{type:[String,Number],default:"auto"},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"}},data:function(){return{animate:!1,animateTimeout:null,stackClass:"v-dialog__content--active",stackMinZIndex:200}},computed:{classes:function(){var t;return t={},f(t,("v-dialog "+this.contentClass).trim(),!0),f(t,"v-dialog--active",this.isActive),f(t,"v-dialog--persistent",this.persistent),f(t,"v-dialog--fullscreen",this.fullscreen),f(t,"v-dialog--scrollable",this.scrollable),f(t,"v-dialog--animated",this.animate),t},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind())},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},beforeMount:function(){var t=this;this.$nextTick(function(){t.isBooted=t.isActive,t.isActive&&t.show()})},mounted:function(){"v-slot"===Object(u["o"])(this,"activator",!0)&&Object(h["a"])("v-dialog's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},beforeDestroy:function(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick(function(){t.animate=!0,clearTimeout(t.animateTimeout),t.animateTimeout=setTimeout(function(){return t.animate=!1},150)})},closeConditional:function(t){return!(!this.isActive||this.$refs.content.contains(t.target))&&(this.persistent?(this.noClickAnimation||this.overlay!==t.target||this.animateClick(),!1):this.activeZIndex>=this.getMaxZIndex())},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):s["a"].options.methods.hideScroll.call(this)},show:function(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$refs.content.focus(),this.bind()},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onKeydown:function(t){if(t.keyCode===u["r"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var e=this.getActivator();this.$nextTick(function(){return e&&e.focus()})}this.$emit("keydown",t)},onFocusin:function(t){var e=event,i=e.target;if(![document,this.$refs.content].includes(i)&&!this.$refs.content.contains(i)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some(function(t){return t.contains(i)})){var o=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');o.length&&o[0].focus()}},getActivator:function(t){if(this.$refs.activator)return this.$refs.activator.children.length>0?this.$refs.activator.children[0]:this.$refs.activator;if(t&&(this.activatedBy=t.currentTarget||t.target),this.activatedBy)return this.activatedBy;if(this.activatorNode){var e=Array.isArray(this.activatorNode)?this.activatorNode[0]:this.activatorNode,i=e&&e.elm;if(i)return i}Object(h["a"])("No activator found")},genActivator:function(){var t=this;if(!this.hasActivator)return null;var e=this.disabled?{}:{click:function(e){e.stopPropagation(),t.getActivator(e),t.disabled||(t.isActive=!t.isActive)}};if("scoped"===Object(u["o"])(this,"activator")){var i=this.$scopedSlots.activator({on:e});return this.activatorNode=i,i}return this.$createElement("div",{staticClass:"v-dialog__activator",class:{"v-dialog__activator--disabled":this.disabled},ref:"activator",on:e},this.$slots.activator)}},render:function(t){var e=this,i=[],o={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:function(){e.isActive=!1},args:{closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],on:{click:function(t){t.stopPropagation()}}};this.fullscreen||(o.style={maxWidth:"none"===this.maxWidth?void 0:Object(u["e"])(this.maxWidth),width:"auto"===this.width?void 0:Object(u["e"])(this.width)}),i.push(this.genActivator());var n=t("div",o,this.showLazyContent(this.$slots.default));return this.transition&&(n=t("transition",{props:{name:this.transition,origin:this.origin}},[n])),i.push(t("div",{class:this.contentClasses,attrs:p({tabIndex:"-1"},this.getScopeIdAttrs()),on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.$createElement(d["a"],{props:{root:!0,light:this.light,dark:this.dark}},[n])])),t("div",{staticClass:"v-dialog__container",style:{display:!this.hasActivator||this.fullWidth?"block":"inline-block"}},i)}}},"38ec":function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",{attrs:{"max-width":"600px",scrollable:""},model:{value:t.isOpen,callback:function(e){t.isOpen=e},expression:"isOpen"}},[i("v-card",[i("v-card-title",{staticClass:"accent"},[i("v-layout",{attrs:{column:""}},[i("span",{staticClass:"headline"},[t._v(t._s(t.$t("folder-selector.select-folder")))]),i("div",{},[t._v(t._s(t.chosenLocation||t.$t("folder-selector.no-selection")))])]),i("v-spacer"),i("v-btn",{attrs:{icon:""},on:{click:t.refreshBrowser}},[i("v-icon",[t._v("mdi-refresh")])],1)],1),i("v-card-text",[i("file-browser",{ref:"fileBrowser",staticClass:"elevation-0",attrs:{"hide-chrome":"","hide-selection":"","folder-only":"",dirpath:!!t.clientpath&&t.clientpath},model:{value:t.chosenLocations,callback:function(e){t.chosenLocations=e},expression:"chosenLocations"}})],1),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{color:"accent",flat:""},nativeOn:{click:function(e){t.isOpen=!1}}},[t._v(t._s(t.$t("common.interaction.close")))]),i("v-btn",{attrs:{color:"accent",flat:"",disabled:!t.chosenLocation},nativeOn:{click:function(e){t.$emit("folder-selected",t.chosenLocation),t.isOpen=!1}}},[t._v(t._s(t.$t("common.interaction.confirm")))])],1)],1)],1)},n=[],s=i("9ab4"),a=i("60a3"),r=i("4796"),c=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.chosenLocations=[],e}return s["d"](e,t),e.prototype.onOpen=function(){return s["b"](this,void 0,void 0,function(){return s["e"](this,function(t){switch(t.label){case 0:return this.isOpen?[4,this.$refs.fileBrowser.manuallySetFolders([])]:[3,2];case 1:t.sent(),this.initialLocation&&this.onInitialLocationChange(),t.label=2;case 2:return[2]}})})},e.prototype.onInitialLocationChange=function(){return s["b"](this,void 0,void 0,function(){return s["e"](this,function(t){switch(t.label){case 0:return console.log("locationchange",this.initialLocation),this.initialLocation?(this.chosenLocations=[this.initialLocation],this.$refs.fileBrowser?[4,this.$refs.fileBrowser.manuallySetFolders([this.initialLocation])]:[3,3]):[3,4];case 1:return t.sent(),[4,this.$refs.fileBrowser.openFolder(this.initialLocation)];case 2:t.sent(),this.chosenLocations=[this.initialLocation],t.label=3;case 3:return[3,5];case 4:this.chosenLocations=[],t.label=5;case 5:return[2]}})})},Object.defineProperty(e.prototype,"isOpen",{get:function(){return this.value},set:function(t){this.$emit("input",t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"chosenLocation",{get:function(){return this.chosenLocations[0]||!1},enumerable:!0,configurable:!0}),e.prototype.refreshBrowser=function(){return s["b"](this,void 0,void 0,function(){return s["e"](this,function(t){switch(t.label){case 0:return this.$refs.fileBrowser?[4,this.$refs.fileBrowser.refreshBrowser()]:[3,4];case 1:return t.sent(),[4,this.$refs.fileBrowser.manuallySetFolders([this.chosenLocation||this.initialLocation])];case 2:return t.sent(),[4,this.$refs.fileBrowser.openFolder(this.chosenLocation||this.initialLocation)];case 3:t.sent(),t.label=4;case 4:return[2]}})})},s["c"]([Object(a["e"])({type:[Boolean],required:!0})],e.prototype,"value",void 0),s["c"]([Object(a["e"])({type:[String],default:""})],e.prototype,"initialLocation",void 0),s["c"]([Object(a["e"])({type:[String,Boolean],default:!1})],e.prototype,"clientpath",void 0),s["c"]([Object(a["g"])("isOpen")],e.prototype,"onOpen",null),s["c"]([Object(a["g"])("initialLocation",{immediate:!0})],e.prototype,"onInitialLocationChange",null),e=s["c"]([Object(a["a"])({components:{FileBrowser:r["a"]}})],e),e}(Object(a["d"])()),l=c,u=l,d=i("2877"),h=i("6544"),p=i.n(h),f=i("8336"),v=i("b0af"),y=i("99d9"),m=i("12b2"),b=i("169a"),g=i("132d"),w=i("a722"),k=i("9910"),$=Object(d["a"])(u,o,n,!1,null,null,null);e["a"]=$.exports;p()($,{VBtn:f["a"],VCard:v["a"],VCardActions:y["a"],VCardText:y["b"],VCardTitle:m["a"],VDialog:b["a"],VIcon:g["a"],VLayout:w["a"],VSpacer:k["a"]})},"6ec0":function(t,e,i){},cf2a:function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-select",{attrs:{items:t.repositoryTypes,label:t.$t("repository-editor.repository-type"),required:"",rules:t.validateRules.repoType},model:{value:t.repoType,callback:function(e){t.repoType=e},expression:"repoType"}}),i("v-text-field",{attrs:{rules:t.validateRules.name,counter:t.maxNameLength,label:t.$t("repository-editor.name"),required:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),i("v-text-field",{attrs:{rules:t.validateRules.password,counter:t.maxPasswordLength,label:t.$t("repository-editor.password"),required:"",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),i("v-text-field",{attrs:{rules:t.validateRules.location,label:t.$t("repository-editor.location"),required:"",placeholder:t.isLocalRepository?"C:/path/to/repository":"http://localhost:9000/backup-bucket"},model:{value:t.location,callback:function(e){t.location=e},expression:"location"}}),t.isLocalRepository?i("v-btn",{on:{click:function(e){t.locationSelectorOpen=!0}}},[t._v(t._s(t.$t("repository-editor.select-location")))]):t._e(),i("folder-selector-dialog",{attrs:{initialLocation:t.location,clientpath:!!t.filepath&&t.filepath},on:{"folder-selected":function(e){t.location=e}},model:{value:t.locationSelectorOpen,callback:function(e){t.locationSelectorOpen=e},expression:"locationSelectorOpen"}}),i("v-slide-y-transition",{attrs:{group:""}},[t.isLocalRepository?t._e():i("v-text-field",{key:"s3AccessKey",attrs:{counter:20,rules:t.validateRules.s3AccessKey,label:t.$t("repository-editor.s3-access-key"),required:"",placeholder:"S3EX4MPL3KEYASDFGHJK"},model:{value:t.s3AccessKey,callback:function(e){t.s3AccessKey=e},expression:"s3AccessKey"}}),t.isLocalRepository?t._e():i("v-text-field",{key:"s3SecretKey",attrs:{counter:40,rules:t.validateRules.s3SecretKey,label:t.$t("repository-editor.s3-secret-key"),required:"",type:"password",placeholder:"aS3exaMPLeSeCRE7ACCessK3y+qWertYuI/pzyxC"},model:{value:t.s3SecretKey,callback:function(e){t.s3SecretKey=e},expression:"s3SecretKey"}})],1),i("v-text-field",{attrs:{rules:t.validateRules.autoUnlockDelay,label:t.$t("repository-editor.auto-unlock-delay"),required:""},model:{value:t.autoUnlockDelay,callback:function(e){t.autoUnlockDelay=e},expression:"autoUnlockDelay"}}),i("v-btn",{attrs:{disabled:!t.valid},on:{click:t.submit}},[t._v(t._s(t.$t("common.interaction.submit")))]),i("v-btn",{on:{click:t.clear}},[t._v(t._s(t.$t("common.interaction.reset")))])],1)},n=[],s=i("9ab4"),a=i("60a3"),r=i("f90c"),c=i("845e"),l=i("38ec"),u=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.maxNameLength=100,e.maxPasswordLength=100,e.valid=!0,e.name="",e.password="",e.location="",e.s3AccessKey="",e.s3SecretKey="",e.repoType=c["RepoType"].S3,e.autoUnlockDelay=100,e.locationSelectorOpen=!1,e}return s["d"](e,t),e.prototype.trimAccessKey=function(){this.s3AccessKey.length>20&&(this.s3AccessKey=this.s3AccessKey.substr(0,20))},e.prototype.trimSecretKey=function(){this.s3SecretKey.length>40&&(this.s3SecretKey=this.s3SecretKey.substr(0,40))},e.prototype.updateLocalData=function(){this.name=this.initialData.name,this.password=this.initialData.password,this.location=this.initialData.location,this.s3AccessKey=this.initialData.s3AccessKey,this.s3SecretKey=this.initialData.s3SecretKey,this.repoType=this.initialData.type,this.autoUnlockDelay=this.initialData.autoUnlockDelay},e.prototype.updatePath=function(){console.log("change path",this.filepath),this.filepath&&(this.location=this.filepath)},Object.defineProperty(e.prototype,"isLocalRepository",{get:function(){return this.repoType===c["RepoType"].Local},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"repositoryTypes",{get:function(){return[{text:this.$t("repository-editor.type.s3"),value:c["RepoType"].S3},{text:this.$t("repository-editor.type.local"),value:c["RepoType"].Local}]},enumerable:!0,configurable:!0}),e.prototype.submit=function(){return s["b"](this,void 0,void 0,function(){return s["e"](this,function(t){return this.$refs.form.validate()&&this.formSubmit({name:this.name,password:this.password,location:this.location,s3AccessKey:this.s3AccessKey,s3SecretKey:this.s3SecretKey,id:this.initialData.id,type:this.repoType,autoUnlockDelay:this.autoUnlockDelay}),[2]})})},e.prototype.formSubmit=function(t){},e.prototype.clear=function(){return s["b"](this,void 0,void 0,function(){var t=this;return s["e"](this,function(e){return this.$nextTick(function(){t.updateLocalData()}),[2]})})},Object.defineProperty(e.prototype,"validateRules",{get:function(){var t=this;return{s3AccessKey:[function(e){return!!e||t.$t("repository-editor.s3-access-key-required")},function(e){return e&&/^([A-Z0-9]{20})$/g.test(e)||t.$t("repository-editor.s3-access-key-invalid")}],s3SecretKey:[function(e){return!!e||t.$t("repository-editor.s3-secret-key-required")},function(e){return e&&/^([A-Za-z0-9\/+=]{40})$/g.test(e)||t.$t("repository-editor.s3-secret-key-invalid")}],location:[function(e){return!!e||t.$t("repository-editor.location-required")},function(e){return t.isLocalRepository||e&&Object(r["isURL"])(e,{require_tld:!1})||t.$t("repository-editor.invalid-url")}],password:[function(e){return!!e||t.$t("repository-editor.password-required")},function(e){return e&&e.length<=t.maxPasswordLength||t.$t("repository-editor.password-length",{length:t.maxPasswordLength})}],name:[function(e){return!!e||t.$t("repository-editor.name-required")},function(e){return e&&e.length<=t.maxNameLength||t.$t("repository-editor.name-length",{length:t.maxPasswordLength})}],repoType:[function(e){return!!e||t.$t("repository-editor.type-required")}],autoUnlockDelay:[function(e){return!!e||t.$t("repository-editor.auto-unlock-delay-required")}]}},enumerable:!0,configurable:!0}),s["c"]([Object(a["g"])("s3AccessKey")],e.prototype,"trimAccessKey",null),s["c"]([Object(a["g"])("s3SecretKey")],e.prototype,"trimSecretKey",null),s["c"]([Object(a["e"])({type:Object,default:function(){return{name:"",password:"",location:"",s3AccessKey:"",s3SecretKey:"",type:c["RepoType"].S3,autoUnlockDelay:100}}})],e.prototype,"initialData",void 0),s["c"]([Object(a["e"])({type:[String,Boolean],default:!1})],e.prototype,"filepath",void 0),s["c"]([Object(a["g"])("initialData",{immediate:!0})],e.prototype,"updateLocalData",null),s["c"]([Object(a["g"])("filepath",{immediate:!0})],e.prototype,"updatePath",null),s["c"]([Object(a["b"])("form-submit")],e.prototype,"formSubmit",null),e=s["c"]([Object(a["a"])({components:{FolderSelectorDialog:l["a"]}})],e),e}(Object(a["d"])()),d=u,h=d,p=i("2877"),f=i("6544"),v=i.n(f),y=i("8336"),m=i("4bd4"),b=i("b56d"),g=i("0789"),w=i("2677"),k=Object(p["a"])(h,o,n,!1,null,null,null);e["a"]=k.exports;v()(k,{VBtn:y["a"],VForm:m["a"],VSelect:b["a"],VSlideYTransition:g["g"],VTextField:w["a"]})}}]);
//# sourceMappingURL=edit-repository~new-repository.78356d5f.js.map