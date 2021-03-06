angular.module('MyApp')
	.controller('BigDataCtrl', ['$scope', function ($scope) {

		//////////////////////////////////
		// Chart Objects /////////////////
		//////////////////////////////////

		$scope.interact_data 		= interact_data_chart;

		$scope.evaluate_data 		= evaluate_data_chart;

		$scope.evaluate_data_rules 	= evaluate_data_chart_rules;

		$scope.annotate_data 		= annotate_data_chart;

		// ACTIONS /////////////////

		$scope.point_options = [
			{name: "10,000", value: 10000},
			{name: "25,000", value: 25000},
			{name: "50,000", value: 50000},
			{name: "100,000", value: 100000}
		];

		$scope.points_to_render = {name:"10,000 points"};

		$scope.time_to_render = "0.157s";

		$scope.render_time = "";

		$scope.modify = function(target, payload) {
			zingchart.exec(target, 'modify', payload);
			/* MIXPANEL TRACKING GOES HERE
			$analytics.eventTrack('eventName', );
			*/
		};

		$scope.set_data = function(target, payload) {
			zingchart.exec(target, 'setdata', payload);
			/* MIXPANEL TRACKING GOES HERE
			$analytics.eventTrack('eventName', );
			*/
		};

		$scope.timeToRunMobile = function(number_of_points) {
			var name = number_of_points.name;
			var number_of_points = number_of_points.value;
			var newVals0 = generateRandomNumbers(number_of_points/5);
	    	var newVals1 = generateRandomNumbers(number_of_points/5);
	    	var newVals2 = generateRandomNumbers(number_of_points/5);
	    	var newVals3 = generateRandomNumbers(number_of_points/5);
	    	var newVals4 = generateRandomNumbers(number_of_points/5);
	    	var new_data = { "data": { "series": [ { "values" : newVals0 }, { "values" : newVals1 }, { "values" : newVals2 }, {"values" : newVals3 }, {"values" : newVals4 } ] } };
	    	var time_before = new Date().getTime();
	    	$scope.modify('interact-demo', new_data);
	    	var time_after = new Date().getTime();
	    	var time_to_render = (time_after-time_before)/1000;
	    	time_to_render.toString();
	    	var result = name + " points rendered in ";
	    	$scope.render_time = result + time_to_render + "s";
	    	/* MIXPANEL TRACKING GOES HERE
			$analytics.eventTrack('eventName', );
			*/
		};

		$scope.timeToRun = function(number_of_points) {
			var newVals0 = generateRandomNumbers(number_of_points/5);
	    	var newVals1 = generateRandomNumbers(number_of_points/5);
	    	var newVals2 = generateRandomNumbers(number_of_points/5);
	    	var newVals3 = generateRandomNumbers(number_of_points/5);
	    	var newVals4 = generateRandomNumbers(number_of_points/5);
	    	var new_data = { "data": { "series": [ { "values" : newVals0 }, { "values" : newVals1 }, { "values" : newVals2 }, {"values" : newVals3 }, {"values" : newVals4 } ] } };
	    	var time_before = new Date().getTime();
	    	$scope.modify('interact-demo', new_data);
	    	var time_after = new Date().getTime();
	    	var time_to_render = (time_after-time_before)/1000;
	    	time_to_render.toString();
	    	$scope.time_to_render = time_to_render + "s";
	    	/* MIXPANEL TRACKING GOES HERE
			$analytics.eventTrack('eventName', );
			*/
		};

		$scope.calc_trend_line = function() {
			var nodes = zingchart.exec('annotate-demo', 'getseriesvalues', {
				plotindex: 0
			});
			/* calculate sums */
		    var sxy = 0, sx = 0, sy = 0, sx2 = 0, l = 0;
			/* check if key-value pair */
			for (var i=0;i<nodes.length;i++) {
				sxy += nodes[i][0]*nodes[i][1];
				sx += nodes[i][0];
				sy += nodes[i][1];
				sx2 += nodes[i][0]*nodes[i][0];
				l++;
			}
			var b = (l * sxy - sx * sy) / (l * sx2 - sx * sx);
			var a = (sy - b * sx) / l;
		    
		    /* get scale values */
			var oScaleInfo = zingchart.exec('annotate-demo', 'getobjectinfo', {
				object : 'scale',
				name : 'scale-x'
			});
		    
			var aScaleValues = oScaleInfo.values, fScaleMin = aScaleValues[0], fScaleMax = aScaleValues[aScaleValues.length-1];

			var aRange = [a + b*fScaleMin, a + b*fScaleMax];

			var payload = {"data":{"labels":[{"text":"2. Click two blank spots in the plot (start/end) to draw your own trend line!","background-color":"#fff","font-size":"12px","padding":"2 6 2 6","x":"8%","y":"17%"},{"text":"1. Select a node to create a note.","background-color":"#fff","font-size":"12px","padding":"2 6 2 6","x":"8%","y":"11%"}],'scale-y':{markers:[{type:'line',range:aRange,lineColor:'#c00',lineWidth:3,alpha:0.75,lineStyle:'dashed',label:{text:''}}]}}};

			zingchart.exec('annotate-demo', 'modify', payload);
		};

		// ANNOTATE IT

		// SHARE IT
		
		$scope.annotate_chart_output = "";

		$scope.no_img = true;

		$scope.get_annotate_chart = function() {
			$scope.no_img = false;
			$scope.annotate_chart_output = zingchart.exec("annotate-demo", "getimagedata", {filetype : 'png'});
			/* MIXPANEL TRACKING */
			$analytics.eventTrack('Chart Image Generated');
			
		}

	}])