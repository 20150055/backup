(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["repositories"],{"0d99":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.loading?r("fullscreen-loader",{attrs:{value:e.currentPercentage}}):r("div",{staticClass:"ma-4"},[r("v-list",e._l(e.repositories,function(t){return r("v-list-tile",{key:t.id,attrs:{to:"/repositories/"+t.id,avatar:""}},[r("v-list-tile-content",[r("v-list-tile-title",[e._v(e._s(t.name))]),r("v-list-tile-sub-title",[e._v(e._s(t.location))])],1)],1)}),1),r("v-btn",{attrs:{color:"accent",fab:"",fixed:"",bottom:"",right:"",to:"/repositories/new"}},[r("v-icon",[e._v("mdi-plus")])],1)],1)},o=[],s=r("9b49"),n=r("2f62");function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},i=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),i.forEach(function(t){l(e,t,r[t])})}return e}function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var c={components:{FullscreenLoader:s["a"]},data:function(){return{currentPercentage:0}},computed:a({loading:function(){return this.currentPercentage<1}},Object(n["c"])({repositories:"repositories/allRepositories"})),mounted:function(){this.updateLoading()},methods:{updateLoading:function(){var e=this;setTimeout(function(){e.currentPercentage+=.3*Math.random(),e.loading&&e.updateLoading()},200*Math.random())}}},u=c,d=r("2877"),p=r("6544"),f=r.n(p),v=r("8336"),b=r("132d"),y=r("8860"),m=r("ba95"),h=r("5d23"),x=Object(d["a"])(u,i,o,!1,null,null,null);x.options.__file="Repositories.vue";t["default"]=x.exports;f()(x,{VBtn:v["a"],VIcon:b["a"],VList:y["a"],VListTile:m["a"],VListTileContent:h["a"],VListTileSubTitle:h["b"],VListTileTitle:h["c"]})},"405d":function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("repository-overview")},o=[],s=r("9ab4"),n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.repoData?r("v-container",[r("v-layout",{attrs:{"text-xs-center":"",wrap:""}},[r("v-flex",{staticClass:"d-flex pa-2",attrs:{"mb-4":"",xs12:""}},[r("v-card",[r("v-card-title",[e._v(e._s(e.repoData.name))]),r("v-card-text",[r("v-list",e._l(e.details,function(t,i){return r("v-list-tile",{key:i},[r("v-list-tile-content",[r("v-list-tile-title",[e._v(e._s(t.title))]),r("v-list-tile-sub-title",[e._v(e._s(t.value))])],1)],1)}),1)],1)],1)],1),r("v-flex",{attrs:{xs12:""}},[r("v-layout",{attrs:{wrap:"",row:"","fill-height":""}},[r("v-flex",{staticClass:"d-flex pa-2",attrs:{xs12:"",sm6:""}},[r("number-card",{attrs:{icon:"mdi-cloud-upload",title:"Files backed up","sub-title":"This month",number:"5430"}})],1),r("v-flex",{staticClass:"d-flex pa-2",attrs:{xs12:"",sm6:""}},[r("number-card",{attrs:{icon:"mdi-ray-start-arrow",title:"Job executions","sub-title":"Since December 2017",number:"20"}})],1)],1)],1)],1)],1):r("does-not-exist-screen",{attrs:{title:e.$t("repo.does-not-exist"),"to-existing":"/repositories","to-new":"/repositories/new"}})},a=[],l=r("cb66"),c=r("60a3"),u=r("f33f"),d=r("b1a3"),p=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s["d"](t,e),Object.defineProperty(t.prototype,"repoId",{get:function(){return u["e"].params.repositoryId},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"repoData",{get:function(){return u["d"].getById(this.repoId)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"details",{get:function(){return this.repoData?[{title:this.$t("repository.details.name"),value:this.repoData.name},{title:this.$t("repository.details.location"),value:this.repoData.location},{title:this.$t("repository.details.s3-access-key"),value:this.repoData.s3AccessKey}]:[]},enumerable:!0,configurable:!0}),t=s["c"]([Object(c["a"])({components:{NumberCard:l["a"],DoesNotExistScreen:d["a"]}})],t),t}(Object(c["b"])()),f=p,v=f,b=(r("a595"),r("2877")),y=r("6544"),m=r.n(y),h=r("b0af"),x=r("99d9"),g=r("12b2"),w=r("a523"),_=r("0e8f"),O=r("a722"),$=r("8860"),L=r("ba95"),j=r("5d23"),k=Object(b["a"])(v,n,a,!1,null,null,null);k.options.__file="RepositoryOverview.vue";var V=k.exports;m()(k,{VCard:h["a"],VCardText:x["b"],VCardTitle:g["a"],VContainer:w["a"],VFlex:_["a"],VLayout:O["a"],VList:$["a"],VListTile:L["a"],VListTileContent:j["a"],VListTileSubTitle:j["b"],VListTileTitle:j["c"]});var K=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s["d"](t,e),t=s["c"]([Object(c["a"])({components:{RepositoryOverview:V}})],t),t}(c["d"]),P=K,S=P,R=Object(b["a"])(S,i,o,!1,null,null,null);R.options.__file="Repository.vue";t["default"]=R.exports},a595:function(e,t,r){"use strict";var i=r("b56b"),o=r.n(i);o.a},b56b:function(e,t,r){},e107:function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"ma-4"},[r("repository-editor")],1)},o=[],s=r("9ab4"),n=r("60a3"),a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-form",{ref:"form",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[r("v-text-field",{attrs:{rules:e.validateRules.name,counter:e.maxNameLength,label:e.$t("repository-editor.name"),required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),r("v-text-field",{attrs:{rules:e.validateRules.password,counter:e.maxPasswordLength,label:e.$t("repository-editor.password"),required:"",type:"password"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),r("v-text-field",{attrs:{rules:e.validateRules.location,label:e.$t("repository-editor.location"),required:"",placeholder:"http://localhost:9000/backup-bucket"},model:{value:e.location,callback:function(t){e.location=t},expression:"location"}}),r("v-text-field",{attrs:{counter:20,rules:e.validateRules.s3AccessKey,label:e.$t("repository-editor.s3-access-key"),required:"",placeholder:"S3EX4MPL3KEYASDFGHJK"},model:{value:e.s3AccessKey,callback:function(t){e.s3AccessKey=t},expression:"s3AccessKey"}}),r("v-text-field",{attrs:{counter:40,rules:e.validateRules.s3SecretKey,label:e.$t("repository-editor.s3-secret-key"),required:"",type:"password",placeholder:"aS3exaMPLeSeCRE7ACCessK3y+qWertYuI/pzyxC"},model:{value:e.s3SecretKey,callback:function(t){e.s3SecretKey=t},expression:"s3SecretKey"}}),r("v-btn",{attrs:{disabled:!e.valid},on:{click:e.submit}},[e._v("submit")]),r("v-btn",{on:{click:e.clear}},[e._v("clear")])],1)},l=[],c=r("f90c"),u=r("f33f"),d=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.maxNameLength=100,t.maxPasswordLength=100,t.valid=!0,t.name="",t.password="",t.location="",t.s3AccessKey="",t.s3SecretKey="",t}return s["d"](t,e),t.prototype.submit=function(){return s["b"](this,void 0,void 0,function(){return s["e"](this,function(e){switch(e.label){case 0:return this.$refs.form.validate()?[4,u["d"].createRepository({name:this.name,password:this.password,location:this.location,s3AccessKey:this.s3AccessKey,s3SecretKey:this.s3SecretKey})]:[3,2];case 1:e.sent(),e.label=2;case 2:return[2]}})})},t.prototype.clear=function(){this.$refs.form.reset()},Object.defineProperty(t.prototype,"validateRules",{get:function(){var e=this;return{s3AccessKey:[function(t){return!!t||e.$t("repository-editor.s3-access-key-required")},function(t){return t&&/^([A-Z0-9]{20})$/g.test(t)||e.$t("repository-editor.s3-access-key-invalid")}],s3SecretKey:[function(t){return!!t||e.$t("repository-editor.s3-secret-key-required")},function(t){return t&&/^([A-Za-z0-9\/+=]{40})$/g.test(t)||e.$t("repository-editor.s3-secret-key-invalid")}],location:[function(t){return!!t||e.$t("repository-editor.location-required")},function(t){return t&&Object(c["isURL"])(t)||e.$t("repository-editor.invalid-url")}],password:[function(t){return!!t||e.$t("repository-editor.password-required")},function(t){return t&&t.length<=e.maxPasswordLength||e.$t("repository-editor.password-length",{length:e.maxPasswordLength})}],name:[function(t){return!!t||e.$t("repository-editor.name-required")},function(t){return t&&t.length<=e.maxNameLength||e.$t("repository-editor.name-length",{length:e.maxPasswordLength})}]}},enumerable:!0,configurable:!0}),t=s["c"]([Object(n["a"])({components:{}})],t),t}(Object(n["b"])()),p=d,f=p,v=r("2877"),b=r("6544"),y=r.n(b),m=r("8336"),h=r("4bd4"),x=r("2677"),g=Object(v["a"])(f,a,l,!1,null,null,null);g.options.__file="RepositoryEditor.vue";var w=g.exports;y()(g,{VBtn:m["a"],VForm:h["a"],VTextField:x["a"]});var _=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s["d"](t,e),t=s["c"]([Object(n["a"])({components:{RepositoryEditor:w}})],t),t}(Object(n["b"])()),O=_,$=O,L=Object(v["a"])($,i,o,!1,null,null,null);L.options.__file="NewRepository.vue";t["default"]=L.exports}}]);
//# sourceMappingURL=repositories.58a7ff3c.js.map