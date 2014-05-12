'use strict';

angular.module('AppEasyQ')
  .controller('TestsCtrl', function ($scope, $location, Categorys, Tests) {
    $scope.tests = Tests.all;

    $scope.test = { title: "Nombre de la categoria", description: "Una breve descripcion de la categoria"};

    $scope.submitTest = function(){
    	Tests.create($scope.test).then(function(testId){
    		$scope.test = { title: "Ejemplos: Colegio, Universidad, Oficina", description: "Una breve descripcion de la categoria"};
    		$location.path('tests/' + testId);
    	});
    };
    $scope.deleteTest = function(testId){
        Tests.delete(testId);
    };


  });
