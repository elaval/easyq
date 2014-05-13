'use strict';


/**
 * @ngdoc controller
 * @name AppEasyQ.controller:AuthCtrl
 * @requires $scope
 * @requires $location
 * @requires AppEasyQ.Auth
 * @requires AppEasyQ.User
 *
 * @property {string} email Email ingresado en el login form
 * @property {string} password Passwrod ingresado en el login form 
 * @description
 *
 * Controller para manejar autenticación de usuarios en Easy Q
 *
 */
angular.module('AppEasyQ')
  .controller('AuthCtrl', [
    '$scope',
    '$location',
    'UserService',
    'DataService',
    function ($scope, $location, userService, dataService) {

      // Datos de usuario solocitando Log In
      this.email = '';
      this.password = '';

      // Datos de nuevos usuarios que desean registrarse
      this.newUser = {};
      this.newUser.username = '';
      this.newUser.surname = '';
      this.newUser.email = '';
      this.newUser.password = '';


      this.errorMsg = '';

      // Objeto con información del id del usuario actualmente conectado ($scope.currentUser.id)
      $scope.currentUser = userService.currentUser;
      $scope.$watch('currentUser.id', function(isLogged) {
        // Verifica si el usuario actual tiene un id valido
        if (id) {
          $location.path('/');
        }
      })

      $scope.loggedState = userService.loggedState;

      $scope.$watch('loggedState.isLogged', function(isLogged) {
        if (isLogged) {
          $location.path('/');
        }
        console.log("Logged: "+isLogged);
      })
     
      /**
      * @ngdoc function
      * @name AppEasyQ.AuthCtrl:login
      * @methodOf AppEasyQ.controller:AuthCtrl
      * @description 
      * Intenta realizar un login para el usuario cuyas crdenciales están definidad por
      * this.email & this.password 
      */
      this.login = function() {
        // Intentar login by password (alternativas son Faceboo, Twitter, ...)
        userService.loginByPassword(this.email, this.password)
        .then(function(user) {
            console.log("LOGIN: "+user)
        })
        .catch(function(error) {
            console.log(error)
        })
        
        
      }

      /**
      * @ngdoc function
      * @name AppEasyQ.AuthCtrl:register
      * @methodOf AppEasyQ.controller:AuthCtrl
      * @description 
      * Registra un nuevo usuario dados sus datos
      * this.email & this.password 
      */
      this.register = function() {
        // Intentar login by password (alternativas son Faceboo, Twitter, ...)
        userService.register(this.newUser.email, this.newUser.password)

        .then(function(user) {
            console.log("Registred: "+user)
            this.newUser.id = user.uid;

            dataService.createUser(this.newUser);
        }.bind(this))

        .catch(function(error) {
            this.errorMsg = error;
            console.log(error)
        }.bind(this))
        
      }

  }]);
