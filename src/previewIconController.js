import { APPS } from "./appsController.js"

export var appPreviewIconsBar = document.querySelector("#appsBar")

export function showAppPreviewIcon(app) {
	// !!anmapp
	if (app.startBarAppIcon) app.startBarAppIcon.style.display = "block"
}

export function hideAppPreviewIcon(app) {
	app.startBarAppIcon.style.display = "none"
}

// !! we should check for dynamic ones too
// currently only the loaded apps have preview icon
// export function checkAppPreviewIcon(app) {
// if(! have an icon in the startBar) addAppPreviewIcon(app)
// }

export function addAppPreviewIcon(app) {
	app.startBarAppIcon = document.createElement("div")
	app.startBarAppIcon.id = app.name + "StartBarIcon"
	app.startBarAppIcon.className = "startBarAppIcon"
	appPreviewIconsBar.appendChild(app.startBarAppIcon)

	// app icon
	app.startBarAppIcon.innerHTML = app.name[0]

	app.appsBarContainer = document.createElement("div")
	app.appsBarContainer.id = app.name
	app.appsBarContainer.className = "appsBarContainer"
	app.startBarAppIcon.appendChild(app.appsBarContainer)

	app.centeredAppPreviewContainer = document.createElement("div")
	app.centeredAppPreviewContainer.id = app.name
	app.centeredAppPreviewContainer.className = "centeredAppPreviewContainer"
	app.appsBarContainer.appendChild(app.centeredAppPreviewContainer)
}

export function refreshAppPreviewIcon(app) {
	// !!anmapp
	if (app.windows?.length == 0) {
		return hideAppPreviewIcon(app)
	} else {
		showAppPreviewIcon(app)
	}
}
