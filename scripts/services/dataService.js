'use strict';

/**
 * @ngdoc service
 * @name AppEasyQ.service:DataService
 * @requires $q
 * @requires $firebase
 * @requires AppEasyQ.FIREBASE_URL
 * @requires AppEasyQ.UserService
 *
 * @description
 *
 * Servicio que maneja la gestión de datos almacenados en Firebase:
 * - Detalles del usuario
 * - Categorías
 * ...
 */
 angular.module('AppEasyQ')
  .service('DataService', function ($q, $firebase, FIREBASE_URL, UserService) {

  var firebaseRootRef = new Firebase(FIREBASE_URL);

  /**
  * @ngdoc function
  * @name AppEasyQ.DataService:updateUserInfo
  * @methodOf AppEasyQ.service:DataService
  * @param {string} userId id del usuario 
  * @param {object} userData Objeto con datos del usuario (name, surname, email)
  *
  *
  * @description 
  * Actualiza los datos almacenados para el usuario con id userId
  */
  this.updateUserInfo = function(userId, userData) {

    var dataToBeUpdated = {};
    dataToBeUpdated.name = userData.name ? userData.name : "";
    dataToBeUpdated.surname = userData.surname ? userData.surname : "";
    dataToBeUpdated.email = userData.email ? userData.email : "";

    var usersRef = firebaseRootRef.child('users');
    var users = $firebase(usersRef);

    // Actualizar datos del usuario en firebase
    users[id] = dataToBeUpdated;
    users.$save(id);

  };

 /**
  * @ngdoc function
  * @name AppEasyQ.DataService:addCategory
  * @methodOf AppEasyQ.service:DataService
  * @param {string} userId id del usuario 
  * @param {object} categoryData Objeto con datos de la categoría a agregar
  *
  * @return {promise} Retorna promesa con el id de la nueva categoría
  * @description 
  * Agrega una nueva categoria asociada al usuario, con los atributos entregados en categoryData
  */
  this.addCategory = function(userId, categoryData) {
    // Uso de promises ($q) para retornar datos en form asíncrona
    var deferred = $q.defer();

    if (userId) {
      var categoriesRef = firebaseRootRef.child('users').child(userId).child('categories');
      var categories = $firebase(categoriesRef);

      categories.$add(categoryData).then(function(ref) {
        // Retorna el id de la nueva categoría
        deferred.resolve($firebase(ref).$id);
      });

    } else {
      deferred.reject('Error: no user Id');
    }

    return deferred.promise;
  }

 /**
  * @ngdoc function
  * @name AppEasyQ.DataService:deleteCategory
  * @methodOf AppEasyQ.service:DataService
  * @param {string} userId id del usuario 
  * @param {object} categoryId Id de la categoria a eliminar
  *
  * @return {promise} 
  * @description 
  * Elimina una categoría asociada al usuario
  */
  this.deleteCategory = function(userId, categoryId) {
    // Uso de promises ($q) para retornar datos en form asíncrona
    var deferred = $q.defer();

    if (userId) {
      var categoriesRef = firebaseRootRef.child('users').child(userId).child('categories');
      var categories = $firebase(categoriesRef);

      categories.$remove(categoryId).then(function() {
        deferred.resolve();
      })
    } else {
      deferred.reject("Error: no userId");
    }

    return deferred.promise;
  }

 /**
  * @ngdoc function
  * @name AppEasyQ.DataService:getCategories
  * @methodOf AppEasyQ.service:DataService
  * @param {string} userId id del usuario 
  *
  * @return {promise} Promesa con las categorías asociadas al usuario (objeto $firebase)
  * @description 
  * Obtiene las categorías asociadas a un usuario 
  */
  this.getCategories = function(userId) {
    // Uso de promises ($q) para retornar datos en form asíncrona
    var deferred = $q.defer();

    if (userId) {
      var categoriesRef = firebaseRootRef.child('users').child(userId).child('categories');
      var categories = $firebase(categoriesRef);

      deferred.resolve(categories);
    } else {
      deferred.reject("Error: no userId");
    }

    return deferred.promise;
  }


  });
