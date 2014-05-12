'use strict';

angular.module('AppEasyQ')
  .controller('CategorysCtrl', function ($scope, $location, Categorys) {
    $scope.categorys = Categorys.all;

    $scope.submitCategory = function(){
    	Categorys.create($scope.category).then(function(categoryId){
    		$location.path('categorys');
    	});
    };

    $scope.deleteCategory = function(categoryId){
        Categorys.delete(categoryId);
    };
  });
