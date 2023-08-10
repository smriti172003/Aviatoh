

chrome.runtime.onMessage.addListener(request => {

    if (request == "OpenPopup") {
  
        chrome.tabs.query({}, function(tabs) { 
            var i = tabs.map(e => e.favIconUrl).indexOf('https://aviatoh.com/favicon.ico');
            chrome.tabs.highlight({'tabs': i}, function() {});
           
        });
        
  
    }
  
  })