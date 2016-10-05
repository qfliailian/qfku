var app = angular.module('myApp',['ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/index', {
		templateUrl: 'view/index.html',
		controller: 'indexCtrl'
	}).when('/article/:id/:type', {
		templateUrl: 'view/article.html',
		controller: 'artCtrl'
	}).otherwise({
		redirectTo: '/index'
	})
}])
app.run(function(){
	(function(doc, win) {
	        var docEl = doc.documentElement;
	        resize = function() {
	            var clientWidth = docEl.clientWidth;
	            docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
	        }
	        win.addEventListener('resize', resize);
	        win.addEventListener('DOMContentLoaded', resize);

	    })(document, window);
})
app.controller('indexCtrl',function($scope,$http){
	//请求数据
	$http.jsonp("php/http.php",{
		params:{
			type:'top',
			callback:"JSON_CALLBACK"
		}
	}).success(function(data){
		// 返回的数据赋值给$scope.arr
		data = data.result.data;
		$scope.arr = data;
	})
	//分类点击
})
app.controller('artCtrl',function($scope,$routeParams,$http,$sce){
	$http.jsonp("php/http.php",{
		params:{
			type:$routeParams.type,
			callback:"JSON_CALLBACK"
		}
	}).success(function(data){
		// 返回的数据赋值给$scope.arr
		data = data.result.data;
		$scope.arr = data;
		var url = $scope.arr[$routeParams.id].url;
		$http.jsonp("php/http1.php",{
			params:{
				url:url,
				callback:"JSON_CALLBACK"
			}
		}).success(function(data){
			var arr = [];
			$scope.htmlsce = $sce.trustAsHtml(data.match(/<article[^>]*>([\s\S]*?)<\/article>/g)[0]);
		})
	})
	
})
app.directive('headtop',function($http){
	return {
		templateUrl:'directive/news.html',
		link:function(scope,elm,attr){
			var oLi = $('.head-nav>ul>li');
			oLi.on('tap',function(){
				var data = this.getAttribute('data');
				oLi.attr('class','')
				this.setAttribute('class','select');
					$http.jsonp('php/http.php',{
						params:{
							type:data,
							callback:"JSON_CALLBACK"
						}
					}).success(function(data){
						data = data.result.data;
						scope.arr = data;
					})
			})
		}
	}
})
app.directive('content',function($http,$routeParams,$window,retype){
	return {
		templateUrl:'directive/content.html',
		link:function(scope,elm,attr){
			scope.turn = function($event,id,type){
				console.log(type)
				$window.location.href = '#/article/'+id+'/'+retype[type]
			}
		}
	}
})
app.service('retype',function(){
	return {
		'头条':'top','社会':'shehui','国内':'guonei','国际':'guoji','娱乐':'yule',
		'体育':'tiyu','军事':'junshi','科技':'keji','财经':'caijing','时尚':'shishang',
	}
})
