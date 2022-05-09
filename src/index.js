import { Window } from "./windowing/window.js"
import { start } from "./startMenu/startMenu.js"
import { desktopIcon } from "./desktop/desktopIcons.js"
import { APPS, launch, launchManual, openWith, loadApps, loadApp } from "./appsController.js"
import {require} from "./WONfun.js"
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
	// launch("code-viewer")




// launchManual(loadApp({
	// 	name:"loaded",
	//     // $WON means the current url that WON is opened
	//     home: "$WON/src/apps/example/index.html", //we don't have to have the real page in our repo.
	//     icon: "$WON/src/apps/example/example_icon.png",
	//     desktopIcon: true,
	// })// )


	// iv.frame.contentWindow.addEventListener("load", ()=> iv.frame.contentWindow.wantingFromWon("I order p"))
	

// launch("make-it-real")
}

starter()
