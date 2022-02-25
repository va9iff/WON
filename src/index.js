import { Window } from "./windowing/window.js"
import { APPS, loadApps } from "./appsController.js"

async function starter() {
	await loadApps()

	window.A = APPS
	console.log(A)

	new Window(APPS["example"].app).makeWindowElement(50, 60)
	new Window(APPS["example"].app).makeWindowElement(50, 60)
	new Window(APPS["example2"].app).makeWindowElement(50, 60)
}

starter()
