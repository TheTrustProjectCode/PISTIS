'use strict';
var cpsId;
var url;
var newURL;
var pos;

chrome.browserAction.onClicked.addListener(function(activeTab) {

    chrome.tabs.executeScript(null, { file: "dom.js" });

    // .executeScript(null, { file: 'dom.js' });
});