(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$rootScope'];
    function UserService($http, $rootScope) {
        var service = {};

        service.getAllUsers = getAllUsers;
        service.getUser = getUser;
        service.Create = Create;
        service.updateUser = updateUser;
        service.deleteUser = deleteUser;
        service.getLoggedUser = getLoggedUser;
        service.changePassword = changePassword;

        return service;
        
        function getLoggedUser(){
        	return $rootScope.globals.currentUser;
        }
        
        function getAllUsers(user, callback) {
        	$http({
            method : 'GET',
            url : 'http://localhost:8080/AuthorizationServer/rest/allusers/'+user.username            
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao buscar todos os usuários.";
        	}
        	callback(response);
          });
        }

        function getUser(id, callback) {
        	$http({
                method : 'GET',
                url : 'http://localhost:8080/AuthorizationServer/rest/user/'+id                
            }).then(function (response) {
            	if(response.data != "")
            		response.success = true;
            	else{
            		response.success = false;
            		response.message = "Erro ao buscar usuário "+id;
            	}
            	callback(response);
              });
        }

        function Create(user, callback) {
        	$http({
            method : 'POST',
            url : 'http://localhost:8080/AuthorizationServer/rest/user/createuser',
            data : angular.toJson({name: user.name, login: user.login, password: user.password, admin: user.isAdmin }),
            headers : {
                'Content-Type' : 'application/json',
                'charset' : 'UTF-8'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao cadastrar usuário.";
        	}
        	callback(response);
          });
        }
        
        function updateUser(user, callback) {
        	$http({
                method : 'PUT',
                url : 'http://localhost:8080/AuthorizationServer/rest/user/updateuser',
                data : angular.toJson({name: user.name, login: user.login, password: user.password, admin: user.admin }),
                headers : {
                    'Content-Type' : 'application/json',
                    'charset' : 'UTF-8'
                }
            }).then(function (response) {
            	if(response.data != "")
            		response.success = true;
            	else{
            		response.success = false;
            		response.message = "Erro ao editar usuário "+user.login;
            	}
            	callback(response);
              });
        }
        
        function deleteUser(user, callback) {
        	$http({
                method : 'DELETE',
                url : 'http://localhost:8080/AuthorizationServer/rest/user/deleteuser',
                data : angular.toJson({name: user.name, login: user.login, password: user.password, admin: user.admin }),
                headers : {
                    'Content-Type' : 'application/json',
                    'charset' : 'UTF-8'
                }
            }).then(function (response) {
            	if(response.data != "")
            		response.success = true;
            	else{
            		response.success = false;
            		response.message = "Erro ao editar usuário "+user.login;
            	}
            	callback(response);
              });
        }
        
        function changePassword(user, callback) {
        	$http({
            method : 'PUT',
            url : 'http://localhost:8080/AuthorizationServer/rest/user/changepassword',
            data : angular.toJson({name: user.name, login: user.username, password: user.authdata, admin: user.isAdmin }),
            headers : {
                'Content-Type' : 'application/json',
                'charset' : 'UTF-8'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao alterar senha.";
        	}
        	callback(response);
          });
        }
        
        
    }    

})();
