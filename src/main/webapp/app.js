(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies', 'angularUtils.directives.dirPagination', 'ngAnimate', 
                        'ui.bootstrap'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController', 
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })
            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })
            .when('/allUsers', {
                controller: 'UserController',
                templateUrl: 'user/allUsers.view.html',
                controllerAs: 'vm'
            })
            .when('/editUser/:id', {
                controller: 'UserController',
                templateUrl: 'user/editUser.view.html',
                controllerAs: 'vm'
            })
            .when('/viewUser/:id', {
                controller: 'UserController',
                templateUrl: 'user/viewUser.view.html',
                controllerAs: 'vm'
            })
            .when('/changePassword', {
                controller: 'UserController',
                templateUrl: 'user/changePassword.view.html',
                controllerAs: 'vm'
            })
            .when('/allProfiles', {
                controller: 'ProfileController',
                templateUrl: 'profile/allProfiles.view.html',
                controllerAs: 'vm'
            })
            .when('/newProfile', {
                controller: 'ProfileController',
                templateUrl: 'profile/insertProfile.view.html',
                controllerAs: 'vm'
            })
            .when('/viewProfile/:id', {
                controller: 'ProfileController',
                templateUrl: 'profile/viewProfile.view.html',
                controllerAs: 'vm'
            })
            .when('/editProfile/:id', {
                controller: 'ProfileController',
                templateUrl: 'profile/editProfile.view.html',
                controllerAs: 'vm'
            })
            .when('/allAssociations', {
                controller: 'AssociationController',
                templateUrl: 'association/allAssociations.view.html',
                controllerAs: 'vm'
            })
            .when('/viewAssociation/:login/:id', {
                controller: 'AssociationController',
                templateUrl: 'association/viewAssociation.view.html',
                controllerAs: 'vm'
            })
            .when('/editAssociation/:login/:id', {
                controller: 'AssociationController',
                templateUrl: 'association/editAssociation.view.html',
                controllerAs: 'vm'
            })
            .when('/newAssociation', {
                controller: 'AssociationController',
                templateUrl: 'association/insertAssociation.view.html',
                controllerAs: 'vm'
            })
            .when('/requestAssociation', {
                controller: 'RequestController',
                templateUrl: 'request/insertRequestAssociation.view.html',
                controllerAs: 'vm'
            })
            .when('/requestDesassociation', {
                controller: 'RequestController',
                templateUrl: 'request/insertRequestDesassociation.view.html',
                controllerAs: 'vm'
            })
            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // Mantém logado depois do refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redireciona para tela de login se não estiver logado
            var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
        });
    }    
    
})();