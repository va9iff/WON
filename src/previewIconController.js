import { APPS } from "./appsController.js"

export var appPreviewIconsBar = document.querySelector("#appsBar")

export function showAppPreviewIcon(appName) {
	APPS[appName].startBarAppIcon.style.display = "block"
}

export function hideAppPreviewIcon(appName) {
	APPS[appName].startBarAppIcon.style.display = "none"
}

export function addAppPreviewIcon(appName) {
	// console.log('prev', app,'888')
	// console.log(APPS[app.name].windows.length)

	APPS[appName].startBarAppIcon = document.createElement("div")
	APPS[appName].startBarAppIcon.id = appName + "StartBarIcon"
	APPS[appName].startBarAppIcon.className = "startBarAppIcon"
	appPreviewIconsBar.appendChild(APPS[appName].startBarAppIcon)

	// app icon
	APPS[appName].startBarAppIcon.innerHTML = appName[0]

	APPS[appName].appsBarContainer = document.createElement("div")
	APPS[appName].appsBarContainer.id = appName
	APPS[appName].appsBarContainer.className = "appsBarContainer"
	APPS[appName].startBarAppIcon.appendChild(APPS[appName].appsBarContainer)

	APPS[appName].centeredAppPreviewContainer = document.createElement("div")
	APPS[appName].centeredAppPreviewContainer.id = appName
	APPS[appName].centeredAppPreviewContainer.className =
		"centeredAppPreviewContainer"
	APPS[appName].appsBarContainer.appendChild(
		APPS[appName].centeredAppPreviewContainer
	)
}

export function refreshAppPreviewIcon(appName) {
	if (APPS[appName].windows.length == 0) {
		return hideAppPreviewIcon(appName)
	} else {
		showAppPreviewIcon(appName)
	}
}
