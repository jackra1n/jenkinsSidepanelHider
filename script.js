// ==UserScript==
// @name         Jenkins Pipeline Sidepanel Hider
// @namespace    https://github.com/jackra1n
// @version      1.0
// @description  Adds new buttons that allow you to hide the side panel on jenkins job pipelines
// @author       jackra1n
// @match        *://jenkins.*/
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// ==/UserScript==
(function() {

    GM_addStyle('.jenkinsEnhancer-btn {background: white; padding: 0;}');

    GM_config.init({
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

    let buttonSettings = document.createElement("button");
    let buttonHide = document.createElement("button");
    let buttonShow = document.createElement("button");

    buttonSettings.innerHTML = '<i class="material-icons">settings</i>';
    buttonSettings.style.padding = "0";

    buttonHide.style.float = "right";
    buttonHide.style.marginRight = "15px";
    buttonHide.innerHTML = '<i class="material-icons">keyboard_arrow_left</i>';
    buttonHide.className = "jenkinsEnhancer-btn";

    buttonShow.style.display = "none";
    buttonShow.className = "jenkinsEnhancer-btn";
    buttonShow.innerHTML = '<i class="material-icons">keyboard_arrow_right</i>';

    header.insertBefore(buttonSettings, header.childNodes[2]);
    sidePanel.insertBefore(buttonHide, sidePanel.childNodes[0]);
    mainPanel.insertBefore(buttonShow, mainPanel.childNodes[0]);

    sidePanel.style.overflowX = "hidden";
    sidePanel.style.transition = "0.5s";
    mainPanel.style.transition = "margin-left .5s";

    buttonHide.addEventListener("click", () => {
        sidePanel.style.width = "0";
        buttonShow.style.display = "block";
    });
    buttonShow.addEventListener("click", () => {
        sidePanel.style.width = GM_config.get('sidepanelWidth') + "px";
        buttonShow.style.display = "none";
    });
    buttonSettings.addEventListener("click", () => {
        GM_config.open();
    })
})();