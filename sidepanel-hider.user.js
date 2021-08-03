// ==UserScript==
// @name         Jenkins Pipeline Sidepanel Hider
// @namespace    https://github.com/jackra1n
// @version      1.2
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
    .custom-jenkins-btn {
      padding: 0;
      width: 30px;
      height: 30px;
      display: block;
      justify-content: center;
      align-items: center;
    }

    .jenkins-stats-btn {
      height: 30px;
      width: 90px;
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
        },
        'defaultStatsVisibility':
        {
          'label': 'stats hidden by default', // Appears next to field
          'type': 'checkbox', // Makes this setting a text field
          'default': 'true' // Default value if user doesn't change it
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
  let additionalInfo = mainPanel.querySelectorAll('table[style="margin-top: 1em; margin-left:1em;"]')[0];
  let additionalInfoBody = additionalInfo.childNodes[0];
  let buildHistory = $("buildHistoryPage");

  let buttonSettings = document.createElement("button");
  let buttonHide = document.createElement("button");
  let jobViewTopbarContainer = document.createElement("div");
  let buttonShow = document.createElement("button");
  let buttonToggleStats = document.createElement("button");

  jobViewTopbarContainer.className = "topbar-container";

  additionalInfo.style.margin = "0";
  additionalInfoBody.style.display = "flex";

  buttonSettings.innerHTML = '<i class="material-icons">settings</i>';
  buttonSettings.style.padding = "0";

  buttonHide.style.float = "right";
  buttonHide.style.marginRight = "15px";
  buttonHide.innerHTML = '<i class="material-icons">keyboard_arrow_left</i>';
  buttonHide.className = "custom-jenkins-btn";

  //buttonShow.style.visibility = "hidden";
  buttonShow.className = "custom-jenkins-btn";
  buttonShow.innerHTML = '<i class="material-icons">keyboard_arrow_right</i>';

  buttonToggleStats.innerHTML = 'Hide stats';
  buttonToggleStats.className = "jenkins-stats-btn";

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
    sidePanel.style.width = "0px";
    //buttonShow.style.visibility = "visible";
    buildHistory.style.visibility = "hidden";
    window.localStorage.setItem("isSidepanelClosed", "true");
  });

  buttonShow.addEventListener("click", () => {
    sidePanel.style.width = GM_config.get('sidepanelWidth') + "px";
    //buttonShow.style.visibility = "hidden";
    buildHistory.style.visibility = "visible";
    window.localStorage.setItem("isSidepanelClosed", "false");
  });

  buttonToggleStats.addEventListener("click", () => {
    if (stats.style.visibility == "hidden") {
      stats.style.height = "fit-content";
      stats.style.visibility = "visible";
      buttonToggleStats.innerHTML = 'Hide stats';
    }else {
      stats.style.height = "0";
      stats.style.visibility = "hidden";
      buttonToggleStats.innerHTML = 'Show stats';
    }
  });

  if (window.localStorage.getItem("isSidepanelClosed") == "true") {
    buttonShow.style.visibility = "visible";
    sidePanel.style.width = "0";
  }

  if (GM_config.get('defaultStatsVisibility') == "true") {
    buttonToggleStats.innerHTML = 'Show stats';
    stats.style.height = "0";
    stats.style.visibility = "hidden";
  }

  buttonSettings.addEventListener("click", () => {
    GM_config.open();
  });
})();
