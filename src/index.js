import { Window } from "./windowing/window.js"
import { APPS, loadApps } from "./appsController.js"

import {addWindowPreview} from "./windowPreviewController.js"

async function starter() {
	await loadApps()

	window.A = APPS
	console.log(A)

	window.w = Window

	new Window(APPS["example"].app).makeWindowElement(50, 60)
	new Window(APPS["example"].app).makeWindowElement(50, 60)
	let w = new Window(APPS["example2"].app)
	w.makeWindowElement(50, 60)
}

starter()
