(function() {
	'use strict';

	angular.module('app').controller('HomeController', HomeController);

	HomeController.$inject = [ 'UserService', '$rootScope',
			'PermissionService', 'ModalService', 'FlashService', '$location' ];
	function HomeController(UserService, $rootScope, PermissionService,
			ModalService, FlashService, $location) {
		var vm = this;

		vm.user = null;
		vm.allPermissions = [];
		vm.allRequestAssociations = [];
		vm.allParsedRequestAssociations = [];
		vm.allUserAssociations = [];
		vm.getAllParsedRequestAssociations = getAllParsedRequestAssociations;
		vm.register = register;
		vm.deleteRequest = deleteRequest;
		vm.registerDesassociation = registerDesassociation;
		vm.deleteRequestDesassociation = deleteRequestDesassociation;
		vm.getResquestUser = getRequestUser;
		vm.requestUser = [];
		vm.showRequestUsers = false;
		vm.deleteAssociationRequest = deleteAssociationRequest;
		vm.deleteDesassociationRequest = deleteDesassociationRequest;
		vm.countRequestAssociations = 0;
		vm.countRequestDesassociations = 0;
		vm.getAllUserAssociations = getAllUserAssociations; 
		

		initController();

		function initController() {
			loadCurrentUser();
			loadAllRequestAssociations();
			loadAllRequestDesassociations();
			loadRequestAssociation();
			loadRequestDesassociation();
			getAllUserAssociations();
		}

		function getRequestUser(login) {
			UserService.getUser(login, function(response) {
				if (response.success) {
					vm.requestUser[login] = response.data;
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
						getRequestUser(login);
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
						getRequestUser(login);
						vm.showRequestDesassociateUsers = true;
						for(var desassociations in vm.allRequestDesassociations[login])
							vm.countRequestDesassociations++;
					}
				}
				else
					vm.allRequestDesassociations = [];
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
		
		function getAllUserAssociations() {
			PermissionService.getAllAssociations(vm.user, function(response) {
				if (response.success) {
					vm.allUserAssociations = response.data[0].profilePermissions;					
				}
			});
		}
		
		function getAllParsedRequestAssociations(permission) {
			vm.allParsedRequestAssociations = permission;
			return vm.allParsedRequestAssociations[0];
		}

		function register(login, permission) {
			vm.dataLoading = true;

			var modalOptions = {
				closeButtonText : 'Não',
				actionButtonText : 'Sim',
				headerText : 'Aceitar requisição',
				bodyText : 'Associar perfil ' + permission.profile.name
						+ ' ao usuário ' + login + ' ?'
			};

			var user = {
				name : login,
				login : login
			};

			var permissions = [];
			permissions.push(permission);

			ModalService.showModal({}, modalOptions)
					.then(function(result) {
						PermissionService.associateRequest(user, permissions, function(response) {
								if (response.success) {
									FlashService.Success('Usuário associado com sucesso!',	true);
									loadAllRequestAssociations();
									loadAllRequestDesassociations();
									$location.path('/');
								} else {
									FlashService.Error(response.message);
									vm.dataLoading = false;
								}
						});
				});
			vm.dataLoading = false;
		}

		function deleteRequest(login, permission) {
			vm.dataLoading = true;

			var modalOptions = {
				closeButtonText : 'Não',
				actionButtonText : 'Sim',
				headerText : 'Rejeitar requisição',
				bodyText : 'Deseja realmente reprovar essa requisição?'
			};

			ModalService.showModal({}, modalOptions).then(function(result) {
				PermissionService.deleteAssociateRequest(login,	permission, function(response) {
					if (response.success) {
						FlashService.Success('Requisição apagada com sucesso!',	true);
						loadAllRequestAssociations();
						loadAllRequestDesassociations();
						$location.path('/');
					} else {
						FlashService.Error(response.message);
						vm.dataLoading = false;
					}
				});
			});
			vm.dataLoading = false;
		}

		function registerDesassociation(login, permission) {
			vm.dataLoading = true;

			var modalOptions = {
				closeButtonText : 'Não',
				actionButtonText : 'Sim',
				headerText : 'Aceitar requisição',
				bodyText : 'Deseja desassociar o perfil '
						+ permission.profile.name + ' do usuário ' + login
						+ ' ?'
			};

			var user = {
				name : login,
				login : login
			};

			var permissions = [];
			permissions.push(permission);

			ModalService.showModal({}, modalOptions).then(function(result) {
				PermissionService.desassociateRequest(user,	permissions, function(response) {
					if (response.success) {
						FlashService.Success('Usuário desassociado com sucesso!', true);
						loadAllRequestAssociations();
						loadAllRequestDesassociations();
						$location.path('/');
					} else {
						FlashService.Error(response.message);
						vm.dataLoading = false;
					}
				});
			});
			vm.dataLoading = false;
		}

		function deleteRequestDesassociation(login, permission) {
			vm.dataLoading = true;

			var modalOptions = {
				closeButtonText : 'Não',
				actionButtonText : 'Sim',
				headerText : 'Rejeitar requisição',
				bodyText : 'Deseja realmente reprovar essa requisição?'
			};

			ModalService.showModal({}, modalOptions).then(function(result) {
				PermissionService.deleteDesassociateRequest(login,	permission, function(response) {
					if (response.success) {
						FlashService.Success('Requisição apagada com sucesso!',	true);
						loadAllRequestAssociations();
						loadAllRequestDesassociations();
						$location.path('/');
					} else {
						FlashService.Error(response.message);
						vm.dataLoading = false;
					}
				});
			});
			vm.dataLoading = false;
		}
		
		function deleteAssociationRequest(profile){
			vm.dataLoading = true;

			var modalOptions = {
				closeButtonText : 'Não',
				actionButtonText : 'Sim',
				headerText : 'Cancelar requisição',
				bodyText : 'Deseja realmente cancelar essa requisição?'
			};

			ModalService.showModal({}, modalOptions).then(function(result) {
				PermissionService.deleteAssociateRequest(vm.user.username,	profile, function(response) {
					if (response.success) {
						FlashService.Success('Requisição cancelada com sucesso!',	true);
						loadRequestAssociation();
						loadRequestDesassociation();
						$location.path('/');
					} else {
						FlashService.Error(response.message);
						vm.dataLoading = false;
					}
				});
			});
			vm.dataLoading = false;
		}
		
		function deleteDesassociationRequest(profile){
			vm.dataLoading = true;

			var modalOptions = {
				closeButtonText : 'Não',
				actionButtonText : 'Sim',
				headerText : 'Cancelar requisição',
				bodyText : 'Deseja realmente cancelar essa requisição?'
			};

			ModalService.showModal({}, modalOptions).then(function(result) {
				PermissionService.deleteDesassociateRequest(vm.user.username,	profile, function(response) {
					if (response.success) {
						FlashService.Success('Requisição cancelada com sucesso!',	true);
						loadRequestAssociation();
						loadRequestDesassociation();
						$location.path('/');
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