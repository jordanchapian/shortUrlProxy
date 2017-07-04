angular.module('app')
.controller('app', [
'$scope',
'$timeout',
'steps',
'linkSvc',

function($scope, $timeout, steps, linkSvc){

	var URLregex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
	$scope.activeStep = steps[0];
	$scope.steps = steps;

	$scope.data = {
		target:'',
		agreeToDataCollection:false,
		continueAttempted:false
	};
	
	$scope.result = {
		loading:true,
		link:null,
		error:false
	};

	$scope.targetValid = function(){
		if(URLregex.test($scope.data.target)){
			return true;
		} else{
			return false;
		}
	};

	$scope.activateStep = function(step){
		if(step.index >= 1 && !$scope.targetValid()){
			return;
		}

		if(step.index === 0){
			$scope.data.continueAttempted = false;
		}

		if(step.index === 2){
			initResult();
		}
		
		$scope.activeStep = step;
	};

	$scope.startOver = function(){
		$scope.activeStep = steps[0];

		$scope.data.target = '';
		$scope.data.agreeToDataCollection = false;
		$scope.data.continueAttempted = false;

		$scope.result.loading = false;
		$scope.result.link = false;
		$scope.result.error = false;
	};

	$scope.continue = function(){
		//do not proceed if the target is invalid
		if($scope.activeStep.index === 0){
			$scope.data.continueAttempted = true;
		}

		if($scope.targetValid() === false) return;

		var nextStep = _.indexOf(steps, $scope.activeStep) + 1;
		if(steps.length - 1 < nextStep){ return }
		$scope.activeStep = steps[nextStep];

		//generate if this is final step
		if(nextStep === steps.length - 1){
			initResult();
		}
	};
	

	function initResult(){
		linkSvc.generateLink($scope.data.target, $scope.data.agreeToDataCollection)
		.then(function(result){
			$scope.result.loading = false;
			$scope.result.link = result.shortUrl;
			$scope.result.error = false;
		},
		function(err){
			$scope.result.loading = false;
			$scope.result.link = null
			$scope.result.error = true;
		});
	}


}])