function initBackground() {

	loadContentScriptInAllTabs();

	chrome.extension.onRequest.addListener(function(request, sender,
			sendResponse) {

		localStorage['data'] = request['data'];
		chrome.windows.create({
			url : "drawMe.html",
			type : "popup",
			width : 1200,
			height : 600
		});
	});

	chrome.browserAction.onClicked.addListener(function(tab) {
		chrome.tabs.sendRequest(tab.id, {
			'DrawData' : true
		});
	});
}

initBackground();
