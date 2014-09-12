angular.module('MyApp')
	.controller('DatavizLikeOursCtrl', ['$scope', function($scope) {
		$scope.screen_image = "../images/Autodesk.png";

		$scope.autodesk_data = autodesk_chart_data;
		$scope.tesla_data = tesla_chart_data;
		$scope.paypal_data = paypal_chart_data;
		$scope.nike_data = nike_chart_data;

		// FONTS ==============
		 WebFontConfig = {
		    google: { families: [ 'Istok+Web:400:latin', 'Muli:400', 'Passion+One:700:latin', 'Open+Sans:700:latin' ] }
		  };
		  (function() {
		    var wf = document.createElement('script');
		    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
		      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
		    wf.type = 'text/javascript';
		    wf.async = 'true';
		    var s = document.getElementsByTagName('script')[0];
		    s.parentNode.insertBefore(wf, s);
		  })();		

		$scope.new_screen = function(type) {
			if (type == 'autodesk') {
				$scope.screen_image = '../images/Autodesk.png';
				zingchart.exec('designers_chart', 'setdata', $scope.autodesk_data);
			}
			else if (type == 'tesla') {
				$scope.screen_image = '../images/Tesla.png';
				zingchart.exec('designers_chart', 'setdata', $scope.tesla_data);
			}
			else if (type == 'paypal') {
				$scope.screen_image = '../images/Paypal.png';
				zingchart.exec('designers_chart', 'setdata', $scope.paypal_data);
			}
			else if (type == 'nike') {
				$scope.screen_image = '../images/Nike.png';
				zingchart.exec('designers_chart', 'setdata', $scope.nike_data);
			}
		};
	}]);