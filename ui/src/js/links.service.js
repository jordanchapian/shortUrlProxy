angular.module('app')
.service('linkSvc', [
'$http',
'$q',

function($http, $q){
	
	this.generateLink = function(target, trackingEnabled){
		var defer = $q.defer();

		$http.post('/api/v1/links', {
			targetUrl:target,
			trackingEnabled:trackingEnabled
		})
		.then(function(result){
			defer.resolve(result.data);
		}, function(err){
			defer.reject(err);
		});

		return defer.promise;
	};

}]);