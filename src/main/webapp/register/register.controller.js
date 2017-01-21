(function() {
	'use strict';

	angular.module('app').controller('RegisterController', RegisterController);

	RegisterController.$inject = [ 'UserService', '$location', '$rootScope',
			'FlashService', 'PermissionService' ];
	function RegisterController(UserService, $location, $rootScope,
			FlashService, PermissionService) {
		var vm = this;

		vm.register = register;
		vm.countRequestAssociations = 0;
		vm.countRequestDesassociations = 0;

		initController();

		function initController() {
			vm.insertUser = {
				user : {
					userName : '',
					password : '',
					login : '',
					isAdmin : false
				}
			};
			
			loadAllRequestAssociations();
			loadAllRequestDesassociations();	
		}

		vm.user = UserService.getLoggedUser();
		
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
			UserService.Create(vm.insertUser.user, function(response) {
				if (response.success) {
					FlashService.Success('Usuário cadastrado com sucesso!',
							true);
					$location.path('/allUsers');
				} else {
					FlashService.Error(response.message);
					vm.dataLoading = false;
				}
			});
		}
	}

})();
