
window.onload = () => { 
    var nav = document.createElement('div'); 
    nav.style.position = 'fixed';
    nav.style.left = '0px';
    nav.style.zIndex = '9999999';
    nav.style.padding = '5px 15px';
    // nav.style.backgroundColor = 'white';
    nav.style.width = '100vw'; 
    nav.style.top = '0'; 
    nav.style.fontSize = '23px'; 
    nav.style.color = 'black'; 


    var btn = document.createElement('button');
    btn.innerHTML = '⏪ to Aviatoh';
    btn.style.cursor = 'pointer';
    btn.style.padding = '3px 9px';
    btn.style.backgroundColor = '#a21028';
    btn.style.color = 'white';
    btn.style.border = '0px';
    btn.style.boxShadow = 'rgb(0, 0, 0, 0, 0.4) 1px 3px 3px';

    

    btn.addEventListener("click", () => {
        chrome.runtime.sendMessage("OpenPopup")
      })

    nav.appendChild(btn);

    document.body.appendChild(nav);
    document.body.style.marginTop = '100px';
 
    chrome.storage.local.get('tabsForAviatoh', function(result){
        tabs = result.tabsForAviatoh;
        console.log(tabs);
    });
 
}