// ==UserScript==
// @name         Jenkins Pipeline Sidepanel Hider
// @namespace    https://github.com/jackra1n
// @version      1.2
// @description  Adds new buttons that allow you to hide the side panel on jenkins job pipelines
// @author       jackra1n
// @include      /^(http[s]?):\/\/.*jenkins.*$/
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
(function() {

    GM_config.init(
    {
      'id': 'MyConfig', // The id used for this instance of GM_config
      'fields': // Fields object
        {
            'sidepanelWidth': // This is the id of the field
            {
                'label': 'side-panel width', // Appears next to field
                'type': 'int', // Makes this setting a text field
                'default': '310' // Default value if user doesn't change it
            }
        }
    });

    //Add material icons for button icons
    let head = document.getElementsByTagName("head")[0];
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    head.appendChild(link);

    let sidePanel = $("side-panel");
    let mainPanel = $("main-panel");
    let header = $("header");

    let buttonSettings = createButton("settings");
    buttonSettings.style.padding = "6px";
    
    let buttonShow = createButton("keyboard_arrow_right");
    buttonShow.style.display = "none";

    let buttonHide = createButton("keyboard_arrow_left");
    buttonHide.style.float = "right";
    buttonHide.style.marginRight = "15px";
        
    let showButtonDiv = document.createElement("div");
    showButtonDiv.style.height = '28px';

    header.insertBefore(buttonSettings, header.childNodes[2]);
    sidePanel.insertBefore(buttonHide, sidePanel.childNodes[0]);
    mainPanel.insertBefore(showButtonDiv, mainPanel.childNodes[0]);
    showButtonDiv.insertBefore(buttonShow, showButtonDiv.childNodes[0]);

    sidePanel.style.overflowX = "hidden";
    sidePanel.style.transition = "0.5s";
    mainPanel.style.padding = '1rem';
    mainPanel.style.transition = "margin-left .5s";

    buttonHide.addEventListener("click", ()=>{
        sidePanel.style.width = "0";
        buttonShow.style.display = "flex";
        window.localStorage.setItem("isSidepanelClosed", "true");
    });

    buttonShow.addEventListener("click", ()=>{
        sidePanel.style.width = GM_config.get('sidepanelWidth')+"px";
        buttonShow.style.display = "none";
        window.localStorage.setItem("isSidepanelClosed", "false");
    });

    if(window.localStorage.getItem("isSidepanelClosed") == "true")
    {
        buttonShow.style.display = "flex";
        sidePanel.style.width = "0";
    }

    buttonSettings.addEventListener("click", ()=> {
        GM_config.open();
    });

    function createButton(iconName) {
        let btn = document.createElement("button");
        btn.style.display = 'flex';
        btn.style.padding = "0";
        btn.style.borderRadius = '6px';
        btn.style.backgroundColor = 'var(--background)';
        btn.style.color = 'var(--text-color)';
        btn.innerHTML = '<i class="material-icons">'+iconName+'</i>';
        return btn;
    }
})();
