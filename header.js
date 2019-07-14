$(function() {

	var data = localStorage['data'];

	try {

		var ser = JSON.parse(data);
		if (ser) {
			console.log(ser);
		} else {
			throw "There was no object!";
		}
	} catch (e) {
		console.log(e);
	}

	Highcharts.chart('container', {

		chart : {
			defaultSeriesType : 'spline',
			zoomType : "x"
		},

		title : {
			text : 'Lottery_ratio',
			x : -20
		//center
		},
		subtitle : {
			text : 'Source: okooo.com',
			x : -20
		},
		xAxis : {
			type : 'datetime',
			dateTimeLabelFormats : {
				hour : "%m-%e %H:%M",
				day : "%m-%e"
			}
		},
		yAxis : {
			title : {
				text : 'percentage(%)'
			},
			plotLines : [ {
				value : 0,
				width : 1,
				color : '#808080'
			} ]
		},
		tooltip : {
			formatter : function() {
				return '<b>' + this.series.name + '</b><br/>'
						+ new Date(this.x).toString("MM-dd HH:mm") + ': '
						+ parseFloat(this.y).toFixed(2) + '%';
			}
		},
		plotOptions : {
			spline : {
				marker : {
					enabled : false,
					states : {
						hover : {
							enabled : true,
							symbol : 'circle',
							radius : 5,
							lineWidth : 1
						}
					}
				}
			}
		},
		series : ser
	});
});