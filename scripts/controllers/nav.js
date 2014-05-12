'use strict';

angular.module('AppEasyQ')
  .controller('NavCtrl', function ($scope, $location, Auth) {
  	$scope.logout = function(){
    	Auth.logout();
    };
  });
