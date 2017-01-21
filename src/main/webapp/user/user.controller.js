(function() {
	'use strict';

	angular.module('app').controller('UserController', UserController);
	
	UserController.$inject = [ 'UserService', '$location', '$rootScope',
			'$routeParams', 'FlashService', '$scope', 'ModalService', 'AuthenticationService', 'PermissionService' ];
	function UserController(UserService, $location, $rootScope, $routeParams,
			FlashService, $scope, ModalService, AuthenticationService, PermissionService) {
		var vm = this;

		vm.user = UserService.getLoggedUser();
		vm.confirmUser = vm.user; 
		vm.allUsers = [];
		vm.editUser = editUser;
		vm.viewUser = viewUser;
		vm.update = update;
		vm.deleteUser = deleteUser;
		vm.changePassword = changePassword;
		vm.countRequestAssociations = 0;
		vm.countRequestDesassociations = 0;

		initController();

		function initController() {

			loadAllUsers();
			loadCurrentUser();
			loadAllRequestAssociations();
			loadAllRequestDesassociations();	
			loadRequestAssociation();
			loadRequestDesassociation();
			if ($routeParams.id) {
				UserService.getUser($routeParams.id, function(response) {
					if (response.success) {
						vm.updateUser = response.data;
						vm.viewUser = response.data;
						vm.newPassword = {
								oldPassword : '',
								newPassword : '',
								confirmPassword : ''
						}
					}
				});
			}
		}
		
		function loadRequestAssociation() {
			PermissionService.getRequestAssociation(vm.user.username,function(response) {
				if (response.success) {
					vm.requestAssociations = response.data;					
				}
				else
					vm.requestAssociations = [];
			});
		}
		
		function loadRequestDesassociation() {
			PermissionService.getRequestDesassociation(vm.user.username, function(response) {
				if (response.success) {
					vm.requestDesassociations = response.data;					
				}
				else
					vm.requestDesassociations = [];
			});
		}
		
		function loadAllUsers() {
			UserService.getAllUsers(vm.user, function(response) {
				if (response.success) {
					vm.allUsers = response.data;
				}
			});
		}
		
		function loadCurrentUser() {
			vm.user = $rootScope.globals.currentUser;
		}		

		function loadAllRequestAssociations() {
			vm.showRequestUsers = false;
			vm.countRequestAssociations = 0;
			PermissionService.getAllRequestAssociations(function(response) {
				if (response.success) {
					vm.allRequestAssociations = response.data;
					for ( var login in vm.allRequestAssociations) {
						vm.showRequestUsers = true;
						for(var associations in vm.allRequestAssociations[login])
							vm.countRequestAssociations++;
					}
				}
				else
					vm.allRequestAssociations = [];
			});
		}

		function loadAllRequestDesassociations() {
			vm.showRequestDesassociateUsers = false;
			vm.countRequestDesassociations = 0;
			PermissionService.getAllRequestDesassociations(function(response) {
				if (response.success) {
					vm.allRequestDesassociations = response.data;
					for ( var login in vm.allRequestDesassociations) {
						vm.showRequestDesassociateUsers = true;
						for(var desassociations in vm.allRequestDesassociations[login])
							vm.countRequestDesassociations++;
					}
				}
				else
					vm.allRequestDesassociations = [];
			});
		}
		
		function editUser(user) {
			$location.path("/editUser/" + user.login);
		}

		function viewUser(user) {
			$location.path("/viewUser/" + user.login);
		}

		function update() {
			vm.dataLoading = true;
			UserService.updateUser(vm.updateUser, function(response) {
				if (response.success) {
					FlashService.Success('Usuário atualizado com sucesso!',
							true);
					$location.path('/allUsers');
				} else {
					FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			});
		}	
		
		function deleteUser(user) {
			vm.dataLoading = true;

			var modalOptions = {
				closeButtonText : 'Não',
				actionButtonText : 'Sim',
				headerText : 'Apagar usuário',
				bodyText : 'Deseja realmente apagar ' + user.login + '?'
			};

			ModalService.showModal({}, modalOptions).then(
					function(result) {
						UserService.deleteUser(user, function(response) {
							if (response.success) {
								FlashService.Success(
										'Usuário apagado com sucesso!', true);
								loadAllUsers();
								$location.path('/allUsers');
							} else {
								FlashService.Error(response.message);
								vm.dataLoading = false;
							}
						});
					});
			vm.dataLoading = false;

		}
		
		function changePassword() {
			vm.dataLoading = true;			
			
			AuthenticationService.Login(vm.user.username, vm.newPassword.oldPassword, function (response) {
	                if (!response.success) {
	                    FlashService.Error('Senha original inválida.');
	                    vm.dataLoading = false;
	                    return;
	                }
	                else{
	                	if(vm.newPassword.newPassword != vm.newPassword.confirmPassword){
	        				FlashService.Error('Senha nova diferente da sua confirmação.');
	        				vm.dataLoading = false;
	        				return;
	        			}			
	        			
	        			vm.user.authdata = vm.newPassword.newPassword;
	        			
	        			UserService.changePassword(vm.user, function(response) {
	        				if (response.success) {
	        					AuthenticationService.SetCredentials(response.data.name, response.data.login, response.data.password, response.data.admin);
	        					FlashService.Success(
	        							'Senha alterada com sucesso!', true);
	        					$location.path('/');
	        				} else {
	        					FlashService.Error('Erro ao alterar senha');	
	        					vm.dataLoading = false;
	        				}
	        			});
	                }
	            });				
			
		}

	}

})();