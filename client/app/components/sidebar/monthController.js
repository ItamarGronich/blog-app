(function (app) {

	app.controller('monthController' , function($scope, postsService){
		$scope.toMonth = function(month){
			var date = new Date(2015,month, 1).toDateString();
				return date.slice(4,7);

		};


	})




})(angular.module('blogApp'));
