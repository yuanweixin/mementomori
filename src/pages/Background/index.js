chrome.action.onClicked.addListener(function(activeTab)
{
    chrome.tabs.create({ url: "popup.html" });
});