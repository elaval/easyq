'use strict';

angular.module('AppEasyQ')
  .factory('Categorys', function ($firebase, FIREBASE_URL, User) {

      var ref = new Firebase(FIREBASE_URL + 'categorys');

      var categorys = $firebase(ref);

      var Category = {
        all: categorys,

        create: function(category){
          if( User.signedIn()){
            var user = User.getCurrent();
            category.owner = user.username;
            return categorys.$add(category).then(function(ref){
              var categoryId = ref.name();
              categorys.$child(categoryId).$child('miembros').$add(user.username).then(function(ref){
                user.$child('categorys').$child(categoryId).$set(ref.name());
                return categoryId;
              });
            });
          }
        },

        find: function(categoryId){
          return categorys.$child(categoryId);
        },

        delete: function(categoryId){

          if (User.signedIn()){
            var category = Category.find(categoryId);

            category.$on('loaded', function(){

              var user = User.findByUsername(category.owner);

              return categorys.$remove(categoryId).then(function(){
                user.$child('categorys').$remove(categoryId);
              });
            });
          }
        }
      };

      return Category;

  });
