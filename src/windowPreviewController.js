import { APPS } from "./appsController.js"

// !! as in previewIconController.js:13 we only have preview for loaded apps
// dynamics ones won't have an icon at the startbar. so it uses APPS to reach the app.
export function addWindowPreview(wonwindow) {
	wonwindow.preview = document.createElement("div")
	wonwindow.preview.id = `${wonwindow.app.name}Preview${1}`
	wonwindow.preview.className = "appPreview"
	wonwindow.preview.innerHTML = wonwindow.app.name
	// !! we should check the function previewIconController.js:15
	// ? is temporary solution for not rising errors on anonymous app windows
	wonwindow.app.centeredAppPreviewContainer?.appendChild(
		wonwindow.preview
	)
}


