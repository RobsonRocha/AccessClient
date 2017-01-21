(function() {
	'use strict';

	angular.module('app').controller('AssociationController', AssociationController);
	
	AssociationController.$inject = [ 'UserService', '$location', '$rootScope',
			'$routeParams', 'FlashService', '$scope', 'ModalService',  'PermissionService' ];
	function AssociationController(UserService, $location, $rootScope, $routeParams,
			FlashService, $scope, ModalService, PermissionService) {
		var vm = this;

		vm.user = UserService.getLoggedUser();		 
		vm.allPermissions = [];
		vm.allAssociations = [];
		vm.allUsers = [];
		vm.selection = [];
		vm.register = register;
		vm.editAssociation = editAssociation;
		vm.viewAssociation = viewAssociation;
		vm.update = update;
		vm.deleteAssociation = deleteAssociation;		
		vm.insertDeleteSelection = insertDeleteSelection;
		vm.countRequestAssociations = 0;
		vm.countRequestDesassociations = 0;
		
		initController();

		function initController() {			
			vm.insertUserProfilePermission = {
					user : '',
					profilePermissions : ''
			};
			loadAllPermissions();
			loadAllAssociations();
			loadAllRequestAssociations();
			loadAllRequestDesassociations();
			loadAllUsers();			
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
			}
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
		
		function register() {
			vm.dataLoading = true;
			vm.insertUserProfilePermission.profilePermissions = vm.selection;			
			PermissionService.associate(vm.insertUserProfilePermission.user, vm.insertUserProfilePermission.profilePermissions, function(response) {
				if (response.success) {
					FlashService.Success('Usuário associado com sucesso!',
							true);
					$location.path('/allAssociations');
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