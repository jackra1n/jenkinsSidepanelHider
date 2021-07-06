// ==UserScript==
// @name         Jenkins Pipeline Sidepanel Hider
// @namespace    https://github.com/jackra1n
// @version      1.1
// @description  Adds new buttons that allow you to hide the side panel on jenkins job pipelines
// @author       jackra1n
// @match        *://jenkins.*/
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addStyle
// ==/UserScript==
(function () {

  GM_addStyle(`
    .custom-jenkins-button {
      padding: 0;
      width: 30px;
      height: 30px;
      display: block;
      justify-content: center;
      align-items: center;
    }

    .topbar-container {
      display: flex;
      justify-content: space-between;
    }
    `);

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
  let stats = mainPanel.querySelectorAll('div[style="float:right"]')[0];

  console.log(stats);

  let buttonSettings = document.createElement("button");
  let buttonHide = document.createElement("button");
  let jobViewTopbarContainer = document.createElement("div");
  let buttonShow = document.createElement("button");
  let buttonToggleStats = document.createElement("button");

  jobViewTopbarContainer.className = "topbar-container";

  buttonSettings.innerHTML = '<i class="material-icons">settings</i>';
  buttonSettings.style.padding = "0";

  buttonHide.style.float = "right";
  buttonHide.style.marginRight = "15px";
  buttonHide.innerHTML = '<i class="material-icons">keyboard_arrow_left</i>';
  buttonHide.className = "custom-jenkins-button";

  buttonShow.style.visibility = "hidden";
  buttonShow.className = "custom-jenkins-button";
  buttonShow.innerHTML = '<i class="material-icons">keyboard_arrow_right</i>';

  buttonToggleStats.innerHTML = '<i class="material-icons">keyboard_arrow_up</i>';
  buttonToggleStats.className = "custom-jenkins-button";

  header.insertBefore(buttonSettings, header.childNodes[2]);
  sidePanel.insertBefore(buttonHide, sidePanel.childNodes[0]);
  mainPanel.insertBefore(jobViewTopbarContainer, mainPanel.childNodes[0]);
  jobViewTopbarContainer.insertBefore(buttonShow, jobViewTopbarContainer.childNodes[0]);
  jobViewTopbarContainer.insertBefore(buttonToggleStats, jobViewTopbarContainer.childNodes[1]);

  sidePanel.style.overflowX = "hidden";
  sidePanel.style.transition = "0.5s";
  stats.style.transition = "margin-bottom .5s";
  mainPanel.style.transition = "margin-left .5s";

  buttonHide.addEventListener("click", () => {
    sidePanel.style.width = "0";
    buttonShow.style.visibility = "visible";
    window.localStorage.setItem("isSidepanelClosed", "true");
  });

  buttonShow.addEventListener("click", () => {
    sidePanel.style.width = GM_config.get('sidepanelWidth') + "px";
    buttonShow.style.visibility = "hidden";
    window.localStorage.setItem("isSidepanelClosed", "false");
  });

  buttonToggleStats.addEventListener("click", () => {
    //if (stats.style.display == "none") {
    if (stats.style.visibility == "hidden") {
      //stats.style.display = "block";
      stats.style.height = "fit-content";
      stats.style.visibility = "visible";
      buttonToggleStats.innerHTML = '<i class="material-icons">keyboard_arrow_down</i>';
      console.log("open");
    }else {
      //stats.style.display = "none";
      stats.style.height = "0";
      stats.style.visibility = "hidden";
      buttonToggleStats.innerHTML = '<i class="material-icons">keyboard_arrow_up</i>';
      console.log("close");
    }
  });

  if (window.localStorage.getItem("isSidepanelClosed") == "true") {
    buttonShow.style.visibility = "visible";
    sidePanel.style.width = "0";
  }

  buttonSettings.addEventListener("click", () => {
    GM_config.open();
  });
})();
