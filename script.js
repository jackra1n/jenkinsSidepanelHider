// ==UserScript==
// @name         Jenkins Pipeline Sidepanel Hider
// @namespace    https://github.com/jackra1n
// @version      1.0
// @description  Adds new buttons that allow you to hide the side panel on jenkins job pipelines
// @author       jackra1n
// @match        https://jenkins*/job/*/job/*/
// @grant        none
// ==/UserScript==

(function() {
    //Add material icons for button icons
    let head = document.getElementsByTagName("head")[0];
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
    head.appendChild(link);

    let sidePanel = $("side-panel");
    let mainPanel = $("main-panel");

    let buttonHide = document.createElement("button");
    let buttonShow = document.createElement("button");

    buttonHide.style.float = "right";
    buttonHide.style.marginRight = "15px";
    buttonHide.style.padding = "0";
    buttonHide.innerHTML = '<i class="material-icons">keyboard_arrow_left</i>';
    buttonShow.style.padding = "0";
    buttonShow.innerHTML = '<i class="material-icons">keyboard_arrow_right</i>';

    sidePanel.insertBefore(buttonHide, sidePanel.childNodes[0]);
    mainPanel.insertBefore(buttonShow, mainPanel.childNodes[0]);

    sidePanel.style.overflowX = "hidden";
    sidePanel.style.transition = "0.5s";
    mainPanel.style.transition = "margin-left .5s";

    buttonHide.addEventListener("click", function() {
        sidePanel.style.width = "0";
        buttonShow.style.display = "block";
    });
    buttonShow.addEventListener("click", function() {
        sidePanel.style.width = "310px";
        buttonShow.style.display = "none";
    });
})();
