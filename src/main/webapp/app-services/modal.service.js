(function() {
	'use strict';

	angular.module('app').factory('ModalService', ModalService);

	ModalService.$inject = [ '$modal' ];
	function ModalService($modal) {
		var service = {};

		service.showModal = showModal;
		service.show = show;

		var modalDefaults = {
			backdrop : true,
			keyboard : true,
			modalFade : true,
			templateUrl : 'confirmDelete/confirm.html'
		};

		var modalOptions = {
			closeButtonText : 'Close',
			actionButtonText : 'OK',
			headerText : 'Proceed?',
			bodyText : 'Perform this action?'
		};

		return service;

		function showModal(customModalDefaults, customModalOptions) {
			if (!customModalDefaults)
				customModalDefaults = {};
			customModalDefaults.backdrop = 'static';
			return show(customModalDefaults, customModalOptions);
		}
		;

		function show(customModalDefaults, customModalOptions) {
			var tempModalDefaults = {};
			var tempModalOptions = {};

			angular.extend(tempModalDefaults, modalDefaults,
					customModalDefaults);

			angular.extend(tempModalOptions, modalOptions, customModalOptions);

			if (!tempModalDefaults.controller) {
				tempModalDefaults.controller = function($scope, $modalInstance) {
					$scope.modalOptions = tempModalOptions;
					$scope.modalOptions.ok = function(result) {
						$modalInstance.close(result);
					};
					$scope.modalOptions.close = function(result) {
						$modalInstance.dismiss('cancel');
					};
				}
			}

			return $modal.open(tempModalDefaults).result;
		}
		;

	}

})();
