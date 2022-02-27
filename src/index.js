import { Window } from "./windowing/window.js"
import { APPS, loadApps } from "./appsController.js"

async function starter() {
	await loadApps()

	window.A = APPS
	console.log(A)

	window.w = Window

	new Window(APPS["example"]).makeWindowElement(50, 60)
	new Window(APPS["example"]).makeWindowElement(50, 60)
	new Window(APPS["example"]).makeWindowElement(50, 60)
	new Window({
		name: 'anonymous'
	}).makeWindowElement(150,150)
	new Window(APPS["example2"]).makeWindowElement(90,70)
	let w = new Window(APPS["example2"])
	w.makeWindowElement(50, 60)
}

starter()
