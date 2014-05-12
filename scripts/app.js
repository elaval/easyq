'use strict';

angular.module('AppEasyQ', [    'ngCookies',
                                'ngResource',
                                'ngSanitize',
                                'ngRoute',
                                'firebase'])

  .config(function ($routeProvider) {
    $routeProvider

      .when('/',                                { templateUrl: 'views/homepage.html' })
      .when('/category',                        { templateUrl: 'views/categorys/list.html',     controller: 'CategorysCtrl' })
      .when('/categorys/create',                { templateUrl: 'views/categorys/create.html',   controller: 'CategorysCtrl' })
      .when('/categorys/:categoryId',           { templateUrl: 'views/categorys/view.html',     controller: 'ViewCtrl' })
      .when('/tests/create',                    { templateUrl: 'views/tests/create.html',       controller: 'TestsCtrl' })
      .when('/tests/:testId',                   { templateUrl: 'views/test.html',               controller: 'TestsCtrl' })
      .when('/register',                        { templateUrl: 'views/users/register.html',     controller: 'AuthCtrl' })
      .when('/login',                           { templateUrl: 'views/users/login.html',        controller: 'AuthCtrl' })
      .otherwise(                               { redirectTo: '/' });
  });
