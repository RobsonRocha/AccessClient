(function() {
	'use strict';

	angular.module('app').controller('EditUserController', EditUserController);

	EditUserController.$inject = [ 'UserService', '$location', '$rootScope' ];
	function EditUserController(UserService, $location, $rootScope) {
		var vm = this;

		vm.editUser = editUser;
		vm.getUser = getUser;
		vm.edit = edit;
		vm.user = UserService.getLoggedUser();		
		
		function editUser(user) {
			vm.updateUser = {
					user : {
						name : '',
						password : '',
						login : '',
						admin : false
					}
				};
			vm.updateUser.user = user; 
			$location.path('/editUser');
			
		}

		function edit() {
			$location.path('/editUser');
		}
		
		function getUser(){
			return vm.updateUser.user;
		}
		
	}

})();