//Display installed page, then set localstorage to stop it from happening again
chrome.runtime.onInstalled.addListener(function (object) {
  if(!localStorage.getItem("sh_post_install")){
    chrome.tabs.create({url: "resources/installed.html"}, function (tab) {
        localStorage.setItem("sh_post_install");
    });
  }
});
