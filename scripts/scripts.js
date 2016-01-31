window.BOOTSTRAP_OK=!0,console.log("App!!"),console.log("TESTING"),angular.element(document).ready(function(){angular.bootstrap(document,["bestintown"])}),angular.module("bestintown",["ionic","config","ngAnimate","ngCordova","ngIOS9UIWebViewPatch"]).run(["$ionicPlatform","$ionicConfig","$cordovaInAppBrowser","$ionicPopup","ENV","$http","$cordovaGoogleAnalytics","$rootScope","$ionicNavBarDelegate","$document","$timeout","$cordovaSplashscreen",function(a,b,c,d,e,f,g,h,i,j,k,l){a.ready(function(){if(console.log("Ionic platform ready"),window.analytics&&(g.debugMode(),g.startTrackerWithId("UA-51312192-7")),navigator.splashscreen&&k(function(){l.hide()},300),window.cordova&&(window.open=cordova.InAppBrowser.open),window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleLightContent(),window.PushNotification){var a=PushNotification.init({ios:{alert:"true",badge:"true",sound:"true"},windows:{}});a.on("registration",function(a){console.log(a),f.post(e.apiEndpoint+"devices",{device_type:"ios",token:a.registrationId})}),a.on("notification",function(a){d.alert({title:a.title,template:a.message})}),a.on("error",function(a){console.log("Push notification error",a)})}})}]).config(["$stateProvider","$urlRouterProvider",function(a,b){console.log("CONFIG!!"),a.state("tab",{url:"/tab","abstract":!0,templateUrl:"templates/tabs.html"}).state("tab.categories",{url:"/categories",views:{"tab-categories":{templateUrl:"templates/categories.html",controller:"CategoriesController as vm"}}}).state("tab.categories-show",{url:"/categories/:categoryId",views:{"tab-categories":{templateUrl:"templates/categories-show.html",controller:"CategoriesShowController as vm"}}}).state("tab.nearby",{url:"/nearby",views:{"tab-nearby":{templateUrl:"templates/nearby.html",controller:"NearbyController as vm"}}}).state("tab.nearby-categories-show",{url:"/nearby/categories/:categoryId",views:{"tab-nearby":{templateUrl:"templates/categories-show.html",controller:"CategoriesShowController as vm"}}}).state("tab.account",{url:"/account",views:{"tab-account":{templateUrl:"templates/tab-account.html",controller:"AccountController"}}}),b.otherwise("/tab/nearby")}]),angular.module("ngIOS9UIWebViewPatch",["ng"]).config(["$provide",function(a){"use strict";a.decorator("$browser",["$delegate","$window",function(a,b){function c(a){return/(iPhone|iPad|iPod).* OS 9_\d/.test(a)&&!/Version\/9\./.test(a)}function d(a){function b(){c=null}var c=null,d=a.url;return a.url=function(){return arguments.length?(c=arguments[0],d.apply(a,arguments)):c||d.apply(a,arguments)},window.addEventListener("popstate",b,!1),window.addEventListener("hashchange",b,!1),a}return c(b.navigator.userAgent)?d(a):a}])}]),angular.module("starter.controllers",[]).controller("DashCtrl",["$scope",function(a){}]).controller("ChatsCtrl",["$scope","Chats",function(a,b){a.chats=b.all(),a.remove=function(a){b.remove(a)}}]).controller("ChatDetailCtrl",["$scope","$stateParams","Chats",function(a,b,c){a.chat=c.get(b.chatId)}]).controller("AccountCtrl",["$scope",function(a){a.settings={enableFriends:!0}}]),angular.module("starter.services",[]).factory("Chats",function(){var a=[{id:0,name:"Ben Sparrow",lastText:"You on your way?",face:"https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png"},{id:1,name:"Max Lynx",lastText:"Hey, it's me",face:"https://avatars3.githubusercontent.com/u/11214?v=3&s=460"},{id:2,name:"Adam Bradleyson",lastText:"I should buy a boat",face:"https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg"},{id:3,name:"Perry Governor",lastText:"Look at my mukluks!",face:"https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png"},{id:4,name:"Mike Harrington",lastText:"This is wicked good ice cream.",face:"https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png"}];return{all:function(){return a},remove:function(b){a.splice(a.indexOf(b),1)},get:function(b){for(var c=0;c<a.length;c++)if(a[c].id===parseInt(b))return a[c];return null}}}),angular.module("config",[]).constant("ENV",{name:"production",apiEndpoint:"http://bestintown.co/api/v1/"}),function(){"use strict";function a(a,b,c,d,e,f){function g(){d.ready(function(){j(),window.analytics&&e.trackView("Categories")})}function h(c,d){return a.get(b.apiEndpoint+"categories",{params:{lat:c,lon:d}}).then(function(a){return a.data})}function i(){return k.isUsingDefault=!0,console.log("Getting default places"),h(f.lat,f.lon).then(function(a){k.categories=a})}function j(){var a={timeout:5e3,enableHighAccuracy:!1};return c.getCurrentPosition(a).then(function(a){var b=a.coords.latitude,c=a.coords.longitude;return h(b,c).then(function(a){k.categories=a},function(){return i()})},function(a){return i()})}var k=this;k.activate=g,k.title="Categories",g()}angular.module("bestintown").controller("CategoriesController",a),a.$inject=["$http","ENV","$cordovaGeolocation","$ionicPlatform","$cordovaGoogleAnalytics","defaultLatLon"]}(),function(){"use strict";function a(a,b,c,d,e,f,g,h,i,j,k){function l(){t.state="LOADING",b.ready(function(){p(),window.analytics&&i.trackView("Nearby")})}function m(){console.log("sharing!"),g.show({template:"Taking screenshot!"}),h(function(){g.hide(),navigator.screenshot&&h(function(){navigator.screenshot.save(function(a,b){a?window.alert(a):(console.log("ok",b.filePath),f.share("Checkout out these places #bestintown","Best in town",b.filePath).then(function(a){},function(a){window.alert("error")}))})},200)},500)}function n(a){window.open(a.external_url,"_blank")}function o(a,b){e.go("tab.nearby-categories-show",{categoryId:b.id}),a.stopPropagation()}function p(){console.log("Getting location");var b={timeout:5e3,enableHighAccuracy:!1};a.getCurrentPosition(b).then(function(a){console.log("Lot locatin",a);var b=a.coords.latitude,e=a.coords.longitude;return c.get(d.apiEndpoint+"cities",{params:{lat:b,lon:e}}).then(function(a){var b=a.data;b.length&&(t.city=b[0])}),r(b,e).then(function(a){t.state="LOADED",t.places=a},function(){return console.log("Failed getting places"),q()})},function(a){console.log("Failed, default location"),q()})}function q(){t.isUsingDefault=!0,console.log("Getting default places"),r(j.lat,j.lon).then(function(a){t.state="LOADED",t.places=a})}function r(a,b){return c.get(d.apiEndpoint+"nearby",{params:{lat:a,lon:b}}).then(function(a){return a.data})}function s(a){if(u&&u.resolve("cancelling search"),u=k.defer(),!a.length)return t.places=[],t.state="LOADING",r(j.lat,j.lon).then(function(a){t.state="LOADED",t.places=a});t.places=[],t.state="LOADING";return c.get(d.apiEndpoint+"search/"+t.city.id+"/"+a,{timeout:u.promise}).then(function(a){t.state="LOADED",t.places=a.data})}var t=this,u=k.defer();t.activate=l,t.title="Nearby",t.openYelp=n,t.openCategory=o,t.share=m,t.search=s,b.on("resume",p),l()}angular.module("bestintown").controller("NearbyController",a),a.$inject=["$cordovaGeolocation","$ionicPlatform","$http","ENV","$state","$cordovaSocialSharing","$ionicLoading","$timeout","$cordovaGoogleAnalytics","defaultLatLon","$q"]}(),function(){"use strict";function a(a,b,c,d,e){function f(){e.ready(function(){g()})}function g(){a.get(c.apiEndpoint+"nearby",{params:{lat:b.lat,lon:b.lon}}).then(function(a){h.places=a.data})}var h=this;h.activate=f,h.title="HotspotsShow",f()}angular.module("bestintown").controller("HotspotsShowController",a),a.$inject=["$http","$stateParams","ENV","$cordovaGeolocation","$ionicPlatform"]}(),function(){"use strict";function a(a,b,c,d,e,f,g){function h(){e.ready(function(){k()})}function i(a){window.open(a.external_url,"_blank")}function j(a,b){window.location.href.indexOf("nearby")>=0?f.go("tab.nearby-categories-show",{categoryId:b.id}):f.go("tab.categories-show",{categoryId:b.id}),a.stopPropagation()}function k(){var e={timeout:5e3,enableHighAccuracy:!1};d.getCurrentPosition(e).then(function(d){var e=d.coords.latitude,f=d.coords.longitude;a.get(c.apiEndpoint+"categories/"+b.categoryId+"/places",{params:{lat:e,lon:f}}).then(function(a){m.places=a.data},function(){l()}),a.get(c.apiEndpoint+"categories/"+b.categoryId).then(function(a){m.category=a.data})},function(d){console.log("Error didnt loaded"),l(),a.get(c.apiEndpoint+"categories/"+b.categoryId).then(function(a){m.category=a.data})})}function l(){m.isUsingDefault=!0,a.get(c.apiEndpoint+"categories/"+b.categoryId+"/places",{params:{lat:g.lat,lon:g.lon}}).then(function(a){m.places=a.data})}var m=this;m.activate=h,m.title="CategoriesShow",m.openYelp=i,m.openCategory=j,h()}angular.module("bestintown").controller("CategoriesShowController",a),a.$inject=["$http","$stateParams","ENV","$cordovaGeolocation","$ionicPlatform","$state","defaultLatLon"]}(),function(){"use strict";function a(){function a(){}var b=this;b.activate=a,b.title="Account",a()}angular.module("bestintown").controller("AccountController",a)}(),function(){"use strict";function a(){var a={lat:-27.49611,lon:153.00207};return a}angular.module("bestintown").factory("defaultLatLon",a)}();