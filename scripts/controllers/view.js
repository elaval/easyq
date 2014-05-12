'use strict';

angular.module('AppEasyQ')
  .controller('ViewCtrl', function ($scope, $rootScope, $routeParams, Categorys) {
  	$scope.category = Categorys.find($routeParams.categoryId);
  	$scope.categoryId = $routeParams.categoryId;
  	$scope.notInCategory = function(){
  		if($rootScope.currentUser){
  			if($rootScope.currentUser.categorys){
  				return ! ($rootScope.currentUser.categorys[$scope.categoryId])
  			}
  		}
  		return 1;
  	}
  	$scope.joinCategory = function(){
  		Categorys.join($scope.categoryId);
  	};
  	$scope.leaveCategory = function(username){
  		Categorys.leave($scope.categoryId, username)
  	};
  	$scope.deleteCategory = function(){
    	Categorys.delete($scope.categoryId);
    };
  });
