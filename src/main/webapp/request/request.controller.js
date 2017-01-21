(function() {
	'use strict';

	angular.module('app').controller('RequestController', RequestController);
	
	RequestController.$inject = [ 'UserService', '$location', '$rootScope',
			'$routeParams', 'FlashService', '$scope', 'ModalService',  'PermissionService' ];
	function RequestController(UserService, $location, $rootScope, $routeParams,
			FlashService, $scope, ModalService, PermissionService) {
		var vm = this;

		vm.user = UserService.getLoggedUser();		 
		vm.allPermissions = [];
		vm.allAssociations = [];
		vm.allUsers = [];
		vm.selection = [];
		vm.registerAssociation = registerAssociation;
		vm.registerDesassociation = registerDesassociation;
		vm.editAssociation = editAssociation;
		vm.viewAssociation = viewAssociation;
		vm.update = update;
		vm.deleteAssociation = deleteAssociation;		
		vm.insertDeleteSelection = insertDeleteSelection;
		initController();

		function initController() {			
			vm.insertUserProfilePermission = {
					user : '',
					profilePermissions : ''
			};
			loadAllPermissions();
			loadAllAssociations();
			loadAllUsers();	
			loadRequestAssociation();
			loadRequestDesassociation();
			if ($routeParams.login) {
				var user = {
						login : $routeParams.login,
						isAdmin : false
					};
				
				PermissionService.getAllAssociations(user, function(response) {
					if (response.success) {
						vm.specificUser = response.data[0].user;
						for(var i = 0; i < response.data[0].profilePermissions.length; i++){
							if($routeParams.id == response.data[0].profilePermissions[i].profile.id){
								vm.specificPermission = response.data[0].profilePermissions[i];
								break;
							}
						}						
					}
				});
//				PermissionService.getPermission($routeParams.id, function(response) {
//					if (response.success) {
//						vm.updateProfile = response.data;
//						vm.viewPermission = response.data;						
//					}
//				});
			}
		}
		
		function getRequestUser(login) {
			UserService.getUser(login, function(response) {
				if (response.success) {
					vm.requestUser[login] = response.data;
				}
			});
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
		
		function loadAllPermissions() {
			PermissionService.getAllPermissions(function(response) {
				if (response.success) {
					vm.allPermissions = response.data;
				}
			});
		}
		
		function loadAllAssociations() {
			PermissionService.getAllAssociations(vm.user, function(response) {
				if (response.success) {
					vm.allAssociations = response.data;
				}
			});
		}
		
		function loadAllUsers() {
			UserService.getAllUsers(vm.user, function(response) {
				if (response.success) {
					vm.allUsers = response.data;
				}
			});
		}
		
		function registerAssociation() {
			vm.dataLoading = true;
			PermissionService.requestAssociation(vm.user.username, vm.selection, function(response) {
				if (response.success) {
					FlashService.Success('Requisição enviada com sucesso!',
							true);
					$location.path('/');
				} else {
					FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			});
		}
		
		function registerDesassociation() {
			vm.dataLoading = true;
			PermissionService.requestDesassociation(vm.user.username, vm.selection, function(response) {
				if (response.success) {
					FlashService.Success('Requisição enviada com sucesso!',
							true);
					$location.path('/');
				} else {
					FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			});
		}
		
		function editAssociation(login, id) {
			$location.path("/editAssociation/" + login+"/"+id);
		}

		function viewAssociation(login, id) {
			$location.path("/viewAssociation/" + login+"/"+id);
		}

		function update() {
			vm.dataLoading = true;
			updatePermission = {
					user : vm.specificUser,
					profilePermissions : [vm.specificPermission]
			}
			PermissionService.updatePermission(updatePermission, function(response) {
				if (response.success) {
					FlashService.Success('Usuário associado com sucesso!',
							true);
					loadAllAssociations();
					$location.path('/allAssociations');
				} else {
					FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			});
		}	
		
		function deleteAssociation(user, profilePermission) {
			vm.dataLoading = true;

			var modalOptions = {
				closeButtonText : 'Não',
				actionButtonText : 'Sim',
				headerText : 'Desassociar perfil',
				bodyText : 'Deseja realmente dessasociar o perfil '+profilePermission.profile.name+' do usuário '+user.name+' ?'
			};

			ModalService.showModal({}, modalOptions).then(
					function(result) {
						PermissionService.desassociate(user, profilePermission, function(response) {
							if (response.success) {
								FlashService.Success(
										'Perfil desassociado com sucesso!', true);
								loadAllAssociations();
								$location.path('/allAssociations');
							} else {
								FlashService.Error(response.message);
								vm.dataLoading = false;
							}
						});
					});
			vm.dataLoading = false;

		}	
		
		function insertDeleteSelection(permission){
			var index = vm.selection.indexOf(permission);
			
			if(index > -1)
				vm.selection.splice(index,1);
			else
				vm.selection.push(permission);
		
		}

	}

})();