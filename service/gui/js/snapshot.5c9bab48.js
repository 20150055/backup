(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["snapshot"],{3260:function(e,t){function n(e){var t=[];for(var n in e)t.push(n);return t}t=e.exports="function"===typeof Object.keys?Object.keys:n,t.shim=n},"38ec":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-dialog",{attrs:{"max-width":"600px",scrollable:""},model:{value:e.isOpen,callback:function(t){e.isOpen=t},expression:"isOpen"}},[n("v-card",[n("v-card-title",{staticClass:"accent"},[n("v-layout",{attrs:{column:""}},[n("span",{staticClass:"headline"},[e._v(e._s(e.$t("folder-selector.select-folder")))]),n("div",{},[e._v(e._s(e.chosenLocation||e.$t("folder-selector.no-selection")))])]),n("v-spacer"),n("v-btn",{attrs:{icon:""},on:{click:e.refreshBrowser}},[n("v-icon",[e._v("mdi-refresh")])],1)],1),n("v-card-text",[n("file-browser",{ref:"fileBrowser",staticClass:"elevation-0",attrs:{"hide-chrome":"","hide-selection":"","folder-only":"",dirpath:!!e.clientpath&&e.clientpath},model:{value:e.chosenLocations,callback:function(t){e.chosenLocations=t},expression:"chosenLocations"}})],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"accent",flat:""},nativeOn:{click:function(t){e.isOpen=!1}}},[e._v(e._s(e.$t("common.interaction.close")))]),n("v-btn",{attrs:{color:"accent",flat:"",disabled:!e.chosenLocation},nativeOn:{click:function(t){e.$emit("folder-selected",e.chosenLocation),e.isOpen=!1}}},[e._v(e._s(e.$t("common.interaction.confirm")))])],1)],1)],1)},o=[],s=n("9ab4"),i=n("60a3"),a=n("4796"),c=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.chosenLocations=[],t}return s["d"](t,e),t.prototype.onOpen=function(){return s["b"](this,void 0,void 0,function(){return s["e"](this,function(e){switch(e.label){case 0:return this.isOpen?[4,this.$refs.fileBrowser.manuallySetFolders([])]:[3,2];case 1:e.sent(),this.initialLocation&&this.onInitialLocationChange(),e.label=2;case 2:return[2]}})})},t.prototype.onInitialLocationChange=function(){return s["b"](this,void 0,void 0,function(){return s["e"](this,function(e){switch(e.label){case 0:return console.log("locationchange",this.initialLocation),this.initialLocation?(this.chosenLocations=[this.initialLocation],this.$refs.fileBrowser?[4,this.$refs.fileBrowser.manuallySetFolders([this.initialLocation])]:[3,3]):[3,4];case 1:return e.sent(),[4,this.$refs.fileBrowser.openFolder(this.initialLocation)];case 2:e.sent(),this.chosenLocations=[this.initialLocation],e.label=3;case 3:return[3,5];case 4:this.chosenLocations=[],e.label=5;case 5:return[2]}})})},Object.defineProperty(t.prototype,"isOpen",{get:function(){return this.value},set:function(e){this.$emit("input",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"chosenLocation",{get:function(){return this.chosenLocations[0]||!1},enumerable:!0,configurable:!0}),t.prototype.refreshBrowser=function(){return s["b"](this,void 0,void 0,function(){return s["e"](this,function(e){switch(e.label){case 0:return this.$refs.fileBrowser?[4,this.$refs.fileBrowser.refreshBrowser()]:[3,4];case 1:return e.sent(),[4,this.$refs.fileBrowser.manuallySetFolders([this.chosenLocation||this.initialLocation])];case 2:return e.sent(),[4,this.$refs.fileBrowser.openFolder(this.chosenLocation||this.initialLocation)];case 3:e.sent(),e.label=4;case 4:return[2]}})})},s["c"]([Object(i["e"])({type:[Boolean],required:!0})],t.prototype,"value",void 0),s["c"]([Object(i["e"])({type:[String],default:""})],t.prototype,"initialLocation",void 0),s["c"]([Object(i["e"])({type:[String,Boolean],default:!1})],t.prototype,"clientpath",void 0),s["c"]([Object(i["g"])("isOpen")],t.prototype,"onOpen",null),s["c"]([Object(i["g"])("initialLocation",{immediate:!0})],t.prototype,"onInitialLocationChange",null),t=s["c"]([Object(i["a"])({components:{FileBrowser:a["a"]}})],t),t}(Object(i["d"])()),l=c,u=l,p=n("2877"),d=n("6544"),f=n.n(d),h=n("8336"),b=n("b0af"),v=n("99d9"),g=n("12b2"),y=n("169a"),m=n("132d"),O=n("a722"),j=n("9910"),_=Object(p["a"])(u,r,o,!1,null,null,null);t["a"]=_.exports;f()(_,{VBtn:h["a"],VCard:b["a"],VCardActions:v["a"],VCardText:v["b"],VCardTitle:g["a"],VDialog:y["a"],VIcon:m["a"],VLayout:O["a"],VSpacer:j["a"]})},"58db":function(e,t,n){},"68c7":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.currentlyLoading?n("fullscreen-loader",{attrs:{value:e.currentLoadingPercentage}}):n("div",{staticClass:"ma-4"},[n("v-card",[n("v-card-title",[n("span",{staticClass:"mr-2"},[e._v(e._s(e.$t("snapshot.snapshot"))+" "+e._s(e.snapshotId))]),n("v-chip",{staticClass:"white--text",class:e.chipClass,attrs:{label:"",small:""}},[e._v(e._s(e.repoName))])],1),n("v-card-text",[n("v-list",[n("v-list-tile",[n("v-list-tile-title",[e._v(e._s(e.$t("snapshot.date")))]),n("v-list-tile-sub-title",[e._v(e._s(e.dateDetails))])],1)],1)],1)],1),n("v-card",{staticClass:"mt-3"},[n("v-progress-linear",{staticClass:"ma-0",attrs:{value:e.restoreRunning?e.restoreProgress:0}}),n("v-card-title",{staticClass:"pt-1"},[n("span",{staticClass:"mr-2"},[e._v(e._s(e.$t("snapshot.files.files-in-snapshot")))]),n("v-chip",{attrs:{small:""}},[e._v(e._s(e.selectedFiles.length)+" / "+e._s(e.details.files.length)+" "+e._s(e.$t("snapshot.files.selected")))]),n("v-spacer"),n("v-btn",{attrs:{large:"",color:"accent",disabled:!e.selectedFiles.length||e.restoreRunning,outline:""},on:{click:function(t){e.restoreTargetSelectorOpen=!0}}},[n("v-icon",{attrs:{left:""}},[e._v("mdi-backup-restore")]),e._v("\n        "+e._s(e.$t("snapshot.restore-now"))+"\n      ")],1)],1),n("v-card-text",{directives:[{name:"show",rawName:"v-show",value:!e.restoreRunning,expression:"!restoreRunning"}]},[n("snapshot-file-tree",{attrs:{"files-in-snapshot":e.details.files,selected:e.selectedFiles},on:{"update:selected":function(t){e.selectedFiles=t}}})],1),n("v-card-text",[n("v-scale-transition",{attrs:{group:""}},e._l(e.dedupedSelectedFiles,function(t){return n("v-chip",{key:t,attrs:{close:!e.restoreRunning},on:{input:function(n){return e.removeSubtree(t)}}},[e._v(e._s(t))])}),1)],1),n("v-card-text",{directives:[{name:"show",rawName:"v-show",value:e.restoreRunning,expression:"restoreRunning"}]},[n("p",[e._v(e._s(e.$t("snapshot.restoring-to",{path:e.restorePath})))])])],1),n("folder-selector-dialog",{on:{"folder-selected":e.restoreToFolder},model:{value:e.restoreTargetSelectorOpen,callback:function(t){e.restoreTargetSelectorOpen=t},expression:"restoreTargetSelectorOpen"}})],1)},o=[],s=n("9ab4"),i=n("60a3"),a=n("f33f"),c=n("da9e"),l=n("8fb8"),u=n("421b"),p=n("38ec"),d=n("f664"),f=n("be95"),h=n("e49c"),b=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.restoreTargetSelectorOpen=!1,t.restoreProgress=100,t.restorePath=null,t.details=!1,t.selectedFiles=[],t}return s["d"](t,e),Object.defineProperty(t.prototype,"restoreRunning",{get:function(){return this.restoreProgress<100},enumerable:!0,configurable:!0}),t.prototype.onProgressChange=function(){var e=this;setTimeout(function(){requestAnimationFrame(function(){e.restoreRunning?(e.restoreProgress+=8*Math.random(),e.restoreProgress*=1.3):100!==e.restoreProgress&&(e.restoreProgress=100)})},1e3*Math.random())},t.prototype.resetSelection=function(){this.restoreRunning||(this.selectedFiles=[])},t.prototype.restoreToFolder=function(e){this.restoreProgress=1,this.restorePath=e,f["I"](a["b"].userId,this.repoId,{snapshotId:this.snapshotId,selectedPaths:this.dedupedSelectedFiles,restorePath:e})},Object.defineProperty(t.prototype,"dedupedSelectedFiles",{get:function(){return Object(d["a"])(this.selectedFiles)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"repoId",{get:function(){return Number(a["f"].params.repositoryId)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"snapshotId",{get:function(){return a["f"].params.snapshotId},enumerable:!0,configurable:!0}),t.prototype.created=function(){this.setLoading(!0)},t.prototype.mounted=function(){return s["b"](this,void 0,void 0,function(){var e;return s["e"](this,function(t){switch(t.label){case 0:return e=this,[4,a["e"].getSnapshotDetails({repoId:this.repoId,snapshotId:this.snapshotId})];case 1:return e.details=t.sent(),this.setLoading(!1),[2]}})})},Object.defineProperty(t.prototype,"repoName",{get:function(){var e=a["e"].getById(this.repoId);return e&&e.name||!1},enumerable:!0,configurable:!0}),t.prototype.removeSubtree=function(e){this.selectedFiles=this.selectedFiles.filter(function(t){return!t.startsWith(e+"/")&&t!==e})},Object.defineProperty(t.prototype,"dateDetails",{get:function(){return this.details&&this.$d(this.details.date,"long")+" ("+this.$relativeDate(this.details.date)+")"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"chipClass",{get:function(){return h["a"].job},enumerable:!0,configurable:!0}),s["c"]([Object(i["g"])("restoreProgress")],t.prototype,"onProgressChange",null),s["c"]([Object(i["g"])("restoreProgress")],t.prototype,"resetSelection",null),t=s["c"]([Object(i["a"])({components:{Timeline:c["a"],SnapshotsList:l["a"],FolderSelectorDialog:p["a"],SnapshotFileTree:d["b"]}})],t),t}(Object(i["d"])(u["c"],u["a"],u["b"])),v=b,g=v,y=n("2877"),m=n("6544"),O=n.n(m),j=n("8336"),_=n("b0af"),L=n("99d9"),S=n("12b2"),w=n("cc20"),P=n("132d"),C=n("8860"),F=n("ba95"),$=n("5d23"),x=n("8e36"),I=n("0789"),T=n("9910"),V=Object(y["a"])(g,r,o,!1,null,null,null);t["default"]=V.exports;O()(V,{VBtn:j["a"],VCard:_["a"],VCardText:L["b"],VCardTitle:S["a"],VChip:w["a"],VIcon:P["a"],VList:C["a"],VListTile:F["a"],VListTileSubTitle:$["b"],VListTileTitle:$["c"],VProgressLinear:x["a"],VScaleTransition:I["d"],VSpacer:T["a"]})},"7fae":function(e,t,n){var r=Array.prototype.slice,o=n("3260"),s=n("997d"),i=e.exports=function(e,t,n){return n||(n={}),e===t||(e instanceof Date&&t instanceof Date?e.getTime()===t.getTime():!e||!t||"object"!=typeof e&&"object"!=typeof t?n.strict?e===t:e==t:l(e,t,n))};function a(e){return null===e||void 0===e}function c(e){return!(!e||"object"!==typeof e||"number"!==typeof e.length)&&("function"===typeof e.copy&&"function"===typeof e.slice&&!(e.length>0&&"number"!==typeof e[0]))}function l(e,t,n){var l,u;if(a(e)||a(t))return!1;if(e.prototype!==t.prototype)return!1;if(s(e))return!!s(t)&&(e=r.call(e),t=r.call(t),i(e,t,n));if(c(e)){if(!c(t))return!1;if(e.length!==t.length)return!1;for(l=0;l<e.length;l++)if(e[l]!==t[l])return!1;return!0}try{var p=o(e),d=o(t)}catch(f){return!1}if(p.length!=d.length)return!1;for(p.sort(),d.sort(),l=p.length-1;l>=0;l--)if(p[l]!=d[l])return!1;for(l=p.length-1;l>=0;l--)if(u=p[l],!i(e[u],t[u],n))return!1;return typeof e===typeof t}},"8fb8":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-list",{attrs:{"three-line":""}},e._l(e.detailedSnapshots,function(t,r){return n("v-list-tile",{key:r,attrs:{to:"/repositories/"+e.repoId+"/snapshots/"+t.id,avatar:"",ripple:""}},[n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(e.$d(t.date,"long"))+" ("+e._s(t.relativeDate)+")")]),n("v-list-tile-sub-title",[n("v-chip",{staticClass:"white--text",class:e.chipClass,attrs:{label:"",small:""}},[e._v(e._s(t.jobName))]),e._l(t.tags,function(t,r){return n("v-chip",{key:r,attrs:{outline:"",label:"",disabled:"",color:"accent"}},[e._v(e._s(t))])})],2)],1)],1)}),1)},o=[],s=n("9ab4"),i=n("60a3"),a=n("f33f"),c=n("421b"),l=n("e49c"),u=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return s["d"](t,e),Object.defineProperty(t.prototype,"detailedSnapshots",{get:function(){var e=this;return this.snapshots.map(function(t){return s["a"]({},t,{relativeDate:e.$relativeDate(t.date),jobName:a["c"].getById(t.jobId||0).name||e.$t("snapshot-list.no-job")})})},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"chipClass",{get:function(){return l["a"].job},enumerable:!0,configurable:!0}),s["c"]([Object(i["e"])({type:Array,default:function(){return[]}})],t.prototype,"snapshots",void 0),s["c"]([Object(i["e"])({type:[String,Number],required:!0})],t.prototype,"repoId",void 0),t=s["c"]([Object(i["a"])({components:{}})],t),t}(Object(i["d"])(c["a"])),p=u,d=p,f=n("2877"),h=n("6544"),b=n.n(h),v=n("cc20"),g=n("8860"),y=n("ba95"),m=n("5d23"),O=Object(f["a"])(d,r,o,!1,null,null,null);t["a"]=O.exports;b()(O,{VChip:v["a"],VList:g["a"],VListTile:y["a"],VListTileContent:m["a"],VListTileSubTitle:m["b"],VListTileTitle:m["c"]})},"997d":function(e,t){var n="[object Arguments]"==function(){return Object.prototype.toString.call(arguments)}();function r(e){return"[object Arguments]"==Object.prototype.toString.call(e)}function o(e){return e&&"object"==typeof e&&"number"==typeof e.length&&Object.prototype.hasOwnProperty.call(e,"callee")&&!Object.prototype.propertyIsEnumerable.call(e,"callee")||!1}t=e.exports=n?r:o,t.supported=r,t.unsupported=o},ce7e:function(e,t,n){"use strict";n("58db");var r=n("6a18"),o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e};t["a"]=r["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(e){return e("hr",{class:o({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:this.$attrs,on:this.$listeners})}})},f664:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-treeview",{attrs:{items:e.snapshotTree,"selected-color":"accent","open-on-click":"",selectable:"","item-key":"fullPath","loading-icon":"mdi-loading","expand-icon":"mdi-chevron-down","on-icon":"mdi-checkbox-marked","off-icon":"mdi-checkbox-blank-outline","indeterminate-icon":"mdi-checkbox-intermediate"},scopedSlots:e._u([{key:"prepend",fn:function(t){var r=t.item,o=t.open;return[r.children&&r.children.length?n("v-icon",{staticClass:"yellow--text text--darken-2"},[e._v(e._s(o?"mdi-folder-open":"mdi-folder"))]):n("v-icon",[e._v(e._s(e.$getFileIcon(r.name)))])]}}]),model:{value:e.selectedFiles,callback:function(t){e.selectedFiles=t},expression:"selectedFiles"}})},o=[],s=n("9ab4"),i=n("60a3"),a=n("421b"),c=n("df7c"),l=n("7fae"),u=n.n(l),p=function(e){for(var t={},n=e.slice().sort(function(e,t){return e.split("/").length-t.split("/").length}),r=0;r<n.length;++r){for(var o=n[r],s=!1;;){if(o=c["dirname"](o),"/"===o)break;if(t[o]){s=!0;break}}s||(t[n[r]]=!0)}return Object.keys(t)},d=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.selectedFiles=[],t}return s["d"](t,e),t.prototype.setSelected=function(e){},t.prototype.onUpdateSelected=function(e,t){u()(e,t)||(this.selectedFiles=this.selected)},t.prototype.onUpdateSelectedFiles=function(e,t){u()(e,t)||this.setSelected(e)},Object.defineProperty(t.prototype,"snapshotTree",{get:function(){if(!this.filesInSnapshot.length)return[];for(var e=[],t=[e],n=this.filesInSnapshot,r=0;r<n.length;++r){var o=n[r],s=n[r+1],i=s&&s.startsWith(o),a=o.split("/").length-2,l={name:c["basename"](o),fullPath:o,children:i?[]:void 0};i&&(t[a+1]=l.children),t[a].push(l)}return e},enumerable:!0,configurable:!0}),s["c"]([Object(i["e"])({type:Array,required:!0})],t.prototype,"selected",void 0),s["c"]([Object(i["b"])("update:selected")],t.prototype,"setSelected",null),s["c"]([Object(i["g"])("selected")],t.prototype,"onUpdateSelected",null),s["c"]([Object(i["g"])("selectedFiles")],t.prototype,"onUpdateSelectedFiles",null),s["c"]([Object(i["e"])({type:Array,required:!0})],t.prototype,"filesInSnapshot",void 0),t=s["c"]([Object(i["a"])({components:{}})],t),t}(Object(i["d"])(a["b"])),f=d,h=f,b=n("2877"),v=n("6544"),g=n.n(v),y=n("132d"),m=n("eb2a");n.d(t,"a",function(){return p});var O=Object(b["a"])(h,r,o,!1,null,null,null);t["b"]=O.exports;g()(O,{VIcon:y["a"],VTreeview:m["a"]})}}]);
//# sourceMappingURL=snapshot.5c9bab48.js.map