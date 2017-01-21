(function () {
    'use strict';

    angular
        .module('app')
        .factory('PermissionService', PermissionService);

    PermissionService.$inject = ['$http', '$rootScope'];
    function PermissionService($http, $rootScope) {
        var service = {};

        service.getAllPermissions = getAllPermissions;
        service.getLoggedUser = getLoggedUser;
        service.getAllAccessPermissions = getAllAccessPermissions;
        service.Create = Create;
        service.getPermission = getPermission;
        service.updateProfile = updateProfile;
        service.deleteProfile = deleteProfile;
        service.getAllAssociations = getAllAssociations;
        service.updatePermission = updatePermission;
        service.desassociate = desassociate;
        service.associate = associate;
        service.getAllRequestAssociations = getAllRequestAssociations;
        service.associateRequest = associateRequest;
        service.deleteAssociateRequest = deleteAssociateRequest;
        service.getAllRequestDesassociations = getAllRequestDesassociations;
        service.desassociateRequest = desassociateRequest; 
        service.deleteDesassociateRequest = deleteDesassociateRequest;
        service.getRequestAssociation = getRequestAssociation;
        service.getRequestDesassociation = getRequestDesassociation; 
        service.requestAssociation = requestAssociation;
        service.requestDesassociation = requestDesassociation;
        return service;        
        
        function getLoggedUser(){
        	return $rootScope.globals.currentUser;
        }
        
        function getAllPermissions(callback) {
        	$http({
                method : 'GET',
                url : 'http://localhost:8080/AuthorizationServer/rest/permission/allpermissions'                
            }).then(function (response) {
            	if(response.data != "")
            		response.success = true;
            	else{
            		response.success = false;
            		response.message = "Erro ao buscar todos os perfis.";
            	}
            	callback(response);
              });
        }    
        
        function getAllAccessPermissions(callback) {
        	$http({
                method : 'GET',
                url : 'http://localhost:8080/AuthorizationServer/rest/permission/allaccesspermissions'                
            }).then(function (response) {
            	if(response.data != "")
            		response.success = true;
            	else{
            		response.success = false;
            		response.message = "Erro ao buscar todas os acessos.";
            	}
            	callback(response);
              });
        }    
        
        function Create(permissionProfile, callback) {
        	var permission = JSON.parse(permissionProfile.permission);
        	$http({
            method : 'POST',
            url : 'http://localhost:8080/AuthorizationServer/rest/permission/createpermission',
            data : angular.toJson({profile:{name: permissionProfile.profileName}, permission : {id : permission.id, access: permission.access}}),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao cadastrar perfil.";
        	}
        	callback(response);
          });
        }
        
        function getPermission(id, callback) {
        	$http({
                method : 'GET',
                url : 'http://localhost:8080/AuthorizationServer/rest/permission/'+id                
            }).then(function (response) {
            	if(response.data != "")
            		response.success = true;
            	else{
            		response.success = false;
            		response.message = "Erro ao buscar o perfil.";
            	}
            	callback(response);
              });
        }
        
        function updateProfile(permissionProfile, callback) {
        	$http({
            method : 'POST',
            url : 'http://localhost:8080/AuthorizationServer/rest/permission/updatepermission',
            data : angular.toJson({profile:{id: permissionProfile.profile.id, name: permissionProfile.profile.name}, permission : {id : permissionProfile.permission.id, access: permissionProfile.permission.access}}),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao atualizar perfil.";
        	}
        	callback(response);
          });
        }
        
        function deleteProfile(permissionProfile, callback) {
        	$http({
            method : 'POST',
            url : 'http://localhost:8080/AuthorizationServer/rest/permission/deletepermission',
            data : angular.toJson({profile:{id: permissionProfile.profile.id, name: permissionProfile.profile.name}, permission : {id : permissionProfile.permission.id, access: permissionProfile.permission.access}}),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao atualizar perfil.";
        	}
        	callback(response);
          });
        }
        
        function getAllAssociations(user, callback) {
        	$http({
            method : 'POST',
            url : 'http://localhost:8080/AuthorizationServer/rest/permission/alluserpermissions',
            data : angular.toJson({name: user.name, login: user.username, password: user.password, admin: user.isAdmin }),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao buscar associações.";
        	}
        	callback(response);
          });
        }
        
        function updatePermission(userProfilePermission, callback) {
        	$http({
            method : 'POST',
            url : 'http://localhost:8080/AuthorizationServer/rest/permission/rest/permission/associatepermission',
            data : angular.toJson({profile:{id: permissionProfile.profile.id, name: permissionProfile.profile.name}, permission : {id : permissionProfile.permission.id, access: permissionProfile.permission.access}}),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao atualizar perfil.";
        	}
        	callback(response);
          });
        }
        
        function desassociate(user, profilePermission, callback) {
        	$http({
            method : 'POST',
            url : 'http://localhost:8080/AuthorizationServer/rest/permission/desassociatepermission',
            data : angular.toJson({user:{login: user.login, name: user.name, admin: user.admin}, profilePermissions : [{ profile:{id : profilePermission.profile.id, name: profilePermission.profile.name}, permission:{id: profilePermission.permission.id, access: profilePermission.permission.access}}]}),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao desassociar.";
        	}
        	callback(response);
          });
        }
        
        function associate(user, profilePermissions, callback) {
        	var userProfilePermission = {
        			user : JSON.parse(user),
        			profilePermissions : profilePermissions
        	};
        	$http({
            method : 'POST',
            url : 'http://localhost:8080/AuthorizationServer/rest/permission/associatepermission',
            data : angular.toJson(userProfilePermission),            		
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao desassociar.";
        	}
        	callback(response);
          });
        }
        
        function associateRequest(user, profilePermissions, callback) {
        	var userProfilePermission = {
        			user : user,
        			profilePermissions : profilePermissions
        	};
        	$http({
            method : 'POST',
            url : 'http://localhost:8080/AuthorizationServer/rest/permission/associatepermission',
            data : angular.toJson(userProfilePermission),            		
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao associar.";
        	}
        	callback(response);
          });
        }
        
        function desassociateRequest(user, profilePermissions, callback) {
        	var userProfilePermission = {
        			user : user,
        			profilePermissions : profilePermissions
        	};
        	$http({
            method : 'POST',
            url : 'http://localhost:8080/AuthorizationServer/rest/permission/desassociatepermission',
            data : angular.toJson(userProfilePermission),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao desassociar.";
        	}
        	callback(response);
          });
        }
        
        function getAllRequestAssociations(callback) {
        	$http({
            method : 'GET',
            url : 'http://localhost:8080/AuthorizationServer/rest/allrequestedassociations'            
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao buscar todas as associações.";
        	}
        	callback(response);
          });
        }
        
        function deleteAssociateRequest(login, profilePermission, callback) {
        	$http({
            method : 'POST',
            url : 'http://localhost:8080/AuthorizationServer/rest/user/deleterequestassociation/'+login,
            data : angular.toJson(profilePermission),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao apagar requisição.";
        	}
        	callback(response);
          });
        }
        
        function getAllRequestDesassociations(callback) {
        	$http({
            method : 'GET',
            url : 'http://localhost:8080/AuthorizationServer/rest/allrequesteddesassociations'            
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao buscar todas as desassociações.";
        	}
        	callback(response);
          });
        }
        
        function deleteDesassociateRequest(login, profilePermission, callback) {
        	$http({
            method : 'POST',
            url : 'http://localhost:8080/AuthorizationServer/rest/user/deleterequestdesassociation/'+login,
            data : angular.toJson(profilePermission),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao apagar requisição.";
        	}
        	callback(response);
          });
        }       
        
        
        function getRequestAssociation(login, callback) {
        	$http({
            method : 'GET',
            url : 'http://localhost:8080/AuthorizationServer/rest/requestedassociation/'+login            
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao buscar todas as requisições.";
        	}
        	callback(response);
          });
        }
        
        
        function getRequestDesassociation(login, callback) {
        	$http({
            method : 'GET',
            url : 'http://localhost:8080/AuthorizationServer/rest/requesteddesassociation/'+login            
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao buscar todas as requisições.";
        	}
        	callback(response);
          });
        }
        
        function requestAssociation(login, profilePermissions, callback) {
        	$http({
            method : 'POST',
            url : 'http://localhost:8080/AuthorizationServer/rest/user/requestassociation/'+login,
            data : angular.toJson(profilePermissions),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao fazer requisição.";
        	}
        	callback(response);
          });
        }     
        
        function requestDesassociation(login, profilePermissions, callback) {
        	$http({
            method : 'POST',
            url : 'http://localhost:8080/AuthorizationServer/rest/user/requestdesassociation/'+login,
            data : angular.toJson(profilePermissions),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(function (response) {
        	if(response.data != "")
        		response.success = true;
        	else{
        		response.success = false;
        		response.message = "Erro ao fazer requisição.";
        	}
        	callback(response);
          });
        }
    }

})();
