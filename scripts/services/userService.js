'use strict';

/**
 * @ngdoc service
 * @name AppEasyQ.service:UserService
 * @requires $q
 * @requires $firebase
 * @requires $firebaseSimpleLogin
 * @requires AppEasyQ.FIREBASE_URL
 * @requires AppEasyQ.Auth
 *
 * @description
 *
 * Servicio que maneja la gestión de autenticación de usuarios a través de Firebase
 *
 */
angular.module('AppEasyQ')
.service('UserService', [
  '$rootScope', 
  '$q',
  '$firebase', 
  '$firebaseSimpleLogin',
  'FIREBASE_URL', 
  'Auth', 
  
  function ($rootScope, $q, $firebase, $firebaseSimpleLogin, FIREBASE_URL, Auth) {
    var ref = new Firebase(FIREBASE_URL);

    var fireBaseAuth = $firebaseSimpleLogin(ref);

    this.currentUser = {
      id:""
    }



    // For documentation on angular fire authentication
    // https://www.firebase.com/docs/angular/reference.html

    // Variable para monitorear si el usuario se encuentra logged
    this.loggedState = {'isLogged': false};

    // Monitoreo de eventos de logIn /Log out
    $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
      if (!this.currentUser) {this.currentUser = {}}
      this.currentUser.id = user.uid;
      this.loggedState.isLogged = true;

      console.log("User " + user.id + " successfully logged in!");
    }.bind(this));

    $rootScope.$on("$firebaseSimpleLogin:logout", function(e, user) {
      this.loggedState.isLogged = false;
      this.currentUser.id = null;
      console.log("User logged out!");
    }.bind(this));

    /**
    * @ngdoc function
    * @name AppEasyQ.UserService:register
    * @methodOf AppEasyQ.service:UserService
    * @param {string} email email of the user to be registred
    * @param {string} password Password of the user to be registred
    *
    * @returns {promise} Promise with the registred user if resolved or error if rejected
    *
    * @description 
    * Registra un nuevo usuario en firebase
    */
    this.register = function(email, password){
      // Uso de promises ($q) para retornar datos en form asíncrona
      var deferred = $q.defer();

      // Intenta realizar login por password en FireBase
      fireBaseAuth.$createUser(email, password)
      .then(function(user) {
        // Resuelve la promesa, retornando el objeto 'user'
        deferred.resolve(user);
      })
      .catch(function(error) {
        // Rechaza la promesa, retornando el error
        deferred.reject(error);
      })

      return deferred.promise;
    };

    /**
    * @ngdoc function
    * @name AppEasyQ.UserService:signedIn
    * @methodOf AppEasyQ.service:UserService
    *
    * @returns {boolean} true si hay un usuario con ingreso válido, false de otra manera
    *
    * @description 
    * Chequea si existe un usuario validamente ingresado
    */
    this.signedIn = function(){
        return fireBaseAuth.user != null;
    };

    /**
    * @ngdoc function
    * @name AppEasyQ.UserService:loginByPassword
    * @methodOf AppEasyQ.service:UserService
    * @param {string} email email of the user 
    * @param {string} password Password of the user
    *
    * @returns {promise} Promise con el usuario ingresado, si se resuelve, o un error si se rechaza
    *
    * @description 
    * Ingresa (Log In) un nuevo usuario mediante email & password
    */
    this.loginByPassword= function(email, password) {
      // Uso de promises ($q) para retornar datos en form asíncrona
      var deferred = $q.defer();

      // Intenta realizar login por password en FireBase
      fireBaseAuth.$login('password', {'email':email, 'password':password})
      .then(function(user) {
        // Resuelve la promesa, retornando el objeto 'user'
        deferred.resolve(user);
      })
      .catch(function(error) {
        // Rechaza la promesa, retornando el error
        deferred.reject(error);
      })

      return deferred.promise;

    };

    /**
    * @ngdoc function
    * @name AppEasyQ.UserService:logout
    * @methodOf AppEasyQ.service:UserService
    *
    * @description 
    * realiza un log out del usuario vigente
    */
    this.logout=  function(){
        fireBaseAuth.$logout();
    };


    /**
    * @ngdoc function
    * @name AppEasyQ.UserService:getUserId
    * @methodOf AppEasyQ.service:UserService
    *
    * @return {string}  Return current user Id, if loged in
    * @description 
    * 
    */
    this.getUserId = function() {
      var userId = fireBaseAuth.user && fireBaseAuth.user.uid ? fireBaseAuth.user.uid : null;

      return userId;
    };

 

  }]);


