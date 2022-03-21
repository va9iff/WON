import { Window } from "./windowing/window.js"
import { desktopIcon } from "./desktop/desktopIcons.js"
import { APPS, launch, openWith, loadApps, loadApp } from "./appsController.js"
import {requireFile} from "./WONfun.js"
async function starter() {
	await loadApps()

	window.A = APPS
	console.log(A)

	window.w = Window

	// let filesWin = launch("files")
	// filesWin.TOP.style.width = "100%"
	// filesWin.TOP.style.height = "100%"

	window.opu = "k"
	// let iv = launch("image-viewer")

	// iv.maximize()
	// iv.unMaximize()

	let custommsg = "hahahahahahah from top"

	// onload overrides previously assigneds

	// openWith("image-viewer","fasd asd asd asdf")
	launch("example")

	// iv.frame.contentWindow.addEventListener("load", ()=> iv.frame.contentWindow.wantingFromWon("I order p"))
	

}

starter()
