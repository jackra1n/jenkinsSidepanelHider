// ==UserScript==
// @name         Jenkins Pipeline Sidepanel Hider
// @namespace    https://github.com/jackra1n
// @version      1.3
// @description  Adds new buttons that allow you to hide the side panel on jenkins job pipelines
// @author       jackra1n
// @match        /^(http[s]?):\/\/.*jenkins.*$/
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
(function () {

  let isSidePanelVisible = true;

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

  let settingsBtn = createButton("settings");
  settingsBtn.style.padding = "6px";
  settingsBtn.style.border = "none";

  let sidepanelBtn = createButton("keyboard_arrow_left");
  sidepanelBtn.style.border = '2px solid var(--task-link-bg-color--active)';
  sidepanelBtn.style.borderRadius = '0px 6px 6px 0px';
  sidepanelBtn.style.marginLeft = '-16px';
  sidepanelBtn.style.marginTop = '2px';
  sidepanelBtn.style.borderLeft = 'none';
  sidepanelBtn.style.width = '66px';

  let buttonDiv = document.createElement("div");

  header.insertBefore(settingsBtn, header.childNodes[2]);
  mainPanel.insertBefore(buttonDiv, mainPanel.childNodes[0]);
  buttonDiv.insertBefore(sidepanelBtn, buttonDiv.childNodes[0]);

  sidePanel.style.overflowX = "hidden";
  sidePanel.style.transition = "0.5s";
  mainPanel.style.padding = '1rem';
  mainPanel.style.transition = "margin-left .5s";

  sidepanelBtn.addEventListener("click", () => {
    if (window.localStorage.getItem("isSidepanelClosed") == "false") {
      sidePanel.style.width = "0";
      window.localStorage.setItem("isSidepanelClosed", "true");
      sidepanelBtn.innerHTML = '<i class="material-icons">keyboard_arrow_right</i>';
    }
    else {
      sidePanel.style.width = GM_config.get('sidepanelWidth') + "px";
      window.localStorage.setItem("isSidepanelClosed", "false");
      sidepanelBtn.innerHTML = '<i class="material-icons">keyboard_arrow_left</i>';
    }
  });

  if (window.localStorage.getItem("isSidepanelClosed") == "true") {
    sidepanelBtn.innerHTML = '<i class="material-icons">keyboard_arrow_right</i>';
    sidePanel.style.width = "0";
  }

  settingsBtn.addEventListener("click", () => {
    GM_config.open();
  });

  function createButton(iconName) {
    let btn = document.createElement("button");
    btn.style.display = 'flex';
    btn.style.justifyContent = 'center';
    btn.style.alignItems = 'center';
    btn.style.height = "40px";
    btn.style.width = "40px";
    btn.style.padding = "0";
    btn.style.borderRadius = '6px';
    btn.style.backgroundColor = 'var(--background)';
    btn.style.color = 'var(--text-color)';
    btn.innerHTML = '<i class="material-icons">' + iconName + '</i>';
    return btn;
  }
})();
