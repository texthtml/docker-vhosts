(function () {
	angular.module('VirtualHostsApp', [])
	.controller('VirtualHostsController', ['$http', '$interval', function($http, $interval) {
		var activeLabels = [];
		var hosts = [];
		var labels = [];

		var unique = function(array) {
			return array.filter(function(value, index, self) {
				return self.indexOf(value) === index;
			});
		};

		this.hosts = function() {
			return hosts;
		};

		this.labels = function() {
			return labels;
		};

		this.containerLabels = function(containers) {
			var labels = [];
			angular.forEach(containers, function(container) {
				this.push.apply(this, container.labels);
			}, labels);
			return unique(labels);
		};

		this.containersNames = function(containers) {
			var containersNames = [];
			angular.forEach(containers, function(container) {
				var image = '';
				if (container.image.Registry !== '') {
					image = container.image.Registry + '/';
				}
				image += container.image.Repository;
				if (container.image.Tag !== '') {
					image += ':' + container.image.Tag;
				}
				this.push(container.name + '(' + image + ')');
			}, containersNames);
			return containersNames;
		};

		this.labelIsSelected = function(label) {
			return activeLabels.indexOf(label) !== -1;
		};

		this.toggleLabel = function(label) {
			var pos = activeLabels.indexOf(label);
			if (pos === -1) {
				activeLabels.push(label);
				return;
			}
			activeLabels.splice(pos, 1);
		};

		this.containersHaveSelectedLabels = function(containers) {
			var labels = this.containerLabels(containers);
			for (var i = 0; i < activeLabels.length; i++) {
				var activeLabel = activeLabels[i];
				if (labels.indexOf(activeLabel) === -1) {
					return false;
				}
			}
			return true;
		};

		var updateHosts = function() {
			$http.get('/hosts.json').then(function(response) {
				hosts = response.data.hosts;
				labels = response.data.labels;
			});
		};

		$interval(updateHosts, 5000);

		updateHosts();
	}])
}) (angular);
