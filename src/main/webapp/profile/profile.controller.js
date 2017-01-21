(function() {
	'use strict';

	angular.module('app').controller('ProfileController', ProfileController);
	
	ProfileController.$inject = [ 'UserService', '$location', '$rootScope',
			'$routeParams', 'FlashService', '$scope', 'ModalService',  'PermissionService' ];
	function ProfileController(UserService, $location, $rootScope, $routeParams,
			FlashService, $scope, ModalService, PermissionService) {
		var vm = this;

		vm.user = UserService.getLoggedUser();		 
		vm.allPermissions = [];
		vm.allAccessTypes = [];
		vm.register = register;
		vm.editProfile = editProfile;
		vm.viewProfile = viewProfile;
		vm.update = update;
		vm.deleteProfile = deleteProfile;		
		vm.countRequestAssociations = 0;
		vm.countRequestDesassociations = 0;

		initController();

		function initController() {
			vm.insertProfile = {
					profilePermission : {
						profileName : '',
						permission : ''
					}
				};
			loadAllPermissions();
			loadAllAccessTypes();
			loadAllRequestAssociations();
			loadAllRequestDesassociations();		
			if ($routeParams.id) {
				PermissionService.getPermission($routeParams.id, function(response) {
					if (response.success) {
						vm.updateProfile = response.data;
						vm.viewPermission = response.data;						
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
		
		function loadAllAccessTypes() {
			PermissionService.getAllAccessPermissions(function(response) {
				if (response.success) {
					vm.allAccessTypes = response.data;
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
			PermissionService.Create(vm.insertProfile.profilePermission, function(response) {
				if (response.success) {
					FlashService.Success('Perfil cadastrado com sucesso!',
							true);
					$location.path('/allProfiles');
				} else {
					FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			});
		}
		
		function editProfile(profile) {
			$location.path("/editProfile/" + profile.profile.id);
		}

		function viewProfile(profile) {
			$location.path("/viewProfile/" + profile.profile.id);
		}

		function update() {
			vm.dataLoading = true;
			PermissionService.updateProfile(vm.updateProfile, function(response) {
				if (response.success) {
					FlashService.Success('Perfil atualizado com sucesso!',
							true);
					loadAllPermissions();
					$location.path('/allProfiles');
				} else {
					FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			});
		}	
		
		function deleteProfile(profile) {
			vm.dataLoading = true;

			var modalOptions = {
				closeButtonText : 'Não',
				actionButtonText : 'Sim',
				headerText : 'Apagar perfil',
				bodyText : 'Deseja realmente apagar esse item?'
			};

			ModalService.showModal({}, modalOptions).then(
					function(result) {
						PermissionService.deleteProfile(profile, function(response) {
							if (response.success) {
								FlashService.Success(
										'Perfil apagado com sucesso!', true);
								loadAllPermissions();
								$location.path('/allProfiles');
							} else {
								FlashService.Error(response.message);
								vm.dataLoading = false;
							}
						});
					});
			vm.dataLoading = false;

		}		

	}

})();