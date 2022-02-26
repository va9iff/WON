import { APPS } from "./appsController.js"

export function addWindowPreview(wonwindow) {
	wonwindow.preview = document.createElement("div")
	wonwindow.preview.id = `${wonwindow.app.name}Preview${1}`
	wonwindow.preview.className = "appPreview"
	wonwindow.preview.innerHTML = wonwindow.app.name
	APPS[wonwindow.app.name].centeredAppPreviewContainer.appendChild(
		wonwindow.preview
	)
}


