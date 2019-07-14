/**
 * Copyright (c) 2011 The Chromium Authors. All rights reserved. Use of this
 * source code is governed by a BSD-style license that can be found in the
 * LICENSE file.
 */

function GetDrawData() {

	var ser = [ {
		name : "HomeTeam",
		data : []
	}, {
		name : "Love",
		data : []
	}, {
		name : "GuestTeam",
		data : []
	} ];
	var url = document.URL;
	var numberbase = 2;
	if(url.indexOf("boundary") != (-1))
	{
		numberbase = 3;
	}
	var table = document.getElementsByTagName("table")[0];
	var len = table.rows.length;
	var ainit = table.rows[len - 1].cells[numberbase].innerText;
	var binit = table.rows[len - 1].cells[numberbase+1].innerText;
	var cinit = table.rows[len - 1].cells[numberbase+2].innerText;
	for (var i = numberbase; i < len; i++) {
		//so ugly handle the table not fit the form
		try {
			var dTime = new Date(Date
					.parse(formStr(table.rows[i].cells[0].innerText)));
			var a = formStr(table.rows[i].cells[numberbase].innerText);
			var b = formStr(table.rows[i].cells[numberbase+1].innerText);
			var c = formStr(table.rows[i].cells[numberbase+2].innerText);
			ser[0].data.push([ dTime.getTime(), (a - ainit) / ainit * 100 ]);
			ser[1].data.push([ dTime.getTime(), (b - binit) / binit * 100 ]);
			ser[2].data.push([ dTime.getTime(), (c - cinit) / cinit * 100 ]);
		} catch (e) {
			console.log(e);
		};
	}
	ser[0].data.reverse();
	ser[1].data.reverse();
	ser[2].data.reverse();

	var strstr = JSON.stringify(ser);

	chrome.extension.sendRequest({
		'data' : strstr
	});
}

function onExtensionMessage(request) {

	GetDrawData();

}

function initContentScript() {
	chrome.extension.onRequest.addListener(onExtensionMessage);

}

function formStr(strIn) {
	var str = strIn;
	var index = str.indexOf('↑');
	if (index == (-1)) {
		index = str.indexOf('↓');
	}
	if (index == (-1)) {
		index = str.indexOf('(');
	}
	if (index != (-1)) {

		str = str.substring(0, index);

	}

	return str;
}

initContentScript();
