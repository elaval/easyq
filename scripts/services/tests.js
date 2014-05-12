'use strict';

angular.module('AppEasyQ')
  .factory('Tests', function ($firebase, FIREBASE_URL, User, Categorys) {

      var ref = new Firebase(FIREBASE_URL + 'tests');

      var tests = $firebase(ref);

      var Test = {
        all: tests,

        create: function(test){
          if( User.signedIn()){
            var user = User.getCurrent();
            test.owner = user.username;
            return tests.$add(test).then(function(ref){
              var testId = ref.name();
              tests.$child(testId).$child('members').$add(user.username).then(function(ref){
                user.$child('tests').$child(testId).$set(ref.name());
                return testId;
              });
            });
          }

        },
        find: function(testId){
          return tests.$child(testId);
        },

        delete: function(testId){

          if (User.signedIn()){
            var test = Test.find(testId);

            test.$on('loaded', function(){

              var user = User.findByUsername(test.owner);

              return tests.$remove(testId).then(function(){
                user.$child('tests').$remove(testId);
              });
            });
          }
        },

        join: function(testId){
          if(User.signedIn()){
              var user = User.getCurrent();
              tests.$child(testId).$child('members').$add(user.username).then(function(ref){
                  user.$child('tests').$child(testId).$set(ref.name());
                  return testId;
              });
          }
        },
        findMember: function(testId, username){
          var user = User.findByUsername(username);
          return tests.$child(testId).$child('members').$child(uer);
        },
        leave: function(testId, username){
            var user = User.findByUsername(username);
            var refId = user.$child('tests').$child(testId).$value;
            return tests.$child(testId).$child('members').$remove(refId).then(function(){
                  user.$child('tests').$remove(testId);
                  return testId;
              });
        }
      };

      return Test;
  });
