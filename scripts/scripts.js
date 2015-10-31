window.BOOTSTRAP_OK=!0,console.log("App!!"),console.log("TESTING"),angular.element(document).ready(function(){angular.bootstrap(document,["bestintown"])}),angular.module("bestintown",["ionic","config","ngAnimate","ngCordova"]).run(["$ionicPlatform","$cordovaInAppBrowser","$ionicPopup","ENV","$http",function(a,b,c,d,e){a.ready(function(){if(window.cordova&&(window.open=cordova.InAppBrowser.open),window.cordova&&window.cordova.plugins&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleLightContent(),window.PushNotification){var a=PushNotification.init({ios:{alert:"true",badge:"true",sound:"true"},windows:{}});a.on("registration",function(a){console.log(a),e.post(d.apiEndpoint+"devices",{device_type:"ios",token:a.registrationId})}),a.on("notification",function(a){c.alert({title:a.title,template:a.message})}),a.on("error",function(a){console.log(a)})}})}]).config(["$stateProvider","$urlRouterProvider",function(a,b){console.log("CONFIG!!"),a.state("tab",{url:"/tab","abstract":!0,templateUrl:"templates/tabs.html"}).state("tab.categories",{url:"/categories",views:{"tab-dash":{templateUrl:"templates/categories.html",controller:"CategoriesController as vm"}}}).state("tab.categories-show",{url:"/categories/:categoryId",views:{"tab-dash":{templateUrl:"templates/categories-show.html",controller:"CategoriesShowController as vm"}}}).state("tab.hotspots-show",{url:"/hotspots/:hotspotId?lat?lon",views:{"tab-chats":{templateUrl:"templates/hotspots-show.html",controller:"HotspotsShowController as vm"}}}).state("tab.nearby",{url:"/nearby",views:{"tab-chats":{templateUrl:"templates/nearby.html",controller:"NearbyController as vm"}}}).state("tab.chat-detail",{url:"/chats/:chatId",views:{"tab-chats":{templateUrl:"templates/chat-detail.html",controller:"ChatDetailCtrl"}}}).state("tab.account",{url:"/account",views:{"tab-account":{templateUrl:"templates/tab-account.html",controller:"AccountCtrl"}}}),b.otherwise("/tab/nearby")}]),angular.module("starter.controllers",[]).controller("DashCtrl",["$scope",function(a){}]).controller("ChatsCtrl",["$scope","Chats",function(a,b){a.chats=b.all(),a.remove=function(a){b.remove(a)}}]).controller("ChatDetailCtrl",["$scope","$stateParams","Chats",function(a,b,c){a.chat=c.get(b.chatId)}]).controller("AccountCtrl",["$scope",function(a){a.settings={enableFriends:!0}}]),angular.module("starter.services",[]).factory("Chats",function(){var a=[{id:0,name:"Ben Sparrow",lastText:"You on your way?",face:"https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png"},{id:1,name:"Max Lynx",lastText:"Hey, it's me",face:"https://avatars3.githubusercontent.com/u/11214?v=3&s=460"},{id:2,name:"Adam Bradleyson",lastText:"I should buy a boat",face:"https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg"},{id:3,name:"Perry Governor",lastText:"Look at my mukluks!",face:"https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png"},{id:4,name:"Mike Harrington",lastText:"This is wicked good ice cream.",face:"https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png"}];return{all:function(){return a},remove:function(b){a.splice(a.indexOf(b),1)},get:function(b){for(var c=0;c<a.length;c++)if(a[c].id===parseInt(b))return a[c];return null}}}),angular.module("config",[]).constant("ENV",{name:"production",apiEndpoint:"http://bestintown.co/api/v1/"}),function(){"use strict";function a(a,b,c,d){function e(){d.ready(function(){f()})}function f(){var d={timeout:1e4,enableHighAccuracy:!1};c.getCurrentPosition(d).then(function(c){var d=c.coords.latitude,e=c.coords.longitude;a.get(b.apiEndpoint+"categories",{params:{lat:d,lon:e}}).then(function(a){g.categories=a.data})},function(a){})}var g=this;g.activate=e,g.title="Categories",e()}angular.module("bestintown").controller("CategoriesController",a),a.$inject=["$http","ENV","$cordovaGeolocation","$ionicPlatform"]}(),function(){"use strict";function a(a,b,c,d,e,f){function g(){b.ready(function(){k()})}function h(){console.log("sharing!"),window.plugins.socialsharing.share("Message, subject, image and link","The subject","https://www.google.nl/images/srpr/logo4w.png","http://www.x-services.nl")}function i(a){window.open(a.external_url,"_blank")}function j(a,b){e.go("tab.categories-show",{categoryId:b.id}),a.stopPropagation()}function k(){console.log("Getting location");var b={timeout:1e4,enableHighAccuracy:!1};a.getCurrentPosition(b).then(function(a){console.log("Lot locatin",a);var b=a.coords.latitude,e=a.coords.longitude;c.get(d.apiEndpoint+"nearby",{params:{lat:b,lon:e}}).then(function(a){l.places=a.data})},function(a){console.log("Failed")})}var l=this;l.activate=g,l.title="Nearby",l.openYelp=i,l.openCategory=j,l.share=h,g()}angular.module("bestintown").controller("NearbyController",a),a.$inject=["$cordovaGeolocation","$ionicPlatform","$http","ENV","$state","$cordovaSocialSharing"]}(),function(){"use strict";function a(a,b,c,d,e){function f(){e.ready(function(){g()})}function g(){a.get(c.apiEndpoint+"nearby",{params:{lat:b.lat,lon:b.lon}}).then(function(a){h.places=a.data})}var h=this;h.activate=f,h.title="HotspotsShow",f()}angular.module("bestintown").controller("HotspotsShowController",a),a.$inject=["$http","$stateParams","ENV","$cordovaGeolocation","$ionicPlatform"]}(),function(){"use strict";function a(a,b,c,d,e){function f(){e.ready(function(){i()})}function g(a){window.open(a.external_url,"_blank")}function h(a,b){$state.go("tab.categories-show",{categoryId:b.id}),a.stopPropagation()}function i(){var e={timeout:1e4,enableHighAccuracy:!1};d.getCurrentPosition(e).then(function(d){var e=d.coords.latitude,f=d.coords.longitude;a.get(c.apiEndpoint+"categories/"+b.categoryId+"/places",{params:{lat:e,lon:f}}).then(function(a){j.places=a.data}),a.get(c.apiEndpoint+"categories/"+b.categoryId,{params:{lat:e,lon:f}}).then(function(a){j.category=a.data})},function(a){})}var j=this;j.activate=f,j.title="CategoriesShow",j.openYelp=g,j.openCategory=h,f()}angular.module("bestintown").controller("CategoriesShowController",a),a.$inject=["$http","$stateParams","ENV","$cordovaGeolocation","$ionicPlatform"]}();