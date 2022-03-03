import { Window } from "./windowing/window.js"
import { desktopIcon } from "./desktop/desktopIcons.js"
import { APPS, loadApps, loadApp } from "./appsController.js"

async function starter() {
	await loadApps()

	window.A = APPS
	console.log(A)

	window.w = Window

	let app = new Window(APPS["files"])
	app.makeWindowElement(0,0)
	app.TOP.style.width = "100%"
	app.TOP.style.height = "100%"

	// new Window(APPS["example"]).makeWindowElement(50, 60)
	// new Window(APPS["example"]).makeWindowElement(50, 60)
	// new Window(APPS["example"]).makeWindowElement(50, 60)
	

}

starter()
