chrome.action.onClicked.addListener((activeTab) => 
{
    chrome.tabs.create({ url: "popup.html" });
}, (tab) => {});