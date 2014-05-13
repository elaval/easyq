'use strict';

/**
 * @ngdoc controller
 * @name AppEasyQ.controller:CategorysCtrl
 * @requires $scope
 * @requires $location
 * @requires AppEasyQ.DataService
 * @requires AppEasyQ.UserService
 *
 * @property {object} newCategory Objeto con datos de una nueva categoría
 * @description
 *
 * Controller para manejar categorñias asociadas al usuario conectado
 *
 */
 angular.module('AppEasyQ')
  .controller('CategorysCtrl', function ($scope, $location, DataService, UserService) {
    
    // Datos de nueva categoría
    this.newCategory = {};

    // Id del usuario actualmente conectado $scope.currentUser.id
    $scope.currentUser = UserService.currentUser;

    // Verificar si se ha conectado un nuevo usuario (cambio en objeto currentUser)
    $scope.$watch('currentUser.id', function() {
        var userId = $scope.currentUser.id;
        DataService.getCategories(userId).then(function(categories) {
            this.categories = categories;
        }.bind(this));
    }.bind(this));

    
    // Obtiene categorías para el usuario actual
    var userId = $scope.currentUser.id;
    DataService.getCategories(userId).then(function(categories) {
        this.categories = categories;
    }.bind(this));

    /**
    * @ngdoc function
    * @name AppEasyQ.AuthCtrl:submitCategory
    * @methodOf AppEasyQ.controller:AuthCtrl
    * @description 
    * Agrega una nueva categoría asociada al usuario actual
    */
    this.submitCategory = function() {
        var userId = $scope.currentUser.id;

        DataService.addCategory(userId,this.newCategory)
        .then(function(categoryId) {
            $location.path('categorys');
        });
    };

    /**
    * @ngdoc function
    * @name AppEasyQ.AuthCtrl:deleteCategory
    * @methodOf AppEasyQ.controller:AuthCtrl
    * @description 
    * Elimina categoría con el id categoryId de las categorías asociadas al usuario actual
    */
    this.deleteCategory = function(categoryId){
        var userId = $scope.currentUser.id;

        DataService.deleteCategory(userId,categoryId);
    };
  });
