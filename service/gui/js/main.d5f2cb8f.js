(function(e){function t(t){for(var r,o,s=t[0],c=t[1],u=t[2],l=0,d=[];l<s.length;l++)o=s[l],a[o]&&d.push(a[o][0]),a[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);h&&h(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var s=n[o];0!==a[s]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={main:0},a={main:0},i=[];function s(e){return c.p+"js/"+({404:"404",events:"events",help:"help","home~login":"home~login",home:"home",login:"login",jobs:"jobs",repositories:"repositories",search:"search",settings:"settings"}[e]||e)+"."+{404:"3421f488",events:"e466f821",help:"c90ce521","home~login":"c1aa271f",home:"e5ac0018",login:"e4cedde0",jobs:"307c0db3",repositories:"dddc595a",search:"67a50983",settings:"c1292556"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={events:1,help:1,"home~login":1,home:1,login:1,repositories:1,settings:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise(function(t,n){for(var r="css/"+({404:"404",events:"events",help:"help","home~login":"home~login",home:"home",login:"login",jobs:"jobs",repositories:"repositories",search:"search",settings:"settings"}[e]||e)+"."+{404:"31d6cfe0",events:"c513a320",help:"9be9f7c7","home~login":"8476501a",home:"fd576008",login:"e1b25e53",jobs:"31d6cfe0",repositories:"477fdfbe",search:"31d6cfe0",settings:"e1f89b0e"}[e]+".css",a=c.p+r,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var u=i[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===a))return t()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){u=d[s],l=u.getAttribute("data-href");if(l===r||l===a)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.request=r,delete o[e],h.parentNode.removeChild(h),n(i)},h.href=a;var m=document.getElementsByTagName("head")[0];m.appendChild(h)}).then(function(){o[e]=0}));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise(function(t,n){r=a[e]=[t,n]});t.push(r[2]=i);var u,l=document.getElementsByTagName("head")[0],d=document.createElement("script");d.charset="utf-8",d.timeout=120,c.nc&&d.setAttribute("nonce",c.nc),d.src=s(e),u=function(t){d.onerror=d.onload=null,clearTimeout(h);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");i.type=r,i.request=o,n[1](i)}a[e]=void 0}};var h=setTimeout(function(){u({type:"timeout",target:d})},12e4);d.onerror=d.onload=u,l.appendChild(d)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var h=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){n("db4d"),e.exports=n("cd49")},"49f8":function(e,t,n){var r={"./de.json":"6ce2","./en.json":"edd4"};function o(e){var t=a(e);return n(t)}function a(e){var t=r[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}o.keys=function(){return Object.keys(r)},o.resolve=a,e.exports=o,o.id="49f8"},"6ce2":function(e){e.exports={common:{interaction:{continue:"Fortfahren",next:"Weiter",back:"Zurück",previous:"Zum Vorhergehenden",confirm:"Bestätigen",finish:"Abschließen"}},wizard:{"create-user":"Benutzer erstellen","choose-language":"Sprache wählen","choose-theme":"Farbschema auswählen"},theme:{dark:"Dunkel"},language:{german:"Deutsch",english:"Engilsch",choose:"Wähle deine Sprache aus"},home:{"welcome-message":"Willkommen bei Backup380!",greeting:"Willkommen zurück, {name}!"},login:{prompt:"Bitte einloggen",username:"Anmeldename",password:"Passwort",login:"Anmelden","password-security":{"no-same-characters":"Wiederholen Sie nicht zu viele gleiche Buchstaben","no-repeated-words":"Wiederholen Sie nicht zu viele gleiche Wörter","not-long-enough":"Versuchen Sie, ein längeres Passwort zu verwenden","no-uppercase-lowercase":"Benutzen Sie Klein- und Großbuchstaben","no-numbers-and-special":"Vergessen Sie nicht auf Zahlen und Symbole"}},navigation:{search:"Suche nach Archiven, Backup Aufgaben, Einstellungen, Logs and Ereignissen",general:"Allgemein",other:"Andere",home:"Start",events:"Ereignisse",settings:"Einstellungen",help:"Hilfe",jobs:"Aufgaben","all-jobs":"Alle Aufgaben","create-job":"Neue Aufgabe",repositories:"Archive","all-repositories":"Alle Archive","create-repository":"Neues Archiv",logout:"Abmelden",notifications:"Benachrichtigungen"},"repository-editor":{"name-length":"Der Name muss kürzer als {length} Buchstaben sein","s3-access-key-invalid":"Eine 20 Zeichen langeZeichenkette mit Groß- und Kleinbuchstaben und Zahlen wird vorausgesetzt","s3-secret-key-invalid":"Eine Base64 Zeichenkette wird vorausgesetzt"},help:{"forgot-password":{title:"Ich habe mein Passwort vergessen",content:"Der Mechanismus für das Zurücksetzten von Passwörtern existiert (noch) nicht."},"backup-missing":{title:"Ich kann meine Backups nicht finden",content:"Ihre Backups sind unter Alle Backups zu finden."}},api:{success:{user:{login:"Sie haben sich erfolgreich angemeldet."},register:"Sie haben sich erfolgreich registriert."},error:{user:{login:{"missing-username":"Ihr Benutzername fehlt.","user-not-found":"Sie haben keinen Benutzername eingegeben. Versuchen Sie es noch einmal.","missing-data":"Die Anmeldedaten fehlen."},register:{"userdata-already-exists":"Die Benutzerdaten sind bereits in Verwendung. Versuchen Sie ein anderes.",other:"Es gibt Probleme mit Ihrer Registration. Versuchen Sie es noch einmal."}},"missing-data":"Es fehlen Anmeldedaten."}}}},cd49:function(e,t,n){"use strict";n.r(t);n("db4d");var r=n("2b0e"),o=n("bb71");n("da64");r["default"].use(o["a"],{theme:{primary:"#456CB2",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"},customProperties:!0,iconfont:"mdi"});var a=n("a925");function i(){var e=n("49f8"),t={};return e.keys().forEach(function(n){var r=n.match(/([A-Za-z0-9-_]+)\./i);if(r&&r.length>1){var o=r[1];t[o]=e(n)}}),t}r["default"].use(a["a"]);var s=new a["a"]({locale:"en",fallbackLocale:"en",messages:i()}),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",{attrs:{dark:e.currentTheme.dark}},[n("the-header"),n("v-content",[n("router-view")],1)],1)},u=[],l=n("9ab4"),d=n("60a3"),h=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l["d"](t,e),t.prototype.updateVuetifyTheme=function(){this.$vuetify.theme.primary=this.currentTheme.primary,this.$vuetify.theme.secondary=this.currentTheme.secondary,this.$vuetify.theme.accent=this.currentTheme.accent},Object.defineProperty(t.prototype,"currentTheme",{get:function(){return this.$store.getters["settings/theme"]},enumerable:!0,configurable:!0}),l["c"]([Object(d["d"])("currentTheme",{immediate:!0})],t.prototype,"updateVuetifyTheme",null),t=l["c"]([d["a"]],t),t}(d["c"]),m=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l["d"](t,e),t.prototype.updateI18nLocale=function(){this.$i18n.locale=this.currentLanguage,this.$vuetify.lang.current=this.currentLanguage},Object.defineProperty(t.prototype,"currentLanguage",{get:function(){return this.$store.getters["settings/language"]},enumerable:!0,configurable:!0}),l["c"]([Object(d["d"])("currentLanguage",{immediate:!0})],t.prototype,"updateI18nLocale",null),t=l["c"]([d["a"]],t),t}(d["c"]),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",["default"==e.layout?n("v-navigation-drawer",{attrs:{clipped:e.$vuetify.breakpoint.lgAndUp,fixed:"",app:""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[n("v-list",[e._l(e.items,function(t){return[t.heading?n("v-subheader",{key:t.heading},[e._v(e._s(t.heading))]):t.children?n("v-list-group",{key:t.text,attrs:{"prepend-icon":t.model?t.icon:t["icon-alt"],"append-icon":""},model:{value:t.model,callback:function(n){e.$set(t,"model",n)},expression:"item.model"}},[n("v-list-tile",{attrs:{slot:"activator"},slot:"activator"},[n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.text))])],1)],1),e._l(t.children,function(t,r){return n("v-list-tile",{key:r,attrs:{to:t.to,exact:t.exact}},[n("v-list-tile-action",[n("v-icon",[e._v(e._s(t.icon))])],1),n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.text))])],1)],1)})],2):n("v-list-tile",{key:t.text,attrs:{to:t.to}},[n("v-list-tile-action",[n("v-icon",[e._v(e._s(t.icon))])],1),n("v-list-tile-content",[n("v-list-tile-title",[e._v(e._s(t.text))])],1)],1)]})],2)],1):e._e(),n("v-toolbar",{attrs:{"clipped-left":e.$vuetify.breakpoint.lgAndUp,color:"primary",dark:"",app:"",fixed:""}},["default"==e.layout?n("v-toolbar-side-icon",{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}}):e._e(),n("v-toolbar-title",{staticStyle:{width:"300px"}},[n("span",{staticClass:"hidden-sm-and-down"},[e._v("Backup380")])]),"default"==e.layout?n("v-text-field",{staticClass:"hidden-sm-and-down",attrs:{flat:"","solo-inverted":"","hide-details":"","prepend-inner-icon":"mdi-magnify",label:e.$t("navigation.search")}}):e._e(),n("v-spacer"),"default"==e.layout?n("v-tooltip",{attrs:{bottom:""}},[n("v-btn",{attrs:{slot:"activator",icon:""},on:{click:function(t){e.notificationDrawer=!0}},slot:"activator"},[n("v-badge",{attrs:{color:"accent",right:"",overlap:""}},[n("span",{attrs:{slot:"badge"},slot:"badge"},[e._v(e._s(e.notificationHistory.length))]),n("v-icon",[e._v("mdi-bell")])],1)],1),n("span",[e._v(e._s(e.$t("navigation.notifications")))])],1):e._e(),n("v-tooltip",{attrs:{bottom:""}},["default"==e.layout?n("v-btn",{attrs:{slot:"activator",icon:""},on:{click:e.performLogout},slot:"activator"},[n("v-icon",[e._v("mdi-logout-variant")])],1):e._e(),n("span",[e._v(e._s(e.$t("navigation.logout")))])],1)],1),n("v-navigation-drawer",{attrs:{temporary:"",app:"",right:""},model:{value:e.notificationDrawer,callback:function(t){e.notificationDrawer=t},expression:"notificationDrawer"}},[n("v-slide-x-transition",{attrs:{group:""}},[e._l(e.notificationHistory,function(t){return[n("v-alert",{key:t.key,staticClass:"ma-3",attrs:{value:!0,type:t.type}},[e._v(e._s(e.$t(t.name,t.args)))])]})],2)],1),n("the-snackbar")],1)},p=[],g=n("a34a"),v=n.n(g),b=n("2f62"),y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-snackbar",{attrs:{color:e.currentNotification.type,"multi-line":!0,timeout:3e3,vertical:!1},model:{value:e.snackbarShown,callback:function(t){e.snackbarShown=t},expression:"snackbarShown"}},[e.currentNotification?n("span",[e._v(e._s(e.currentNotification.name,e.currentNotification.args))]):e._e(),n("v-btn",{attrs:{dark:"",flat:""},on:{click:function(t){e.snackbarShown=!1}}},[e._v(e._s(e.$t("common.interaction.close")))])],1)],1)},w=[];function k(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){x(e,t,n[t])})}return e}function x(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var j={data:function(){return{snackbarShown:!1}},watch:{snackbarShown:{handler:function(){var e=this;this.snackbarShown||this.$nextTick(function(){e.$store.dispatch("notifications/closeCurrent")})}},currentNotification:{immediate:!0,handler:function(){this.currentNotification&&(this.snackbarShown=!0)}}},methods:{},computed:k({},Object(b["c"])({currentNotification:"notifications/currentNotification"}))},S=j,_=n("2877"),A=n("6544"),T=n.n(A),O=n("8336"),P=n("2db4"),$=Object(_["a"])(S,y,w,!1,null,null,null);$.options.__file="TheSnackbar.vue";var E=$.exports;function N(e,t,n,r,o,a,i){try{var s=e[a](i),c=s.value}catch(u){return void n(u)}s.done?t(c):Promise.resolve(c).then(r,o)}function B(e){return function(){var t=this,n=arguments;return new Promise(function(r,o){var a=e.apply(t,n);function i(e){N(a,r,o,i,s,"next",e)}function s(e){N(a,r,o,i,s,"throw",e)}i(void 0)})}}function V(e){return M(e)||C(e)||L()}function L(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function C(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function M(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),r.forEach(function(t){z(e,t,n[t])})}return e}function z(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}T()($,{VBtn:O["a"],VSnackbar:P["a"]});var F={components:{TheSnackbar:E},data:function(){return{dialog:!1,drawer:null,notificationDrawer:!1}},computed:D({items:function(){return[{heading:this.$t("navigation.general")},{icon:"mdi-home",text:this.$t("navigation.home"),to:"/"},{icon:"mdi-history",text:this.$t("navigation.events"),to:"/events"},{icon:"mdi-chevron-up","icon-alt":"mdi-chevron-down",text:this.$t("navigation.repositories"),model:!1,children:[{icon:"mdi-nas",text:this.$t("navigation.all-repositories"),to:"/repositories",exact:!0},{icon:"mdi-plus",text:this.$t("navigation.create-repository"),to:"/repositories/new"}].concat(V(this.recentlyUsedRepositories.map(function(e){return{text:e.name,to:"/repositories/".concat(e.id)}})))},{icon:"mdi-chevron-up","icon-alt":"mdi-chevron-down",text:this.$t("navigation.jobs"),model:!1,children:[{icon:"mdi-calendar-check",text:this.$t("navigation.all-jobs"),to:"/jobs",exact:!0},{icon:"mdi-plus",text:this.$t("navigation.create-job"),to:"/jobs/new"}].concat(V(this.recentlyUsedJobs.map(function(e){return{text:e.name,to:"/jobs/".concat(e.id)}})))},{heading:this.$t("navigation.other")},{icon:"mdi-settings",text:this.$t("navigation.settings"),to:"/settings"},{icon:"mdi-help",text:this.$t("navigation.help"),to:"/help"}]},layout:function(){return this.$route.meta.layout||"default"}},Object(b["c"])({recentlyUsedRepositories:"repositories/recentlyUsed",recentlyUsedJobs:"jobs/recentlyUsed",notificationHistory:"notifications/notificationHistory"})),methods:D({},Object(b["b"])({logout:"auth/logout"}),{performLogout:function(){var e=B(v.a.mark(function e(){return v.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.logout();case 2:this.$router.push("/login");case 3:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()})},I=F,U=n("0798"),R=n("4ca6"),H=n("132d"),K=n("8860"),W=n("56b0"),J=n("ba95"),Y=n("40fe"),Z=n("5d23"),G=n("f774"),q=n("0789"),X=n("9910"),Q=n("e0c7"),ee=n("2677"),te=n("71d9"),ne=n("706c"),re=n("2a7f"),oe=n("3a2f"),ae=Object(_["a"])(I,f,p,!1,null,null,null);ae.options.__file="TheHeader.vue";var ie=ae.exports;T()(ae,{VAlert:U["a"],VBadge:R["a"],VBtn:O["a"],VIcon:H["a"],VList:K["a"],VListGroup:W["a"],VListTile:J["a"],VListTileAction:Y["a"],VListTileContent:Z["a"],VListTileTitle:Z["c"],VNavigationDrawer:G["a"],VSlideXTransition:q["d"],VSpacer:X["a"],VSubheader:Q["a"],VTextField:ee["a"],VToolbar:te["a"],VToolbarSideIcon:ne["a"],VToolbarTitle:re["a"],VTooltip:oe["a"]});var se=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l["d"](t,e),t=l["c"]([Object(d["a"])({components:{TheHeader:ie}})],t),t}(Object(d["b"])(h,m)),ce=se,ue=ce,le=n("7496"),de=n("549c"),he=Object(_["a"])(ue,c,u,!1,null,null,null);he.options.__file="App.vue";var me=he.exports;T()(he,{VApp:le["a"],VContent:de["a"]});var fe,pe=n("8c4f"),ge=n("bc3a"),ve=n.n(ge),be=void 0,ye=function(e){var t=e.username,n=e.password;return l["b"](be,void 0,Promise,function(){var e;return l["e"](this,function(r){switch(r.label){case 0:return[4,ve.a.post("/user/login",{username:t,password:n},l["a"]({},je))];case 1:return e=r.sent(),[2,xe(e)]}})})},we=function(e){var t=e.username,n=e.password,r=e.firstName,o=e.lastName,a=e.email;return l["b"](be,void 0,Promise,function(){var e;return l["e"](this,function(i){switch(i.label){case 0:return[4,ve.a.post("/user/register",{username:t,password:n,firstName:r,lastName:o,email:a},l["a"]({},je))];case 1:return e=i.sent(),[2,xe(e)]}})})},ke="/api/",xe=function(e){return e.data},je={baseURL:ke},Se=function(e){return new Promise(function(t){return setTimeout(t,e)})},_e={token:"",username:""},Ae={setServerResponse:function(e,t){var n=t.token,r=t.username;e.token=n,e.username=r},deleteAuthData:function(e){e.token=e.username=""}},Te={isLoggedIn:function(e){return!(!e.token||!e.username)},username:function(e){return e.username}},Oe={authenticate:function(e,t){var n=e.commit,r=t.password,o=t.username;return l["b"](this,void 0,void 0,function(){var e;return l["e"](this,function(t){switch(t.label){case 0:return[4,ye({username:o,password:r})];case 1:return e=t.sent(),n("setServerResponse",{token:e.payload.token,username:o}),[2,e]}})})},logout:function(e){var t=e.commit;return l["b"](this,void 0,void 0,function(){return l["e"](this,function(e){switch(e.label){case 0:return[4,Se(500)];case 1:return e.sent(),t("deleteAuthData"),[2]}})})},createUser:function(e,t){e.commit,e.dispatch;var n=t.password,r=t.username,o=t.firstName,a=t.lastName,i=t.email;return l["b"](this,void 0,void 0,function(){var e;return l["e"](this,function(t){switch(t.label){case 0:return[4,we({password:n,username:r,firstName:o,lastName:a,email:i})];case 1:return e=t.sent(),[2,e]}})})}},Pe={namespaced:!0,state:_e,mutations:Ae,getters:Te,actions:Oe},$e={recentlyUsed:function(e){return e.jobs.slice(0,5)}},Ee={namespaced:!0,state:{jobs:[{name:"My daily job",id:Math.floor(1e6*Math.random())},{name:"Weekly backup",id:Math.floor(1e6*Math.random())},{name:"Important files",id:Math.floor(1e6*Math.random())}]},mutations:{},getters:$e},Ne={repositories:[{name:"Demo repo 1",password:"asdf",location:"s3.amazonaws.com/backup380-bucket-1",s3AccessKey:"S3EX4MPL3KEYASDFGHJK",s3SecretKey:"aS3exaMPLeSeCRE7ACCessK3y+qWertYuI/pzyxC",id:Math.floor(1e6*Math.random())},{name:"Demo repo 2",password:"asdf",location:"s3.amazonaws.com/backup380-bucket-2",s3AccessKey:"S3EX4MPL3KEYASDFGHJK",s3SecretKey:"aS3exaMPLeSeCRE7ACCessK3y+qWertYuI/pzyxC",id:Math.floor(1e6*Math.random())}]},Be={recentlyUsed:function(e){return e.repositories.slice(0,5)},allRepositories:function(e){return e.repositories}},Ve={namespaced:!0,state:Ne,mutations:{},getters:Be},Le={setDark:function(e,t){e.theme.dark=t},setLanguage:function(e,t){e.language=t},setTheme:function(e,t){e.theme=l["a"]({},t,{dark:e.theme.dark})}},Ce={theme:function(e){return l["a"]({dark:e.theme.dark},e.theme)},user:function(e){return e.user},language:function(e){return e.language}},Me={namespaced:!0,state:{theme:{dark:!0,primary:"#456CB2",secondary:"#424242",accent:"#82B1FF"},user:{name:""},language:"de"},mutations:Le,getters:Ce};(function(e){e["success"]="success",e["error"]="error",e["info"]="info",e["warning"]="warning"})(fe||(fe={}));var De={notifications:[{type:fe.info,name:"api.info.hello-there",seen:!1,key:Math.random()}]},ze={},Fe={notificationHistory:function(e){return e.notifications.slice().reverse()},currentNotification:function(e){var t=e.notifications.filter(function(e){return!e.seen});return t[0]||!1}},Ie={add:function(e,t){e.commit;var n=e.state;return l["b"](this,void 0,void 0,function(){return l["e"](this,function(e){return n.notifications.push(t),n.notifications.length>50&&n.notifications.shift(),n.notifications=n.notifications,[2]})})},closeCurrent:function(e){var t=e.state;return l["b"](this,void 0,void 0,function(){var e;return l["e"](this,function(n){for(e=0;e<t.notifications.length;e++)if(!t.notifications[e].seen)return r["default"].set(t.notifications[e],"seen",!0),t.notifications=t.notifications,[2];return t.notifications=t.notifications,[2]})})},addFromApiResponse:function(e,t){e.state;var n=e.dispatch;return l["b"](this,void 0,void 0,function(){var e,r,o,a,i;return l["e"](this,function(s){if(e=[],r=t,r.data?e=r.data.messages.map(function(e){return{type:e.type||fe.info,name:e.name,args:e.args,seen:!1,key:Math.random()}}):r.response&&r.response.data?e=r.response.data.messages.map(function(e){return{type:e.type||fe.info,name:e.name,args:e.args,seen:!1,key:Math.random()}}):r.messages?e=r.messages.map(function(e){return{type:e.type||fe.info,name:e.name,args:e.args,seen:!1,key:Math.random()}}):r.length&&r.map?e=r.map(function(e){return{type:e.type||fe.info,name:e.name,args:e.args,seen:!1,key:Math.random()}}):r.config&&r.config.data&&r instanceof Error?e=[{type:fe.error,name:"api.connection-not-available",seen:!1,key:Math.random()}]:r.name?e=[l["a"]({},r,{type:r.type||fe.info,seen:!1,key:Math.random()})]:(console.log(r),alert("Unknown error")),e&&e.length)for(o=0,a=e;o<a.length;o++)i=a[o],n("add",l["a"]({},i));return console.log(t),[2]})})}},Ue={namespaced:!0,state:De,mutations:ze,getters:Fe,actions:Ie};r["default"].use(b["a"]);var Re=new b["a"].Store({state:{},modules:{settings:Me,repositories:Ve,jobs:Ee,auth:Pe,notifications:Ue}}),He=Re,Ke=function(e){var t=e.next,n=e.to,r=He.getters["auth/isLoggedIn"];return r?t():t({path:"/login",query:{redirect:n.fullPath}})},We=function(e){var t=e.next,n=He.getters["auth/isLoggedIn"];return n?t({path:"/"}):t()};r["default"].use(pe["a"]);var Je=new pe["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:function(){return Promise.all([n.e("home~login"),n.e("home")]).then(n.bind(null,"bb51"))},meta:{middleware:[Ke]}},{path:"/login",name:"login",component:function(){return Promise.all([n.e("home~login"),n.e("login")]).then(n.bind(null,"a55b"))},meta:{layout:"minimal-drawer",middleware:[We]}},{path:"/events",name:"events",component:function(){return n.e("events").then(n.bind(null,"aa9c"))},meta:{middleware:[Ke]}},{path:"/settings",name:"settings",component:function(){return n.e("settings").then(n.bind(null,"26d3"))},meta:{middleware:[Ke]}},{path:"/repositories",name:"repositories",component:function(){return n.e("repositories").then(n.bind(null,"0d99"))},meta:{middleware:[Ke]}},{path:"/repositories/new",name:"new-repository",component:function(){return n.e("repositories").then(n.bind(null,"e107"))},meta:{middleware:[Ke]}},{path:"/jobs",name:"jobs",component:function(){return n.e("jobs").then(n.bind(null,"ee68"))},meta:{middleware:[Ke]}},{path:"/jobs/new",name:"new-job",component:function(){return n.e("jobs").then(n.bind(null,"98ed"))},meta:{middleware:[Ke]}},{path:"/help",name:"help",component:function(){return n.e("help").then(n.bind(null,"c3ef"))},meta:{}},{path:"/404",name:"404-error",alias:"*",component:function(){return n.e("404").then(n.bind(null,"8cdb"))},meta:{}},{path:"/search",name:"search",component:function(){return n.e("search").then(n.bind(null,"2d3b"))},meta:{middleware:[Ke]}},{path:"/setup",name:"setup",component:function(){return Promise.all([n.e("home~login"),n.e("login")]).then(n.bind(null,"e8e7"))},meta:{layout:"minimal-drawer"}}]});function Ye(e,t,n){var r=t[n];return r?function(){for(var o=[],a=0;a<arguments.length;a++)o[a]=arguments[a];e.next.apply(e,o);var i=Ye(e,t,n+1);r(l["a"]({},e,{next:i}))}:e.next}Je.beforeEach(function(e,t,n){if(e.meta.middleware){var r=Array.isArray(e.meta.middleware)?e.meta.middleware:[e.meta.middleware],o={from:t,next:n,router:Je,to:e},a=Ye(o,r,1);return r[0](l["a"]({},o,{next:a}))}return n()});var Ze=Je;n("d5e8"),n("5363");r["default"].config.productionTip=!1,r["default"].prototype.$bNotify=function(e){this.$store.dispatch("notifications/addFromApiResponse",e)},new r["default"]({router:Ze,store:He,i18n:s,render:function(e){return e(me)}}).$mount("#app")},edd4:function(e){e.exports={common:{interaction:{continue:"Continue",next:"Next",back:"Back",previous:"Previous",confirm:"Confirm",finish:"Finish"}},wizard:{"create-user":"Create user","choose-language":"Choose language","choose-theme":"Choose theme"},theme:{dark:"Dark"},language:{german:"German",english:"Engilsh",choose:"Choose your Language"},home:{"welcome-message":"Welcome to Backup380!",greeting:"Welcome back, {name}!"},login:{prompt:"Please log in",username:"Username",password:"Password",login:"Login","password-security":{"no-same-characters":"Don't repeat too many same characters","no-repeated-words":"Don't repeat too many words","not-long-enough":"Try to use more characters","no-uppercase-lowercase":"Use both upper and lower case characters","no-numbers-and-special":"Don't forget special characters and numbers"}},navigation:{search:"Search repositories, backup jobs, settings, logs and events",general:"General",other:"Other",home:"Home",events:"Events",settings:"Settings",help:"Help",jobs:"Jobs","all-jobs":"All Jobs","create-job":"New Job",repositories:"Repositories","all-repositories":"All Repositories","create-repository":"New Repository",logout:"Logout",notifications:"Notifications"},"repository-editor":{"name-length":"The name must be less than {length} characters","s3-access-key-invalid":"A 20-character, uppercase, alphanumeric string is expected","s3-secret-key-invalid":"A 40-character, base-64 string is expected"},help:{"forgot-password":{title:"I forgot my password",content:"The password reset mechanism doesn't exist yet. Try to install Backup380 again."},"backup-missing":{title:"I can't find my backups",content:"You can access your backups under All Backups."}},api:{success:{user:{login:"You successfully logged in."},register:"You successfully register."},error:{user:{login:{"missing-username":"Your username is missing.","user-not-found":"Your User is not found. Try it again.","missing-data":"Missing login data."},register:{"userdata-already-exists":"The userdata already exist. Try another one.",other:"There were problems with your registration."}},"missing-data":"Missing login data."}}}}});
//# sourceMappingURL=main.d5f2cb8f.js.map